import './index.css'
import { lerp } from './animation'
const scollArea = document.querySelector('.scrool-area')
let update = () => { }

// to prevent rendering for mobile phones
const renderWebGL = innerWidth > 500
const Load = async () => {
    if (renderWebGL) {
        var module = await import("./webgl");
        module.initExperience()
        update = module.update
    }
}
Load()

document.querySelector('nav span').addEventListener("click",()=>{
    document.querySelector('nav ul').classList.toggle("hide")
})

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