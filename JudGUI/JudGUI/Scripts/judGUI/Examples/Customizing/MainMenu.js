define(['jquery', 'Examples/_Includes'], function ($) {
    (function (scope) {
        var Example = scope.Example || {};

        var MainMenu = function (style) {
            this.initialize(style);
        }

        var p = MainMenu.prototype = new scope.judgui.Frame();

        p.initialize = function (style) {
            var $this = this;
            var buttonClick = function (event) {
                $this.FrameCollection().goto(event.Button._Value, false);
            }

            this.add('TextLabel', {
                text: 'Example JudGui Application!',
                style: MenuTitleStyle,
                x: 227,
                y: 100
            });

            this.add('Button', {
                text: 'Button Examples',
                value: 'ButtonExamples',
                style: MenuButtonStyle,
                clickEvent: buttonClick,
                x: 324,
                y: 234
            });
            debugger;
            this.add('Button', {
                text: 'TextField Examples',
                value: 'TextFieldExamples',
                style: MenuButton2Style,
                clickEvent: buttonClick,
                x: 311,
                y: 282
            });

            this.ExtendStyle(style);
        }

        Example.MainMenu = MainMenu;
        scope.Example = Example;
    }(window));

});