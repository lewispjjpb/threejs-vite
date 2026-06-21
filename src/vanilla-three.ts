import * as THREE from 'three';
import { createCube } from './components/floating-box';
import { mainCamera } from './camera/main-camera';
import { PlayerShip } from './components/player-ship';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GeometryPlane } from './components/geometry-plane';

const floorWidth = 100;
const floorLength = 100;

async function main(): Promise<void> {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const cube = createCube(); // Create the cube without initial rotation
  const mCamera = mainCamera(undefined, cube);
  scene.add(cube);

  const playerShip = await PlayerShip.initializePlayerShip();
  scene.add(playerShip.gltf.scene);

  const geometryPlane = new GeometryPlane(
    floorWidth,
    floorLength,
    -Math.PI / 2
  );
  scene.add(geometryPlane.plane);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Ambient light for general illumination
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Directional light for texture highlights
  directionalLight.position.set(10, 20, 10); // Position outside the plane
  // directionalLight.target.position.set(10, 10, 10);

  scene.add(directionalLight);
  scene.add(directionalLight.target);

  function spinningCube(time: number = 0) {
    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;
  }

  spinningCube();

  function animate() {
    // Update animations
    if (playerShip.mixer) {
      playerShip.mixer.update(0.01); // Update the spaceship's animations
    }

    mCamera.controls.update();
    renderer.render(scene, mCamera.cam);
  }

  renderer.setAnimationLoop(animate);
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.render( scene, mCamera );
  // animate();
}

main();
