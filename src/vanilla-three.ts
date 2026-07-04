import { AmbientLight, Scene, WebGLRenderer, Timer, Vector3 } from 'three';
import { MainCamera } from './camera/main-camera';
import { PlayerShip } from './components/player-ship';
import { DirectionalLightObject } from './lighting/directional-light';
import { UpdateManager } from './services/update-manager';
import { PlayerControls } from './services/player-controls';
import { PointDataLoader } from './services/point-data-loader';
import {
  POINT_CLOUD_OPTIONS,
  PointCloudOptionKeys,
} from './utils/app-constants';

const directionalLightPosition: [number, number, number] = [10, 20, 10];
const directionalLightColor = '#FF00FF';

const pDL = new PointDataLoader();

async function setWorld(
  scene: Scene,
  pointSelection: PointCloudOptionKeys = 'terrain1'
) {
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

async function addPointData(
  scene: Scene,
  pointSelection: PointCloudOptionKeys = 'terrain1'
) {
  pDL.removePointFromScene(scene);
  await pDL.loadPointData(POINT_CLOUD_OPTIONS[pointSelection]);
  pDL.addPointToScene(scene);
}

async function addObjects(scene: Scene): Promise<PlayerShip> {
  const playerShip = await PlayerShip.initializePlayerShip();
  scene.add(playerShip.gltf.scene);
  return playerShip;
}

async function main() {
  const timer = new Timer();
  const scene = new Scene();
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  await setWorld(scene);
  let pointSelection: PointCloudOptionKeys = 'terrain1';
  const playerShip = await addObjects(scene);
  const playerControls = new PlayerControls(playerShip.gltf.scene);

  document.body.addEventListener('click', (e) => {
    //refactor to allow for more than just the select element
    const target = e.target as HTMLSelectElement;
    pointSelection = (target?.value as PointCloudOptionKeys) ?? pointSelection;
    addPointData(scene, pointSelection);
    playerShip.setPlayerStartPostion();
  });
  await addPointData(scene, pointSelection);

  const mCamera = new MainCamera(-30, playerShip);
  const updateManager = new UpdateManager(playerControls);
  updateManager.addMixers(playerShip.mixer);

  function animate() {
    timer.update();
    updateManager.update(timer.getDelta());

    mCamera.updatePosition();
    renderer.render(scene, mCamera.camera);
  }
  renderer.setAnimationLoop(animate);
}

main()
  .then(() => console.log('game started'))
  .catch((err) => console.error({ startError: err }));
