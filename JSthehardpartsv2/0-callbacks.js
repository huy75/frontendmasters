// https://frontendmasters.com/courses/javascript-hard-parts-v2/pair-programming/
// http://csbin.io/callbacks

// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');


// Challenge 1
function addTwo(num) {
	return (num + 2);
}

function multiplyByTwo(num) {
  return (num * 2);
}

// To check if you've completed it, uncomment these console.logs!
// console.log(addTwo(3));
// console.log(addTwo(10));
// console.log(multiplyByTwo(3));

// Challenge 2
function addS(word) {
    return (word + 's');
}

// uncomment these to check your work
// console.log(addS('pizza'));
// console.log(addS('bagel'));


// Challenge 3
function map(array, callback) {
	let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  };
  return result;
}

// console.log(map([1, 2, 3], addTwo));


// Challenge 4
function forEach(array, callback) {
	for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  };
}

// see for yourself if your forEach works!
// forEach(['pizza', 'bagel'], el => console.log(el + 's'));

// Challenge 5
function mapWith(array, callback) {
	let result = [];
  forEach(array, el => result.push(callback(el)));
  return result;
}

// console.log(mapWith([1, 2, 3], addTwo));
// console.log(mapWith(['pizza', 'bagel'], addS));

// Challenge 6
function reduce(array, callback, initialValue) {
  let acc;
  if (initialValue === undefined) {
    // initialValue not provided
    acc = array[0];
    array.shift();
  }
  else {
    acc = initialValue;
  };
  
  // for (let i = 0; i < array.length; i++) {
  //   acc = callback(array[i], acc);
  // }
  forEach(array, (item) => {
    acc = callback(acc, item);
  });
  
  return acc;
}

// const nums = [4, 1, 3];
// const add = function(a, b) { return a + b; }
// console.log(reduce(nums, add, 0));
// console.log(nums.reduce(add, 0));

// Challenge 7

// function filter(array, callback) {
//   var output= [];
//   forEach(array , (el) => {
//     if (callback(el)) output.push(el);
//   });
//   return output;
// }

// reduce would be to take each array in turn 
// and eliminate (filter out) elements from the result if they don't already exist in that array.
function intersection(...arrays) {
	return arrays.reduce((acc, array) => {
  	return array.filter((el) => acc.includes(el));
  });
}

// console.log(intersection([5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]));
// should log: [5, 15]


// Challenge 8
// reduce would be to take each array in turn 
// and add elements from the result if they don't already exist in that array.
function union(...arrays) {
	return arrays.reduce((acc, array) => {
  	const newElements = array.filter(el => !acc.includes(el));
    return acc.concat(newElements);
  });
}

// console.log(union([5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]));
// should log: [5, 10, 15, 88, 1, 7, 100]


// Challenge 9
// function objOfMatches(array1, array2, callback) {
// 	let result = {};
//   for(let i = 0; i < array1.length; i++){
//   	let upper = callback(array1[i]);
//     if(array2[i] && upper == array2[i])
//       result[array1[i]] = array2[i];
//     }
//     return result
// }

function objOfMatches(array1, array2, callback) {
    return array2.reduce((result, value, i) => {
      // value is an element of array2 of index i
      if (value === callback(array1[i])) {
        result[array1[i]] = value;
      }
      return result
    }, {})
}

const arr1 = ['hi', 'howdy', 'bye', 'later', 'hello'];
const arr2 = ['HI', 'Howdy', 'BYE', 'LATER', 'hello'];
function uppercaser(str) { return str.toUpperCase(); }
console.log(objOfMatches(arr1, arr2, uppercaser)); 

// console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], function(str) { return str.toUpperCase(); }));
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }


// Challenge 10
function multiMap(arrVals, arrCallbacks) {
	return arrVals.reduce((acc, value) => {
    // create a new array acc
    // for each value of arrVals, map all cb of arrCallbacks
    acc[value] = arrCallbacks.map((cb) => cb(value));
    return acc;
  }, {})
}

