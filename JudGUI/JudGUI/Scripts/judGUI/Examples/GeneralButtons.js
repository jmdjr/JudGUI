define(['jquery', 'Frames/FrameEngine', 'DataEditors/AllControls', 'Util/UtilityPieces'], function ($) {
    (function (scope) {
        var Example = scope.Example || {};

        var Buttons = function (style) {
            this.initialize(style);
        }

        var p = Buttons.prototype = new scope.judgui.Frame();

        var ButtonStyle = {
            font: "Arial",
            fontSize: 12,
            color: "#FFFFFF",
            textAlign: "center",
            textBaseline: "middle",
            borderRadius: 0,
            borderWidth: 1,
            borderColor: "#FF0000",
            backgroundColor: "#000000",
            height: 30,
            width: 125
        }

        var ButtonStyle2 = {
            font: "Times New Roman",
            fontSize: 8,
            color: "#FF0000",
            textAlign: "left",
            textBaseline: "top",
            borderRadius: 20,
            borderWidth: 3,
            borderColor: "#FF0000",
            backgroundColor: "#999999",
            height: 30,
            width: 200
        }

        var ButtonStyle3 = {
            font: "Comic Sans",
            fontSize: 24,
            color: "#000000",
            textAlign: "center",
            textBaseline: "top",
            borderRadius: 10,
            borderWidth: 10,
            borderColor: "#999999",
            backgroundColor: "#FFFFFF",
            height: 100,
            width: 150
        }

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

        p.initialize = function (style) {
            this.add('Button', buttonProps(this, 'Randomize Button Colors', 'change button colors', ButtonStyle3, 200, 200));
            this.add('Button', buttonProps(this, 'Back to Menu', 'MainMenu', ButtonStyle, 650, 550));
            this.ExtendStyle(style);
        };

        Example.Buttons = Buttons;
        scope.Example = Example;
    }(window));
});