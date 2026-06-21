import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export type MainCameraType = {
  cam: THREE.PerspectiveCamera;
  controls: OrbitControls;
};

export const mainCamera = (zOffset: number = 13): MainCameraType => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const targetPosition = new THREE.Vector3(0, 0, 0);
  const controls = new OrbitControls(camera, document.body);
  controls.enableDamping = true;
  controls.dampingFactor = 1;
  controls.enableZoom = true;
  controls.minDistance = 3;
  controls.maxDistance = 20;

  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN,
  };

  controls.target.copy(targetPosition);

  camera.position.z = zOffset;
  camera.position.y = 5;

  return { cam: camera, controls };
};
