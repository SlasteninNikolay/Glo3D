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

export default togglePopUp;
