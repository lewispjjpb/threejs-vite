import { AmbientLight, Scene, WebGLRenderer, Mesh } from 'three';
import { GameCube } from './components/floating-box';
import { mainCamera } from './camera/main-camera';
import { PlayerShip } from './components/player-ship';
import { DirectionalLightObject } from './lighting/directional-light';
import { GeometryPlane } from './components/geometry-plane';

const floorWidth = 100;
const floorLength = 100;

const directionalLightPosition: [number, number, number] = [10, 20, 10];
const directionalLightColor = '#FF0000';

function setWorld(scene: Scene) {
  const geometryPlane = new GeometryPlane(
    floorWidth,
    floorLength,
    -Math.PI / 2
  );
  scene.add(geometryPlane.plane);

  const ambientLight = new AmbientLight(0xffffff, 1); // Ambient light for general illumination
  scene.add(ambientLight);

  const directionalLight = new DirectionalLightObject(
    directionalLightPosition,
    directionalLightColor,
    1
  );
  scene.add(directionalLight.dirLight);
  scene.add(directionalLight.dirLight.target);
}

async function addObjects(scene: Scene): Promise<PlayerShip> {
  const cube = new GameCube(1);
  scene.add(cube.cubeMesh);

  const playerShip = await PlayerShip.initializePlayerShip();
  scene.add(playerShip.gltf.scene);
  return playerShip;
}

async function main(): Promise<void> {
  const scene = new Scene();
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const mCamera = mainCamera();

  setWorld(scene);
  const playerShip = await addObjects(scene);

  function animate() {
    if (playerShip.mixer) {
      playerShip.mixer.update(0.01); // Update the spaceship's animations
    }

    mCamera.controls.update();
    renderer.render(scene, mCamera.cam);
  }
  renderer.setAnimationLoop(animate);
}

main();
