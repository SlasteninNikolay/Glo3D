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
    const popupClose = document.querySelector(".popup-close");

    //PopUp Animation
    function animate({ timing, draw, duration }) {
        const start = performance.now();

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            const progress = timing(timeFraction);

            draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }

    function makeEaseOut(timing) {
        return function (timeFraction) {
            return 1 - timing(1 - timeFraction);
        };
    }
    function bounce(timeFraction) {
        for (let a = 0, b = 1; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
            }
        }
    }
    const bounceEaseOut = makeEaseOut(bounce);

    popupBtn.forEach((element) => {
        element.addEventListener("click", () => {
            popup.style.display = "block"; // показываем подложку
            const screenWidth = document.documentElement.clientWidth;
            const popupContent = document.querySelector(".popup-content");
            const popupContentWidth = popupContent.clientWidth;
            animate({
                duration: 1000,
                timing: bounceEaseOut,
                draw: function (progress) {
                    popupContent.style.left =
                        progress * (screenWidth / 2 - popupContentWidth / 2) + 50 + "px";
                },
            });
        });
    });
    popupClose.addEventListener("click", () => {
        const popupContent = document.querySelector(".popup-content");
        popupContent.style.left = "-100%";
        popup.style.display = "none";
    });
};
togglePopUp();
