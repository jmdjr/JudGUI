define(['jquery', 'Frames/FrameEngine', 'DataEditors/Button', 'Examples/GeneralButtons', 'Frames/Debuggable'], function ($) {
    $(function () {
        var Windows = new judgui.FrameEngine(600, 800);
        var MenusFC = Windows.NewFrameCollection('Menus', true);


        var MenuButtonStyle = {
            font: "12px Arial",
            color: "#FFFFFF",
            textAlign: "center",
            textBaseline: "middle",
            borderRadius: 0,
            borderWidth: 5,
            borderColor: "#FF0000",
            backgroundColor: "#000000",
            height: 30,
            width: 125
        }

        var MenuBackgroundStyle = {
            imageURL: '',     //if defined, attempts to create a bitmap using this url.
            height: null,     //if set to null, will set to dimension of engine.
            width: null,      //if set to null, will set to dimension of engine.
            borderWidth: 5,
            borderColor: '#000000',
            backgroundColor: '#FFFFFF',
            borderRadius: 20
        }

        var buttonClick = function (event) {
            MenusFC.goto(event.Button._Value, false);
        }

        var MainMenu = new judgui.Frame();
        MainMenu.add('Button', {
            text: 'To GeneralButtons',
            value: 'GeneralButtons',
            style: MenuButtonStyle,
            clickEvent: buttonClick,
            x: 100,
            y: 100
        });

        var GameFrame = new judgui.Frame(MenuBackgroundStyle);
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
        MenusFC.add('GeneralButtons', new Example.Buttons);
        MenusFC.add('TestFrame', TestFrame);

        var debug = new PresentDebug();
    });
});