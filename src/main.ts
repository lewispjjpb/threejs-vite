import { WebGLRenderer, Scene } from 'three';
import { World } from './vanilla-three';
const renderer = new WebGLRenderer();
const scene = new Scene();

const world = new World(renderer, scene);

world
  .initWorld()
  .then(() => console.log('World Initialized'))
  .catch((err) => console.error(err));
