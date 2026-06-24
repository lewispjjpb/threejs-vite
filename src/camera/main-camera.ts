import { PerspectiveCamera, Vector3, MOUSE } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PlayerShip } from '../components/player-ship';

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

export class MainCamera {
  public camera: PerspectiveCamera;
  public controls: OrbitControls;
  private readonly cameraOffset = new Vector3(0, 5, 10);
  private readonly objectToFollow: PlayerShip;

  constructor(zOffset: number, objectToFollow: PlayerShip) {
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    this.objectToFollow = objectToFollow;
    this.cameraOffset.z = zOffset;
    const controls = new OrbitControls(camera, document.body);
    controls.enableDamping = true;
    controls.dampingFactor = 1;
    controls.enableZoom = true;
    controls.minDistance = 3;
    controls.maxDistance = 100;

    controls.mouseButtons = {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN,
    };

    this.camera = camera;
    this.controls = controls;
  }

  updatePosition() {
    const pos = this.objectToFollow.gltf.scene.position;
    const playerPosition = this.objectToFollow.gltf.scene.position;
    const playerRotation = this.objectToFollow.gltf.scene.quaternion;

    const worldOffset = this.cameraOffset
      .clone()
      .applyQuaternion(playerRotation)
      .add(playerPosition);

    this.camera.position.lerp(worldOffset, 0.1);
    this.controls.target.copy(pos);
    this.camera.lookAt(pos);
    this.controls.update();
  }
}
