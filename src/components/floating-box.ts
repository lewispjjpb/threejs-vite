import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

export function createCube(): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const texture = new THREE.TextureLoader().load(
    'https://threejs.org/examples/textures/crate.gif'
  );
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(5, 2, 5);

  const moveSpeed = 0.1;
  const rotationSpeed = 0.03;

  // Rotate left/right
  // if (keys.a) myMesh.rotateY(rotationSpeed);
  // if (keys.d) myMesh.rotateY(-rotationSpeed);
  //Baked_Animations_Intergalactic_Spaceships_Version_2.gltf
  // // Move forward/backward relative to its current orientation
  // if (keys.w) myMesh.translateZ(-moveSpeed);
  // if (keys.s) myMesh.translateZ(moveSpeed);

  // const transformControls = new TransformControls(camera, renderer.domElement);
  // transformControls.attach(cube);

  // // Apply rotation based on time
  // cube.rotation.x = time / 2000;
  // cube.rotation.y = time / 1000;

  return cube;
}
