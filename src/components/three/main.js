import * as THREE from 'three';
import { vertexShader } from './shaders/vertex.js';
import { fragmentShader } from './shaders/fragment.js';

let scene, camera, renderer, mesh, uniforms;

export function initDisplacementSphere(container) {
  if (renderer) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.IcosahedronGeometry(1.3, 200);
  uniforms = {
    uTime: { value: 0 },
    uDisplacementStrength: { value: 0.57 },
    uNoiseStrength: { value: 0.1 },
    uFractAmount: { value: 4.0 },
    uSpeed: { value: 1.1 },
    uColor: { value: new THREE.Color('#af00ff') }
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(-2,2,3.5);
  scene.add(dirLight);

  window.addEventListener('resize', onWindowResize.bind(null, container));
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  uniforms.uTime.value = performance.now() * 0.001;
  mesh.rotation.y += 0.005;
  mesh.rotation.x += 0.002;
  renderer.render(scene, camera);
}

function onWindowResize(container) {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}
