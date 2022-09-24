import * as THREE from 'three'
import gsap from 'gsap';
import sphere  from './sphere/sphere';
import plane  from './plane/plane';
import {useIntersectionObserver} from '../animation'
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

let camera = null
let renderer = null

export function initExperience() {
    /**
     * Event Handlers
     */
    window.addEventListener('resize', () => {
        camera.aspect = innerWidth / innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(innerWidth, innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    
    window.addEventListener('mousemove', (args) => {
        const x = ((args.clientY / innerHeight - .5)) * innerWidth / innerHeight
        const y = ((args.clientX / innerWidth - .5))
        gsap.to(sphere.rotation, { y })
        gsap.to(sphere.rotation, { x })
    })
    useIntersectionObserver({element:document.querySelector("h1"),threshold:.3},
    ()=>{
        gsap.to(sphere.scale, {x:1,y:1,z:1,ease:"power2.inOut",duration:1})
        gsap.to(sphere.position, {x:0,y:-.075,z:0,ease:"power2.inOut",duration:1})
        gsap.to(sphere.material.uniforms.uWhite, {value:0.3,duration:1,ease:"power2.inOut"})
    },
    ()=>{
        const y = innerHeight > 900 ?0.04:0
        gsap.to(sphere.scale, {x:.1,y:.1,z:.1,ease:"power2.inOut",duration:1,})
        gsap.to(sphere.position, {y:y+.5,ease:"power2.inOut",duration:1,})
        gsap.to(sphere.material.uniforms.uWhite, {value:.75,duration:1,ease:"power2.inOut"})
    }
    )

    /**
     * camera set
     */
    camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 100)
    camera.position.z = 2

    /**
     * adding all the objects
     */
    scene.add(camera,sphere,plane)

    /**
     * Renderer
     */
    renderer = new THREE.WebGLRenderer({canvas,alpha: true})
    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

const clock = new THREE.Clock()
export const update = () => {
    const elapsedTime = clock.getElapsedTime()
    sphere.material.uniforms.uTime.value = elapsedTime;
    plane.material.uniforms.uTime.value = elapsedTime;
    renderer.render(scene, camera)
}