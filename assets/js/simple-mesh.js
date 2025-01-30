import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Soft white ambient light
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(100, 2, 1, 1000);
//camera.position.set(0.4, 0.9, 0.9); // Place camera closer to the center of the mesh
camera.position.set(50,0,0); // Place camera closer to the center of the mesh
camera.lookAt(0, 0, 0); // Aim the camera at the center of the mesh

const renderer = new THREE.WebGLRenderer();
const container = document.getElementById('three-js-container');
container.appendChild(renderer.domElement);

const sizecontainer = document.getElementById('content');
renderer.setSize(sizecontainer.offsetWidth, sizecontainer.offsetHeight);
renderer.setClearColor(0x2e3440, 1); // Dark background (#2e3440)

// Enable shadows in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// Add a directional light to cast shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 20); // White light, intensity 1
directionalLight.position.set(50, 50, 100); // Position of the light
directionalLight.castShadow = true; // Enable shadow casting
scene.add(directionalLight);

// Set up light properties
directionalLight.shadow.mapSize.width = 1024;  // Shadow map resolution
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;

// Set up the camera for directional light to cast proper shadows
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;

const loader = new STLLoader();
loader.load(
  '/public/brain-mesh.stl', // Update the path if necessary
  function (geometry) {
    // Create material for mesh faces
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: 0x4c566a, // Mesh face color
      flatShading: true,
    });

    // Create the mesh
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    mesh.rotation.x = -Math.PI / 1.8;  // 90 degrees in radians
    mesh.position.y = -35;
    mesh.position.z = -10;
    scene.add(mesh);

    // Create wireframe geometry and material
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x2e3440, // Wireframe color (yellow)
      linewidth: 1, // Line width (may not work in all browsers)
    });

    // Create and add wireframe mesh
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      wireframeMaterial
    );
    // Rotate the mesh by 90 degrees along the X-axis
    wireframe.rotation.x = -Math.PI / 1.8;  // 90 degrees in radians
    wireframe.position.y = -35;
    wireframe.position.z = -10;
    //wireframe.rotation.y = -Math.PI / 2;  // 90 degrees in radians

    scene.add(wireframe);

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
}

function animate() {
  requestAnimationFrame(animate);
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

