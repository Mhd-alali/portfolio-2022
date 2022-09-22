import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const geometry = new THREE.IcosahedronGeometry(.9, 32, 32);
const outerMaterial = new THREE.ShaderMaterial({
     vertexShader,
     fragmentShader,
     uniforms: {
         uTime: { value: 0.0 },
         uRandom: { value: Math.random() * 20 },
         uWhite: { value: 30 }
     },
 })
const sphere = new THREE.Mesh(geometry, outerMaterial)

export default sphere 