/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var assertValidEventName = function assertValidEventName(eventName) {
	  if (!eventName || typeof eventName !== 'string') {
	    throw new Error('Event name should be a valid non-empty string!');
	  }
	};
	
	var assertValidHandler = function assertValidHandler(handler) {
	  if (typeof handler !== 'function') {
	    throw new Error('Handler should be a function!');
	  }
	};
	
	var assertAllowedEventName = function assertAllowedEventName(allowedEvents, eventName) {
	  if (allowedEvents && allowedEvents.indexOf(eventName) < 0) {
	    throw new Error('Event "' + eventName + '" is not allowed!');
	  }
	};
	
	var p = Object.freeze({
	  allowedEvents: Symbol('allowedEvents'),
	  listeners: Symbol('listeners')
	});
	
	var EventDispatcher = function () {
	  function EventDispatcher(allowedEvents) {
	    _classCallCheck(this, EventDispatcher);
	
	    if (typeof allowedEvents !== 'undefined' && !Array.isArray(allowedEvents)) {
	      throw new Error('Allowed events should be a valid array of strings!');
	    }
	
	    this[p.listeners] = new Map();
	    this[p.allowedEvents] = allowedEvents;
	  }
	
	  /**
	   * Registers listener function to be executed once event occurs.
	   *
	   * @param {string} eventName Name of the event to listen for.
	   * @param {function} handler Handler to be executed once event occurs.
	   */
	
	
	  _createClass(EventDispatcher, [{
	    key: 'on',
	    value: function on(eventName, handler) {
	      assertValidEventName(eventName);
	      assertAllowedEventName(this[p.allowedEvents], eventName);
	      assertValidHandler(handler);
	
	      var handlers = this[p.listeners].get(eventName);
	      if (!handlers) {
	        handlers = new Set();
	        this[p.listeners].set(eventName, handlers);
	      }
	
	      // Set.add ignores handler if it has been already registered.
	      handlers.add(handler);
	    }
	
	    /**
	     * Registers listener function to be executed only first time when event
	     * occurs.
	     *
	     * @param {string} eventName Name of the event to listen for.
	     * @param {function} handler Handler to be executed once event occurs.
	     */
	
	  }, {
	    key: 'once',
	    value: function once(eventName, handler) {
	      var _this = this;
	
	      assertValidHandler(handler);
	
	      var once = function once(parameters) {
	        _this.off(eventName, once);
	
	        handler.call(_this, parameters);
	      };
	
	      this.on(eventName, once);
	    }
	
	    /**
	     * Removes registered listener for the specified event.
	     *
	     * @param {string} eventName Name of the event to remove listener for.
	     * @param {function} handler Handler to remove, so it won't be executed
	     * next time event occurs.
	     */
	
	  }, {
	    key: 'off',
	    value: function off(eventName, handler) {
	      assertValidEventName(eventName);
	      assertAllowedEventName(this[p.allowedEvents], eventName);
	      assertValidHandler(handler);
	
	      var handlers = this[p.listeners].get(eventName);
	      if (!handlers) {
	        return;
	      }
	
	      handlers.delete(handler);
	
	      if (!handlers.size) {
	        this[p.listeners].delete(eventName);
	      }
	    }
	
	    /**
	     * Removes all registered listeners for the specified event.
	     *
	     * @param {string=} eventName Name of the event to remove all listeners for.
	     */
	
	  }, {
	    key: 'offAll',
	    value: function offAll(eventName) {
	      if (typeof eventName === 'undefined') {
	        this[p.listeners].clear();
	        return;
	      }
	
	      assertValidEventName(eventName);
	      assertAllowedEventName(this[p.allowedEvents], eventName);
	
	      var handlers = this[p.listeners].get(eventName);
	      if (!handlers) {
	        return;
	      }
	
	      handlers.clear();
	
	      this[p.listeners].delete(eventName);
	    }
	
	    /**
	     * Emits specified event so that all registered handlers will be called
	     * with the specified parameters.
	     *
	     * @param {string} eventName Name of the event to call handlers for.
	     * @param {Object=} parameters Optional parameters that will be passed to
	     * every registered handler.
	     */
	
	  }, {
	    key: 'emit',
	    value: function emit(eventName, parameters) {
	      var _this2 = this;
	
	      assertValidEventName(eventName);
	      assertAllowedEventName(this[p.allowedEvents], eventName);
	
	      var handlers = this[p.listeners].get(eventName);
	      if (!handlers) {
	        return;
	      }
	
	      handlers.forEach(function (handler) {
	        try {
	          handler.call(_this2, parameters);
	        } catch (error) {
	          console.error(error);
	        }
	      });
	    }
	
	    /**
	     * Checks if there are any listeners that listen for the specified event.
	     *
	     * @param {string} eventName Name of the event to check listeners for.
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'hasListeners',
	    value: function hasListeners(eventName) {
	      assertValidEventName(eventName);
	      assertAllowedEventName(this[p.allowedEvents], eventName);
	
	      return this[p.listeners].has(eventName);
	    }
	
	    /**
	     * Mixes dispatcher methods into target object.
	     * @param {Object} target Object to mix dispatcher methods into.
	     * @param {Array.<string>?} allowedEvents Optional list of the allowed event
	     * names that can be emitted and listened for.
	     * @returns {Object} Target object with added dispatcher methods.
	     */
	
	  }], [{
	    key: 'mixin',
	    value: function mixin(target, allowedEvents) {
	      if (!target || (typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
	        throw new Error('Object to mix into should be valid object!');
	      }
	
	      if (typeof allowedEvents !== 'undefined' && !Array.isArray(allowedEvents)) {
	        throw new Error('Allowed events should be a valid array of strings!');
	      }
	
	      var dispatcher = new EventDispatcher(allowedEvents);
	      ['on', 'once', 'off', 'offAll', 'emit', 'hasListeners'].forEach(function (method) {
	        if (typeof target[method] !== 'undefined') {
	          throw new Error('Object to mix into already has "' + method + '" property defined!');
	        }
	
	        if (method !== 'constructor') {
	          target[method] = dispatcher[method].bind(dispatcher);
	        }
	      }, dispatcher);
	
	      return target;
	    }
	  }]);
	
	  return EventDispatcher;
	}();
	
	exports.default = EventDispatcher;

/***/ }
/******/ ]);
//# sourceMappingURL=event-dispatcher.es2015.js.map