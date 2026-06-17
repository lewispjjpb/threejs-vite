import * as THREE from 'three';
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

export async function createPlayerShip(): Promise<{ scene: THREE.Object3D; mixer: THREE.AnimationMixer | null }>
{
  console.log('loading player ship');
  const loader = new GLTFLoader();
  try {
    const gltf = await loader.loadAsync('/src/models/Baked_Animations_Intergalactic_Spaceships_Version_2.glb');
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        // Ensure you don't modify the material properties here unless necessary
        console.log('Mesh material:', child.material); // Debug existing material
      }

    });

    let mixer: THREE.AnimationMixer | null = null;

    // Check for animations and setup mixer
    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => mixer?.clipAction(clip).play());
    }

    gltf.scene.position.set(0, 2, 0);
    return { scene: gltf.scene, mixer };

  } catch (error) {
    console.error('Error loading player ship:', error);
    throw error;
  }
}