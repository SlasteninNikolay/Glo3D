window.addEventListener("DOMContentLoaded", () => {
    // Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector("#timer-hours");
        const timerMinutes = document.querySelector("#timer-minutes");
        const timerSeconds = document.querySelector("#timer-seconds");
        const idSetInterval = setInterval(updateClock, 1000);

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime();
            const dateNow = new Date().getTime();
            const timerRemaining = (dateStop - dateNow) / 1000;
            const seconds = Math.floor(timerRemaining % 60);
            const minutes = Math.floor((timerRemaining / 60) % 60);
            const hours = Math.floor((timerRemaining / 60 / 60) % 24);
            return { timerRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours <= 9 ? "0" + timer.hours : timer.hours;
            timerMinutes.textContent = timer.minutes <= 9 ? "0" + timer.minutes : timer.minutes;
            timerSeconds.textContent = timer.seconds <= 9 ? "0" + timer.seconds : timer.seconds;

            if (timer.timerRemaining < 0) {
                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
                clearInterval(idSetInterval);
            }
        }
        updateClock();
    }
    countTimer("22 august 2021");

    // Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector(".menu");
        const menu = document.querySelector("menu");
        const closeBtn = document.querySelector(".close-btn");
        const menuItems = menu.querySelectorAll("ul>li");

        const handlerMenu = () => {
            menu.classList.toggle("active-menu");
        };

        btnMenu.addEventListener("click", handlerMenu);
        closeBtn.addEventListener("click", handlerMenu);

        menuItems.forEach((element) => element.addEventListener("click", handlerMenu));
    };

    toggleMenu();

    // Popup
    const togglePopUp = () => {
        const popup = document.querySelector(".popup");
        const popupBtn = document.querySelectorAll(".popup-btn");
        const popupCLose = document.querySelector(".popup-close");

        popupBtn.forEach((element) => {
            element.addEventListener("click", () => {
                popup.style.display = "block";
            });
        });

        popupCLose.addEventListener("click", () => {
            popup.style.display = "none";
        });
    };
    togglePopUp();
});
