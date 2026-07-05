import { AmbientLight, Scene, WebGLRenderer, Timer, Camera } from 'three';
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
  const ambientLight = new AmbientLight(0xffffff, 1);
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

function resizeRenderWindow(
  renderer: WebGLRenderer,
  camera: MainCamera['camera']
) {
  const parentElement = document.getElementById('three-root');
  if (!parentElement) throw new Error('No parent element found');
  const width = parentElement.clientWidth;
  const height = parentElement.clientHeight;
  renderer.setSize(width, height);
  parentElement.appendChild(renderer.domElement);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

async function main() {
  const timer = new Timer();
  const scene = new Scene();
  const renderer = new WebGLRenderer();

  await setWorld(scene);
  let pointSelection: PointCloudOptionKeys = 'terrain1';
  const playerShip = await addObjects(scene);
  const playerControls = new PlayerControls(playerShip.gltf.scene);
  const mCamera = new MainCamera(-30, playerShip);

  resizeRenderWindow(renderer, mCamera.camera);
  document.body.addEventListener('click', (e) => {
    //TODO: refactor to allow for more than just the select element
    const target = e.target as HTMLSelectElement;
    if (target.id === 'point-cloud-select') {
      pointSelection =
        (target?.value as PointCloudOptionKeys) ?? pointSelection;
      addPointData(scene, pointSelection);
      playerShip.setPlayerStartPostion();
    }
  });
  window.addEventListener('resize', () =>
    resizeRenderWindow(renderer, mCamera.camera)
  );
  await addPointData(scene, pointSelection);

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
