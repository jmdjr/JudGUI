var SYSTEM_DEBUG = null;
define(['jquery', 'Examples/_Includes'], function ($) {
    $(function () {
        var Windows = SYSTEM_DEBUG = new judgui.FrameEngine(700, 1000, '.canvasArea', WindowBackgroundStyle);

        var wBounds = Windows.bounds;
        wBounds.width -= 800;

        var MenusFC = Windows.NewFrameCollection('Menus', true, MenuBackgroundStyle).position(wBounds.width - 2, 2);  // basic positioning should be Math.ceil of 1/2 the border width.

        var buttonClick = function (event) {
            MenusFC.goto(event.Button._Value, false);
        }
        
        var ControlsFC = Windows.NewFrameCollection('Sidebar', true, SidebarStyle).position(2, 2);
        ControlsFC.add('Properties', new Example.SidebarProperties(SidebarStyle));


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

    });

    $(function () {
        var fps;
        $('body').append("");
        setInterval(function () {
            fps = createjs.Ticker.getMeasuredFPS();
            $('.debug').empty().append(fps);
        }, 300);
    });

});