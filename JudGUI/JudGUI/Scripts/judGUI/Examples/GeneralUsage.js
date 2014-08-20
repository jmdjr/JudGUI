define(['jquery', 'Frames/FrameEngine', 'DataEditors/Button'], function ($) {
    $(function () {

        var Windows = new judgui.FrameEngine(600, 800);
        var MenusFC = Windows.NewFrameCollection('Menus', true);
        
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);


        MenusFC.add('GameScreen', function () {
            var testButton = new judgui.Button("Play", "GameScreen", function () {
                MenusFC.goto("GameScreen", false);
            }).position(300, 400);

            this.addChild(testButton);
            this.addChild(shape);

        });

        //Windows.addChild(shape);
    });
});