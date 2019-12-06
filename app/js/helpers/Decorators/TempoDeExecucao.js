System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            let divisor = 1;
            let unidate = 'ms';
            if (emSegundos) {
                divisor = 1000;
                unidate = 's';
            }
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                console.log("------------------------");
                console.log(`parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                const t2 = performance.now();
                console.log(`O método retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
                console.log(`O método ${propertyKey} demorou ${(t2 - t1) / divisor} ${unidate} para ser executado`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoExecucao", logarTempoExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
