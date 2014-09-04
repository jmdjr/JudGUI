﻿define(['jquery', 'Frames/FrameEngine', 'DataEditors/Button', 'Examples/GeneralButtons', 'Util/UtilityPieces'], function ($) {
    (function (scope) {
        var Example = scope.Example || {};

        var Buttons = function () {
            this.initialize();
        }

        var p = Buttons.prototype = new scope.judgui.Frame();

        var ButtonStyle = {
            font: "12px Arial",
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
            font: "8px Times New Roman",
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
            font: "24px Comic Sans",
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
                            event.Button.UpdateStyle({
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

        p.initialize = function () {
            this.add('Button', buttonProps(this, 'Randomize Button Colors', 'change button colors', ButtonStyle3, 200, 200));
            this.add('Button', buttonProps(this, 'Back to Menu', 'MainMenu', ButtonStyle, 650, 550));
        };

        Example.Buttons = Buttons;
        scope.Example = Example;
    }(window));
});