# Three.js Model Viewer

This project is a simple web-based viewer for 3D models using Three.js. It allows users to load GLTF models and interact with them in a web browser. The viewer provides functionalities such as model manipulation (move, rotate, scale), model locking, and model information display.

## Features

- Load GLTF models into the viewer.

loader.load('path/to/your/model.gltf', function (gltf) {
  // Add loaded model to the scene
  const model = gltf.scene;
  const modelName = "modelName"; // Set the name of the model
  model.userData.name = "modelName";
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

- Interact with models using mouse clicks and keyboard inputs.
- Manipulate models by moving, rotating, and scaling them.
- Lock/unlock models to prevent accidental changes.
- Display model information, including position, rotation, and scale.
- Instructions for using the viewer.

## Demo

You can access a live demo of the model viewer [here](link-to-demo).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/three-js-model-viewer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd three-js-model-viewer
   ```

3. Start the development server using Vite:

   ```bash
   npx vite
   ```

4. Open your web browser and go to the URL provided by Vite, typically `http://localhost:3000`.

## Usage

- Click on a model to select it.
- Use arrow keys to move the selected model on the X and Y axes.
- Use 'w' and 's' to move along the Z-axis.
- Use 'a' and 'd' to rotate the selected model on its Y-axis.
- Use 'q' and 'e' to rotate the selected model on its Z-axis.
- Use 'r' and 'f' to rotate the selected model on its X-axis.
- Use '4', '5', '6' to scale up along X, Y, Z axes respectively.
- Use '1', '2', '3' to scale down along X, Y, Z axes respectively.
- Use '+' and '-' to uniformly scale up/down.
- Press 'L' to lock/unlock the selected model.
- Press 'I' to open instructions.
- Press 'O' to display all models to choose one to control.
- Press 'P' to show positions, rotations, and scales of all models for copying into the code.


##  Demo
![Demo](https://github.com/AbdAlhalemEz/ThreeJsFramework/blob/main/demo.gif)
## Dependencies

- [Three.js](https://threejs.org/): A lightweight 3D library for rendering WebGL scenes.
- [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader): A loader for GLTF (GL Transmission Format) files.
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls): A control to orbit around a target.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.
