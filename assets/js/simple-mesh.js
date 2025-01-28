import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Soft white ambient light
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
camera.position.set(0.4, 0.9, 0.9); // Place camera closer to the center of the mesh
camera.lookAt(0.9, 0, 0.5); // Aim the camera at the center of the mesh

const renderer = new THREE.WebGLRenderer();
const container = document.getElementById('three-js-container');
container.appendChild(renderer.domElement);

const sizecontainer = document.getElementById('content');
renderer.setSize(sizecontainer.offsetWidth, sizecontainer.offsetHeight);
renderer.setClearColor(0x2e3440, 1); // Dark background (#2e3440)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Variables for the swivel animation
let swivelAngle = 0; // Current rotation angle
let swivelSpeed = 0.005; // Slower speed
let swivelDirection = 1; // Direction of the swivel (1 = clockwise, -1 = counterclockwise)
let swivelCount = 0; // Count of completed swivels (one swivel = back and forth)
let maxSwivels = 0.8; // Maximum number of swivels
let loadedMesh = null; // To store the loaded STL mesh

const loader = new STLLoader();
loader.load(
  '/public/simple-mesh.stl', // Update the path if necessary
  function (geometry) {
    const material = new THREE.MeshStandardMaterial({
      wireframe: true, // Enable wireframe
      //color: 0xd8dee9,
      //color: 0xa3be8c,
      color: 0x8fbcbb,
      wireframeLinewidth: 1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Store the mesh for animation
    loadedMesh = mesh;
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  (error) => {
    console.error('Error loading STL file:', error);
  }
);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
//  camera.aspect = sizecontainer.offsetWidth / sizecontainer.offsetHeight;
//  camera.updateProjectionMatrix();
//  renderer.setSize(sizecontainer.offsetWidth, sizecontainer.offsetHeight);
//  render();
}

function animate() {
  requestAnimationFrame(animate);

  // Swivel animation logic
//  if (loadedMesh && swivelCount < maxSwivels) {
//    swivelAngle += swivelSpeed * swivelDirection;
//    if (swivelAngle > Math.PI / 16 || swivelAngle < -Math.PI / 16) { // Smaller rotation range
//      swivelDirection *= -1; // Reverse direction at limits
//      if (swivelDirection === 1) {
//        swivelCount++; // Count a full back-and-forth swivel
//      }
//    }
//    loadedMesh.rotation.y = swivelAngle; // Apply the swivel to the mesh
//  }

  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();

const canvas = renderer.domElement;
// Change the cursor to "grabbing" when the user interacts
canvas.addEventListener('mousedown', () => {
  canvas.style.cursor = 'grabbing';
});

// Reset the cursor when the user stops interacting
canvas.addEventListener('mouseup', () => {
  canvas.style.cursor = 'grab'; // Optional: You can use "default" or "grab" here
});
canvas.addEventListener('mouseout', () => {
  canvas.style.cursor = 'default'; // Reset if the mouse leaves the canvas
});
//canvas.addEventListener('mousemove', () => {
//  if (!controls.isDragging) {
//    canvas.style.cursor = 'grab'; // Indicate interactivity
//  }
//});
