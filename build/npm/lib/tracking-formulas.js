"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var topTop = exports.topTop = function topTop(containerRect) {
  return function (rect) {
    return ~ ~(rect.top - containerRect.top);
  };
};

var topBottom = exports.topBottom = function topBottom(containerRect, container) {
  return function (rect) {
    return ~ ~(rect.top - containerRect.top - container.clientHeight);
  };
};

var topCenter = exports.topCenter = function topCenter(containerRect, container) {
  return function (rect) {
    return ~ ~(rect.top - containerRect.top - container.clientHeight / 2);
  };
};

var centerTop = exports.centerTop = function centerTop(containerRect) {
  return function (rect) {
    return ~ ~(rect.top + rect.height / 2 - containerRect.top);
  };
};

var centerCenter = exports.centerCenter = function centerCenter(containerRect, container) {
  return function (rect) {
    return ~ ~(rect.top + rect.height / 2 - containerRect.top - container.clientHeight / 2);
  };
};

var centerBottom = exports.centerBottom = function centerBottom(containerRect, container) {
  return function (rect) {
    return ~ ~(rect.top + rect.height / 2 - containerRect.top - container.clientHeight);
  };
};

var bottomBottom = exports.bottomBottom = function bottomBottom(containerRect, container) {
  return function (rect) {
    return ~ ~(rect.bottom - containerRect.top - container.clientHeight);
  };
};

var bottomTop = exports.bottomTop = function bottomTop(containerRect) {
  return function (rect) {
    return ~ ~(rect.bottom - containerRect.top);
  };
};

var bottomCenter = exports.bottomCenter = function bottomCenter(containerRect, container) {
  return function (rect) {
    return ~ ~(rect.bottom - containerRect.top - container.clientHeight / 2);
  };
};

var getDocumentRect = exports.getDocumentRect = function getDocumentRect(documentRect) {
  return documentRect;
};
var getDocumentElement = exports.getDocumentElement = function getDocumentElement(_, documentElement) {
  return documentElement;
};
var calculateScrollY = exports.calculateScrollY = function calculateScrollY(_ref) {
  var top = _ref.top;
  return -top;
};