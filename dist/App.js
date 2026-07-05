'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = App;
const react_1 = __importDefault(require('react'));
const fiber_1 = require('@react-three/fiber');
const app_constants_1 = require('./utils/app-constants');
function App() {
  return react_1.default.createElement(
    'div',
    { id: 'canvas-container' },
    react_1.default.createElement(
      'h5',
      null,
      "I'm rendered with react-three/fiber"
    ),
    react_1.default.createElement(
      fiber_1.Canvas,
      null,
      react_1.default.createElement('ambientLight', { intensity: 0.00001 }),
      react_1.default.createElement('directionalLight', {
        color: 'red',
        position: [0, 0, 5],
      }),
      react_1.default.createElement(
        'mesh',
        null,
        react_1.default.createElement('meshStandardMaterial', null),
        react_1.default.createElement('sphereGeometry', { args: [1, 32, 32] })
      )
    ),
    react_1.default.createElement(
      'div',
      null,
      'This could be some other react elements'
    ),
    react_1.default.createElement(
      'select',
      {
        id: 'point-cloud-select',
        onChange: (e) => {
          e.target.blur();
        },
      },
      Object.entries(app_constants_1.POINT_CLOUD_OPTIONS).map(([key, values]) =>
        react_1.default.createElement(
          'option',
          { key: key, value: key },
          values.label
        )
      )
    )
  );
}
