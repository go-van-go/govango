import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Soft white ambient light
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
    75,
    2,
    0.1,
    1000
);
camera.position.set(1, 1, 1.7); // Place camera closer to the center of the mesh
camera.lookAt(0.5, 0.5, 0.5); // Aim the camera at the center of the mesh

const renderer = new THREE.WebGLRenderer();
// Modify this line to target a specific div by its id
const container = document.getElementById('three-js-container'); // Replace 'my-container' with the id of your div
container.appendChild(renderer.domElement);

const sizecontainer = document.getElementById('content');
renderer.setSize(sizecontainer.offsetWidth, sizecontainer.offsetHeight);
//renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x2e3440, 1); // Dark background (#2e3440)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new STLLoader();
loader.load(
    '../../public/media/gltf/simple-mesh.stl', // Update the path if necessary
    function (geometry) {
        const material = new THREE.MeshStandardMaterial({
            wireframe: true, // Enable wireframe
	    color: 0xd8dee9,
            wireframeLinewidth: 1, // Optional: Set the line width of the wireframe
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
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
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    //render();
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
