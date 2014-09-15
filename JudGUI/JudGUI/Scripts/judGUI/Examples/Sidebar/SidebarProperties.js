
define(['jquery', 'Examples/_Includes'], function ($) {
    (function (scope) {
        var Example = scope.Example || {};

        var SidebarProperties = function (style) {
            this.initialize(style);
        }

        var p = SidebarProperties.prototype = new scope.judgui.Frame();
        
        p.dragElement = null;
        p.displayElement = null;
        p.DragElemensPosTextField = null;

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
                text: 'Position:',
                x: 10,
                y: 10
            });

            this.DragElemensPosTextField = this.add('TextField', {
                style: SidebarTextFieldStyle,
                text: ' ',
                x: 80,
                y: 10
            });

            $('.debug').parent().append('<div class="mouseDebug"></div>');
        }

        p.update = function (e) {
            if (this.dragElement != null && this.DragElemensPosTextField != null) {
                var newText = "x: " + this.dragElement.x + " y: " + this.dragElement.y;
                this.DragElemensPosTextField.Text(newText);
                this.getStage().cursor = "pointer";
            }
            else {

                this.getStage().cursor = null;
            }
        }
        
        p.BC_SetEngine = p.SetEngine;
        p.SetEngine = function (engine) {
            this.BC_SetEngine(engine);

            var targetFC = this.Engine.GetFrameCollection('Menus');
            var $this = this;

            targetFC.on('mousedown', function (e) {
                var element = judgui.FindParentInstanceOfType(e.target, judgui.DataEditorObject);
                var message = "mouse Down";

                if (!judgui.IsUndefined(element)) {
                    $('.mouseDebug').empty().append('mouse Down x:' + element.x + ' || y: ' + element.y);
                    if ($this.dragElement == null)
                    {
                        $this.dragElement = element;
                        $this.displayElement = element;
                    }
                }
                else {
                    $('.mouseDebug').empty().append('mouse Down ');
                }
            });
            
            targetFC.on('pressmove', function (e) {
                if ($this.dragElement != null) {
                    var pos = { x: e.stageX, y: e.stageY };

                    pos = targetFC.globalToLocal(pos.x, pos.y);
                    $this.dragElement.position(pos.x, pos.y);
                }
            });

            targetFC.on('pressup', function (e) {
                $('.mouseDebug').empty().append('press Up');
                $this.dragElement = null;
            });
        }

        Example.SidebarProperties = SidebarProperties;
        scope.Example = Example;
    })(window)
});