(() => {
    const canvas = document.querySelector("canvas")
    const obscure = document.querySelector("div.obscure")

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    })

    window.addEventListener("devicemotion", (e) => {
        if (e.accelerationIncludingGravity.z === null) return

        window.tilt = Math.min(
            Math.abs(e.accelerationIncludingGravity.z + 9.81) / 9.81, 1
        )

        obscure.style.opacity = 0
    })
})()