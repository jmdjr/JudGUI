
define(function (scope) {
    "use strict";

    var judgui = scope.judgui || {};

    var IsUndefined = function (object) {
        return typeof object === 'undefined' || object == null;
    }

    judgui.IsUndefined = IsUndefined;
    scope.judgui = judgui;
}(window));