import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const geometry = new THREE.PlaneGeometry(5,5);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uRandom: { value: (Math.random() - .5) * 2. * Math.PI },
        uDark: { value: true }
    },
})

const plane = new THREE.Mesh(geometry, material)

export default plane