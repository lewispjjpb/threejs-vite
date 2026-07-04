export const POINT_CLOUD_OPTIONS = {
  terrain1: {
    label: 'Terrain 1',
    url: 'https://raw.githubusercontent.com/PointCloudLibrary/data/refs/heads/master/terrain/CSite1_red1-utm.pcd',
    scale: 1,
    rotation: -Math.PI / 2,
  },
  terrain2: {
    label: 'Terrain 2',
    url: 'https://raw.githubusercontent.com/PointCloudLibrary/data/refs/heads/master/terrain/CSite2_orig-utm.pcd',
    scale: 1,
    rotation: -Math.PI / 2,
  },
};

export type PointCloudOptionKeys = keyof typeof POINT_CLOUD_OPTIONS;
export type PointCloudOptions =
  (typeof POINT_CLOUD_OPTIONS)[PointCloudOptionKeys];
