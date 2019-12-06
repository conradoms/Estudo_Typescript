export function domInject(seletor: string){
    return function(target: any, key: string){
        let elemento: JQuery;

        const getter = function(){
            console.log(`Buscando ${seletor} para injetar em ${key}`);
            if(!elemento){
                elemento = $(seletor);
            }

            return elemento;
        }

        Object.defineProperty(target, key, {
            get: getter
        });
    }
}