(() => {
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")

    function raf(t) {
        requestAnimationFrame(raf)

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = "#dfff2c"

        ctx.beginPath()

        const time = t / 1000

        for (let i = 1; i < 20; i++) {
            const r = (i / 20) * Math.max(canvas.width, canvas.height) / 2

            ctx.arc(
                canvas.width / 2, canvas.height / 2,
                r,
                time + i,
                2 * time - i
            )
        }

        ctx.stroke()
    }

    requestAnimationFrame(raf)
})()