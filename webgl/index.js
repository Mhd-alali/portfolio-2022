import * as THREE from 'three'
import gsap from 'gsap';
import sphere from './sphere/sphere';
import plane from './plane/plane';
import image from './image/image';
import { useIntersectionObserver } from '../animation'
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

let camera = null
let renderer = null

export function initExperience() {
    window.addEventListener('mousemove', (args) => {
        const x = ((args.clientY / innerHeight - .5))
        const y = ((args.clientX / innerWidth - .5))
        gsap.to(sphere.rotation, { y ,delay:.05})
        gsap.to(sphere.rotation, { x ,delay:.05})
    })
    useIntersectionObserver({ element: document.querySelector(".hero"), threshold: .7},
        () => {
            gsap.to(sphere.scale, { x: innerHeight/3, y: innerHeight/3, z: innerHeight/3, ease: "power2.inOut", duration: 1 })
            gsap.to(sphere.position, { x: 0, y: 0, z: 0, ease: "power2.inOut", duration: 1 })
            gsap.to(sphere.material.uniforms.uWhite, { value: 0.3, duration: 1, ease: "power2.inOut" })
        },
        () => {
            gsap.to(sphere.scale, { x:  innerHeight*.05, y:  innerHeight*.05, z:  innerHeight*.05, ease: "power2.inOut", duration: 1, })
            gsap.to(sphere.position, { y: innerHeight * .38 , ease: "power2.inOut", duration: 1, })
            gsap.to(sphere.material.uniforms.uWhite, { value: .75, duration: 1, ease: "power2.inOut" })
        }
    )

    /**
     * camera set
     */
    const perspective = 600
    const fov = 2.*Math.atan((innerHeight/2)/perspective) * (180/Math.PI)
    camera = new THREE.PerspectiveCamera(fov, innerWidth / innerHeight, 0.1, perspective * 2.)
    camera.position.z = perspective

    /**
     * adding all the objects
     */
    scene.add(camera, sphere, plane,image)

    /**
     * Renderer
     */
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
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

export const resize = () => {
    camera.aspect = innerWidth / innerHeight
    camera.fov = 2.*Math.atan((innerHeight/2)/600) * (180/Math.PI)
    camera.updateProjectionMatrix()

    plane.scale.set(innerWidth,innerHeight,0)
    sphere.scale.set(innerHeight/3,innerHeight/3,innerHeight/3)

    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}