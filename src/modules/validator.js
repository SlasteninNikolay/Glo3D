const validator = () => {
    const pattern = {
        phone: /^\+?[78]([-()]*\d){10}$/,
        name: /^[а-яё\s?]+$/i,
        message: /^[а-яё\s\-]+$/i,
        email: /^[\w\-\.!~\*`]+@[\w\-\.!~\*`]+\.\w{2,}$/,
    };

    const errors = new Set();

    const isValid = (number, rule) => rule.test(number);

    const showSuccess = (input) => {
        input.style.border = "2px solid green";
    };

    const showError = (input) => {
        input.style.border = "2px solid red";
    };

    const blockSubmit = (input) => {
        const form = input.closest("form");
        const btn = form.querySelector("button");
        btn.disabled = true;
    };

    const unblockSubmit = (input) => {
        const form = input.closest("form");
        const btn = form.querySelector("button");
        btn.disabled = false;
    };

    const checkIt = (number, pattern, input) => {
        if (isValid(number, pattern)) {
            showSuccess(input);
            errors.delete(input);
        } else {
            showError(input);
            errors.add(input);
            blockSubmit(input);
        }

        if (errors.size === 0) {
            unblockSubmit(input);
        }
    };
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
        form.addEventListener("click", (event) => {
            const target = event.target;
            if (target.tagName === "BUTTON") {
                [...form.elements].forEach((elem) => {
                    if (elem.value.trim() === "" && elem.tagName === "INPUT") {
                        showError(elem);
                        errors.add(elem);
                        blockSubmit(elem);
                    }
                });
            }
            if (target.tagName !== "BUTTON") {
                [...form.elements].forEach((elem) => {
                    if (elem.tagName === "INPUT") {
                        elem.style.border = "";
                    }
                });
            }
        });
    });

    document.body.addEventListener("input", (event) => {
        const target = event.target;
        const value = target.value;

        if (target.matches(".form-phone")) {
            checkIt(value, pattern.phone, target);
        }
        if (target.matches(".form-name, #form2-name")) {
            checkIt(value, pattern.name, target);
        }
        if (target.matches(".form-email")) {
            checkIt(value, pattern.email, target);
        }
        if (target.matches(".mess")) {
            checkIt(value, pattern.message, target);
        }
    });
};
export default validator;
