uniform sampler2D uTexture;
uniform vec2 uOffset;
uniform float uAlpha;
varying vec2 vUv;

vec3 rgbShift(sampler2D Texture,vec2 uv, vec2 Offset){
  float r = texture2D(Texture,uv + Offset).r;
  vec2 gb = texture2D(Texture,uv).gb;
  return vec3(r,gb);
}

void main() {
  vec3 color = rgbShift(uTexture,vUv,uOffset);
  gl_FragColor = vec4(color,uAlpha);
}