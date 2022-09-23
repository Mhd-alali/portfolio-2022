uniform float uTime;

varying vec2 vUv;
varying float vNoise;
varying vec3 vPosition;



void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    vUv = uv;
    vPosition = position;
}