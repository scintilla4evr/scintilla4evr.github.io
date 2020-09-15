(() => {
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")

    function raf(t) {
        requestAnimationFrame(raf)

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = "#dfff2c"
        ctx.lineWidth = 2

        ctx.beginPath()

        const time = t / 1000

        for (let i = 1; i < 20; i++) {
            const r = Math.abs(150 * Math.sin(i + time))

            ctx.arc(
                canvas.width / 2 + Math.sin(time ** 1.1 + i)**3 * 450,
                canvas.height / 2 + Math.cos(time ** 0.1 + i)**3 * 450,
                r,
                time + i,
                time / i
            )
        }

        ctx.stroke()
    }

    requestAnimationFrame(raf)
})()