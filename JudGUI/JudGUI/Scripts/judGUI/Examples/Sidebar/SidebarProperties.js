
define(['jquery', 'Examples/_Includes'], function ($) {
    (function (scope) {
        var Example = scope.Example || {};

        var SidebarProperties = function (style) {
            this.initialize(style);
        }

        var p = SidebarProperties.prototype = new scope.judgui.Frame();
        
        p.dragElement = null;
        p.displayElement = null;
        p.DragElements = [];

        var clicking = function(e) {
            var m = "<h1>Hello, World!</h1>";
            var w = window.open('', '', 'left=1000,top=100,width=300,height=200');
            var d = w.document;
            d.write(m);
            d.close();
        }

        p.initialize = function (style) {
            this.ExtendStyle(style);
            
            $('.debug').parent().append('<div class="mouseDebug"></div>');
        }

        p.generatePropertyFields = function (dataEditor) {
            var indx = 0;
            if (!judgui.IsUndefined(dataEditor)) {
                var props = dataEditor.Properties();
                var propCall = null;
                var propName = null;
                var y = 10;

                while (indx < props.length) {
                    propName = props[indx];

                    if (propName != null) {
                        propCall = props[propName];

                        this.singleProperty(propName, propCall, y);

                        y += 30;
                    }
                    ++indx;
                }
            }
        }

        p.singleProperty = function (text, call, y) {

            if (this.DragElements.some(function (element) { return (element instanceof judgui.TextLabel && element.Text() == (text + ':')); }))
            {
                // already have a property field for this element.
                return;
            }

            var dragLabel = this.add('TextLabel', {
                style: SidebarLabelStyle,
                text: text + ':',
                x: 10,
                y: y
            });

            var dragProperty = this.add('TextField', {
                style: SidebarTextFieldStyle,
                text: call(),
                x: 80,
                y: y
            });

            dragProperty.update = function () {
                var newValue = this.Text();
                var oldValue = call();
                if (oldValue != newValue) {
                    this.Text(oldValue);
                }
            }
            dragProperty.old_blur = dragProperty.onBlur;

            dragProperty.onBlur = function (e) {
                this.old_blur(e);
                //var newValue = this.Text();
                //var oldValue = call();
                //if (newValue != oldValue) {
                //    call(newValue);
                //}
            };

            this.DragElements.push(dragLabel);
            this.DragElements.push(dragProperty);
        }

        p.update = function (e) {
            this.DragElements.forEach(function (element) {
                if (element.update) {
                    element.update();
                }
            });
        }


        p._ClearDragElements = function () {
            var de = this.DragElements.pop();

            while (de != null) {
                this.removeChild(de);
                var de = this.DragElements.pop();
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

                    if ($this.dragElement != element) {
                        $this.dragElement = element;
                        $this._ClearDragElements();
                        $this.generatePropertyFields(element);
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