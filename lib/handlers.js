"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Handlers = (function () {
  function Handlers() {
    _classCallCheck(this, Handlers);

    var defaults = {
      collection: [],
      id: 0
    };
    Object.assign(this, defaults);
  }

  _createClass(Handlers, [{
    key: "generateId",
    value: function generateId() {
      return this.id++;
    }
  }, {
    key: "contain",
    value: function contain(id) {
      return Boolean(this.collection[id]);
    }
  }, {
    key: "add",
    value: function add(handler) {
      var id = this.generateId();
      this.collection[id] = handler;
      return id;
    }
  }, {
    key: "get",
    value: function get(id) {
      return this.collection[id];
    }
  }, {
    key: "remove",
    value: function remove(id) {
      delete this.collection[id];
    }
  }]);

  return Handlers;
})();

exports["default"] = Handlers;
module.exports = exports["default"];