define(['jquery', 'Frames/FrameEngine', 'DataEditors/Button'], function ($) {
    $(function () {

        var Windows = new judgui.FrameEngine(600, 800);
        var MenusFC = Windows.NewFrameCollection('Menus', true);
        
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);

        var GameFrame = new judgui.Frame(function () {
            var testButton = new judgui.Button("Goto Main Menu", "", null, function () {
                MenusFC.goto("MainMenu", false);
            }).position(100, 100);

            this.addChild(testButton);
        });

        var MainMenu = new judgui.Frame(function () {
            var testButton = new judgui.Button("Goto Game Frame", "", null, function () {
                MenusFC.goto("GameScreen", false);
            }).position(300, 400);

            this.addChild(testButton);
            this.addChild(shape);

        });

        MenusFC.add('MainMenu', MainMenu);
        MenusFC.add('GameScreen', GameFrame);

        //Windows.addChild(shape);
    });
});