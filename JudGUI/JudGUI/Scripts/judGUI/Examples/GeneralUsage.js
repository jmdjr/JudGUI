define(['jquery', 'Frames/FrameEngine', 'DataEditors/Button'], function ($) {
    $(function () {

        var Windows = new judgui.FrameEngine(600, 800);
        var MenusFC = Windows.NewFrameCollection('Menus', true);

        var buttonStyle = {
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

        var MainMenu = new judgui.Frame(function () {
            var screen = new createjs.Shape();
            this.transitionInDuration = 500;
            screen.graphics.s("#FF0000").rr(1, 1, Windows.bounds.width - 2, Windows.bounds.height - 2, 0);
            var testButton = new judgui.Button("Goto Game Frame", "", buttonStyle, function () {
                MenusFC.goto("GameScreen", false);
            }).position(300, 400);

            this.addChild(screen);
            this.addChild(testButton);

        });

        var GameFrame = new judgui.Frame(function () {
            var testButton = new judgui.Button("Goto Main Menu", "", buttonStyle, function () {
                MenusFC.goto("TestFrame", false);
            }).position(100, 100);

            this.addChild(testButton);
        });

        var TestFrame = new judgui.Frame();

        TestFrame.add('Button', {
            text: 'It Works',
            value: '',
            style: buttonStyle,
            clickEvent: function () {
                MenusFC.goto("MainMenu", false);
            },
            x: 100,
            y: 100
        });


        MenusFC.add('MainMenu', MainMenu);
        MenusFC.add('GameScreen', GameFrame);
        MenusFC.add('TestFrame', TestFrame);
    });
});