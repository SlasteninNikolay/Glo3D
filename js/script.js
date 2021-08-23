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
countTimer("24 august 2021");

// Menu
const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu");
    const menu = document.querySelector("menu");
    const main = document.querySelector("main");
    const closeBtn = document.querySelector(".close-btn");
    const menuItems = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
        menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);

    menu.addEventListener("click", (event) => {
        let target = event.target;
        console.log(target);

        if (target.closest(".active-menu ul")) {
            handlerMenu();
        } else if (target.classList.contains("close-btn")) {
            handlerMenu();
        }
    });
};

toggleMenu();

// Popup
const togglePopUp = () => {
    const popup = document.querySelector(".popup");
    const popupBtn = document.querySelectorAll(".popup-btn");

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
            const screenWidth = document.documentElement.clientWidth;
            const popupContent = document.querySelector(".popup-content");
            const popupContentWidth = popupContent.clientWidth;

            if (screenWidth > 768) {
                popup.style.display = "block"; // показываем подложку
                animate({
                    duration: 1000,
                    timing: bounceEaseOut,
                    draw: function (progress) {
                        popupContent.style.left =
                            progress * (screenWidth / 2 - popupContentWidth / 2) + "px";
                    },
                });
            } else {
                popup.style.display = "block"; // показываем подложку
                popupContent.style.left = screenWidth / 2 - popupContentWidth / 2 + "px";
            }
        });
    });

    popup.addEventListener("click", (event) => {
        const popupContent = document.querySelector(".popup-content");
        let target = event.target;
        if (target.classList.contains("popup-close")) {
            popupContent.style.left = "";
            popup.style.display = "none";
        } else {
            target = target.closest(".popup-content");
            if (!target) {
                popupContent.style.left = "";
                popup.style.display = "none";
            }
        }
    });
};
togglePopUp();

// Tabs

const tabs = () => {
    const tabHeader = document.querySelector(".service-header");
    const tab = tabHeader.querySelectorAll(".service-header-tab");
    const tabContent = document.querySelectorAll(".service-tab");
    const toggleTabContent = (index) => {
        for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
                tab[i].classList.add("active");
                tabContent[i].classList.remove("d-none");
            } else {
                tab[i].classList.remove("active");
                tabContent[i].classList.add("d-none");
            }
        }
    };
    tabHeader.addEventListener("click", (event) => {
        let target = event.target;
        target = target.closest(".service-header-tab");

        if (target) {
            tab.forEach((item, i) => {
                if (item === target) {
                    toggleTabContent(i);
                }
            });
        }
    });
};
tabs();
