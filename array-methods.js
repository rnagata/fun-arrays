var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/

const dataArray = dataset.bankBalances;

var hundredThousandairs = dataArray.filter(
  function(element){
    if ((element.amount) > 100000){
      return true;
    } 
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object

var sumOfBankBalances = dataArray.reduce(function(total, currentValue){
  return total += parseInt(currentValue.amount);
}, 0);

//console.log(dataArray);
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */

var sumOfInterests = dataArray.filter(
  function(element){
    if (element.state === "WI" || element.state === "IL" || element.state === "WY" ||
        element.state === "OH" || element.state === "GA" || element.state === "DE"){
      return true;
    } 
}).map(
  function(element){
    return Math.round(element.amount * .189);
  }
).reduce(
  function(total, currentValue){
    return total += currentValue;
  }, 0
);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

var stateSums = {};

dataArray.forEach(
  function(i){
    if (stateSums.hasOwnProperty(i.state)){
      stateSums[i.state] += parseFloat(i.amount);
      return;
    }
    Object.defineProperty(stateSums, i.state, {
      value : parseFloat(i.amount),
      enumerable : true, 
      writable : true,
    });
  }
);

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var sumOfHighInterests = 0;

let stateSum = [];

dataArray.filter(
  function(element){

    if (element.state === "WI" || element.state === "IL" || element.state === "WY" ||
    element.state === "OH" || element.state === "GA" || element.state === "DE"){
      return false;
    }
    return true;

  }
).forEach(
  function (dataElement){

    let index = stateSum.findIndex(
      function(stateSumElement){
        return stateSumElement.state === dataElement.state;
      }
    );

    if (index === -1){
      stateSum.push({
        amount : parseFloat(dataElement.amount),
        state : dataElement.state,
      })
      return;
    }

    stateSum[index].amount += parseFloat(dataElement.amount);
  }
)

stateSum.forEach(
  function (element){
    element.amount = Math.round(element.amount * .189);
  }
);

stateSum.forEach(
  function (element){
    if (element.amount > 50000){
      sumOfHighInterests += element.amount;
    }
  }
);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */

function sumStates(incomingArr){

  returnArr = [];
  
  incomingArr.forEach( function (incomingElement)
  {
    let index = returnArr.findIndex( function (returnElement){
      return returnElement.state === incomingElement.state;
    });

    if (index === -1){
      returnArr.push({
        amount : parseFloat(incomingElement.amount),
        state : incomingElement.state
      })
      return;
    }

    returnArr[index].amount += parseFloat(incomingElement.amount);
  });

  return returnArr;
}

function lessOrGreaterThan(op, incomingArr){
  
  return incomingArr.filter(
    function(element){
      if (op === '<'){
        return element.amount < 1000000;
      }
      if (op === '>'){
        return element.amount > 1000000;
      }
    }
  ); 
}

var lowerSumStates = sumStates(dataArray);
lowerSumStates = lessOrGreaterThan('<', lowerSumStates);
lowerSumStates = lowerSumStates.map(
  function (element){
    return element.state;
  }
);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */

var higherStateSums = sumStates(dataArray);
higherStateSums = lessOrGreaterThan('>', higherStateSums);
higherStateSums = higherStateSums.reduce(
  function(total, element){
    return total += element.amount;
  }, 0
)

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */

var areStatesInHigherStateSum = dataArray.filter(
  function(element){
    if (element.state === "WI" || element.state === "IL" || element.state === "WY" ||
        element.state === "OH" || element.state === "GA" || element.state === "DE"){
      return true;
    }
  }
);
areStatesInHigherStateSum = sumStates(areStatesInHigherStateSum);

let temp = allElementsGreaterThan(areStatesInHigherStateSum);
areStatesInHigherStateSum = temp;
console.log(temp);
function allElementsGreaterThan(arr){
  return arr.every(function(element){
    return element.amount > 2550000;
  });
}


/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
