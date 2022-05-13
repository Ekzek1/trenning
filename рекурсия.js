function findOutlier(n){
    let even = n.filter((item ) => {
        if(item % 2 == 0){
            return item
        }
    }) 
    let odd = n.filter((item ) => {
        if(item % 2 !== 0){
            return item
        }
    })
    let size = odd.lenght
    console.log(size)
    if (even.lenght > odd.lenght ){
        return odd
    }
    if (odd.lenght > even.lenght ){
        return even
    }

}
console.log(findOutlier([2,4,6,8,10,9]))