// Groups all Examples together
define(['Examples/_Styles', 'Examples/Sidebar/SidebarProperties'], function ($) {

    (function (scope) {
        var Example = scope.Example || {};

        var Sidebar_Frames = function (name, style) {
            this.initialize(name, style);
        }

        var p = Sidebar_Frames.prototype = new scope.judgui.FrameCollection();

        p.initialize = function (name, style) {
            this.FrameCollection_init(name, style);
        }

        p.loadFrames = function () {
            this.add('Properties', new Example.SidebarProperties(SidebarStyle));
            return this;
        }

        Example.Sidebar_Frames = Sidebar_Frames;
        scope.Example = Example;

    }(window));
});