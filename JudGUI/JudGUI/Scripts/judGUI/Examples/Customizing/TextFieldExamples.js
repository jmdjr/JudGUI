define(['Examples/_Includes'], function ($) {
    (function (scope) {
        var Example = scope.Example || {};

        var ButtonExamples = function (style) {
            this.initialize(style);
        }

        var p = ButtonExamples.prototype = new scope.judgui.Frame();

        Example.ButtonExamples = ButtonExamples;
        scope.Example = Example;
    }(window));
});