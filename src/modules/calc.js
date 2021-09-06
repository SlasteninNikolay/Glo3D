const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block");
    const calcType = document.querySelector(".calc-type");
    const calcSquare = document.querySelector(".calc-square");
    const calcDay = document.querySelector(".calc-day");
    const calcCount = document.querySelector(".calc-count");
    const totalValue = document.getElementById("total");

    let total = 0;
    const countSum = () => {
        let countValue = 1;
        let dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value;
        const squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
        }

        animTotal(total);
    };

    let id;
    function animTotal(total) {
        //анимация подсчета итоговой суммы
        let count = 0;
        if (total > 0) {
            id = setInterval(() => {
                count += 100;
                totalValue.textContent = count;
                if (count >= total) {
                    clearInterval(id);
                    totalValue.textContent = total;
                }
            }, 1);
        }
    }

    calcBlock.addEventListener("change", (event) => {
        const target = event.target;
        if (target.matches("select") || target.matches("input")) {
            total = 0;
            totalValue.textContent = 0;
            clearInterval(id);
            countSum();
        }
    });
};

export default calc;
