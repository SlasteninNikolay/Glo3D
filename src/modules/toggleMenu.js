const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu");
    const menu = document.querySelector("menu");

    const handlerMenu = () => {
        menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);

    menu.addEventListener("click", (event) => {
        const target = event.target;

        if (target.closest(".active-menu ul")) {
            handlerMenu();
        } else if (target.classList.contains("close-btn")) {
            handlerMenu();
        }
    });
};

export default toggleMenu;
