export function logarTempoExecucao(emSegundos: boolean = false){
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        let divisor = 1;
        let unidate = 'ms';
        
        if(emSegundos){
            divisor = 1000;
            unidate = 's';
        }

        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]){
            console.log("------------------------");
            console.log(`parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`O método retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`O método ${propertyKey} demorou ${(t2-t1)/divisor} ${unidate} para ser executado`);
            return retorno;
        }

        return descriptor;
    }
}