const scroll = () => {
    const scrollBtn = document.querySelector('a[href="#service-block"]');

    document.body.addEventListener("click", (e) => {
        const target = e.target;
        if (target.matches("menu li a")) {
            e.preventDefault();
            const id = target.getAttribute("href");
            document.querySelector(id).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });

    scrollBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = scrollBtn.getAttribute("href");
        document.querySelector(id).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
};

export default scroll;
