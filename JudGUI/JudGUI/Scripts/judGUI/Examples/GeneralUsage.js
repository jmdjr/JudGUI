var SYSTEM_DEBUG = null;
define(['jquery', 'Frames/FrameEngine', 'Examples/AllMenus', 'Frames/Debuggable'], function ($) {
    $(function () {

        var MenuBackgroundStyle = {
            imageURL: '',     //if defined, attempts to create a bitmap using this url.
            height: null,     //if set to null, will set to dimension of engine.
            width: null,      //if set to null, will set to dimension of engine.
            borderWidth: 5,
            borderColor: '#000000',
            backgroundColor: '#FF0000',
            borderRadius: 0
        }
        var Windows = new judgui.FrameEngine(700, 1000, null, MenuBackgroundStyle);
        SYSTEM_DEBUG = Windows;

        var wBounds = Windows.bounds;

        wBounds.width -= 800;
        
        MenuBackgroundStyle = {
            imageURL: '',     //if defined, attempts to create a bitmap using this url.
            height: 600,     //if set to null, will set to dimension of engine.
            width: 800,      //if set to null, will set to dimension of engine.
            borderWidth: 10,
            borderColor: '#000000',
            backgroundColor: '#FFFFFF',
            borderRadius: 0
        }

        var MenusFC = Windows.NewFrameCollection('Menus', true, MenuBackgroundStyle).position(wBounds.width - 6, 6);  // basic positioning should be Math.ceil of 1/2 the border width.

        var MenuButtonStyle = {
            font: "Arial",
            fontSize: 12,
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

        var MenuTitleStyle = {
            font: "Arial",
            fontSize: 42,
            height: 300,
            width: 500
        }

        var MenuTextFieldStyle = {
            font: "Arial",
            fontSize: 12,
            color: "#000000",
            borderRadius: 0,
            borderWidth: 1,
            borderColor: "#333333",
            backgroundColor: "#FFFFFF",
            height: 30,
            width: 250
        }


        var buttonClick = function (event) {
            MenusFC.goto(event.Button._Value, false);
        }
        
        // First Example of building a frame by hand.
        var MainMenu = new judgui.Frame(MenuBackgroundStyle);

        MainMenu.add('Button', {
            text: 'To GeneralButtons',
            value: 'GeneralButtons',
            style: MenuButtonStyle,
            clickEvent: buttonClick,
            x: 100,
            y: 100
        });

        MainMenu.add('TextLabel', {
            text: 'Example JudGui Application!',
            style: MenuTitleStyle,
            x: 100,
            y: 100
        });

        MainMenu.add('TextField', {
            text: 'Click to type',
            style: MenuTextFieldStyle,
            x: 300,
            y: 100
        });

        MenusFC.add('MainMenu', MainMenu);
        MenusFC.add('GeneralButtons', new Example.Buttons(MenuBackgroundStyle));

        var debug = new PresentDebug();
    });

    $(function () {
        var fps;
        $('body').append("<div class='debug'></div>");
        setInterval(function () {
            fps = createjs.Ticker.getMeasuredFPS();
            $('.debug').empty().append(fps);
        }, 300);
    });

});