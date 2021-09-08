const changeTeamPhotos = () => {
    const teamPhotos = document.querySelectorAll(".command__photo");

    teamPhotos.forEach((item) => {
        const src = item.getAttribute("src");
        item.addEventListener("mouseover", (event) => {
            event.target.src = item.dataset.img;
        });
        item.addEventListener("mouseleave", (event) => {
            event.target.src = src;
        });
    });
};

export default changeTeamPhotos;
