(() => {
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")

    let counter = 0

    function raf(t) {
        requestAnimationFrame(raf)

        const sliceHeight = canvas.height / 24

        const hue = Math.floor(Math.random() * 6) * 60

        ctx.fillStyle = `hsl(${hue}deg, 50%, 50%)`
        ctx.fillRect(
            0, sliceHeight * counter,
            canvas.width, sliceHeight
        )

        counter = (counter + 1) % 24
    }

    requestAnimationFrame(raf)
})()