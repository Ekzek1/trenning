const add = (a, b) => a + b;
const mult = (a, b, c) => a * b * c;


// выводит дополнительную информацию
function decoratorLogger(func) {
    function wrapper(...args) { // (1)
        console.log("Аргументы: " + args); // (2)
        return func(...args); // (3)
    }
    return wrapper;
}

const upgradedAdd = decoratorLogger(add);
const upgradedMult = decoratorLogger(mult);
let res1 = upgradedAdd(10, 20);
let res2 = upgradedMult(2, 3, 5);
console.log(res1)
console.log(res2)


// Деструктуризация массива 

// const arr = ["Vasily", 33, "Moscow", "Junior"]; 
// const [name, age] = arr;
// const [namee, , ,children] = arr;
// const [nam, ...rest] = arr;
// console.log(children)
// console.log(rest)


// Деструктуризая обьекта 

const obj = { name: "Vasiley", age: 33, city: "Moscow", position: "Junior" };
const { name: user, city} = obj; 
const { age, ...rest } = obj
console.log(city)
console.log(user)
console.log(rest);


//  Деструктуризая функции
const func = ({name,gender}) => {
    console.log(name,gender)
}
let object = {name:'ivan',gender:'male'}
func(object);


//Кешируюший декаратор

let cache = {};
function ad(a, b) {
    const hash = a + "," + b;
    // Хеш нужен для однозначного
    //сопоставления переменных некоторому ключу
    if (hash in cache) {
        console.log("Из кеша: " +
        cache[hash]);
    } else {
        let result = a + b;
        cache[hash] = result;
        console.log("Вычисляем: " + result);
    }
}
ad(1, 5); // вычисляем 6
ad(1, 5); // из кеша 6
ad(10, 200); // вычисляем 210
ad(1, 5); // из кеша 6

// Кеширующий декаратор 
function decorator(func) {
    let cache = {};
    function wrapper(...args) {
        const hash = args[0] + "," + args[1];
        console.log(cache)
        if (hash in cache) {
            console.log("Из кеша: " + cache[hash]);
        } else {
            let result = func.call(this, ...args);// func.apply(this,arg),  func.bind(this,...arg)()
            cache[hash] = result;
            console.log("Вычисляем: " + result);
        }
    }
    return wrapper;
}

const addd = (a, b) => a + b;
const memoizedAdd = decorator(addd);
memoizedAdd(1,5)
memoizedAdd(1,5)


//передача контекста 
let computer = {
    text: "Результат",
    add(a, b) {
        let c = a + b;
        return this.text + " " + c; // (1)
    },
};   

computer.add = decorator(computer.add);
computer.add(1, 2);


//сохроняет список всех вызовов декаратор-шпион 

function spyDecorator(func) {
    function wrapper(...args) {
        wrapper.history.push(args);
        return func.call(this, ...args);
    }

    wrapper.history = []; // почему мы можем так сделать?
    return wrapper;
}
const upgradedAdd1 = spyDecorator(add);
upgradedAdd1(100, 200);
upgradedAdd1(1, 1);
console.log(upgradedAdd1.history)




function decorator1(f, ms) {
    return function (...args) {
    setTimeout(function () {
            f.apply(this, args);
        }, ms);
    };
}
const delayedAdd = decorator1(add, 2);
console.log(delayedAdd(51, 10))
delayedAdd(51, 10);

// function decorator(f, ms) {
//     return function (...args) {
//     let savedThis = this; // (2)
//     console.log(savedThis);
//     setTimeout(function () {
//     f.apply(savedThis, args); // (3)
//     }, ms);
//     };
//    }


const showCoords = (x, y) => console.log(`Клик:(${x},${y})`);
    function decorator(f, ms) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            f.apply(this, args);
        }, ms);
    };
}
const delayedFunc = decorator(showCoords, 1000);

setTimeout(() => delayedFunc(10, 5));
setTimeout(() => delayedFunc(20, 10), 980);
setTimeout(() => delayedFunc(30, 30), 980); // "Клик: 30,30" через 2 секунды (примерно)


function decorator(func, ms) {
    let isThrottled = false, // (1)
    savedArgs,
    savedThis;
    return function (...args) {
        savedArgs = args; // (2)
        savedThis = this;
        if (isThrottled) {
            return; // (3)
        }
        func.apply(this, savedArgs);// (4)
        isThrottled = true;
        setTimeout(() => {
            isThrottled = false; // (5)
            func.apply(savedThis, savedArgs);
        }, ms);
    };
}