const arrV = ['catfood', 'glue', 'beer'];
const arrCB = [function(str) { return str.toUpperCase(); }, function(str) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }, function(str) { return str + str; }];
console.log(multiMap(arrV, arrCB));
// console.log(multiMap(['catfood', 'glue', 'beer'], [function(str) { return str.toUpperCase(); }, function(str) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }, function(str) { return str + str; }]));
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }


// Challenge 11
function objectFilter(obj, callback) {
	const newObj = {};
  for (let [key, value] of Object.entries(obj)) {
    if (value === callback(key))
      newObj[key] = value;
  }
  return newObj;
}

// const cities = {
// London: 'LONDON',
// LA: 'Los Angeles',
// Paris: 'PARIS',
// };
// console.log(objectFilter(cities, city => city.toUpperCase())) // Should log { London: 'LONDON', Paris: 'PARIS'}


// Challenge 12
// Challenge 12
function majority(array, callback) {
	let isTrue = 0;
  let isFalse = 0;
  array.forEach((el) => {
    callback(el) ? isTrue++ : isFalse++;
  });
  return (isTrue > isFalse);
}

// /*** Uncomment these to check your work! ***/
// const isOdd = function(num) { return num % 2 === 1; };
// console.log(majority([1, 2, 3, 4, 5], isOdd)); // should log: true
// console.log(majority([2, 3, 4, 5], isOdd)); // should log: false


// Challenge 13
function prioritize(array, callback) {
  let arrS = [], arrNS = [];
	array.forEach((el) => {
    callback(el) ? arrS.push(el) : arrNS.push(el);
  });
  return [...arrS, ...arrNS];
}

// /*** Uncomment these to check your work! ***/
// const startsWithS = function(str) { return str[0] === 's' || str[0] === 'S'; };
// console.log(prioritize(['curb', 'rickandmorty', 'seinfeld', 'sunny', 'friends'], startsWithS)); // should log:
['seinfeld', 'sunny', 'curb', 'rickandmorty', 'friends']


// Challenge 14
// taking in an array and returning a single object, so we're looking for reduce
function countBy(array, callback) {
  return array.reduce((result, el) => {
    let output = callback(el);
    (result[output] === undefined) ? (result[output] = 1) : (result[output] = result[output] + 1);
    return result;
  }, {});
}

// /*** Uncomment these to check your work! ***/
// console.log(countBy([1, 2, 3, 4, 5], function(num) {
// if (num % 2 === 0) return 'even';
// else return 'odd';
// })); // should log: { odd: 3, even: 2 }


// Challenge 15
function groupBy(array, callback) {
	return array.reduce((result, el) => {
    let output = callback(el);
    (result[output] === undefined) ? (result[output] = [el]) : (result[output] = [...result[output], el]);
    return result;
  }, {});
}


// /*** Uncomment these to check your work! ***/
// const decimals = [1.3, 2.1, 2.4];
// const floored = function(num) { return Math.floor(num); };
// console.log(groupBy(decimals, floored)); // should log: { 1: [1.3], 2: [2.1, 2.4] }


// Challenge 16
function goodKeys(obj, callback) {
	const result = [];
  for (let [key, value] of Object.entries(obj)) {
    if (callback(value))
      result.push(key);
  }
  return result;
}

// /*** Uncomment these to check your work! ***/
// const sunny = { mac: 'priest', dennis: 'calculating', charlie: 'birdlaw', dee: 'bird', frank: 'warthog' };
// const startsWithBird = function(str) { return str.slice(0, 4).toLowerCase() === 'bird'; };
// console.log(goodKeys(sunny, startsWithBird)); // should log: ['charlie', 'dee']


// Challenge 17
function commutative(func1, func2, value) {
	return func1(func2(value)) === func2(func1(value)) ? true : false;
}

// /*** Uncomment these to check your work! ***/
// const multBy3 = n => n * 3;
// const divBy4 = n => n / 4;
// const subtract5 = n => n - 5;
// console.log(commutative(multBy3, divBy4, 11)); // should log: true
// console.log(commutative(multBy3, subtract5, 10)); // should log: false
// console.log(commutative(divBy4, subtract5, 48)); // should log: false


