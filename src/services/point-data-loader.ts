import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
import { Points, Scene } from 'three';
import { PointCloudOptions } from '../utils/app-constants';

export class PointDataLoader {
  public points: Points;
  private loader: PCDLoader;
  public constructor() {
    this.loader = new PCDLoader();
    this.points = new Points();
  }

  async loadPointData(pointCloudOptions: PointCloudOptions) {
    const points = await this.loader.loadAsync(pointCloudOptions.url, () =>
      console.log('Loading point cloud...')
    );
    points.geometry.center(); //TODO: variable
    points.geometry.rotateX(pointCloudOptions.rotation);
    points.material.vertexColors = false;
    points.material.size = 0.05;
    points.scale.set(
      pointCloudOptions.scale,
      pointCloudOptions.scale,
      pointCloudOptions.scale
    );
    this.points = points;
  }

  addPointToScene(scene: Scene) {
    scene.add(this.points);
  }
  removePointFromScene(scene: Scene) {
    scene.remove(this.points);
  }
}
