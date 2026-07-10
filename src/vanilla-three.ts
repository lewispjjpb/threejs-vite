import { AmbientLight, Scene, WebGLRenderer, Timer, Mesh } from 'three';
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
  private domainParent: string = 'three-root';
  private pointSelection: PointCloudOptionKeys = 'terrain1';

  constructor(renderer: WebGLRenderer, scene: Scene, domainParent?: string) {
    this.pDL = new PointDataLoader();
    this.timer = new Timer();
    this.scene = scene;
    this.renderer = renderer;
    this.domainParent = domainParent ?? this.domainParent;
    this.resizeRenderWindow = this.resizeRenderWindow.bind(this);
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
    const parentElement = document.getElementById(this.domainParent);
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

    const selectEl = document.getElementById(
      'point-cloud-select'
    ) as HTMLSelectElement;
    if (selectEl) {
      selectEl.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.pointSelection =
          (target.value as PointCloudOptionKeys) ?? this.pointSelection;
        this.addPointData();
        this.playerShip?.setPlayerStartPostion();
      });
    }
    window.addEventListener('resize', this.resizeRenderWindow);
    this.resizeRenderWindow();

    await this.addPointData();

    this.updateManager = new UpdateManager(this.playerControls);
    this.updateManager.addMixers(this.playerShip.mixer);

    this.renderer.setAnimationLoop(this.animateWorld.bind(this));
  }

  public destroy() {
    this.renderer.setAnimationLoop(null);
    window.removeEventListener('resize', this.resizeRenderWindow);

    // Clear GPU memory
    this.scene.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      object.geometry.dispose();

      if (Array.isArray(object.material)) {
        object.material.forEach((mat) => mat.dispose());
      } else {
        object.material.dispose();
      }
    });

    this.renderer.dispose();
  }
}
