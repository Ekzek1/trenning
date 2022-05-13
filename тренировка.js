//вовзыодим в квадрат каждую цифру, и обеденяем их
//Array.from(n.toString()) преобразует тольки сторроки в массив 
function Square (n){
    return +Array.from(n.toString()).map(number => number * number).join('');
}

console.log(Square(15))

const search = function(list, item) {
    let low = 0;
    let high = list.length - 1;

    while (low <= high){
        let mid = Math.floor((low + high) / 2);
        console.log(mid)
        let guess = list[mid];
        console.log(guess)
        if (guess === item) {
            return mid;
        }
        if (guess > item) {
            high = mid - 1;
        }
        if (guess < item) {
            low = mid + 1;
        }
    }

    return null;
}


let nums = [-1,0,3,5,9,12], target = 9

console.log(search(nums,target))

function arrayDiff(a, b) {
    for (let i = 0; i < a.length; i++) {
        if(a[i] == b){
           console.log(a)
           a.splice(i,1 )
        }
        if(a[i++] == b){
            console.log(a)
            a.splice(i =- 1,1 )
        }
        if(a[i + 2] == b){
            a.splice(i =- 2,1 )
        }
    }
    
    return a
}

console.log(arrayDiff([3,3,1,3,2,3,4,1], [3]))

function booleanToString(b){
    if (b === true || b === 'true'){
        return 'true'
    }
    return 'false'
}

  console.log(booleanToString())

function findNeedle(haystack) {
    if(haystack.find(item => item === 'needle')){
        return `found the needle at position ${haystack.findIndex(item => item === 'needle')}`
    }
}

console.log(findNeedle(['needle']))

// function findOutlier(n){
//     let even = n.filter((item ) => {
//         if(item % 2 == 0){
//             return item
//         }
//     })
//     let odd = n.filter((item ) => {
//         if(item % 2 !== 0){
//             return item
//         }
//     })
//     if(even == 0 || odd == 0 ){
//         return 0
//     }
//     if (even.length > odd.length ){
//         return odd
//     }
//     if (odd.length > even.length ){
//         return +even.join('')
//     }
// }


function findOutlier(n){
    let even = n.filter((item ) => (item % 2 == 0))
    let odd = n.filter((item ) => (item % 2 !== 0))
    if(even == 0 || odd == 0 ){
        return 0
    }
    if(even.length > n.length - 2){
        return +odd.join('')
    }
    if(odd.length > n.length - 2){
        return +even.join('')
    }
}
 console.log(findOutlier([1,1,0,1,1]))