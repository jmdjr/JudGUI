
define(['jquery', 'Examples/_Includes'], function ($) {
    (function (scope) {
        var Example = scope.Example || {};

        var SidebarProperties = function (style) {
            this.initialize(style);
        }

        var p = SidebarProperties.prototype = new scope.judgui.Frame();

        var clicking = function(e) {
            var m = "<h1>Hello, World!</h1>";
            var w = window.open('', '', 'left=1000,top=100,width=300,height=200');
            var d = w.document;
            d.write(m);
            d.close();
        }

        p.initialize = function (style) {
            this.ExtendStyle(style);

            this.add('TextLabel', {
                style: SidebarLabelStyle,
                text: 'Element',
                x: 0,
                y: 10
            });

            this.add('TextField', {
                style: SidebarTextFieldStyle,
                text: 'Sample',
                x: 75,
                y: 10
            });

            $('.debug').parent().append('<div class="mouseDebug"></div>');
        }
        
        p.BC_SetEngine = p.SetEngine;
        p.SetEngine = function (engine) {
            this.BC_SetEngine(engine);

            var targetFC = this.Engine.GetFrameCollection('Menus');

            targetFC.on('mousedown', function (e) {

                var element = judgui.FindParentInstanceOfType(e.target, judgui.DataEditorObject);
                var message = "mouse Down";


                if (!judgui.IsUndefined(element)) {
                    $('.mouseDebug').empty().append('mouse Down x:' + element.x + ' || y: ' + element.y);
                }
                else {
                    $('.mouseDebug').empty().append('mouse Down ');
                }
            });

            targetFC.on('pressup', function (e) {
                $('.mouseDebug').empty().append('press Up');
            });
        }

        Example.SidebarProperties = SidebarProperties;
        scope.judgui = judgui;
    })(window)
});