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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LanguageProvider: () => (/* binding */ LanguageProvider),\n/* harmony export */   useLanguage: () => (/* binding */ useLanguage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst LanguageContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst useLanguage = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(LanguageContext);\n    if (!context) {\n        throw new Error(\"useLanguage must be used within a LanguageProvider\");\n    }\n    return context;\n};\n// RTL languages\nconst RTL_LANGUAGES = [\n    \"ar\"\n];\nconst LanguageProvider = ({ children })=>{\n    const [language, setLanguage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"en\");\n    const [direction, setDirection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"ltr\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"LanguageProvider.useEffect\": ()=>{\n            // Load language from localStorage on mount\n            const savedLanguage = localStorage.getItem(\"language\");\n            if (savedLanguage && (savedLanguage === \"en\" || savedLanguage === \"de\" || savedLanguage === \"ar\")) {\n                setLanguage(savedLanguage);\n                setDirection(RTL_LANGUAGES.includes(savedLanguage) ? \"rtl\" : \"ltr\");\n            }\n        }\n    }[\"LanguageProvider.useEffect\"], []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"LanguageProvider.useEffect\": ()=>{\n            // Update document direction when language changes\n            const isRTL = RTL_LANGUAGES.includes(language);\n            const newDirection = isRTL ? \"rtl\" : \"ltr\";\n            setDirection(newDirection);\n            if (typeof document !== \"undefined\") {\n                document.documentElement.setAttribute(\"dir\", newDirection);\n                document.documentElement.setAttribute(\"lang\", language);\n            }\n        }\n    }[\"LanguageProvider.useEffect\"], [\n        language\n    ]);\n    const changeLanguage = (lang)=>{\n        if (lang === \"en\" || lang === \"de\" || lang === \"ar\") {\n            setLanguage(lang);\n            localStorage.setItem(\"language\", lang);\n            const isRTL = RTL_LANGUAGES.includes(lang);\n            const newDirection = isRTL ? \"rtl\" : \"ltr\";\n            setDirection(newDirection);\n            if (typeof document !== \"undefined\") {\n                document.documentElement.setAttribute(\"dir\", newDirection);\n                document.documentElement.setAttribute(\"lang\", lang);\n            }\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LanguageContext.Provider, {\n        value: {\n            language,\n            changeLanguage,\n            direction\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\zeka1\\\\Downloads\\\\nuron\\\\src\\\\contexts\\\\LanguageContext.jsx\",\n        lineNumber: 58,\n        columnNumber: 9\n    }, undefined);\n};\nLanguageProvider.propTypes = {\n    children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node).isRequired\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9jb250ZXh0cy9MYW5ndWFnZUNvbnRleHQuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUF1RTtBQUNwQztBQUVuQyxNQUFNSyxnQ0FBa0JMLG9EQUFhQTtBQUU5QixNQUFNTSxjQUFjO0lBQ3ZCLE1BQU1DLFVBQVVOLGlEQUFVQSxDQUFDSTtJQUMzQixJQUFJLENBQUNFLFNBQVM7UUFDVixNQUFNLElBQUlDLE1BQU07SUFDcEI7SUFDQSxPQUFPRDtBQUNYLEVBQUU7QUFFRixnQkFBZ0I7QUFDaEIsTUFBTUUsZ0JBQWdCO0lBQUM7Q0FBSztBQUVyQixNQUFNQyxtQkFBbUIsQ0FBQyxFQUFFQyxRQUFRLEVBQUU7SUFDekMsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdYLCtDQUFRQSxDQUFDO0lBQ3pDLE1BQU0sQ0FBQ1ksV0FBV0MsYUFBYSxHQUFHYiwrQ0FBUUEsQ0FBQztJQUUzQ0MsZ0RBQVNBO3NDQUFDO1lBQ04sMkNBQTJDO1lBQzNDLE1BQU1hLGdCQUFnQkMsYUFBYUMsT0FBTyxDQUFDO1lBQzNDLElBQUlGLGlCQUFrQkEsQ0FBQUEsa0JBQWtCLFFBQVFBLGtCQUFrQixRQUFRQSxrQkFBa0IsSUFBRyxHQUFJO2dCQUMvRkgsWUFBWUc7Z0JBQ1pELGFBQWFOLGNBQWNVLFFBQVEsQ0FBQ0gsaUJBQWlCLFFBQVE7WUFDakU7UUFDSjtxQ0FBRyxFQUFFO0lBRUxiLGdEQUFTQTtzQ0FBQztZQUNOLGtEQUFrRDtZQUNsRCxNQUFNaUIsUUFBUVgsY0FBY1UsUUFBUSxDQUFDUDtZQUNyQyxNQUFNUyxlQUFlRCxRQUFRLFFBQVE7WUFDckNMLGFBQWFNO1lBRWIsSUFBSSxPQUFPQyxhQUFhLGFBQWE7Z0JBQ2pDQSxTQUFTQyxlQUFlLENBQUNDLFlBQVksQ0FBQyxPQUFPSDtnQkFDN0NDLFNBQVNDLGVBQWUsQ0FBQ0MsWUFBWSxDQUFDLFFBQVFaO1lBQ2xEO1FBQ0o7cUNBQUc7UUFBQ0E7S0FBUztJQUViLE1BQU1hLGlCQUFpQixDQUFDQztRQUNwQixJQUFJQSxTQUFTLFFBQVFBLFNBQVMsUUFBUUEsU0FBUyxNQUFNO1lBQ2pEYixZQUFZYTtZQUNaVCxhQUFhVSxPQUFPLENBQUMsWUFBWUQ7WUFDakMsTUFBTU4sUUFBUVgsY0FBY1UsUUFBUSxDQUFDTztZQUNyQyxNQUFNTCxlQUFlRCxRQUFRLFFBQVE7WUFDckNMLGFBQWFNO1lBRWIsSUFBSSxPQUFPQyxhQUFhLGFBQWE7Z0JBQ2pDQSxTQUFTQyxlQUFlLENBQUNDLFlBQVksQ0FBQyxPQUFPSDtnQkFDN0NDLFNBQVNDLGVBQWUsQ0FBQ0MsWUFBWSxDQUFDLFFBQVFFO1lBQ2xEO1FBQ0o7SUFDSjtJQUVBLHFCQUNJLDhEQUFDckIsZ0JBQWdCdUIsUUFBUTtRQUFDQyxPQUFPO1lBQUVqQjtZQUFVYTtZQUFnQlg7UUFBVTtrQkFDbEVIOzs7Ozs7QUFHYixFQUFFO0FBRUZELGlCQUFpQm9CLFNBQVMsR0FBRztJQUN6Qm5CLFVBQVVQLHdEQUFjLENBQUM0QixVQUFVO0FBQ3ZDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHpla2ExXFxEb3dubG9hZHNcXG51cm9uXFxzcmNcXGNvbnRleHRzXFxMYW5ndWFnZUNvbnRleHQuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuY29uc3QgTGFuZ3VhZ2VDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZUxhbmd1YWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoTGFuZ3VhZ2VDb250ZXh0KTtcclxuICAgIGlmICghY29udGV4dCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZUxhbmd1YWdlIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBMYW5ndWFnZVByb3ZpZGVyXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbnRleHQ7XHJcbn07XHJcblxyXG4vLyBSVEwgbGFuZ3VhZ2VzXHJcbmNvbnN0IFJUTF9MQU5HVUFHRVMgPSBbXCJhclwiXTtcclxuXHJcbmV4cG9ydCBjb25zdCBMYW5ndWFnZVByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xyXG4gICAgY29uc3QgW2xhbmd1YWdlLCBzZXRMYW5ndWFnZV0gPSB1c2VTdGF0ZShcImVuXCIpO1xyXG4gICAgY29uc3QgW2RpcmVjdGlvbiwgc2V0RGlyZWN0aW9uXSA9IHVzZVN0YXRlKFwibHRyXCIpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgLy8gTG9hZCBsYW5ndWFnZSBmcm9tIGxvY2FsU3RvcmFnZSBvbiBtb3VudFxyXG4gICAgICAgIGNvbnN0IHNhdmVkTGFuZ3VhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxhbmd1YWdlXCIpO1xyXG4gICAgICAgIGlmIChzYXZlZExhbmd1YWdlICYmIChzYXZlZExhbmd1YWdlID09PSBcImVuXCIgfHwgc2F2ZWRMYW5ndWFnZSA9PT0gXCJkZVwiIHx8IHNhdmVkTGFuZ3VhZ2UgPT09IFwiYXJcIikpIHtcclxuICAgICAgICAgICAgc2V0TGFuZ3VhZ2Uoc2F2ZWRMYW5ndWFnZSk7XHJcbiAgICAgICAgICAgIHNldERpcmVjdGlvbihSVExfTEFOR1VBR0VTLmluY2x1ZGVzKHNhdmVkTGFuZ3VhZ2UpID8gXCJydGxcIiA6IFwibHRyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIC8vIFVwZGF0ZSBkb2N1bWVudCBkaXJlY3Rpb24gd2hlbiBsYW5ndWFnZSBjaGFuZ2VzXHJcbiAgICAgICAgY29uc3QgaXNSVEwgPSBSVExfTEFOR1VBR0VTLmluY2x1ZGVzKGxhbmd1YWdlKTtcclxuICAgICAgICBjb25zdCBuZXdEaXJlY3Rpb24gPSBpc1JUTCA/IFwicnRsXCIgOiBcImx0clwiO1xyXG4gICAgICAgIHNldERpcmVjdGlvbihuZXdEaXJlY3Rpb24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcImRpclwiLCBuZXdEaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKFwibGFuZ1wiLCBsYW5ndWFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2xhbmd1YWdlXSk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlTGFuZ3VhZ2UgPSAobGFuZykgPT4ge1xyXG4gICAgICAgIGlmIChsYW5nID09PSBcImVuXCIgfHwgbGFuZyA9PT0gXCJkZVwiIHx8IGxhbmcgPT09IFwiYXJcIikge1xyXG4gICAgICAgICAgICBzZXRMYW5ndWFnZShsYW5nKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsYW5ndWFnZVwiLCBsYW5nKTtcclxuICAgICAgICAgICAgY29uc3QgaXNSVEwgPSBSVExfTEFOR1VBR0VTLmluY2x1ZGVzKGxhbmcpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdEaXJlY3Rpb24gPSBpc1JUTCA/IFwicnRsXCIgOiBcImx0clwiO1xyXG4gICAgICAgICAgICBzZXREaXJlY3Rpb24obmV3RGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkaXJcIiwgbmV3RGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJsYW5nXCIsIGxhbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxMYW5ndWFnZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgbGFuZ3VhZ2UsIGNoYW5nZUxhbmd1YWdlLCBkaXJlY3Rpb24gfX0+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L0xhbmd1YWdlQ29udGV4dC5Qcm92aWRlcj5cclxuICAgICk7XHJcbn07XHJcblxyXG5MYW5ndWFnZVByb3ZpZGVyLnByb3BUeXBlcyA9IHtcclxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJQcm9wVHlwZXMiLCJMYW5ndWFnZUNvbnRleHQiLCJ1c2VMYW5ndWFnZSIsImNvbnRleHQiLCJFcnJvciIsIlJUTF9MQU5HVUFHRVMiLCJMYW5ndWFnZVByb3ZpZGVyIiwiY2hpbGRyZW4iLCJsYW5ndWFnZSIsInNldExhbmd1YWdlIiwiZGlyZWN0aW9uIiwic2V0RGlyZWN0aW9uIiwic2F2ZWRMYW5ndWFnZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJpbmNsdWRlcyIsImlzUlRMIiwibmV3RGlyZWN0aW9uIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJjaGFuZ2VMYW5ndWFnZSIsImxhbmciLCJzZXRJdGVtIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInByb3BUeXBlcyIsIm5vZGUiLCJpc1JlcXVpcmVkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/contexts/LanguageContext.jsx\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/_app.jsx":
/*!****************************!*\
  !*** ./src/pages/_app.jsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var sal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sal.js */ \"sal.js\");\n/* harmony import */ var sal_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sal_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next-themes */ \"next-themes\");\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_themes__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _contexts_LanguageContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @contexts/LanguageContext */ \"(pages-dir-node)/./src/contexts/LanguageContext.jsx\");\n/* harmony import */ var _assets_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/css/bootstrap.min.css */ \"(pages-dir-node)/./src/assets/css/bootstrap.min.css\");\n/* harmony import */ var _assets_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_css_feather_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/css/feather.css */ \"(pages-dir-node)/./src/assets/css/feather.css\");\n/* harmony import */ var _assets_css_feather_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_css_feather_css__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _assets_css_modal_video_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/css/modal-video.css */ \"(pages-dir-node)/./src/assets/css/modal-video.css\");\n/* harmony import */ var _assets_css_modal_video_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_css_modal_video_css__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"(pages-dir-node)/./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../assets/scss/style.scss */ \"(pages-dir-node)/./src/assets/scss/style.scss\");\n/* harmony import */ var _assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_11__);\n\n\n\n\n\n\n\n\n\n\n\n\nconst MyApp = ({ Component, pageProps })=>{\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            sal_js__WEBPACK_IMPORTED_MODULE_4___default()({\n                threshold: 0.1,\n                once: true\n            });\n        }\n    }[\"MyApp.useEffect\"], [\n        router.asPath\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            sal_js__WEBPACK_IMPORTED_MODULE_4___default()();\n        }\n    }[\"MyApp.useEffect\"], []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            document.body.className = `${pageProps.className}`;\n        }\n    }[\"MyApp.useEffect\"]);\n    // Initialize direction on mount\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            const savedLanguage = localStorage.getItem(\"language\");\n            const isRTL = savedLanguage === \"ar\";\n            if (typeof document !== \"undefined\") {\n                document.documentElement.setAttribute(\"dir\", isRTL ? \"rtl\" : \"ltr\");\n                document.documentElement.setAttribute(\"lang\", savedLanguage || \"en\");\n            }\n        }\n    }[\"MyApp.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_themes__WEBPACK_IMPORTED_MODULE_5__.ThemeProvider, {\n        defaultTheme: \"dark\",\n        enableSystem: false,\n        attribute: \"data-theme\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_LanguageContext__WEBPACK_IMPORTED_MODULE_6__.LanguageProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\zeka1\\\\Downloads\\\\nuron\\\\src\\\\pages\\\\_app.jsx\",\n                lineNumber: 39,\n                columnNumber: 17\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\zeka1\\\\Downloads\\\\nuron\\\\src\\\\pages\\\\_app.jsx\",\n            lineNumber: 38,\n            columnNumber: 13\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\zeka1\\\\Downloads\\\\nuron\\\\src\\\\pages\\\\_app.jsx\",\n        lineNumber: 37,\n        columnNumber: 9\n    }, undefined);\n};\nMyApp.propTypes = {\n    Component: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().elementType),\n    pageProps: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({\n        className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)\n    })\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fYXBwLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ0M7QUFDSztBQUNmO0FBQ21CO0FBQ2lCO0FBQ3BCO0FBQ047QUFDSTtBQUNRO0FBQ1o7QUFFbkMsTUFBTU0sUUFBUSxDQUFDLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ25DLE1BQU1DLFNBQVNQLHNEQUFTQTtJQUN4QkYsZ0RBQVNBOzJCQUFDO1lBQ05HLDZDQUFHQSxDQUFDO2dCQUFFTyxXQUFXO2dCQUFLQyxNQUFNO1lBQUs7UUFDckM7MEJBQUc7UUFBQ0YsT0FBT0csTUFBTTtLQUFDO0lBRWxCWixnREFBU0E7MkJBQUM7WUFDTkcsNkNBQUdBO1FBQ1A7MEJBQUcsRUFBRTtJQUNMSCxnREFBU0E7MkJBQUM7WUFDTmEsU0FBU0MsSUFBSSxDQUFDQyxTQUFTLEdBQUcsR0FBR1AsVUFBVU8sU0FBUyxFQUFFO1FBQ3REOztJQUVBLGdDQUFnQztJQUNoQ2YsZ0RBQVNBOzJCQUFDO1lBQ04sTUFBTWdCLGdCQUFnQkMsYUFBYUMsT0FBTyxDQUFDO1lBQzNDLE1BQU1DLFFBQVFILGtCQUFrQjtZQUNoQyxJQUFJLE9BQU9ILGFBQWEsYUFBYTtnQkFDakNBLFNBQVNPLGVBQWUsQ0FBQ0MsWUFBWSxDQUFDLE9BQU9GLFFBQVEsUUFBUTtnQkFDN0ROLFNBQVNPLGVBQWUsQ0FBQ0MsWUFBWSxDQUFDLFFBQVFMLGlCQUFpQjtZQUNuRTtRQUNKOzBCQUFHLEVBQUU7SUFFTCxxQkFDSSw4REFBQ1osc0RBQWFBO1FBQUNrQixjQUFhO1FBQU9DLGNBQWM7UUFBT0MsV0FBVTtrQkFDOUQsNEVBQUNuQix1RUFBZ0JBO3NCQUNiLDRFQUFDRTtnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7O0FBSXhDO0FBRUFGLE1BQU1tQixTQUFTLEdBQUc7SUFDZGxCLFdBQVdOLCtEQUFxQjtJQUNoQ08sV0FBV1AsdURBQWUsQ0FBQztRQUN2QmMsV0FBV2QsMERBQWdCO0lBQy9CO0FBQ0o7QUFFQSxpRUFBZUssS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx6ZWthMVxcRG93bmxvYWRzXFxudXJvblxcc3JjXFxwYWdlc1xcX2FwcC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBzYWwgZnJvbSBcInNhbC5qc1wiO1xuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCJuZXh0LXRoZW1lc1wiO1xuaW1wb3J0IHsgTGFuZ3VhZ2VQcm92aWRlciB9IGZyb20gXCJAY29udGV4dHMvTGFuZ3VhZ2VDb250ZXh0XCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvY3NzL2ZlYXRoZXIuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvY3NzL21vZGFsLXZpZGVvLmNzc1wiO1xuaW1wb3J0IFwicmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3Njc3Mvc3R5bGUuc2Nzc1wiO1xuXG5jb25zdCBNeUFwcCA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzYWwoeyB0aHJlc2hvbGQ6IDAuMSwgb25jZTogdHJ1ZSB9KTtcbiAgICB9LCBbcm91dGVyLmFzUGF0aF0pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgc2FsKCk7XG4gICAgfSwgW10pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gYCR7cGFnZVByb3BzLmNsYXNzTmFtZX1gO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgZGlyZWN0aW9uIG9uIG1vdW50XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc2F2ZWRMYW5ndWFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGFuZ3VhZ2VcIik7XG4gICAgICAgIGNvbnN0IGlzUlRMID0gc2F2ZWRMYW5ndWFnZSA9PT0gXCJhclwiO1xuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGlyXCIsIGlzUlRMID8gXCJydGxcIiA6IFwibHRyXCIpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcImxhbmdcIiwgc2F2ZWRMYW5ndWFnZSB8fCBcImVuXCIpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuICAgIFxuICAgIHJldHVybiAoXG4gICAgICAgIDxUaGVtZVByb3ZpZGVyIGRlZmF1bHRUaGVtZT1cImRhcmtcIiBlbmFibGVTeXN0ZW09e2ZhbHNlfSBhdHRyaWJ1dGU9XCJkYXRhLXRoZW1lXCI+XG4gICAgICAgICAgICA8TGFuZ3VhZ2VQcm92aWRlcj5cbiAgICAgICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgICAgICA8L0xhbmd1YWdlUHJvdmlkZXI+XG4gICAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICApO1xufTtcblxuTXlBcHAucHJvcFR5cGVzID0ge1xuICAgIENvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxuICAgIHBhZ2VQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH0pLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwiUHJvcFR5cGVzIiwidXNlUm91dGVyIiwic2FsIiwiVGhlbWVQcm92aWRlciIsIkxhbmd1YWdlUHJvdmlkZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInJvdXRlciIsInRocmVzaG9sZCIsIm9uY2UiLCJhc1BhdGgiLCJkb2N1bWVudCIsImJvZHkiLCJjbGFzc05hbWUiLCJzYXZlZExhbmd1YWdlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImlzUlRMIiwiZG9jdW1lbnRFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZGVmYXVsdFRoZW1lIiwiZW5hYmxlU3lzdGVtIiwiYXR0cmlidXRlIiwicHJvcFR5cGVzIiwiZWxlbWVudFR5cGUiLCJzaGFwZSIsInN0cmluZyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_app.jsx\n");

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