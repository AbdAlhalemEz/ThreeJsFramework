import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const moveSpeed = 0.1;
const rotateSpeed = 0.05;

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
camera.position.set(0, 5, 10);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 3); // soft white light
scene.add(ambientLight);



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


loader.load('/models/switch/scene.gltf', function (gltf) {
  // Add loaded model to the scene
  const model = gltf.scene;
  const modelName = "switch"; // Set the name of the model
  model.userData.name = "switch";
  model.userData.isLocked = false; // Initially unlocked

  

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

  model.position.set(0.00, -0.00, 0.00);
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
  model.position.set(1.90, -0.00, 0.00);
  model.rotation.set(0.00, -0.65, 0.00);
  model.scale.set(0.18, 0.18, 0.18);
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
  const clickableModels = models.map(model => model.children[0]); // Assuming the models are directly added to the scene as children
  

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableModels, true);

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
  if (event.key === 'i') {
    const instructions = `
    Instructions:
    - Press 'I' to open instructions.
    - Press 'O' to display all models to choose one to control.
    - OR
    - Click on a model to select it.
    - Use arrow keys to move the selected model on X and Y axis.
    - Use 'w', 's' to move along the z-axis.
    - Use 'a', 'd' to rotate the selected model on its Y-axis.
    - Use 'q', 'e' to rotate the selected model on its Z-axis.
    - Use 'r', 'f' to rotate the selected model on its X-axis.
    - Use '4', '5', '6' to scale up along x, y, z-axis.
    - Use '1', '2', '3' to scale down along x, y, z-axis.
    - Use '+' and '-' to uniformly scale up/down.
    - Press 'L' to lock/unlock the selected model.
    `;
    alert(instructions);
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



// Function to display model names
function displayModelNames() {
  // Clear any existing model name display
  const modelNameDiv = document.getElementById('modelNames');
  if (modelNameDiv) {
    modelNameDiv.remove();
  }

  // Create a div to display model names
  const div = document.createElement('div');
  div.id = 'modelNames';
  div.style.position = 'absolute';
  div.style.top = '10px';
  div.style.left = '10px';
  div.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  div.style.padding = '10px';
  div.style.borderRadius = '5px';
  div.style.zIndex = '1000';

  // Add each model's name as a clickable element
  models.forEach((model, index) => {
    const modelName = model.userData.name;
    const modelNameElement = document.createElement('div');
    modelNameElement.textContent = modelName;
    modelNameElement.style.cursor = 'pointer';
    modelNameElement.style.marginBottom = '5px';
    modelNameElement.addEventListener('click', () => {
      // Deselect previously selected model
      if (selectedModel) {
        selectedModel = null;
        // Remove highlight from previously selected model name
        const prevSelectedNameElement = div.children[selectedModelIndex];
        prevSelectedNameElement.style.fontWeight = 'normal';
      }
      // Select the clicked model
      selectedModel = model;
      selectedModelIndex = index;
      // Highlight the selected model name
      modelNameElement.style.fontWeight = 'bold';
    });
    div.appendChild(modelNameElement);
  });

  // Append the div to the document body
  document.body.appendChild(div);
}

let selectedModelIndex = null; // Keep track of the index of the selected model name

// Event listener for 'o' key to display model names
document.addEventListener('keydown', (event) => {
  if (event.key === 'o') {
    displayModelNames();
  }
});


// Function to update camera aspect ratio and renderer size
function updateWindowSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update renderer size
  renderer.setSize(width, height);

  // Update camera aspect ratio
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// Event listener for window resize
window.addEventListener('resize', () => {
  updateWindowSize();
});

// Initial call to set up camera aspect ratio and renderer size
updateWindowSize();





// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  renderer.render(scene, camera);
}

animate();
