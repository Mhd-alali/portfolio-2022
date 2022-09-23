import './index.scss'
const scollArea = document.querySelector('.scrool-area')

// to prevent rendering for mobile phones
let update = () => { }
const renderWebGL = innerWidth > 500
const Load = async () => {
    if (renderWebGL) {
        var module = await import("./webgl");
        module.initExperience()
        update = module.update
    }
}
Load()

const lerp = (start, end, t) => {
    return start * (1 - t) + end * t
}
let current = 0
const tick = () => {
    if (renderWebGL) {
        update()
    }
    current = lerp(current,-scrollY,.1)
    scollArea.style.transform = `translate3d(0,${current}px,0)`
    requestAnimationFrame(tick)
}
tick()