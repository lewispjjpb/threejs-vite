import { World } from "./vanilla-three";

const world = new World();

world.initWorld()
  .then(() => console.log("World Initialized"))
  .catch((err) => console.error(err));