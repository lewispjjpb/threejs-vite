"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_svg_1 = __importDefault(require("./assets/react.svg"));
const vite_svg_1 = __importDefault(require("./assets/vite.svg"));
const hero_png_1 = __importDefault(require("./assets/hero.png"));
require("./App.css");
function App() {
    const [count, setCount] = (0, react_1.useState)(0);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("section", { id: "center" },
            react_1.default.createElement("div", { className: "hero" },
                react_1.default.createElement("img", { src: hero_png_1.default, className: "base", width: "170", height: "179", alt: "" }),
                react_1.default.createElement("img", { src: react_svg_1.default, className: "framework", alt: "React logo" }),
                react_1.default.createElement("img", { src: vite_svg_1.default, className: "vite", alt: "Vite logo" })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("h1", null, "Get started"),
                react_1.default.createElement("p", null,
                    "Edit ",
                    react_1.default.createElement("code", null, "src/App.tsx"),
                    " and save to test ",
                    react_1.default.createElement("code", null, "HMR"))),
            react_1.default.createElement("button", { type: "button", className: "counter", onClick: () => setCount((count) => count + 1) },
                "Count is ",
                count)),
        react_1.default.createElement("div", { className: "ticks" }),
        react_1.default.createElement("section", { id: "next-steps" },
            react_1.default.createElement("div", { id: "docs" },
                react_1.default.createElement("svg", { className: "icon", role: "presentation", "aria-hidden": "true" },
                    react_1.default.createElement("use", { href: "/icons.svg#documentation-icon" })))),
        react_1.default.createElement("div", { className: "ticks" }),
        react_1.default.createElement("section", { id: "spacer" })));
}
exports.default = App;
