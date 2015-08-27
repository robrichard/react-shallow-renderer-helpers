"use strict";

var filterComponent = function (component, predicate) {
        var i;
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
        }

        return results;
};

var shallowHelpers = module.exports = {
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
        console.log(component.type, type);
        return component.type === type;
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
