import * as THREE from 'three'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

const geometry = new THREE.PlaneGeometry(1, 1,20,20);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent:true,
    uniforms: {
        uAlpha: { value: 0. },
        uTexture: { value: new THREE.TextureLoader().load('images/texture.jpg')},
        uOffset: { value:new THREE.Vector2(0,0)},
    },
})
const image = new THREE.Mesh(geometry, material)
image.scale.set(250,300, 0)

export default image