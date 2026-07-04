import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
import { Points } from 'three';
import { Scene } from 'three';
import { PointCloudOptions } from '../utils/app-constants';

export class PointDataLoader {
  public points: Points;
  private constructor(points: Points) {
    this.points = points;
  }

  static async initializePointLoader(pointCloudOptions: PointCloudOptions) {
    const loader = new PCDLoader();
    try {
      const points = await loader.loadAsync(pointCloudOptions.url);
      points.geometry.center(); //TODO: variable
      points.geometry.rotateX(Math.PI); //TODO: variable
      points.scale.set(
        pointCloudOptions.scale,
        pointCloudOptions.scale,
        pointCloudOptions.scale
      );
      return new PointDataLoader(points);
    } catch (error) {
      console.error('Error loading PCD file:', error);
      throw error;
    }
  }

  addPointToScene(scene: Scene) {
    scene.add(this.points);
  }
}
