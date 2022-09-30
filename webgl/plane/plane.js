import * as THREE from 'three'
import vertexShader from '../vertex.glsl'
import fragmentShader from './fragment.glsl'

const geometry = new THREE.PlaneGeometry(1 ,1);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uRandom: { value: (Math.random() - .5) * 2. * Math.PI },
        uDark: { value: 0. }
    },
})
const plane = new THREE.Mesh(geometry, material)
plane.scale.set(innerWidth,innerHeight,0)
plane.position.z = -2

export default plane