document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const menuText = document.querySelector('.header__menu-toggle_text');
    const menuToggleButton = document.querySelector('.header__menu-toggle_button');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('header__menu--visible');
        if (menu.classList.contains('header__menu--visible')) {
            menu.style.display = 'block'; // Отображаем меню
        } else {
            menu.style.display = 'none'; // Скрываем меню
        }


        menuToggle.style.backgroundColor = '#ffffff';
        menuText.style.color = '#7C1721';

        if (menuToggleButton.style.transform === 'rotate(90deg)') {
            menuToggleButton.style.transform = 'rotate(0deg)';
        } else {
            menuToggleButton.style.transform = 'rotate(90deg)';
            menuToggleButton.style.color = '#7C1721';
        }
    });
});
