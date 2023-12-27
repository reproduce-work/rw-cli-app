"use strict";

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* cerebral.technology completions manager */
/**
 * Manages the footer initialization and metadata toggle.
 */
var FooterManager = /*#__PURE__*/function () {
  function FooterManager() {
    _classCallCheck(this, FooterManager);
    this.initializeFooter();
  }
  _createClass(FooterManager, [{
    key: "initializeFooter",
    value: function initializeFooter() {
      var _this = this;
      var wrapperDiv = document.getElementById('rw-wrapper');
      if (!wrapperDiv) {
        wrapperDiv = document.createElement('div');
        wrapperDiv.id = 'rw-wrapper';
        document.body.appendChild(wrapperDiv);
      }
      fetch('/_rw/footer.html').then(function (response) {
        return response.text();
      }).then(function (data) {
        var footerDiv = document.createElement('div');
        footerDiv.id = 'rw-footer';
        footerDiv.innerHTML = data;
        wrapperDiv.appendChild(footerDiv);
        _this.setupMetadataToggle();
      })["catch"](function (error) {
        return console.error('Error loading footer:', error);
      });
    }
  }, {
    key: "setupMetadataToggle",
    value: function setupMetadataToggle() {
      var toggleButton = document.getElementById('toggle-metadata');
      if (toggleButton) {
        toggleButton.addEventListener('click', function () {
          var metadataMenu = document.getElementById('metadata-menu');
          if (metadataMenu) {
            metadataMenu.style.display = metadataMenu.style.display === 'none' ? 'block' : 'none';
          }
        });
      }
    }
  }]);
  return FooterManager;
}();
/**
 * Determines whether or not a user is actively typing and 
 * may find value in a completion
 */
var ActiveModeHandler = /*#__PURE__*/function () {
  function ActiveModeHandler() {
    _classCallCheck(this, ActiveModeHandler);
    this.activeMode = false;
    this.timeoutId = null;
    this.debounceTimer = null;
    this.lastValues = new Map();
    this.initEventListeners();
  }
  _createClass(ActiveModeHandler, [{
    key: "initEventListeners",
    value: function initEventListeners() {
      var _this2 = this;
      document.addEventListener('click', function () {
        return _this2.handleEvent();
      });
      document.addEventListener('keydown', function () {
        return _this2.handleEvent();
      });
      document.addEventListener('focusin', function (event) {
        return _this2.trackFocus(event, true);
      });
      document.addEventListener('focusout', function (event) {
        return _this2.trackFocus(event, false);
      });
    }
  }, {
    key: "handleEvent",
    value: function handleEvent() {
      if (!this.activeMode) {
        this.activateMode();
      } else {
        this.logDevMode('Timer reset triggered.');
        this.resetActiveModeTimer();
      }
    }
  }, {
    key: "activateMode",
    value: function activateMode() {
      this.activeMode = true;
      this.logDevMode('Active mode started.');
      this.resetActiveModeTimer();
    }
  }, {
    key: "resetActiveModeTimer",
    value: function resetActiveModeTimer() {
      var _this3 = this;
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(function () {
        _this3.activeMode = false;
        _this3.logDevMode('Active mode ended.');
      }, 10000); // 10 seconds active mode
    }
  }, {
    key: "trackFocus",
    value: function trackFocus(event, isFocused) {
      var target = event.target;
      if (target.matches('textarea, div[contenteditable="true"]')) {
        target.isFocused = isFocused;
      }
    }
  }, {
    key: "logDevMode",
    value: function logDevMode(message) {
      if (devMode) console.log(message);
    }
  }]);
  return ActiveModeHandler;
}();
/**
 * Handles input field interactions, debounce, and processing.
 */
var InputFieldHandler = /*#__PURE__*/function () {
  function InputFieldHandler(activeModeHandler) {
    _classCallCheck(this, InputFieldHandler);
    // Global state to track last values of input fields
    _defineProperty(this, "lastValues", new Map());
    this.activeModeHandler = activeModeHandler;
    this.setupInputFields();
  }
  _createClass(InputFieldHandler, [{
    key: "setupInputFields",
    value: function setupInputFields() {
      var _this4 = this;
      var inputFields = document.querySelectorAll('textarea, div[contenteditable="true"]');
      inputFields.forEach(function (inputField) {
        if (!inputField.hasListener) {
          inputField.addEventListener('keyup', function () {
            return _this4.debouncedHandleInputField(inputField);
          });
          inputField.hasListener = true;
        }
      });
    }
  }, {
    key: "debouncedHandleInputField",
    value: function debouncedHandleInputField(inputField) {
      var _this5 = this;
      if (inputField.isFocused && this.activeModeHandler.activeMode) {
        clearTimeout(this.activeModeHandler.debounceTimer);
        this.activeModeHandler.debounceTimer = setTimeout(function () {
          _this5.processInputField(inputField);
        }, 1000); // 1 second debounce period
      }
    }
  }, {
    key: "processInputField",
    value: function processInputField(inputField) {
      console.log('Entering processInputField');
      var inputText = inputField.innerText || inputField.value;
      var position = getCaretPosition(inputField);
      console.log('Input Text:', inputText);
      console.log('Caret Position:', position);
      if (shouldRequestCompletion(inputField)) {
        console.log('Requesting completion');
        var newText = getCompletion(inputField, inputText, position);
        console.log('New Text:', newText);
        displayCompletion(newText, inputField);
      }
    }
  }, {
    key: "shouldRequestCompletion",
    value: function shouldRequestCompletion(inputField) {
      var currentValue = inputField.tagName.toLowerCase() === 'textarea' ? inputField.value : inputField.innerText;
      var lastValue = lastValues.get(inputField) || '';
      var hasChanged = lastValue !== currentValue;
      lastValues.set(inputField, currentValue); // Update the last value
      var shouldRequest = inputField.isFocused && activeMode && hasChanged;
      if (devMode) {
        console.log('Should request? ', shouldRequest);
      }
      return shouldRequest;
    }
  }, {
    key: "getCaretPosition",
    value: function getCaretPosition(inputField) {
      if (inputField.tagName.toLowerCase() === 'textarea') {
        return inputField.selectionStart;
      } else if (inputField.getAttribute('contenteditable') === 'true') {
        var selection = window.getSelection();
        if (selection.rangeCount === 0) return 0; // No selection

        var range = selection.getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(inputField);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        return preCaretRange.toString().length;
      }
    }
  }, {
    key: "displayCompletion",
    value: function displayCompletion(newText, inputField) {
      if (inputField.tagName.toLowerCase() === 'textarea') {
        inputField.value = newText;
      } else {
        inputField.innerText = newText;
      }
    }
  }]);
  return InputFieldHandler;
}(); // Initialization
var devMode = true;
var activeModeHandler = new ActiveModeHandler();
var footerManager = new FooterManager();
var inputFieldHandler = new InputFieldHandler(activeModeHandler);
document.addEventListener('DOMContentLoaded', function () {
  // Additional initialization if needed
});