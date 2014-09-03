define(['jquery'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        //// the default design of Frames.  the design is either a single shape element which will match
        //// the properties defined, or its an image URL which will be attached as a Bitmap.
        //var background = {
        //    imageURL: '',     //if defined, attempts to create a bitmap using this url.
        //    height: null,     //if set to null, will set to dimension of engine.
        //    width: null,      //if set to null, will set to dimension of engine.
        //    borderWidth: 3,
        //    borderColor: '#000000',
        //    backgroundColor: '#00FF00',
        //    borderRadius: 0
        //};

        // adds functions and variables related to establishing debugger data for object.

        //var MakeDebuggable = function () {

        //}
        //judgui.MakeDebuggable = MakeDebuggable;

        //Generates an element below canvas, containing debug information from the canvas.
        var PresentDebug = function (canvas) {
            this.initialize(canvas);
        }

        var p = PresentDebug.prototype;

        p.mousePosition = {};

        p.initialize = function (canvas) {
            $('body').append('<div class="debug-content"></div>');
            $(canvas).on('mousemove', function (event) {
                
            });
        }

        scope.PresentDebug = PresentDebug;
        scope.judgui = judgui;
    }(window));
});