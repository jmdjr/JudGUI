define(['jquery', 'Frames/FrameEngine', 'DataEditors/Button', 'Examples/GeneralButtons'], function ($) {
    $(function () {

        var Windows = new judgui.FrameEngine(600, 800);
        var MenusFC = Windows.NewFrameCollection('Menus', true);

        var MenuButtonStyle = {
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

        var buttonClick = function (event) {
            MenusFC.goto(event.Button._Value, false);
        }

        var MainMenu = new judgui.Frame();
        MainMenu.add('Button', {
            text: 'To Second Screen',
            value: 'GameFrame',
            style: MenuButtonStyle,
            clickEvent: buttonClick,
            x: 100,
            y: 100
        });


        var GameFrame = new judgui.Frame();
        GameFrame.add('Button', {
            text: 'To Test Frame',
            value: 'TestFrame',
            style: MenuButtonStyle,
            clickEvent: buttonClick,
            x: 100,
            y: 100
        });

        var TestFrame = new judgui.Frame();

        TestFrame.add('Button', {
            text: 'It Works',
            value: 'MainMenu',
            style: MenuButtonStyle,
            clickEvent: function () {
                MenusFC.goto("MainMenu", false);
            },
            x: 100,
            y: 100
        });


        MenusFC.add('MainMenu', MainMenu);
        MenusFC.add('GameFrame', GameFrame);
        MenusFC.add('TestFrame', TestFrame);
    });
});