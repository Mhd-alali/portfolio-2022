import gsap from 'gsap'
import { lerp } from './animation'
import plane from './webgl/plane/plane'
import sphere from './webgl/sphere/sphere'
const scrollArea = document.querySelector('.scrool-area')

document.body.style.height = `${scrollArea.getBoundingClientRect().height}px`

let update = () => { }
let resize = () => { }
const renderWebgl = innerWidth > 500

// to prevent rendering for mobile phones
const Load = async () => {
    if (renderWebgl) {
        var module = await import("./webgl");
        module.initExperience()
        update = module.update
        resize = module.resize
    }
}
Load()

//menu toggle 
let open = false
const navList = document.querySelector('nav ul')
if (innerWidth < 625) {
    gsap.set(navList, { autoAlpha: false, height: '0rem' })
}

document.querySelector('.toggler').addEventListener("click", () => {
    if (open) {
        gsap.to(navList, { duration: .5, autoAlpha: 0, ease: "power2.inOut" })
        gsap.to(navList, { duration: .5, height: '0rem', ease: "power2.inOut", delay: .4 })
        gsap.to(scrollArea, { paddingTop:"24rem" })
        open = false
    } else {
        gsap.to(navList, { duration: .5, height: 'auto', ease: "power2.inOut" })
        gsap.to(navList, { duration: .5, autoAlpha: 1, ease: "power2.inOut", delay: .4 })
        gsap.to(scrollArea, { paddingTop:"40rem" })
        open = true
    }
})
//theme toggle
let isDark = true
const dark = document.querySelector(".dark-toggler")
const light = document.querySelector(".light-toggler")
dark.addEventListener("click",()=>{
    document.documentElement.classList.add("dark")
    gsap.to(sphere.material.uniforms.uDark,{value:0.,duration:.75})
    gsap.to(plane.material.uniforms.uDark,{value:0.,duration:.75})
    isDark = true
})
light.addEventListener("click",()=>{
    document.documentElement.classList.remove("dark")
    gsap.to(sphere.material.uniforms.uDark,{value:1.,duration:.75})
    gsap.to(plane.material.uniforms.uDark,{value:1.,duration:.75})
    isDark = false
})

document.querySelector('.scroll').addEventListener("click", () => {
    window.scrollBy({top:innerHeight *.85})
})

addEventListener("resize", ()=>{
    resize()
    document.body.style.height = `${scrollArea.getBoundingClientRect().height}px`
})

let current = 0
const tick = () => {
    if (renderWebgl) update()
    current = lerp(current, -scrollY, .1)
    scrollArea.style.transform = `translate3d(0,${current}px,0)`
    requestAnimationFrame(tick)
}
tick()