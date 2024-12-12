const commentsContainer = document.getElementById('comments');

function fetchCommentsUsingPromise() {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/comments?_limit=50&_page=1`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function getRandomDate(start, end) {
    const dateStart = start.getTime();
    const dateEnd = end.getTime();
    const randomTime = Math.random() * (dateEnd - dateStart) + dateStart;

    return new Date(randomTime);
}

function renderComments(comments) {
    commentsContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const commentsWithDates = comments.map(comment => {
        return {
            ...comment,
            date: getRandomDate(new Date(2024, 0, 1), new Date())
        };
    });
    commentsWithDates.sort((a, b) => b.date - a.date); // Сортируем по дате
    commentsWithDates.forEach(comment => {
        const formattedDate = comment.date.toLocaleDateString();
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
            <h4>${comment.name}</h4>
            <p>(${comment.email})</p><br>
            <p>${formattedDate}</p><br>
            <p>${comment.body}</p><br><br><br>
        `;
        fragment.appendChild(commentElement);
    });
    commentsContainer.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingPlaceholder = document.createElement('img');
    loadingPlaceholder.src = 'https://media1.tenor.com/m/mTTiBoWzy-UAAAAd/mushroom-mushroom-movie.gif';
    loadingPlaceholder.alt = 'Загрузка...';
    loadingPlaceholder.classList.add('loading');

    // оборачиваем изображение загрузки в контейнер
    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('loading-container');
    loadingContainer.appendChild(loadingPlaceholder);
    commentsContainer.appendChild(loadingContainer);

    fetchCommentsUsingPromise()
        .then(data => {
            loadingContainer.remove(); // удаляем контейнер загрузки
            renderComments(data); // рендерим комментарии
        })
        .catch(error => {
            console.error('Fetch error:', error);
            commentsContainer.innerHTML = '';

            const errorContainer = document.createElement('div');
            errorContainer.classList.add('error-container');

            const errorImage = document.createElement('img');
            errorImage.src = 'https://media1.tenor.com/m/E4b-lodZBJ0AAAAd/mushroom-mushroommovie.gif';
            errorImage.alt = 'Ошибка загрузки';
            errorImage.classList.add('error-image');

            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Сожалеем, но ваши отзывы сбежали! Мы работаем над тем, чтобы вернуть все в норму!';

            errorMessage.classList.add('error-message');

            errorContainer.appendChild(errorImage);
            errorContainer.appendChild(errorMessage);
            commentsContainer.appendChild(errorContainer);
            loadingContainer.remove(); // удаляем контейнер загрузки
        });
});

