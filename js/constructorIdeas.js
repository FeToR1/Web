let suggestions = JSON.parse(localStorage.getItem('product-suggestions')) || [];

function displaySuggestions() {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';

    if (suggestions.length === 0) {
        resultContainer.innerHTML = '<p>Нет предложений.</p>';
        return;
    }

    suggestions.forEach((suggestion, index) => {
        const suggestionHTML = `
                <div class="suggestion">
                    <h3>${index + 1}. ${suggestion.name}</h3>
                    <hr class="suggestion_line">
                    <p class="suggestion_description"><img src="images/icons/category.svg" alt="Категория"> ${suggestion.category}</p>
                    <p><strong>Описание:</strong> ${suggestion.description}</p>
                    <p><strong>Ожидаемая цена:</strong> ${suggestion.price} ₽</p>
                    ${suggestion.image ? `<img src="${suggestion.image}" alt="${suggestion.name}" >` : ''}
                    ${suggestion.meme ? `<p><a href="${suggestion.meme}" target="_blank">Ссылка на мем ${index + 1}</a></p>` : ''}
                </div>
            `;
        resultContainer.innerHTML += suggestionHTML;
    });
}

// Показывает или скрывает поле для ввода другой категории
document.getElementById('product-category').addEventListener('change', function() {
    const otherCategoryInput = document.getElementById('other-category-input');
    otherCategoryInput.style.display = this.value === 'other' ? 'block' : 'none';
});

document.getElementById('product-suggestion-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productCategory = document.getElementById('product-category').value;
    const productOtherCategory = document.getElementById('product-other-category').value;
    const productDescription = document.getElementById('product-description').value;
    const productPrice = document.getElementById('product-price').value;
    const productImage = document.getElementById('product-image').files[0];
    const productMeme = document.getElementById('product-meme').value;

    const suggestion = {
        name: productName,
        category: productCategory === 'other' ? productOtherCategory : productCategory,
        description: productDescription,
        price: productPrice,
        image: productImage ? URL.createObjectURL(productImage) : null,
        meme: productMeme
    };

    suggestions.push(suggestion);
    localStorage.setItem('product-suggestions', JSON.stringify(suggestions));
    displaySuggestions();

    this.reset();
    document.getElementById('other-category-input').style.display = 'none';
});


displaySuggestions();