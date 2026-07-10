import { AmbientLight, Scene, WebGLRenderer, Timer, Camera } from 'three';
import { MainCamera } from './camera/main-camera';
import { PlayerShip } from './components/player-ship';
import { DirectionalLightObject } from './lighting/directional-light';
import { UpdateManager } from './services';
import { PlayerControls } from './services';
import { PointDataLoader } from './services';
import {
  POINT_CLOUD_OPTIONS,
  PointCloudOptionKeys,
} from './utils/app-constants';

// const pDL = new PointDataLoader();

export class World {
  private pDL: PointDataLoader;
  private timer: Timer;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private directionalLightPosition: [number, number, number] = [10, 20, 10];
  private directionalLightColor = '#FF00FF';
  private mCamera: MainCamera | null = null;
  private playerShip: PlayerShip | null = null;
  private playerControls: PlayerControls | null = null;
  private updateManager: UpdateManager | null = null;
  public pointSelection: PointCloudOptionKeys = 'terrain1';

  constructor() {
    this.pDL = new PointDataLoader();
    this.timer = new Timer();
    this.scene = new Scene();
    this.renderer = new WebGLRenderer();
  }

  async setWorld(scene: Scene) {
    const ambientLight = new AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new DirectionalLightObject(
      this.directionalLightPosition,
      this.directionalLightColor,
      1
    );
    scene.add(directionalLight.dirLight);
    scene.add(directionalLight.dirLight.target);
  }

  async addPointData() {
    this.pDL.removePointFromScene(this.scene);
    await this.pDL.loadPointData(POINT_CLOUD_OPTIONS[this.pointSelection]);
    this.pDL.addPointToScene(this.scene);
  }

  async addObjects(scene: Scene): Promise<PlayerShip> {
    const playerShip = await PlayerShip.initializePlayerShip();
    scene.add(playerShip.gltf.scene);
    return playerShip;
  }

  resizeRenderWindow() {
    if (!this.mCamera) throw new Error('Camera not initialized');
    const parentElement = document.getElementById('three-root');
    if (!parentElement) throw new Error('No parent element found');
    const width = parentElement.clientWidth;
    const height = parentElement.clientHeight;
    this.renderer.setSize(width, height);
    parentElement.appendChild(this.renderer.domElement);
    this.mCamera.camera.aspect = width / height;
    this.mCamera.camera.updateProjectionMatrix();
  }

  private animateWorld() {
    if (!this.mCamera) throw new Error('Camera not initialized');
    this.timer.update();
    this.mCamera.updatePosition();
    this.updateManager?.update(this.timer.getDelta());
    this.renderer.render(this.scene, this.mCamera.camera);
  }

  public async initWorld() {
    if (!this.renderer) throw new Error('Renderer not initialized');
    if (!this.scene) throw new Error('Scene not initialized');

    this.playerShip = await this.addObjects(this.scene);

    await this.setWorld(this.scene);
    this.playerControls = new PlayerControls(this.playerShip.gltf.scene);
    this.mCamera = new MainCamera(-30, this.playerShip);

    document.body.addEventListener('click', (e) => {
      //TODO: refactor to allow for more than just the select element
      const target = e.target as HTMLSelectElement;
      if (target.id === 'point-cloud-select') {
        this.pointSelection =
          (target?.value as PointCloudOptionKeys) ?? this.pointSelection;
        this.addPointData();
        this.playerShip?.setPlayerStartPostion();
      }
    });

    this.resizeRenderWindow();
    window.addEventListener('load', () => this.resizeRenderWindow());

    await this.addPointData();

    this.updateManager = new UpdateManager(this.playerControls);
    this.updateManager.addMixers(this.playerShip.mixer);

    this.renderer.setAnimationLoop(this.animateWorld.bind(this));
  }
}

// async function setWorld(
//   scene: Scene,
//   pointSelection: PointCloudOptionKeys = 'terrain1'
// ) {
//   const ambientLight = new AmbientLight(0xffffff, 1);
//   scene.add(ambientLight);
//   const directionalLight = new DirectionalLightObject(
//     directionalLightPosition,
//     directionalLightColor,
//     1
//   );
//   scene.add(directionalLight.dirLight);
//   scene.add(directionalLight.dirLight.target);
// }

// async function addPointData(
//   scene: Scene,
//   pointSelection: PointCloudOptionKeys = 'terrain1'
// ) {
//   pDL.removePointFromScene(scene);
//   await pDL.loadPointData(POINT_CLOUD_OPTIONS[pointSelection]);
//   pDL.addPointToScene(scene);
// }

// async function addObjects(scene: Scene): Promise<PlayerShip> {
//   const playerShip = await PlayerShip.initializePlayerShip();
//   scene.add(playerShip.gltf.scene);
//   return playerShip;
// }

// function resizeRenderWindow(
//   renderer: WebGLRenderer,
//   camera: MainCamera['camera']
// ) {
//   const parentElement = document.getElementById('three-root');
//   if (!parentElement) throw new Error('No parent element found');
//   const width = parentElement.clientWidth;
//   const height = parentElement.clientHeight;
//   renderer.setSize(width, height);
//   parentElement.appendChild(renderer.domElement);
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();
// }

// async function main() {
//   const timer = new Timer();
//   const scene = new Scene();
//   const renderer = new WebGLRenderer();
//
//   await setWorld(scene);
//   let pointSelection: PointCloudOptionKeys = 'terrain1';
//   const playerShip = await addObjects(scene);
//   const playerControls = new PlayerControls(playerShip.gltf.scene);
//   const mCamera = new MainCamera(-30, playerShip);
//
//   resizeRenderWindow(renderer, mCamera.camera);
//   document.body.addEventListener('click', (e) => {
//     //TODO: refactor to allow for more than just the select element
//     const target = e.target as HTMLSelectElement;
//     if (target.id === 'point-cloud-select') {
//       pointSelection =
//         (target?.value as PointCloudOptionKeys) ?? pointSelection;
//       addPointData(scene, pointSelection);
//       playerShip.setPlayerStartPostion();
//     }
//   });
//   window.addEventListener('resize', () =>
//     resizeRenderWindow(renderer, mCamera.camera)
//   );
//   await addPointData(scene, pointSelection);
//
//   const updateManager = new UpdateManager(playerControls);
//   updateManager.addMixers(playerShip.mixer);
//
//   function animate() {
//     timer.update();
//     updateManager.update(timer.getDelta());
//
//     mCamera.updatePosition();
//     renderer.render(scene, mCamera.camera);
//   }
//   renderer.setAnimationLoop(animate);
// }
