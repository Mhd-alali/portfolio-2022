import * as THREE from 'three'
import gsap from 'gsap';
import sphere  from './sphere/sphere';
import plane  from './plane/plane';
import useIntersectionObserver from '../animation/intersectionObserver'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

let camera = null
let renderer = null

export function initExperience() {
    /**
     * Event Handlers
     */
    window.addEventListener('resize', () => {
        if (innerWidth < 425) {
            sphere.scale.set(.8, .8, .8)
        }
        else {
            sphere.scale.set(1, 1, 1)
        }

        camera.aspect = innerWidth / innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(innerWidth, innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    
    window.addEventListener('mousemove', (args) => {
        const x = ((args.clientY / innerHeight - .5))
        const y = ((args.clientX / innerWidth - .5))
        gsap.to(sphere.rotation, { y })
        gsap.to(sphere.rotation, { x })
    })
    useIntersectionObserver({element:document.querySelector("h1"),threshold:.3},
    ()=>{
        gsap.to(sphere.scale, {x:1,y:1,z:1,ease:"power2.inOut",duration:1})
        gsap.to(sphere.position, {x:0,y:0,z:0,ease:"power2.inOut",duration:1})
    },
    ()=>{
        gsap.to(sphere.scale, {x:.2,y:.2,z:.2,ease:"power2.inOut",duration:1,})
        gsap.to(sphere.position, {y:.45,ease:"power2.inOut",duration:1,})
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