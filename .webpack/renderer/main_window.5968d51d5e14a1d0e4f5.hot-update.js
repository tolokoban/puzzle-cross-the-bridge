"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateelectron_tgd"]("main_window",{

/***/ "./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nconst ui_1 = __webpack_require__(/*! @tolokoban/ui */ \"./node_modules/@tolokoban/ui/dist/esm/index.js\");\nconst services_1 = __webpack_require__(/*! ../hooks/services */ \"./src/hooks/services.ts\");\nconst data_1 = __webpack_require__(/*! ../data */ \"./src/data.ts\");\nconst factory_1 = __webpack_require__(/*! ../factory */ \"./src/factory.ts\");\nconst page_module_css_1 = __importDefault(__webpack_require__(/*! ./page.module.css */ \"./src/app/page.module.css\"));\nfunction Page() {\n    const [progress, setProgress] = react_1.default.useState(-1);\n    const [states, setStates] = react_1.default.useState([]);\n    react_1.default.useEffect(() => {\n        setStates((0, data_1.computeData)());\n    }, []);\n    const service = (0, services_1.useServices)();\n    const handleStart = () => __awaiter(this, void 0, void 0, function* () {\n        const folders = yield service.browse.openDirectory({\n            title: \"Folder where to put the generated images\",\n            multiselections: false,\n        });\n        const [root] = folders;\n        if (!root)\n            return;\n        for (let index = 0; index < states.length; index++) {\n            const state = states[index];\n            setProgress(state.index);\n            const backgroundFilename = `${root}/output/back-${index}.jpg`;\n            const backgroundCanvas = yield (0, factory_1.makeBackground)(service, state, root);\n            yield service.bitmap.saveCanvas(backgroundFilename, backgroundCanvas);\n            setProgress(state.index + 1);\n        }\n    });\n    return ((0, jsx_runtime_1.jsxs)(ui_1.ViewPanel, { className: page_module_css_1.default.Root, color: \"neutral-1\", children: [(0, jsx_runtime_1.jsx)(ui_1.ViewButton, { onClick: handleStart, enabled: progress < 0, children: \"Start images generation\" }), progress > -1 && ((0, jsx_runtime_1.jsxs)(\"div\", { children: [(0, jsx_runtime_1.jsx)(\"b\", { children: progress + 1 }), \" / \", states.length + 1] }))] }));\n}\nexports[\"default\"] = Page;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL3BhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1HQUF5QjtBQUN6Qix3R0FBcUQ7QUFFckQsMkZBQStDO0FBQy9DLG1FQUE0QztBQUM1Qyw0RUFBMkM7QUFFM0MscUhBQXNDO0FBRXRDLFNBQXdCLElBQUk7SUFDeEIsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsR0FBRyxlQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsZUFBSyxDQUFDLFFBQVEsQ0FBVSxFQUFFLENBQUM7SUFDdkQsZUFBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDakIsU0FBUyxDQUFDLHNCQUFXLEdBQUUsQ0FBQztJQUM1QixDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ04sTUFBTSxPQUFPLEdBQUcsMEJBQVcsR0FBRTtJQUM3QixNQUFNLFdBQVcsR0FBRyxHQUFTLEVBQUU7UUFDM0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUMvQyxLQUFLLEVBQUUsMENBQTBDO1lBQ2pELGVBQWUsRUFBRSxLQUFLO1NBQ3pCLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTztRQUN0QixJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU07UUFFakIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDaEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUMzQixXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUN4QixNQUFNLGtCQUFrQixHQUFHLEdBQUcsSUFBSSxnQkFBZ0IsS0FBSyxNQUFNO1lBQzdELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSw0QkFBYyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO1lBQ25FLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQzNCLGtCQUFrQixFQUNsQixnQkFBZ0IsQ0FDbkI7WUFDRCxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBQ0QsT0FBTyxDQUNILHdCQUFDLGNBQVMsSUFBQyxTQUFTLEVBQUUseUJBQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLFdBQVcsYUFDaEQsdUJBQUMsZUFBVSxJQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFFBQVEsR0FBRyxDQUFDLHdDQUUxQyxFQUNaLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUNkLDRDQUNJLHdDQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUssU0FBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFDeEMsQ0FDVCxJQUNPLENBQ2Y7QUFDTCxDQUFDO0FBdkNELDBCQXVDQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLXRnZC8uL3NyYy9hcHAvcGFnZS50c3g/YWE5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IFZpZXdCdXR0b24sIFZpZXdQYW5lbCB9IGZyb20gXCJAdG9sb2tvYmFuL3VpXCJcblxuaW1wb3J0IHsgdXNlU2VydmljZXMgfSBmcm9tIFwiLi4vaG9va3Mvc2VydmljZXNcIlxuaW1wb3J0IHsgU3RhdGUsIGNvbXB1dGVEYXRhIH0gZnJvbSBcIi4uL2RhdGFcIlxuaW1wb3J0IHsgbWFrZUJhY2tncm91bmQgfSBmcm9tIFwiLi4vZmFjdG9yeVwiXG5cbmltcG9ydCBTdHlsZXMgZnJvbSBcIi4vcGFnZS5tb2R1bGUuY3NzXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZSgpIHtcbiAgICBjb25zdCBbcHJvZ3Jlc3MsIHNldFByb2dyZXNzXSA9IFJlYWN0LnVzZVN0YXRlKC0xKVxuICAgIGNvbnN0IFtzdGF0ZXMsIHNldFN0YXRlc10gPSBSZWFjdC51c2VTdGF0ZTxTdGF0ZVtdPihbXSlcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRTdGF0ZXMoY29tcHV0ZURhdGEoKSlcbiAgICB9LCBbXSlcbiAgICBjb25zdCBzZXJ2aWNlID0gdXNlU2VydmljZXMoKVxuICAgIGNvbnN0IGhhbmRsZVN0YXJ0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBmb2xkZXJzID0gYXdhaXQgc2VydmljZS5icm93c2Uub3BlbkRpcmVjdG9yeSh7XG4gICAgICAgICAgICB0aXRsZTogXCJGb2xkZXIgd2hlcmUgdG8gcHV0IHRoZSBnZW5lcmF0ZWQgaW1hZ2VzXCIsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdGlvbnM6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBbcm9vdF0gPSBmb2xkZXJzXG4gICAgICAgIGlmICghcm9vdCkgcmV0dXJuXG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHN0YXRlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gc3RhdGVzW2luZGV4XVxuICAgICAgICAgICAgc2V0UHJvZ3Jlc3Moc3RhdGUuaW5kZXgpXG4gICAgICAgICAgICBjb25zdCBiYWNrZ3JvdW5kRmlsZW5hbWUgPSBgJHtyb290fS9vdXRwdXQvYmFjay0ke2luZGV4fS5qcGdgXG4gICAgICAgICAgICBjb25zdCBiYWNrZ3JvdW5kQ2FudmFzID0gYXdhaXQgbWFrZUJhY2tncm91bmQoc2VydmljZSwgc3RhdGUsIHJvb3QpXG4gICAgICAgICAgICBhd2FpdCBzZXJ2aWNlLmJpdG1hcC5zYXZlQ2FudmFzKFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRGaWxlbmFtZSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBzZXRQcm9ncmVzcyhzdGF0ZS5pbmRleCArIDEpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFZpZXdQYW5lbCBjbGFzc05hbWU9e1N0eWxlcy5Sb290fSBjb2xvcj1cIm5ldXRyYWwtMVwiPlxuICAgICAgICAgICAgPFZpZXdCdXR0b24gb25DbGljaz17aGFuZGxlU3RhcnR9IGVuYWJsZWQ9e3Byb2dyZXNzIDwgMH0+XG4gICAgICAgICAgICAgICAgU3RhcnQgaW1hZ2VzIGdlbmVyYXRpb25cbiAgICAgICAgICAgIDwvVmlld0J1dHRvbj5cbiAgICAgICAgICAgIHtwcm9ncmVzcyA+IC0xICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8Yj57cHJvZ3Jlc3MgKyAxfTwvYj4gLyB7c3RhdGVzLmxlbmd0aCArIDF9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L1ZpZXdQYW5lbD5cbiAgICApXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app/page.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4900eb57e37b048d20e6")
/******/ })();
/******/ 
/******/ }
);