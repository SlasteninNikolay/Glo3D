const sendForm = () => {
    const errorMessage = "Что-то пошло не так...";
    const loadMessage = "Загрузка...";
    const successMessage = "Спасибо! Мы скоро с вами свяжемся!";

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem; color: #fff;";

    const clearData = () => {
        const forms = document.querySelectorAll("form");
        forms.forEach((item) => {
            [...item.elements].forEach((element) => {
                if (element.tagName === "INPUT") {
                    element.value = "";
                    element.style.border = "";
                }
            });
        });
    };

    const postData = (body) => {
        return fetch("./server.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    };

    document.addEventListener("submit", (event) => {
        const target = event.target;
        event.preventDefault();
        target.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(target);
        const body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("status network is not 200");
                }
                statusMessage.textContent = successMessage;
                clearData();
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
                clearData();
            });
    });
};

export default sendForm;
