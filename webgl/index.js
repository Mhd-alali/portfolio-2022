import * as THREE from 'three'
import gsap from 'gsap';
import sphere from './sphere/sphere';
import plane from './plane/plane';
import image from './image/image';
import { useIntersectionObserver,lerp } from '../animation';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

let camera = null
let renderer = null

export function initExperience() {
    window.addEventListener('mousemove', (args) => {
        const x = ((args.clientY / innerHeight - .5))
        const y = ((args.clientX / innerWidth - .5))
        gsap.to(sphere.rotation, { y })
        gsap.to(sphere.rotation, { x })
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

/**
 * mouse move
 */
let target = {x:0,y:0}
export const mousemove = (eve)=>{
    target.x = eve.clientX
    target.y = eve.clientY
}

/**
 * update
 */

const projectList = document.querySelector(".projects ul");
const projects = [...document.querySelectorAll(".projects ul li")];
let linksHover = false
projectList.addEventListener('mouseenter', () => {
    linksHover = true
})
projectList.addEventListener('mouseleave', () => {
    linksHover = false
})
const clock = new THREE.Clock()
let offsetX = 0
let offsetY = 0
export const update = () => {
    const elapsedTime = clock.getElapsedTime()
    sphere.material.uniforms.uTime.value = elapsedTime;
    plane.material.uniforms.uTime.value = elapsedTime;
    if (linksHover) {
        gsap.to(image.material.uniforms.uAlpha, {value : 1.})
    }else{
        gsap.to(image.material.uniforms.uAlpha, {value : 0.})
    }

    offsetX = lerp(offsetX,target.x,0.1)
    offsetY = lerp(offsetY,target.y,0.1)
    image.material.uniforms.uOffset.value.set((target.x - offsetX) * 0.0005,- (target.y - offsetY) * 0.0005)
    image.position.set(offsetX - (innerWidth / 2)  , -offsetY + (innerHeight / 2), 0);

    for (let i = 0; i < projects.length; i++) {
        if (linksHover) {
            projects[i].style.opacity = 0.2
        }else{
            projects[i].style.opacity = 1
        }
    }

    renderer.render(scene, camera)
}


/**
 * resize
 */
export const resize = () => {
    camera.aspect = innerWidth / innerHeight
    camera.fov = 2.*Math.atan((innerHeight/2)/600) * (180/Math.PI)
    camera.updateProjectionMatrix()

    plane.scale.set(innerWidth,innerHeight,0)
    sphere.scale.set(innerHeight/3,innerHeight/3,innerHeight/3)

    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}