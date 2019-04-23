/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/src/App.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/src/App.js":
/*!*****************************!*\
  !*** ./frontend/src/App.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var cvs = document.getElementById('canvas');\r\nvar ctx = cvs.getContext('2d');\r\n\r\nvar bird = new Image();\r\nvar backGround = new Image();\r\nvar floor = new Image();\r\nvar pipeNorth = new Image();\r\nvar pipeSouth = new Image();\r\n\r\nbird.src = '/bird.png';\r\nbackGround.src = '/bg.png';\r\nfloor.src = '/fg.png';\r\npipeNorth.src = '/pipeNorth.png';\r\npipeSouth.src = '/pipeSouth1.png';\r\n\r\nvar fly = new Audio();\r\nvar scor = new Audio();\r\nvar lose = new Audio();\r\n\r\nfly.src = 'sounds/jump.wav';\r\n\r\nvar gap = 95;\r\nvar constant;\r\nvar birdX = 10;\r\nvar birdY = 150;\r\nvar velocityBirdY = 0.3;\r\nvar accelerateY = 0.1;\r\n\r\ndocument.addEventListener('keydown', moveUp);\r\ndocument.addEventListener('touchstart', moveUp);\r\n\r\nfunction moveUp() {\r\n\tvelocityBirdY = -1;\r\n\tbirdY -= 50;\r\n\tfly.play();\r\n}\r\n\r\nvar pipe = [];\r\n\r\npipe[0] = {\r\n\tx: cvs.width,\r\n\ty: 0\r\n};\r\n\r\nfunction draw() {\r\n\tctx.drawImage(backGround, 0, 0);\r\n\r\n\tfor (var i = 0; i < pipe.length; i++) {\r\n\t\tconstant = pipeNorth.height + gap;\r\n\t\tctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);\r\n\t\tctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);\r\n\t\tpipe[i].x--;\r\n\t\tif (pipe[i].x == 125) {\r\n\t\t\tpipe.push({\r\n\t\t\t\tx: cvs.width,\r\n\t\t\t\ty: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height\r\n\t\t\t});\r\n\t\t}\r\n\t\tif (\r\n\t\t\t(birdX + bird.width >= pipe[i].x &&\r\n\t\t\t\tbirdX <= pipe[i].x + pipeNorth.width &&\r\n\t\t\t\t(birdY <= pipe[i].y + pipeNorth.height || birdY + bird.height >= pipe[i].y + constant)) ||\r\n\t\t\tbirdY + bird.height >= cvs.height - floor.height\r\n\t\t) {\r\n\t\t\tlocation.reload();\r\n\t\t}\r\n\t}\r\n\r\n\tctx.drawImage(floor, 0, cvs.height - floor.height);\r\n\tctx.drawImage(bird, birdX, birdY);\r\n\tvelocityBirdY += accelerateY;\r\n\tbirdY += velocityBirdY;\r\n\trequestAnimationFrame(draw);\r\n}\r\n\r\ndraw();\r\n\n\n//# sourceURL=webpack:///./frontend/src/App.js?");

/***/ })

/******/ });