define(['Examples/_Includes'], function ($) {
    (function (scope) {
        var Example = scope.Example || {};

        var ButtonExamples = function (style) {
            this.initialize(style);
        }

        var p = ButtonExamples.prototype = new scope.judgui.Frame();

        p.initialize = function (style) {
            this.add('Button', buttonProps(this, 'Randomize Button Colors', 'change button colors', ButtonStyle3, 6, 475));
            this.add('Button', buttonProps(this, 'Back to Menu', 'MainMenu', MenuButtonStyle, 650, 550));
            this.ExtendStyle(style);
        };

        var buttonProps = function (frame, text, value, style, x, y) {
            var $_Frame = frame;
            return {
                text: text,
                value: value,
                style: style,
                clickEvent: function (event) {
                    switch (event.Button._Value) {
                        case 'change button colors':
                            event.Button.Style({
                                color: judgui.Random.color(),
                                backgroundColor: judgui.Random.color(),
                                borderColor: judgui.Random.color()
                            });
                            break;

                        case 'MainMenu':
                            var FC = $_Frame.FrameCollection();
                            if (FC) {
                                FC.goto('MainMenu');
                            }
                            break;
                    }
                },
                x: x,
                y: y
            };
        }

        Example.ButtonExamples = ButtonExamples;
        scope.Example = Example;
    }(window));
});