define(['jquery', 'Frames/FrameEngine', 'DataEditors/Button', 'Examples/GeneralButtons'], function ($) {
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

        var buttonProps = function (text, value, style, x, y) {
            return {
                text: text,
                value: value,
                style: style,
                clickEvent: function (event) {
                    switch (event.Button._Value) {
                        case 'change button colors':
                            debugger;
                            event.Button.UpdateStyle({
                                color: '#' + (Math.random().toString(16) + '000000').slice(2, 8),
                                backgroundColor: '#' + (Math.random().toString(16) + '000000').slice(2, 8),
                                borderColor: '#' + (Math.random().toString(16) + '000000').slice(2, 8)
                            });
                        break;
                    }
                },
                x: x,
                y: y
            };
        }

        p.initialize = function () {
            this.add('Button', buttonProps('Randomize Button Colors', 'change button colors', ButtonStyle3, 200, 200));
        };

        Example.Buttons = Buttons;
        scope.Example = Example;
    }(window));
});