(() => {
    const startTime = Date.now();

    window.addEventListener("load", () => {
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        document.getElementById("loadTime").innerText = `Время загрузки страницы: ${loadTime} мс.`;

        // Получаем текущий URL
        const currentLocation = document.location.pathname;
        const menuItems = document.querySelectorAll('.header__menu a');

        menuItems.forEach(item => {
            if (item.pathname === currentLocation) {
                item.classList.add('active');
            }
        });
    });
})();

