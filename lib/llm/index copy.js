"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var devMode = true;
var currentTabListener = null;
var currentFocusedInput = null;
document.addEventListener('DOMContentLoaded', function () {
  // Initialize and append the footer
  initializeFooter();

  // Set up event listeners for active mode and textareas
  setupActiveMode();
  setupInputFields();
});
function setupMetadataToggle() {
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
function initializeFooter() {
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
    setupMetadataToggle();
  })["catch"](function (error) {
    return console.error('Error loading footer:', error);
  });
}
var activeMode = false;
var timeoutId;
function setupActiveMode() {
  document.addEventListener('click', function (event) {
    return handleEvent(event);
  });
  document.addEventListener('keydown', function (event) {
    return handleEvent(event);
  });
  activateMode();
}
function handleEvent(event) {
  if (!activeMode) {
    activateMode();
  } else {
    if (devMode) {
      console.log('Timer reset triggered.');
    }
    resetActiveModeTimer();
  }
  if (activeMode) {
    handleInputField(event);
  }
}
function activateMode() {
  activeMode = true;
  console.log('Active mode started.');
  resetActiveModeTimer();
}
function resetActiveModeTimer() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function () {
    activeMode = false;
    console.log('Active mode ended.');
  }, 10000); // 10 seconds active mode
}
function setupInputFields() {
  var inputFields = document.querySelectorAll('textarea, div[contenteditable="true"]');
  inputFields.forEach(function (inputField) {
    // Check if the listener has already been attached
    if (!inputField.hasListener) {
      inputField.debouncedHandler = debounce(handleInputField, 500);
      inputField.addEventListener('keyup', inputField.debouncedHandler);
      inputField.hasListener = true; // Set the flag
    }
  });
}
var debounceTimer;
function handleInputField(event) {
  if (event.target.isFocused && activeMode) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      processInputField(event.target);
    }, 1000); //  1 s debounce period
  }
}
function processInputField(_x) {
  return _processInputField.apply(this, arguments);
} // Global state to track last values of input fields
function _processInputField() {
  _processInputField = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(inputField) {
    var inputText, position, newText;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('Entering processInputField');
          inputText = inputField.innerText || inputField.value;
          position = getCaretPosition(inputField);
          console.log('Input Text:', inputText);
          console.log('Caret Position:', position);
          if (!shouldRequestCompletion(inputField)) {
            _context.next = 12;
            break;
          }
          console.log('Requesting completion');
          _context.next = 9;
          return getCompletion(inputField, inputText, position);
        case 9:
          newText = _context.sent;
          console.log('New Text:', newText);
          displayCompletion(newText, inputField);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _processInputField.apply(this, arguments);
}
var lastValues = new Map();
function shouldRequestCompletion(inputField) {
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
function getCaretPosition(inputField) {
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

// Modify focus tracking to include input[type="text"]
document.addEventListener('focusin', function (event) {
  if (event.target.tagName.toLowerCase() === 'textarea' || event.target.tagName.toLowerCase() === 'input' || event.target.getAttribute('contenteditable') === 'true') {
    event.target.isFocused = true;
    currentFocusedInput = event.target;
  }
});
document.addEventListener('focusout', function (event) {
  if (event.target.tagName.toLowerCase() === 'textarea' || event.target.tagName.toLowerCase() === 'input' || event.target.getAttribute('contenteditable') === 'true') {
    event.target.isFocused = false;
    if (currentFocusedInput === event.target && currentTabListener) {
      document.removeEventListener('keydown', currentTabListener);
      currentTabListener = null;
    }
    currentFocusedInput = null;
  }
});

// Function to display the completion preview
function displayCompletion(newText, inputField, position) {
  var previewSpan = document.createElement('span');
  previewSpan.id = 'completion-preview';
  previewSpan.style.opacity = '0.6';
  previewSpan.textContent = newText;
  insertAtCaret(inputField, previewSpan, position);
}

// Function to insert an element at the caret position
function insertAtCaret(inputField, element, position) {
  if (inputField.tagName.toLowerCase() === 'textarea' || inputField.tagName.toLowerCase() === 'input') {
    // For textareas and inputs, you may need a different approach
    // as they do not support direct HTML insertion
  } else if (inputField.getAttribute('contenteditable') === 'true') {
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(inputField.firstChild, position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    range.insertNode(element);
  }
}

// Function to get the completion text asynchronously
function getCompletion(_x2, _x3, _x4) {
  return _getCompletion.apply(this, arguments);
} // Function to get the context around the caret position
function _getCompletion() {
  _getCompletion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(Field, Text, position) {
    var show_preview,
      _getContext,
      prefix,
      suffix,
      prompt,
      completions,
      getCompletedText,
      completedText,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          getCompletedText = function _getCompletedText(text, position, completion) {
            // wrap completions in <span id="testCOMPLETION" style="opacity: 0.6;">completion</span>

            // detect Field type and insert completion accordingly
            if (Field.tagName.toLowerCase() === 'textarea' || Field.tagName.toLowerCase() === 'input') {
              return text.substring(0, position) + completion + text.substring(position);
            } else {
              return text.substring(0, position) + "<span id=\"testCOMPLETION\" style=\"opacity: 0.6;\">".concat(completion, "</span>") + text.substring(position);
            }
          };
          show_preview = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : true;
          _getContext = getContext(Text, position), prefix = _getContext.prefix, suffix = _getContext.suffix;
          prompt = "<PRE> ".concat(prefix, " <SUF> ").concat(suffix, " <MID>");
          console.log('Prompt:', prompt);
          completions = ['completion1', "completion2"]; // Mocked completions for now
          // Function to get the text with the completion inserted at the specified position
          completedText = show_preview ? getCompletedText(Text, position, completions[0]) : '';
          setupCompletionInsertion(Field, position, completedText);
          return _context2.abrupt("return", completedText);
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getCompletion.apply(this, arguments);
}
function getContext(text, position) {
  var contextRadius = 100;
  var start = Math.max(0, position - contextRadius);
  var end = Math.min(text.length, position + contextRadius);
  return {
    prefix: text.substring(start, position),
    suffix: text.substring(position, end)
  };
}

// Function to setup the completion insertion on Tab key press
function setupCompletionInsertion(inputField, position, completion) {
  if (!inputField || !(inputField instanceof Element)) {
    console.error('Invalid input field');
    return;
  }
  if (currentTabListener) {
    document.removeEventListener('keydown', currentTabListener);
    currentTabListener = null;
  }
  currentTabListener = function currentTabListener(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      finalizeCompletion(inputField, position, completion);
    }
  };
  document.addEventListener('keydown', currentTabListener);
}

// Function to finalize the completion by setting the opacity to full
function finalizeCompletion(inputField, position, completion) {
  var previewSpan = document.getElementById('completion-preview');
  if (previewSpan) {
    previewSpan.style.opacity = '1'; // Set opacity to full

    // Move the cursor to the end of the completion
    var newPosition = position + completion.length;
    if (inputField.tagName.toLowerCase() === 'textarea' || inputField.tagName.toLowerCase() === 'input') {
      inputField.selectionStart = inputField.selectionEnd = newPosition;
    } else if (inputField.getAttribute('contenteditable') === 'true') {
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStartAfter(previewSpan);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}
function getNodeAtPosition(root, position) {
  var node;
  var offset = 0;
  function getNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (position <= offset + node.length) {
        return {
          node: node,
          offset: position - offset
        };
      }
      offset += node.length;
    } else {
      var _iterator = _createForOfIteratorHelper(node.childNodes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          var result = getNode(child);
          if (result) {
            return result;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return null;
  }
  node = getNode(root);
  return node || {
    node: null,
    offset: 0
  };
}