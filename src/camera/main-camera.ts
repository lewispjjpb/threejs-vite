import { PerspectiveCamera, Vector3, MOUSE } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class MainCamera {
  public camera: PerspectiveCamera;
  public controls: OrbitControls;

  constructor(zOffset: number) {
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const targetPosition = new Vector3(0, 0, 0);
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

    controls.target.copy(targetPosition);

    camera.position.z = zOffset;
    camera.position.y = 15;
    this.camera = camera;
    this.controls = controls;
  }
}
