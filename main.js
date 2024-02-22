import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const moveSpeed = 0.1;
const rotateSpeed = 0.05;

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(ambientLight);

// Add grid helper
const gridHelper = new THREE.GridHelper(10, 10); // size, divisions
scene.add(gridHelper);

// Load GLTF models
const loader = new GLTFLoader();

// An array to keep track of models
const models = [];

loader.load('/models/frame/scene.gltf', function (gltf) {
  // Add loaded model to the scene
  const model = gltf.scene;
  const modelName = "frame"; // Set the name of the model
  model.userData.name = "frame";
  model.userData.isLocked = false; // Initially unlocked
  model.position.set(-4.50, 3.70, -0.40);
  model.rotation.set(1.68, 1.32, -1.69);
  model.scale.set(0.79, 0.79, 0.79);
  

  model.traverse((child) => {
    if (child.isMesh) {
      child.userData.name = modelName; // Assign the name to the mesh
      child.userData.model = model; // Assign a reference to the model to each mesh
    }
  });
  models.push(model);
  scene.add(model);
});


loader.load('/models/room/scene.gltf', function (gltf) {
  // Add loaded model to the scene
  const model = gltf.scene;
  const modelName = "room"; // Set the name of the model
  model.userData.name = "room";
  model.userData.isLocked = false; // Initially unlocked

 model.position.set(0.00, 2.40, 0.00);
  model.rotation.set(0.00, 0.00, 0.00);
  model.scale.set(2.85, 2.85, 2.85);
  model.traverse((child) => {
    if (child.isMesh) {
      child.userData.name = modelName; // Assign the name to the mesh
      child.userData.model = model; // Assign a reference to the model to each mesh
    }
  });
  models.push(model);
  scene.add(model);
});

loader.load('/models/meat/scene.gltf', function (gltf) {
  // Add loaded model to the scene
  const model = gltf.scene;
  const modelName = "meat"; // Set the name of the model
  model.userData.name = "meat";
  model.userData.isLocked = false; // Initially unlocked
  model.position.set(1.90, 2.40, 0.00)
  model.rotation.set(0.00, -0.65, 0.00)
  model.scale.set(0.18, 0.18, 0.18)
  model.traverse((child) => {
    if (child.isMesh) {
      child.userData.name = modelName; // Assign the name to the mesh
      child.userData.model = model; // Assign a reference to the model to each mesh
    }
  });
  models.push(model);
  scene.add(model);
});

let selectedModel = null;

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Event listener for mouse clicks
document.addEventListener('click', (event) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    // Check if the object or its parent has a reference to the model
    const clickedModel = clickedObject.userData.model || clickedObject.parent.userData.model;
    if (clickedModel) {
      selectedModel = clickedModel;
      const lockStatus = selectedModel.userData.isLocked ? "Locked" : "Unlocked";
      alert(`Model selected: ${selectedModel.userData.name}\nLock Status: ${lockStatus}`);
    }
  }

});

// Event listener for keyboard inputs
document.addEventListener('keydown', (event) => {
  if (event.key === 'l') {
    if (selectedModel) {
      selectedModel.userData.isLocked = !selectedModel.userData.isLocked; // Toggle the lock state of the selected model
      const lockStatus = selectedModel.userData.isLocked ? "Locked" : "Unlocked";
      alert(`Model ${selectedModel.userData.name} is now ${lockStatus}.`);
    }
  }
  if (!selectedModel || selectedModel.userData.isLocked) return;

  switch (event.key) {
    case '4':
      selectedModel.scale.x *= 1.1; // Scale up along the x-axis
      break;
    case '5':
      selectedModel.scale.y *= 1.1; // Scale up along the y-axis
      break;
    case '6':
      selectedModel.scale.z *= 1.1; // Scale up along the z-axis
      break;
    case '1':
      selectedModel.scale.x *= 0.9; // Scale down along the x-axis
      break;
    case '2':
      selectedModel.scale.y *= 0.9; // Scale down along the y-axis
      break;
    case '3':
      selectedModel.scale.z *= 0.9; // Scale down along the z-axis
      break;
    case '-':
      selectedModel.scale.multiplyScalar(0.9); // Uniform scale down
      break;
    case '+':
      selectedModel.scale.multiplyScalar(1.1); // Uniform scale up
      break;
  
    case 'ArrowUp':
      selectedModel.position.y += moveSpeed;
      break;
    case 'ArrowDown':
      selectedModel.position.y -= moveSpeed;
      break;
    case 'ArrowLeft':
      selectedModel.position.x -= moveSpeed;
      break;
    case 'ArrowRight':
      selectedModel.position.x += moveSpeed;
      break;
    case 'w':
      selectedModel.position.z -= moveSpeed; // Move along negative z-axis
      break;
    case 's':
      selectedModel.position.z += moveSpeed; // Move along positive z-axis
      break;
    case 'a':
      selectedModel.rotateY(rotateSpeed);
      break;
    case 'd':
      selectedModel.rotateY(-rotateSpeed);
      break;
    case 'q':
      selectedModel.rotateZ(rotateSpeed);
      break;
    case 'e':
      selectedModel.rotateZ(-rotateSpeed);
      break;
    case 'r':
      selectedModel.rotateX(rotateSpeed);
      break;
    case 'f':
      selectedModel.rotateX(-rotateSpeed);
      break;
  }
});




// Event listener for keyboard inputs
document.addEventListener('keydown', (event) => {
  if (event.key === 'p') {
    console.log('Copy the following position, rotations, and scale to set it to the models in your code:');
    const printedModels = new Set(); // To keep track of printed models

    scene.traverse((child) => {
      if (child.userData.model && child.userData.name && !printedModels.has(child.userData.name)) {
        const model = child.userData.model;
        console.log(`Model: ${child.userData.name}`);
        console.log(`model.position.set(${model.position.x.toFixed(2)}, ${model.position.y.toFixed(2)}, ${model.position.z.toFixed(2)});`);
        console.log(`model.rotation.set(${model.rotation.x.toFixed(2)}, ${model.rotation.y.toFixed(2)}, ${model.rotation.z.toFixed(2)});`);
        console.log(`model.scale.set(${model.scale.x.toFixed(2)}, ${model.scale.y.toFixed(2)}, ${model.scale.z.toFixed(2)});`);
        console.log('----------------------');

        printedModels.add(child.userData.name);
      }
    });
  }
});






// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  renderer.render(scene, camera);
}

animate();
