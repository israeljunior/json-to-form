"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory(root);
  } else {
    root.JsonToForm = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : void 0, function (window) {
  'use strict';

  var JsonToForm = function JsonToForm(options) {
    var data = options.data,
        container = options.container;
    /**
     * Control generator
     */

    function generateControl(options, id) {
      var elem = document.createElement('div');
      var _options$type = options.type,
          type = _options$type === void 0 ? 'text' : _options$type,
          _options$placeholder = options.placeholder,
          placeholder = _options$placeholder === void 0 ? '' : _options$placeholder,
          _options$name = options.name,
          name = _options$name === void 0 ? 'field' + id : _options$name,
          data = options.data,
          _options$label = options.label,
          label = _options$label === void 0 ? '' : _options$label; // Input [text, email, tel, file]

      var INPUT = function INPUT() {
        var elem = document.createElement('input');
        var className = type === 'file' ? 'file' : 'input';
        elem.setAttribute('name', name);
        elem.setAttribute('type', type);
        elem.setAttribute('placeholder', placeholder);
        elem.setAttribute('class', className);
        return elem;
      }; // Radio


      var RADIO = function RADIO(name, data) {
        var elem = document.createElement('ul');
        data.map(function (item, index) {
          elem.innerHTML += "\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<label class=\"radio\">\n\t\t\t\t\t\t\t\t<input name=\"".concat(name, "\" value=\"").concat(item.value || 'radio' + index, "\" type=\"radio\">\n\t\t\t\t\t\t\t\t").concat(item.title, "\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</li>");
        });
        return elem;
      }; // Checkbox


      var CHECKBOX = function CHECKBOX(name, data) {
        var elem = document.createElement('ul');
        data.map(function (item, index) {
          elem.innerHTML += "\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<label class=\"checkbox\">\n\t\t\t\t\t\t\t\t<input name=\"".concat(name, "\" value=\"").concat(item.value || 'checkbox' + index, "\" type=\"checkbox\">\n\t\t\t\t\t\t\t\t").concat(item.title, "\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</li>");
        });
        return elem;
      }; // Textarea


      var TEXTAREA = function TEXTAREA() {
        var elem = document.createElement('textarea');
        elem.setAttribute('class', 'textarea');
        elem.setAttribute('placeholder', placeholder);
        return elem;
      }; // Select


      var SELECT = function SELECT() {
        var elem = document.createElement('select');
        data.map(function (item, index) {
          var option = document.createElement('option');
          option.value = item.value || "option" + index;
          option.text = item.title;
          elem.appendChild(option);
        });
        elem.setAttribute('name', name);
        elem.setAttribute('type', type);
        return elem;
      };

      switch (type) {
        case 'select':
          elem.appendChild(SELECT());
          break;

        case 'radio':
          elem.appendChild(RADIO(name, data));
          break;

        case 'checkbox':
          elem.appendChild(CHECKBOX(name, data));
          break;

        case 'textarea':
          elem.appendChild(TEXTAREA());
          break;

        default:
          elem.appendChild(INPUT());
          break;
      }

      elem.setAttribute('class', 'control');
      return elem;
    }
    /**
     * Field generator
     */


    function generateField(options, id) {
      var elem = document.createElement('div'); // Label

      var LABEL = function LABEL() {
        var elem = document.createElement('label');
        elem.innerText = options.label || options.name;
        elem.setAttribute('class', 'label');
        return elem;
      };

      elem.setAttribute('class', 'field field--' + (options.type || 'text'));
      elem.appendChild(LABEL());
      elem.appendChild(generateControl(options, id));
      return elem;
    }
    /**
     * Form generator
     */


    function generateForm(options, fields) {
      var elem = document.createElement('form');

      var SUBMIT = function SUBMIT() {
        var elem = document.createElement('button');
        elem.setAttribute('class', 'button');
        elem.setAttribute('type', 'submit');
        elem.innerText = options.submitText || 'Submit';
        return elem;
      };

      var _options$method = options.method,
          method = _options$method === void 0 ? "GET" : _options$method,
          _options$action = options.action,
          action = _options$action === void 0 ? "" : _options$action;

      if (fields.length > 0) {
        fields.map(function (item, index) {
          elem.appendChild(generateField(item, index));
        });
      }

      elem.setAttribute('action', action);
      elem.setAttribute('method', method);
      elem.setAttribute('class', 'form');
      elem.appendChild(SUBMIT()); // Append to container

      document.querySelector(container).appendChild(elem);
    }
    /**
     * Load fields
     */


    function loadFields() {
      if (_typeof(data) === 'object') {
        return generateForm(data.options, data.fields);
      } else {
        return fetch(data).then(function (response) {
          return response.json();
        }).then(function (data) {
          generateForm(data.options, data.fields);
        });
      }
    }

    loadFields();
  };

  return JsonToForm;
});