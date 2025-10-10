#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
uniform float time;

varying vec2 vUv;
varying float noise;

void main() {
  vec3 color = vec3(vUv * (0.2 - 2.0 * noise), 1.0);
  vec3 finalColors = vec3(color.b * 1.5, color.r, color.r);
  vec4 diffuseColor = vec4(cos(finalColors * noise * 3.0), 1.0);
  
  gl_FragColor = vec4(diffuseColor.rgb, diffuseColor.a);
}
