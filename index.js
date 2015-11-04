"use strict";

var React      = require('react');
var TestUtils  = require('react-addons-test-utils');

/**
 * Wrapper class for React's TestUtils ShallowRenderer to overcome some of its limitations.
 */
function ShallowRenderer() {
    this._renderer = TestUtils.createRenderer();
}

ShallowRenderer.prototype.getRenderOutput = function getRenderOutput() {
    return this._renderer.getRenderOutput();
};

/**
 * Get the component instance used by the renderer.
 */
ShallowRenderer.prototype.getMountedInstance = function getMountedInstance() {
    // Hack to get component instance: https://github.com/facebook/react/pull/4918
    return this._renderer._instance ? this._renderer._instance._instance : null;
};

/**
 * Render the component with context.
 */
ShallowRenderer.prototype.render = function render(createElement, context) {
    if (!createElement) {
        throw new Error('Must pass `createElement` function to `ShallowRenderer#render`');
    }

    context = context || {};
    this._renderer.render(createElement(), context);

    return this;
};

ShallowRenderer.prototype.unmount = function unmount() {
    this._renderer.unmount();
};


var filterComponent = function (component, predicate) {
        var i;
        var j;
        var results = [];
        
        if (predicate(component)) {
            results.push(component);
        }

        if (component && component.props && component.props.children && component.props.children.length) {
            for (i = 0; i < component.props.children.length; i++) {
                results = results.concat(filterComponent(component.props.children[i], predicate));
            }
        } else if (component && component.props && component.props.children) {
            results = results.concat(filterComponent(component.props.children, predicate));
        } else if (Array.isArray(component)) {
            for (j = 0; j < component.length; j++) {
                results = results.concat(filterComponent(component[j], predicate));
            }
        }

        return results;
};

var shallowHelpers = module.exports = {
    createRenderer: function () {
        return new ShallowRenderer();
    },
    renderWithContext: function (makeComponent, context) {
        var shallowRenderer = shallowHelpers.createRenderer();
        shallowRenderer.render(makeComponent, context);
        return shallowRenderer.getRenderOutput();
    },
    renderFactory: function(makeComponent) {
        return function(props, context) {
            return shallowHelpers.renderWithContext(function () {
                return React.createElement(makeComponent, props);
            }, context);
        }
    },
    filter: filterComponent,
    find: function () {
        return filterComponent.apply(this, arguments)[0];
    },
    hasClass: function (component, className) {
        var classes = component && component.props && component.props.className || '';
        var classArr = classes.split(' ');
        return classArr.indexOf(className) !== -1;
    },
    isType: function (component, type) {
        return component && component.type === type;
    },
    findType: function (component, type) {
        return shallowHelpers.find(component, function (c) {
            return shallowHelpers.isType(c, type);
        });
    },
    filterType: function (component, type) {
        return shallowHelpers.filter(component, function (c) {
            return shallowHelpers.isType(c, type);
        });
    },
    findClass: function (component, className) {
        return shallowHelpers.find(component, function(c) {
            return shallowHelpers.hasClass(c, className);
        });
    },
    filterClass: function (component, className) {
        return shallowHelpers.filter(component, function(c) {
            return shallowHelpers.hasClass(c, className);
        });
    }
};
