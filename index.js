"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _cookie = require("cookie");

var _shortid = require("shortid");

var _libHandlers = require("./lib/handlers");

var _libHandlers2 = _interopRequireDefault(_libHandlers);

var WsSession = (function (_Handlers) {
  _inherits(WsSession, _Handlers);

  function WsSession(serverUrl) {
    _classCallCheck(this, WsSession);

    _get(Object.getPrototypeOf(WsSession.prototype), "constructor", this).call(this);
    var cookieObj = (0, _cookie.parse)(document.cookie);
    if (cookieObj.wsSessionId) {
      this.wsSessionId = cookieObj.wsSessionId;
    } else {
      this.wsSessionId = (0, _shortid.generate)();
      document.cookie = "wsSessionId=" + this.wsSessionId + ";";
    }
    this.webSocket = new WebSocket(serverUrl);
  }

  _createClass(WsSession, [{
    key: "ready",
    value: function ready(callback) {
      var _this = this;

      var handler = function handler() {
        callback();
        _this.webSocket.removeEventListener("open", handler);
      };
      this.webSocket.addEventListener("open", handler);
      return _get(Object.getPrototypeOf(WsSession.prototype), "add", this).call(this, {
        type: 0,
        handler: handler
      });
    }
  }, {
    key: "once",
    value: function once(eventName, callback) {
      var _this2 = this;

      var handler = function handler() {
        callback();
        _this2.off(id);
      };
      var id = this.on(eventName, handler);
      return id;
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      function handler(event) {
        var messageJSON = event.data;

        var message = JSON.parse(messageJSON);
        var remoteEventName = message.eventName;
        var messageData = message.data;

        if (eventName === remoteEventName) {
          callback.apply(null, messageData);
        }
      }
      this.webSocket.addEventListener("message", handler);
      return _get(Object.getPrototypeOf(WsSession.prototype), "add", this).call(this, {
        type: 1,
        handler: handler
      });
    }
  }, {
    key: "off",
    value: function off() {
      var _this3 = this;

      Array.prototype.forEach.call(arguments, function (id) {
        if (_get(Object.getPrototypeOf(WsSession.prototype), "contain", _this3).call(_this3, id)) {
          var _get$call = _get(Object.getPrototypeOf(WsSession.prototype), "get", _this3).call(_this3, id);

          var type = _get$call.type;
          var handler = _get$call.handler;

          switch (type) {
            case 0:
              _this3.webSocket.removeEventListener("open", handler);
              break;
            case 1:
              _this3.webSocket.removeEventListener("message", handler);
              break;
          }
          _get(Object.getPrototypeOf(WsSession.prototype), "remove", _this3).call(_this3, id);
        }
      });
    }
  }, {
    key: "to",
    value: function to(eventName, data) {
      var message = {
        eventName: eventName,
        data: data
      };
      var messageJSON = JSON.stringify(message);
      this.webSocket.send(messageJSON);
    }
  }]);

  return WsSession;
})(_libHandlers2["default"]);

exports["default"] = WsSession;
module.exports = exports["default"];