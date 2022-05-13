function cachingDecoratorNew(func) {
    let cache = []
    function wrapper(...args){
        const hash = args.join(',');
        let idx = cache.findIndex((item) => item.hash === hash);
        if (idx !== -1){
            console.log("Из кэша: " + cache[idx].value);
            return `Из кеша ${cache[idx].value}` 
        }

        let result = func(...args);
        cache.push({hash: hash, value: result});

        if (cache.length > 5) {
            cache.shift();
            console.log(`удалил`)
        }
        console.log("Вычисляем: " + result);
        return "Вычисляем: " + result;  
    }
    return wrapper
}

function debounceDecoratorNew (func,ms){
    let isThrottled = false

    function wrapper (){

        if (isThrottled) { 
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false;
        },ms)
    }
    return wrapper
}

function debounceDecorator2(func,ms){
    let isThrottled = false
    function wrapper (){
        if (isThrottled) { 
            wrapper.count +=1
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false;
            wrapper.count +=1
        },ms)
    }

    wrapper.count = 0
    return wrapper
}

