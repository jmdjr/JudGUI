
define(['Util/Hash', 'Util/Utils'], function (scope) {
    var judgui = scope.judgui || {};

    var Random = {
        color: function () { return '#' + (Math.random().toString(16) + '000000').slice(2, 8); },

        number: function (low, high) {
            return Math.floor((Math.random() * high) + low);
        },

        flipCoin: function () {
            return (Random.number(0, 1) == 0 ? 'heads' : 'tails');
        },

        rollDie: function (sides) {
            return Random.number(1, sides);
        },

        pickFrom: function (array) {
            if (!(array instanceof Array)) {
                throw new Error("Can't pick from non-array collection");
            }
            return array[Random.number(0, array.length)];
        }
    }

    judgui.Random = Random;
    scope.judgui = judgui;
}(window));