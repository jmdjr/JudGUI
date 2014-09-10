
define(function (scope) {
    "use strict";

    var judgui = scope.judgui || {};

    var IsUndefined = function (object) {
        return typeof object === 'undefined' || object == null;
    }

    var FindParentOfType = function (element, oftype) {

        if (IsUndefined(element) || IsUndefined(oftype)) {
            return null;
        }

        if (IsUndefined(element.parent)) {
            return null;
        }

        if (typeof element.parent === oftype) {
            return element.parent;
        }

        return FindParentOfType(element.parent, oftype);
    }

    var FindParentInstanceOfType = function (element, oftype) {

        if (IsUndefined(element) || IsUndefined(oftype)) {
            return null;
        }

        if (IsUndefined(element.parent)) {
            return null;
        }

        if (element.parent instanceof oftype) {
            return element.parent;
        }

        return FindParentInstanceOfType(element.parent, oftype);
    }

    judgui.IsUndefined = IsUndefined;
    judgui.FindParentOfType = FindParentOfType;
    judgui.FindParentInstanceOfType = FindParentInstanceOfType;
    scope.judgui = judgui;
}(window));