(() => {
    const canvas = document.querySelector("canvas")
    const obscure = document.querySelector("div.obscure")

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    })
})()