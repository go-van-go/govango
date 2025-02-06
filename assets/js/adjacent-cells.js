import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Camera setup
const camera = new THREE.PerspectiveCamera(50, 2, 0.1, 1000);
camera.position.set(-0.6, 1, 2.5);
camera.lookAt(0, 0, 0);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
const container = document.getElementById('three-js-container');
container.appendChild(renderer.domElement);

const sizecontainer = document.getElementById('content');
renderer.setSize(sizecontainer.offsetWidth, sizecontainer.offsetHeight);
renderer.setClearColor(0x2e3440, 1);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Load GLTF Model with wireframe while preserving original colors
const loader = new GLTFLoader();
loader.load(
  '/public/adjacent-cells.gltf',
  function (gltf) {
    const model = gltf.scene;
    model.traverse((child) => {
      if (child.isMesh) {
        const originalMaterial = child.material.clone();
        originalMaterial.wireframe = true;
        child.material = originalMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    model.position.set(-0.2, -0.2, 0);
    scene.add(model);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  (error) => {
    console.error('Error loading GLTF file:', error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Cursor interaction effects
const canvas = renderer.domElement;
canvas.addEventListener('mousedown', () => (canvas.style.cursor = 'grabbing'));
canvas.addEventListener('mouseup', () => (canvas.style.cursor = 'grab'));
canvas.addEventListener('mouseout', () => (canvas.style.cursor = 'default'));
