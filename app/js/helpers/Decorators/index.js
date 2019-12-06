System.register(["./TempoDeExecucao", "./domInject", "./Throttle"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (TempoDeExecucao_1_1) {
                exportStar_1(TempoDeExecucao_1_1);
            },
            function (domInject_1_1) {
                exportStar_1(domInject_1_1);
            },
            function (Throttle_1_1) {
                exportStar_1(Throttle_1_1);
            }
        ],
        execute: function () {
        }
    };
});
