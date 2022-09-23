import gsap from "gsap";

// to prevent rendering for mobile phones
const renderWebGL = innerWidth > 500
if (renderWebGL) {
    //TODO: fire this on resize
    var { initExperience, update } = await import("./webgl");
    initExperience()
}

const scollArea = document.querySelector('.scrool-area')

const tick = () => {
    if (renderWebGL) {
        update()
    }
    gsap.to(scollArea, { y: -scrollY })
    requestAnimationFrame(tick)
}
tick()