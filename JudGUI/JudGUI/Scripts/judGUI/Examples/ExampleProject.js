define(['jquery', 'Examples/_Includes'], function ($) {
    $(function () {

        var dimensions = { h: 700, w: 1000 };
        var JudEngine = new judgui.FrameEngine(dimensions.h, dimensions.w, '.canvasArea', WindowBackgroundStyle);
        dimensions.w -= 800;

        var MenusFC = new Example.Customizing_Frames('Menus', MenuBackgroundStyle).position(dimensions.w - 2, 2);
        var SidebarFC = new Example.Sidebar_Frames('Sidebar', SidebarStyle).position(2, 2);

        JudEngine.addFrameCollection(MenusFC, true);
        JudEngine.addFrameCollection(SidebarFC, true);

        MenusFC.loadFrames();
        SidebarFC.loadFrames();

        var fps;
        $('body').append("");
        setInterval(function () {
            fps = createjs.Ticker.getMeasuredFPS();
            $('.debug').empty().append(fps);
        }, 300);

    });
});