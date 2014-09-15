define(['Examples/_Includes'], function ($) {
    (function (scope) {
        var Example = scope.Example || {};

        var TextFieldExamples = function (style) {
            this.initialize(style);
        }

        var p = TextFieldExamples.prototype = new scope.judgui.Frame();

        Example.TextFieldExamples = TextFieldExamples;
        scope.Example = Example;
    }(window));
});