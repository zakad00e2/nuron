/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./src/assets/css/bootstrap.min.css":
/*!******************************************!*\
  !*** ./src/assets/css/bootstrap.min.css ***!
  \******************************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./src/assets/css/feather.css":
/*!************************************!*\
  !*** ./src/assets/css/feather.css ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./src/assets/css/modal-video.css":
/*!****************************************!*\
  !*** ./src/assets/css/modal-video.css ***!
  \****************************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./src/assets/scss/style.scss":
/*!************************************!*\
  !*** ./src/assets/scss/style.scss ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./src/contexts/LanguageContext.jsx":
/*!******************************************!*\
  !*** ./src/contexts/LanguageContext.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LanguageProvider: () => (/* binding */ LanguageProvider),\n/* harmony export */   useLanguage: () => (/* binding */ useLanguage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst LanguageContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst useLanguage = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(LanguageContext);\n    if (!context) {\n        throw new Error(\"useLanguage must be used within a LanguageProvider\");\n    }\n    return context;\n};\nconst LanguageProvider = ({ children })=>{\n    const [language, setLanguage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"en\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"LanguageProvider.useEffect\": ()=>{\n            // Load language from localStorage on mount\n            const savedLanguage = localStorage.getItem(\"language\");\n            if (savedLanguage && (savedLanguage === \"en\" || savedLanguage === \"de\")) {\n                setLanguage(savedLanguage);\n            }\n        }\n    }[\"LanguageProvider.useEffect\"], []);\n    const changeLanguage = (lang)=>{\n        if (lang === \"en\" || lang === \"de\") {\n            setLanguage(lang);\n            localStorage.setItem(\"language\", lang);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LanguageContext.Provider, {\n        value: {\n            language,\n            changeLanguage\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\zeka1\\\\Downloads\\\\nuron\\\\src\\\\contexts\\\\LanguageContext.jsx\",\n        lineNumber: 33,\n        columnNumber: 9\n    }, undefined);\n};\nLanguageProvider.propTypes = {\n    children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node).isRequired\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9jb250ZXh0cy9MYW5ndWFnZUNvbnRleHQuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUF1RTtBQUNwQztBQUVuQyxNQUFNSyxnQ0FBa0JMLG9EQUFhQTtBQUU5QixNQUFNTSxjQUFjO0lBQ3ZCLE1BQU1DLFVBQVVOLGlEQUFVQSxDQUFDSTtJQUMzQixJQUFJLENBQUNFLFNBQVM7UUFDVixNQUFNLElBQUlDLE1BQU07SUFDcEI7SUFDQSxPQUFPRDtBQUNYLEVBQUU7QUFFSyxNQUFNRSxtQkFBbUIsQ0FBQyxFQUFFQyxRQUFRLEVBQUU7SUFDekMsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdWLCtDQUFRQSxDQUFDO0lBRXpDQyxnREFBU0E7c0NBQUM7WUFDTiwyQ0FBMkM7WUFDM0MsTUFBTVUsZ0JBQWdCQyxhQUFhQyxPQUFPLENBQUM7WUFDM0MsSUFBSUYsaUJBQWtCQSxDQUFBQSxrQkFBa0IsUUFBUUEsa0JBQWtCLElBQUcsR0FBSTtnQkFDckVELFlBQVlDO1lBQ2hCO1FBQ0o7cUNBQUcsRUFBRTtJQUVMLE1BQU1HLGlCQUFpQixDQUFDQztRQUNwQixJQUFJQSxTQUFTLFFBQVFBLFNBQVMsTUFBTTtZQUNoQ0wsWUFBWUs7WUFDWkgsYUFBYUksT0FBTyxDQUFDLFlBQVlEO1FBQ3JDO0lBQ0o7SUFFQSxxQkFDSSw4REFBQ1osZ0JBQWdCYyxRQUFRO1FBQUNDLE9BQU87WUFBRVQ7WUFBVUs7UUFBZTtrQkFDdkROOzs7Ozs7QUFHYixFQUFFO0FBRUZELGlCQUFpQlksU0FBUyxHQUFHO0lBQ3pCWCxVQUFVTix3REFBYyxDQUFDbUIsVUFBVTtBQUN2QyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx6ZWthMVxcRG93bmxvYWRzXFxudXJvblxcc3JjXFxjb250ZXh0c1xcTGFuZ3VhZ2VDb250ZXh0LmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmNvbnN0IExhbmd1YWdlQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VMYW5ndWFnZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KExhbmd1YWdlQ29udGV4dCk7XHJcbiAgICBpZiAoIWNvbnRleHQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VMYW5ndWFnZSBtdXN0IGJlIHVzZWQgd2l0aGluIGEgTGFuZ3VhZ2VQcm92aWRlclwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb250ZXh0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IExhbmd1YWdlUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XHJcbiAgICBjb25zdCBbbGFuZ3VhZ2UsIHNldExhbmd1YWdlXSA9IHVzZVN0YXRlKFwiZW5cIik7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICAvLyBMb2FkIGxhbmd1YWdlIGZyb20gbG9jYWxTdG9yYWdlIG9uIG1vdW50XHJcbiAgICAgICAgY29uc3Qgc2F2ZWRMYW5ndWFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGFuZ3VhZ2VcIik7XHJcbiAgICAgICAgaWYgKHNhdmVkTGFuZ3VhZ2UgJiYgKHNhdmVkTGFuZ3VhZ2UgPT09IFwiZW5cIiB8fCBzYXZlZExhbmd1YWdlID09PSBcImRlXCIpKSB7XHJcbiAgICAgICAgICAgIHNldExhbmd1YWdlKHNhdmVkTGFuZ3VhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VMYW5ndWFnZSA9IChsYW5nKSA9PiB7XHJcbiAgICAgICAgaWYgKGxhbmcgPT09IFwiZW5cIiB8fCBsYW5nID09PSBcImRlXCIpIHtcclxuICAgICAgICAgICAgc2V0TGFuZ3VhZ2UobGFuZyk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGFuZ3VhZ2VcIiwgbGFuZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxMYW5ndWFnZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgbGFuZ3VhZ2UsIGNoYW5nZUxhbmd1YWdlIH19PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9MYW5ndWFnZUNvbnRleHQuUHJvdmlkZXI+XHJcbiAgICApO1xyXG59O1xyXG5cclxuTGFuZ3VhZ2VQcm92aWRlci5wcm9wVHlwZXMgPSB7XHJcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiUHJvcFR5cGVzIiwiTGFuZ3VhZ2VDb250ZXh0IiwidXNlTGFuZ3VhZ2UiLCJjb250ZXh0IiwiRXJyb3IiLCJMYW5ndWFnZVByb3ZpZGVyIiwiY2hpbGRyZW4iLCJsYW5ndWFnZSIsInNldExhbmd1YWdlIiwic2F2ZWRMYW5ndWFnZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjaGFuZ2VMYW5ndWFnZSIsImxhbmciLCJzZXRJdGVtIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInByb3BUeXBlcyIsIm5vZGUiLCJpc1JlcXVpcmVkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/contexts/LanguageContext.jsx\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/_app.jsx":
/*!****************************!*\
  !*** ./src/pages/_app.jsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var sal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sal.js */ \"sal.js\");\n/* harmony import */ var sal_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sal_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next-themes */ \"next-themes\");\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_themes__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _contexts_LanguageContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @contexts/LanguageContext */ \"(pages-dir-node)/./src/contexts/LanguageContext.jsx\");\n/* harmony import */ var _assets_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/css/bootstrap.min.css */ \"(pages-dir-node)/./src/assets/css/bootstrap.min.css\");\n/* harmony import */ var _assets_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_css_feather_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/css/feather.css */ \"(pages-dir-node)/./src/assets/css/feather.css\");\n/* harmony import */ var _assets_css_feather_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_css_feather_css__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _assets_css_modal_video_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/css/modal-video.css */ \"(pages-dir-node)/./src/assets/css/modal-video.css\");\n/* harmony import */ var _assets_css_modal_video_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_css_modal_video_css__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"(pages-dir-node)/./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../assets/scss/style.scss */ \"(pages-dir-node)/./src/assets/scss/style.scss\");\n/* harmony import */ var _assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_11__);\n\n\n\n\n\n\n\n\n\n\n\n\nconst MyApp = ({ Component, pageProps })=>{\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            sal_js__WEBPACK_IMPORTED_MODULE_4___default()({\n                threshold: 0.1,\n                once: true\n            });\n        }\n    }[\"MyApp.useEffect\"], [\n        router.asPath\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            sal_js__WEBPACK_IMPORTED_MODULE_4___default()();\n        }\n    }[\"MyApp.useEffect\"], []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            document.body.className = `${pageProps.className}`;\n        }\n    }[\"MyApp.useEffect\"]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_themes__WEBPACK_IMPORTED_MODULE_5__.ThemeProvider, {\n        defaultTheme: \"dark\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_LanguageContext__WEBPACK_IMPORTED_MODULE_6__.LanguageProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\zeka1\\\\Downloads\\\\nuron\\\\src\\\\pages\\\\_app.jsx\",\n                lineNumber: 28,\n                columnNumber: 17\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\zeka1\\\\Downloads\\\\nuron\\\\src\\\\pages\\\\_app.jsx\",\n            lineNumber: 27,\n            columnNumber: 13\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\zeka1\\\\Downloads\\\\nuron\\\\src\\\\pages\\\\_app.jsx\",\n        lineNumber: 26,\n        columnNumber: 9\n    }, undefined);\n};\nMyApp.propTypes = {\n    Component: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().elementType),\n    pageProps: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({\n        className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)\n    })\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fYXBwLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ0M7QUFDSztBQUNmO0FBQ21CO0FBQ2lCO0FBQ3BCO0FBQ047QUFDSTtBQUNRO0FBQ1o7QUFFbkMsTUFBTU0sUUFBUSxDQUFDLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ25DLE1BQU1DLFNBQVNQLHNEQUFTQTtJQUN4QkYsZ0RBQVNBOzJCQUFDO1lBQ05HLDZDQUFHQSxDQUFDO2dCQUFFTyxXQUFXO2dCQUFLQyxNQUFNO1lBQUs7UUFDckM7MEJBQUc7UUFBQ0YsT0FBT0csTUFBTTtLQUFDO0lBRWxCWixnREFBU0E7MkJBQUM7WUFDTkcsNkNBQUdBO1FBQ1A7MEJBQUcsRUFBRTtJQUNMSCxnREFBU0E7MkJBQUM7WUFDTmEsU0FBU0MsSUFBSSxDQUFDQyxTQUFTLEdBQUcsR0FBR1AsVUFBVU8sU0FBUyxFQUFFO1FBQ3REOztJQUNBLHFCQUNJLDhEQUFDWCxzREFBYUE7UUFBQ1ksY0FBYTtrQkFDeEIsNEVBQUNYLHVFQUFnQkE7c0JBQ2IsNEVBQUNFO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJeEM7QUFFQUYsTUFBTVcsU0FBUyxHQUFHO0lBQ2RWLFdBQVdOLCtEQUFxQjtJQUNoQ08sV0FBV1AsdURBQWUsQ0FBQztRQUN2QmMsV0FBV2QsMERBQWdCO0lBQy9CO0FBQ0o7QUFFQSxpRUFBZUssS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx6ZWthMVxcRG93bmxvYWRzXFxudXJvblxcc3JjXFxwYWdlc1xcX2FwcC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBzYWwgZnJvbSBcInNhbC5qc1wiO1xuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCJuZXh0LXRoZW1lc1wiO1xuaW1wb3J0IHsgTGFuZ3VhZ2VQcm92aWRlciB9IGZyb20gXCJAY29udGV4dHMvTGFuZ3VhZ2VDb250ZXh0XCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvY3NzL2ZlYXRoZXIuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvY3NzL21vZGFsLXZpZGVvLmNzc1wiO1xuaW1wb3J0IFwicmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3Njc3Mvc3R5bGUuc2Nzc1wiO1xuXG5jb25zdCBNeUFwcCA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzYWwoeyB0aHJlc2hvbGQ6IDAuMSwgb25jZTogdHJ1ZSB9KTtcbiAgICB9LCBbcm91dGVyLmFzUGF0aF0pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgc2FsKCk7XG4gICAgfSwgW10pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gYCR7cGFnZVByb3BzLmNsYXNzTmFtZX1gO1xuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxUaGVtZVByb3ZpZGVyIGRlZmF1bHRUaGVtZT1cImRhcmtcIj5cbiAgICAgICAgICAgIDxMYW5ndWFnZVByb3ZpZGVyPlxuICAgICAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgICAgIDwvTGFuZ3VhZ2VQcm92aWRlcj5cbiAgICAgICAgPC9UaGVtZVByb3ZpZGVyPlxuICAgICk7XG59O1xuXG5NeUFwcC5wcm9wVHlwZXMgPSB7XG4gICAgQ29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG4gICAgcGFnZVByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfSksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJQcm9wVHlwZXMiLCJ1c2VSb3V0ZXIiLCJzYWwiLCJUaGVtZVByb3ZpZGVyIiwiTGFuZ3VhZ2VQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicm91dGVyIiwidGhyZXNob2xkIiwib25jZSIsImFzUGF0aCIsImRvY3VtZW50IiwiYm9keSIsImNsYXNzTmFtZSIsImRlZmF1bHRUaGVtZSIsInByb3BUeXBlcyIsImVsZW1lbnRUeXBlIiwic2hhcGUiLCJzdHJpbmciXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_app.jsx\n");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next-themes":
/*!******************************!*\
  !*** external "next-themes" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-themes");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "sal.js":
/*!*************************!*\
  !*** external "sal.js" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("sal.js");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/react-toastify"], () => (__webpack_exec__("(pages-dir-node)/./src/pages/_app.jsx")));
module.exports = __webpack_exports__;

})();