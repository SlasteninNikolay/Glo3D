const validator = () => {
    document.addEventListener("input", (event) => {
        const pattern = {
            phone: /^\+?[78]([-()]*\d){10}$/,
            name: /^[а-яё\s]+$/gi,
            message: /^[а-яё\s\d\.!,;\-:]+$/gi,
        };
        const target = event.target;
        const value = target.value;

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
                unblockSubmit(input);
                showSuccess(input);
            } else {
                showError(input);
                blockSubmit(input);
            }
        };

        if (target.matches(".form-phone")) {
            checkIt(value, pattern.phone, target);
        }
        if (target.matches(".form-name, #form2-name")) {
            checkIt(value, pattern.name, target);
        }
        if (target.matches(".mess")) {
            checkIt(value, pattern.message, target);
        }
    });
};

export default validator;
