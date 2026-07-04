export const POINT_CLOUD_OPTIONS = {
  bunny: {
    url: 'https://raw.githubusercontent.com/PointCloudLibrary/pcl/refs/heads/master/test/bunny.pcd',
    scale: 75,
  },
};

export type PointCloudOptionKeys = keyof typeof POINT_CLOUD_OPTIONS;
export type PointCloudOptions =
  (typeof POINT_CLOUD_OPTIONS)[PointCloudOptionKeys];
