import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { Vector2 } from 'three';

const geometry = new THREE.IcosahedronGeometry(1, 32, 32);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uRandom: { value: (Math.random() - .5) * 2. * Math.PI },
        uWhite: { value: 0.4 },
        uDark: { value: true },
        uResolution:{value: new Vector2(innerWidth,innerHeight)}
    },
})
const sphere = new THREE.Mesh(geometry, material)
sphere.scale.set(innerHeight/3,innerHeight/3,innerHeight/3)
export default sphere