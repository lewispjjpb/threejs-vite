import * as THREE from 'three';
import { createCube } from './components/floating-box';
import { mainCamera } from './camera/main-camera';
import { createPlayerShip } from './components/player-ship';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ColorEnvironment} from "three/addons/environments/ColorEnvironment.js";

async function main():Promise<void> {


  const scene = new THREE.Scene();
// scene.background = new THREE.TextureLoader().load('https://makeagif.com/i/DaOBAl.gif');
// scene.background = new THREE.TextureLoader().load( 'https://threejs.org/examples/textures/crate.gif' );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild( document.appendChild(<div>sometext</div>);
  document.body.appendChild(renderer.domElement);

  const cube = createCube(); // Create the cube without initial rotation
  const mCamera = mainCamera(undefined, cube);
  scene.add(cube);

  const { scene: shipScene, mixer } = await createPlayerShip();
  scene.add(shipScene);


// 1. Create a dense plane geometry
  const width = 100;
  const height = 100;
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    '/grass.jpg',
    () => {
      console.log('Texture loaded successfully');
      animate(); // Ensure it starts rendering after loading.
    },
    undefined,
    (err) => {
      console.error('Error loading texture:');
      console.error(err);
    }
  );
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide // Optional: renders texture on both sides
  });

  const geometry = new THREE.PlaneGeometry(width, height);
// const material = new THREE.Mesh
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Ambient light for general illumination
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Directional light for texture highlights
  directionalLight.position.set(10, 20, 10); // Position outside the plane
  // directionalLight.target.position.set(10, 10, 10);

  scene.add(directionalLight);
  scene.add(directionalLight.target);

  const environment = new RoomEnvironment();
  const pmremGenerator = new THREE.PMREMGenerator( renderer );
  // scene.environment = pmremGenerator.fromScene( environment, 0.04 ).texture;
  // environment.dispose();

  function spinningCube(time: number = 0) {
    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;
  }

  spinningCube();

  function animate() {

    // Update animations
    if (mixer) {
      mixer.update(0.01); // Update the spaceship's animations
    }

    mCamera.controls.update();
    renderer.render(scene, mCamera.cam);
  }

  renderer.setAnimationLoop(animate);
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.render( scene, mCamera );
// animate();
}

main();