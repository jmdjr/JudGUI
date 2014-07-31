define(['jquery', 'Frames/FrameEngine'], function ($) {
    $(function () {

        var Windows = new judgui.FrameEngine(600, 800);
        var MenusFC = Windows.NewFrameCollection('Menus', true);

        MenusFC.add('GameScreen', function () {
            var testButton = new LS.Button("Play", "GameScreen", function () {
                MenusFC.goto("GameScreen", false);
            }).position(300, 400);

            this.addChild(testButton);
        });
    });
});