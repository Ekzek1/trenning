// function printNumbers(from, to){
//     let current = from 

//     let timerId = setInterval(function(){
//         if (current === to){
//             clearInterval(timerId)
//         }
//         console.log(current);
//         current += 1
//     },1000)
// }




// function print_Numbers(from, to){
//     let current = from

//     setTimeout( function run(){
//         if(current < to){
//             setTimeout(run,1000)
//         }
//         current += 1
//         console.log(current);
//     },1000)
// }

// function print_numbers(from,to){
//     let current = from 

//     function go(){
//         console.log(current);
//         if (current === to){
//             clearInterval(timerId);
//         };
//         current++
//     }

//     go()
//     let timerId = setInterval(go,1000)
// }





// function sayHi() {
//     console.log(this.name);
// }
  
// let user = { name: "John" };
// let admin = { name: "Admin" };
  
//   // используем 'call' для передачи различных объектов в качестве 'this'
// sayHi.call( user ); // John
// sayHi.call( admin ); // Admin
// function say(phrase) {
//     console.log(this.name + ': ' + phrase);
//   }
  
// let userr = { name: "John" };
  
// // 'user' становится 'this', и "Hello" становится первым аргументом
// say.call( userr, "Hello" );


// let worker = {
//     slow(min, max) {
//       console.log(`Called with ${min},${max}`);
//       return min + max;
//     }
//   };
  
// function cachingDecorator(func, hash) {
//     let cache = new Map();
//     return function() {
//       let key = hash(arguments); // (*)
//       if (cache.has(key)) {
//         return cache.get(key);
//       }
  
//       let result = func.call(this, ...arguments); // (**)
  
//       cache.set(key, result);
//       return result;
//     };
// }
  
// function hash(args) {
//     return args[0] + ',' + args[1];
// }
  
// worker.slow = cachingDecorator(worker.slow, hash);
  
// console.log( worker.slow(3, 5) ); // работает
// console.log( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)

function push(a,b){
    return a + b
}

function spy (func){
    function wrapper(...arg){
        wrapper.history.push(arg)
        return func.call(this, ...arg)
    }

    wrapper.history = []
    return wrapper
}

const chek = spy(push);
chek(1,2)
chek(1,3)
chek(1,1,2,3,14,2,4)
console.log(chek.history)


function f(x) {
    console.log(x);
}


// // задерживающий декаратор
// function delay(f,ms){
//     return function(...arg){
//         let savedThis = this;
//         setTimeout(function (){
//             f.call(savedThis,...arg)
//         },ms)
//     }
// }

// // let delay1000 = delay(f,1000);


// // function delay(f, ms) {

// //     return function() {
// //       setTimeout(() => f.apply(this, arguments), ms);
// //     };
  
// //   }


// function debounce(f, ms){
//     let timeOut

//     return function(...args){
//         clearTimeout(timeOut)

//         timeOut  = setTimeout(() => {
//             f.apply(this, args);
//         }, ms)
//     }
// }
// let x = debounce(f, 1000);


// f(1); // выполняется немедленно
// f(2); 
// setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout( () => f(4), 1100); // выполняется
// setTimeout( () => f(5), 1500);


// function debounceDecerator (f,ms){
//     let isColldown = false 
//     return function(){
//         if (isColldown) return

//         f.apply(this, arguments)

//         isColldown = true

//         setTimeout(() => {
//             isColldown = false
//         }, ms);
//     }
// }

// let l = debounceDecerator(f, 1000);
// l(2)
// setTimeout( () => l(1), 100); // проигнорирован (прошло только 100 мс
// setTimeout( () => l(4), 1100); // выполняется
// setTimeout( () => l(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)



function throttleDecarator(func,ms){
    let isThrottled = false,
        savedArgs,
        savedThis;

        function wrapper() {

            if (isThrottled) { 
              savedArgs = arguments;
              savedThis = this;
              return;
            }
        
            func.apply(this, arguments); 
        
            isThrottled = true;
        
            setTimeout(function() {
              isThrottled = false; 
              if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
              }
            }, ms);
          }
        
          return wrapper;
}

function f(a) {
    console.log(a)
  }
  
  // f1000 передаёт вызовы f максимум раз в 1000 мс
  let f1000 = throttleDecarator(f, 1000);
  
  f1000(1); // показывает 1
  f1000(2); // (ограничение, 1000 мс ещё нет)
  f1000(3);// (задержка)
 