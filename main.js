import gsap from "gsap";
import {initExperience,update} from "./webgl";

// to prevent rendering for mobile phones
const renderWebGL = innerWidth > 500
if (renderWebGL) {
    initExperience()
}

const scollArea = document.querySelector('.scrool-area')

const tick = ()=>{
    if (renderWebGL) {
        update()
    }
    gsap.to(scollArea, { y: -scrollY })
    requestAnimationFrame(tick)
}
tick()