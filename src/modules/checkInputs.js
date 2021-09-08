const checkInputs = () => {
    document.body.addEventListener(
        "input",
        (event) => {
            const target = event.target;
            if (target.matches(".calc-item")) {
                target.value = target.value.replace(/[^\d\.]/g, "");
            }
        },
        { capture: true }
    );

    document.body.addEventListener(
        "blur",
        (event) => {
            const target = event.target;
            if (target.tagName === "INPUT") {
                target.value = target.value.replace(/^\s+/gi, ""); //удаляем пробелы в начале
                target.value = target.value.replace(/\s+$/i, ""); //удаляем пробелы в конце
                target.value = target.value.replace(/\s+/gi, " "); //заменяем пробелы на один пробел
                target.value = target.value.replace(/^-+/gi, ""); //удаляем дефисы в начале
                target.value = target.value.replace(/-+$/gi, ""); //удаляем дефисы в конце
                target.value = target.value.replace(/-+/gi, "-"); //заменяем дефисы на один
                target.value = target.value.replace(/[^@_`\.*\-!~\w\d\s[а-яё]/gi, ""); //удаляем все символы кроме допустимых
            }
            if (target.matches(".form-name") || target.matches("#form2-name")) {
                target.value = target.value.replace(
                    /([а-я])([а-я]+)/gi,
                    (match, val1, val2) => val1.toUpperCase() + val2.toLowerCase()
                ); //приводим первый символ к верхнему регистру, остальные к нижнему
            }
        },
        { capture: true }
    );
};

export default checkInputs;
