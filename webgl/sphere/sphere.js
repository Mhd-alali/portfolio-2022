import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const geometry = new THREE.IcosahedronGeometry(.45, 32, 32);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uRandom: { value: (Math.random() - .5) * 2. * Math.PI },
        uWhite: { value: 0.4 }
    },
})

const sphere = new THREE.Mesh(geometry, material)
sphere.position.y = - 0.075
export default sphere