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
countTimer("13 november 2021");

// Menu
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

// Slider

const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item");
    const slider = document.querySelector(".portfolio-content");
    const dots = document.querySelector(".portfolio-dots");

    let currentSlide = 0;
    let interval;

    const addPagination = () => {
        // Добавляем пагинацию
        for (let i = 0; i < slide.length; i++) {
            const dot = document.createElement("li");
            dot.classList.add("dot");
            if (i === 0) {
                dot.classList.add("dot-active");
            }
            dots.appendChild(dot);
        }
    };

    addPagination();

    const dot = document.querySelectorAll(".dot");
    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, "portfolio-item-active");
        prevSlide(dot, currentSlide, "dot-active");
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, "portfolio-item-active");
        nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener("click", (event) => {
        event.preventDefault();

        const target = event.target;
        if (!target.matches(".portfolio-btn, .dot")) {
            return;
        }
        prevSlide(slide, currentSlide, "portfolio-item-active");
        prevSlide(dot, currentSlide, "dot-active");

        if (target.matches("#arrow-right")) {
            currentSlide++;
        } else if (target.matches("#arrow-left")) {
            currentSlide--;
        } else if (target.matches(".dot")) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currentSlide = index;
                }
            });
        }
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide, "portfolio-item-active");
        nextSlide(dot, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", (event) => {
        if (event.target.matches(".portfolio-btn") || event.target.matches(".dot")) {
            stopSlide();
        }
    });

    slider.addEventListener("mouseout", (event) => {
        if (event.target.matches(".portfolio-btn") || event.target.matches(".dot")) {
            startSlide();
        }
    });

    startSlide(1500);
};
slider();

// Change command photos

const commandPhotos = document.querySelectorAll(".command__photo");

commandPhotos.forEach((item) => {
    const src = item.getAttribute("src");
    item.addEventListener("mouseover", (event) => {
        event.target.src = item.dataset.img;
    });
    item.addEventListener("mouseleave", (event) => {
        event.target.src = src;
    });
});

//Calculator

document.addEventListener(
    "input",
    (event) => {
        let target = event.target;
        if (target.matches(".calc-item")) {
            target.value = target.value.replace(/\D/g, "");
        }
        if (target.matches(".form-name, .form-message, .top-form, .mess")) {
            target.value = target.value.replace(/[^а-я\-\s]/gi, "");
        }
        if (target.matches(".form-email")) {
            target.value = target.value.replace(/[^a-z@_`\.\*\-!~]/gi, "");
        }
        if (target.matches(".form-phone")) {
            target.value = target.value.replace(/[^\d-()]/gi, "");
        }
    },
    { capture: true }
);

document.addEventListener(
    "blur",
    (event) => {
        let target = event.target;
        if (target.tagName === "INPUT") {
            target.value = target.value.replace(/^\s+/gi, ""); //удаляем пробелы в начале
            target.value = target.value.replace(/\s+$/gi, ""); //удаляем пробелы в концу
            target.value = target.value.replace(/\s+/gi, " "); //заменяем пробелы на один пробел
            target.value = target.value.replace(/^\-+/gi, ""); //удаляем дефисы в начале
            target.value = target.value.replace(/\-+$/gi, ""); //удаляем дефисы в конце
            target.value = target.value.replace(/\-+/gi, "-"); //заменяем дефисы на один
            target.value = target.value.replace(/[^@_`\.\*\-!~\w\d\[а-я]]/gi, ""); //удаляем все символы кроме допустимых
        }
        if (target.matches(".form-name, .top-form")) {
            target.value = target.value.replace(/([а-я])([а-я]+)/gi, (match, val1, val2) => {
                return val1.toUpperCase() + val2.toLowerCase();
            }); //приводим первый символ к верхнему регистру, остальные к нижнему
        }
    },
    { capture: true }
);