// Challenge 18 ~ Challenge 11
function objFilter(obj, callback) {
	const newObj = {};
  for (let [key, value] of Object.entries(obj)) {
    if (value === callback(key))
      newObj[key] = value;
  }
  return newObj;
}

// /*** Uncomment these to check your work! ***/
// const startingObj = {};
// startingObj[6] = 3;
// startingObj[2] = 1;
// startingObj[12] = 4;
// const half = n => n / 2;
// console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }


// Challenge 19
function rating(arrOfFuncs, value) {
	let total = arrOfFuncs.reduce((acc, cb) => {
    if (cb(value)) acc++;
  	return acc;
  }, 0);
  return (total / arrOfFuncs.length) * 100;
}

// /*** Uncomment these to check your work! ***/
// const isEven = n => n % 2 === 0;
// const greaterThanFour = n => n > 4;
// const isSquare = n => Math.sqrt(n) % 1 === 0;
// const hasSix = n => n.toString().includes('6');
// const checks = [isEven, greaterThanFour, isSquare, hasSix];
// console.log(rating(checks, 64)); // should log: 100
// console.log(rating(checks, 66)); // should log: 75


// Challenge 20
function pipe(arrOfFuncs, value) {
	return arrOfFuncs.reduce((acc, cb) => {
    // initialize with cb(value)
    return cb(acc) || cb(value);
  }, "");
}

function pipe(arrOfFuncs, value) {
	return arrOfFuncs.reduce((acc, cb) =>
    cb(acc), value);
}

// /*** Uncomment these to check your work! ***/
// const capitalize = str => str.toUpperCase();
// const addLowerCase = str => str + str.toLowerCase();
// const repeat = str => str + str;
// const capAddlowRepeat = [capitalize, addLowerCase, repeat];
// console.log(pipe(capAddlowRepeat, 'cat')); // should log: 'CATcatCATcat'


// Challenge 21
function highestFunc(objOfFuncs, subject) {
  let largest = Number.NEGATIVE_INFINITY;
  let rightKey = undefined;
	for (let [key, callback] of Object.entries(objOfFuncs)) {
    if (largest < callback(subject)) {
      rightKey = key;
      largest = callback(subject);
    }
  }
  return rightKey;
}

// /*** Uncomment these to check your work! ***/
// const groupOfFuncs = {};
// groupOfFuncs.double = n => n * 2;
// groupOfFuncs.addTen = n => n + 10;
// groupOfFuncs.inverse = n => n * -1;
// console.log(highestFunc(groupOfFuncs, 5)); // should log: 'addTen'
// console.log(highestFunc(groupOfFuncs, 11)); // should log: 'double'
// console.log(highestFunc(groupOfFuncs, -20)); // should log: 'inverse'


// Challenge 22 ~ Challenge 20
function combineOperations(startVal, arrOfFuncs) {
	return arrOfFuncs.reduce((acc, cb) =>
    cb(acc), startVal);
}

function add100(num) {
  return num + 100;
}

function divByFive(num) {
  return num / 5;
}

function multiplyByThree(num) {
  return num * 3;
}

function addTen(num) {
  return num + 10;
}

function multiplyFive(num) {
  return num * 5;
}

// /*** Uncomment these to check your work! ***/
// console.log(combineOperations(0, [add100, divByFive, multiplyByThree])); // Should output 60 -->
// console.log(combineOperations(0, [divByFive, multiplyFive, addTen])); // Should output 10


// Challenge 23
function myFunc(array, callback) {
	return array.findIndex(callback);
}

const numbers = [2, 3, 6, 64, 10, 8, 12];
const evens = [2, 4, 6, 8, 10, 12, 64];

function isOdd(num) {
  return (num % 2 !== 0);
}

// /*** Uncomment these to check your work! ***/
// console.log(myFunc(numbers, isOdd)); // Output should be 1
// console.log(myFunc(evens, isOdd)); // Output should be -1


// Challenge 24
function myForEach(array, callback) {
	for (let item of array) {
    callback(item);
    }
}

let sum = 0;

function addToSum(num) {
  sum += num;
}

// /*** Uncomment these to check your work! ***/
// const nums = [1, 2, 3];
// myForEach(nums, addToSum);
// console.log(sum); // Should output 6