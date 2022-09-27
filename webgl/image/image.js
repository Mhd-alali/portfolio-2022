import * as THREE from 'three'
import vertexShader from '../vertex.glsl'
import fragmentShader from './fragment.glsl'

const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uAlpha: { value: 1. },
        uTexture: { value: new THREE.TextureLoader().load('images/texture.jpg')},
    },
})
const image = new THREE.Mesh(geometry, material)
image.scale.set(250,300, 0)

export default image