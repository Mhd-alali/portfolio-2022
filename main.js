import gsap from "gsap";
import {initExperience,update} from "./webgl";

const scollArea = document.querySelector('.scrool-area')

initExperience()

const tick = ()=>{
    update()
    gsap.to(scollArea, { y: -scrollY })
    requestAnimationFrame(tick)
}
tick()