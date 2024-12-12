document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll('.category_filter');
    const productCards = document.querySelectorAll('.shop__card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('activeCategory'));
            this.classList.add('activeCategory');

            const category = this.getAttribute('data-category');

            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});