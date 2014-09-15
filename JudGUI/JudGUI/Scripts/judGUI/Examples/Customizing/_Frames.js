// Groups all Examples together
define(['Examples/_Styles', 'Examples/Customizing/ButtonExamples', 'Examples/Customizing/MainMenu', 'Examples/Customizing/TextFieldExamples'], function ($) {
    (function (scope) {
        var Example = scope.Example || {};

        var Customizing_Frames = function (name, style) {
            this.initialize(name, style);
        }

        var p = Customizing_Frames.prototype = new scope.judgui.FrameCollection();

        p.initialize = function (name, style) {
            this.FrameCollection_init(name, style);
        }

        p.loadFrames = function () {
            this.add('MainMenu', new Example.MainMenu(MenuBackgroundStyle));
            this.add('ButtonExamples', new Example.ButtonExamples(MenuBackgroundStyle));

            return this;
        }

        Example.Customizing_Frames = Customizing_Frames;
        scope.Example = Example;

    }(window));
});