import { AmbientLight, Scene, WebGLRenderer, Timer } from 'three';
import { GameCube } from './components/floating-box';
import { MainCamera } from './camera/main-camera';
import { PlayerShip } from './components/player-ship';
import { DirectionalLightObject } from './lighting/directional-light';
import { GeometryPlane } from './components/geometry-plane';
import { AnimationManager } from './services/animation-manager';

const floorWidth = 100;
const floorLength = 100;

const directionalLightPosition: [number, number, number] = [10, 20, 10];
const directionalLightColor = '#FF00FF';

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

async function main() {
  const timer = new Timer();
  const scene = new Scene();
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const animationManager = new AnimationManager();
  setWorld(scene);

  const mCamera = new MainCamera(30);
  await addObjects(scene);
  function animate() {
    timer.update();
    animationManager.update(timer.getDelta());
    mCamera.controls.update();
    renderer.render(scene, mCamera.camera);
  }
  renderer.setAnimationLoop(animate);

  async function addObjects(scene: Scene): Promise<void> {
    const cube = new GameCube(1);
    scene.add(cube.cubeMesh);

    const playerShip = await PlayerShip.initializePlayerShip(animationManager, mCamera.camera);
    scene.add(playerShip.gltf.scene);
  }
}

main()
  .then(() => console.log('game started'))
  .catch((err) => console.error({ startError: err }));
