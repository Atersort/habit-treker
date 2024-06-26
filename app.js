const operations = [100, -1000, -300, -500, 10000];
const balance = 100;
//
// // расчет итогового баланса
function sumOperations(arr, money) {
    let bal = money
    for (let operation of arr) {
        bal = bal + operation;
    }
    return bal;
}
console.log(sumOperations(operations, balance));

// если баланс меньше 0, то выводить false
function checkingNegativeBalance(arr, startingBalance){
    let bal = startingBalance;
    for(let variables of arr){
        bal += variables;
        if(bal < 0){
            return false
        }
    }
    return 'Нормалек'
}

console.log(checkingNegativeBalance(operations, balance));

//расчет среднего расхода и среднего дохода

function middleValues(arr) {
    let plusValues = 0;
    let plusCount = 0;
    let minusValues = 0;
    let minusCount = 0;
    for(variables of arr) {
        if(variables > 0) {
            plusValues += variables;
            plusCount++;
        }else {
            minusValues += variables;
            minusCount++;
        }
    }
    let midPositive = plusValues / plusCount;
    let midNegative = minusValues / minusCount;
    console.log(midPositive, midNegative)
}

middleValues(operations)
