'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultRect = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
var identity = function identity(x) {
  return x;
};

function createInjector(component) {
  var _class, _temp;

  return _temp = _class = (function (_React$Component) {
    _inherits(Track, _React$Component);

    function Track(props) {
      var _class2, _temp2;

      _classCallCheck(this, Track);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Track).call(this, props));

      var self = _this;

      _this.DecoratedComponent = (_temp2 = _class2 = (function (_React$Component2) {
        _inherits(_class3, _React$Component2);

        function _class3() {
          _classCallCheck(this, _class3);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).apply(this, arguments));
        }

        _createClass(_class3, [{
          key: 'render',
          value: function render() {
            var _props$ref = this.props.ref;

            var _ref = _props$ref === undefined ? self.props.ref || identity : _props$ref;

            return _react2.default.createElement(props.component, _extends({}, self.props, this.props, {
              ref: function ref(r) {
                return _ref(self.nodeRef = r);
              } }));
          }
        }]);

        return _class3;
      })(_react2.default.Component), _class2.propTypes = { ref: _react2.default.PropTypes.func }, _temp2);
      _this.state = {};
      return _this;
    }

    _createClass(Track, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps() {
        var node = (0, _reactDom.findDOMNode)(this.nodeRef);
        var rect = node.getBoundingClientRect();
        this.setState({ rect: rect, node: node });
      }
    }, {
      key: 'render',
      value: function render() {
        var _props;

        var _state = this.state;
        var _state$rect = _state.rect;
        var rect = _state$rect === undefined ? defaultRect : _state$rect;
        var _state$node = _state.node;
        var node = _state$node === undefined ? {} : _state$node;

        return (_props = this.props).children.apply(_props, [this.DecoratedComponent].concat(_toConsumableArray(this.props.formulas.map(function (formula) {
          return formula(rect, node);
        }))));
      }
    }]);

    return Track;
  })(_react2.default.Component), _class.propTypes = { ref: _react2.default.PropTypes.func,
    children: _react2.default.PropTypes.func.isRequired,
    formulas: _react2.default.PropTypes.array }, _class.defaultProps = { formulas: [identity], component: component }, _temp;
}

var Track = createInjector('div');

var TrackDocument = (function (_React$Component3) {
  _inherits(TrackDocument, _React$Component3);

  function TrackDocument(props) {
    _classCallCheck(this, TrackDocument);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(TrackDocument).call(this, props));

    _this3.state = { rect: null };
    return _this3;
  }

  _createClass(TrackDocument, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      var cancel = _raf2.default.cancel;

      var rafId = undefined;

      var update = function update() {
        var docRect = document.documentElement.getBoundingClientRect();
        var bodyRect = document.body.getBoundingClientRect();
        var rect = docRect.top <= bodyRect.top ? docRect : bodyRect;

        _this4.setState({ rect: rect });
      };

      var handleScroll = function handleScroll(event) {
        cancel(rafId);
        rafId = (0, _raf2.default)(update);
      };

      window.addEventListener('scroll', handleScroll);

      this.removeScrollHandler = function () {
        cancel(rafId);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeScrollHandler();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2;

      var rect = this.state.rect;

      var element = typeof document !== 'undefined' && document.documentElement;
      if (!rect) {
        if (element) {
          rect = element.getBoundingClientRect();
        } else {
          rect = defaultRect;
          element = {}; // bah
        }
      }
      return (_props2 = this.props).children.apply(_props2, _toConsumableArray(this.props.formulas.map(function (formula) {
        return formula(rect, element);
      })));
    }
  }]);

  return TrackDocument;
})(_react2.default.Component);

TrackDocument.propTypes = { children: _react2.default.PropTypes.func.isRequired,
  formulas: _react2.default.PropTypes.array };
TrackDocument.defaultProps = { formulas: [identity] };

function createTrackedComponent(component) {
  var _class4, _temp3;

  return _temp3 = _class4 = (function (_React$Component4) {
    _inherits(Tracked, _React$Component4);

    function Tracked(props) {
      _classCallCheck(this, Tracked);

      var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(Tracked).call(this, props));

      _this5.state = {};
      return _this5;
    }

    _createClass(Tracked, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps() {
        var node = (0, _reactDom.findDOMNode)(this.nodeRef);
        var rect = node.getBoundingClientRect();
        this.setState({ rect: rect, node: node });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this6 = this;

        var _state2 = this.state;
        var _state2$rect = _state2.rect;
        var rect = _state2$rect === undefined ? defaultRect : _state2$rect;
        var _state2$node = _state2.node;
        var node = _state2$node === undefined ? {} : _state2$node;
        var props = this.props;

        return _react2.default.createElement(
          props.component,
          _extends({ ref: function ref(r) {
              return _this6.nodeRef = r;
            } }, props),
          props.children.apply(props, _toConsumableArray(props.formulas.map(function (formula) {
            return formula(rect, node);
          })))
        );
      }
    }]);

    return Tracked;
  })(_react2.default.Component), _class4.propTypes = { children: _react2.default.PropTypes.func.isRequired,
    formulas: _react2.default.PropTypes.array,
    component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.string]) }, _class4.defaultProps = { formulas: [identity], component: component }, _temp3;
}

var TrackedDiv = createTrackedComponent('div');

exports.default = {
  defaultRect: defaultRect,
  createInjector: createInjector,
  Track: Track,
  TrackDocument: TrackDocument,
  createTrackedComponent: createTrackedComponent,
  TrackedDiv: TrackedDiv
};