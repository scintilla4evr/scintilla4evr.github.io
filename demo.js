(() => {
    const canvas = document.querySelector("canvas")

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    })
})()