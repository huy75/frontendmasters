// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');

// CHALLENGE 1

// A) Create a for loop that iterates through an array and returns the sum of the elements of the array.
function sumFunc(arr) {
  // YOUR CODE HERE
  let sum = 0;
	arr.forEach(element => sum += element);
  return sum;
}

// Uncomment the lines below to test your work
// const array = [1, 2, 3, 4];
// console.log(sumFunc(array)); // -> should log 10

// B) Create a functional iterator for an array that returns each value of the array when called, one element at a time.
function returnIterator(arr) {
  // YOUR CODE HERE
  let idx = 0;
  return () => {
    return arr[idx++];
  }
}

// Uncomment the lines below to test your work
// const array2 = ['a', 'b', 'c', 'd'];
// const myIterator = returnIterator(array2);
// console.log(myIterator()); // -> should log 'a'
// console.log(myIterator()); // -> should log 'b'
// console.log(myIterator()); // -> should log 'c'
// console.log(myIterator()); // -> should log 'd'



// CHALLENGE 2
// Create an iterator with a next method that returns each value of the array when .next is called.
function nextIterator(arr) {
  // YOUR CODE HERE
  let idx = 0;
  return {
    next() {
      return arr[idx++];
    }
  }
}

// Uncomment the lines below to test your work
// const array3 = [1, 2, 3];
// const iteratorWithNext = nextIterator(array3);
// console.log(iteratorWithNext.next()); // -> should log 1
// console.log(iteratorWithNext.next()); // -> should log 2
// console.log(iteratorWithNext.next()); // -> should log 3



// CHALLENGE 3
// Write code to iterate through an entire array using your nextIterator and sum the values.
function sumArray(arr) {
  // YOUR CODE HERE
  // use your nextIterator function
  const iteratorWithNext = nextIterator(arr);
  let sum = 0;
	arr.forEach(element => sum += iteratorWithNext.next());
  return sum;
}

// Uncomment the lines below to test your work
// const array4 = [1, 2, 3, 4];
// console.log(sumArray(array4)); // -> should log 10



// CHALLENGE 4
// Create an iterator with a next method that returns each value of a set when .next is called
function setIterator(set) {
  // YOUR CODE HERE
  const it = set.values();
  return {
    next() {
      return it.next().value;
    }
  }
}

// Uncomment the lines below to test your work
// const mySet = new Set('hey');
// const iterateSet = setIterator(mySet);
// console.log(iterateSet.next()); // -> should log 'h'
// console.log(iterateSet.next()); // -> should log 'e'
// console.log(iterateSet.next()); // -> should log 'y'



// CHALLENGE 5
// Create an iterator with a next method that returns an array with two elements
// (where the first element is the index and the second is the value at that index) when .next is called.
function indexIterator(arr) {
  // YOUR CODE HERE
  let idx = 0;
  return {
    next() {
      return [i, arr[idx++]];
    }
  }
}

// Uncomment the lines below to test your work
// const array5 = ['a', 'b', 'c', 'd'];
// const iteratorWithIndex = indexIterator(array5);
// console.log(iteratorWithIndex.next()); // -> should log [0, 'a']
// console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
// console.log(iteratorWithIndex.next()); // -> should log [2, 'c']



// CHALLENGE 6
// Create an iterator that returns each word from a string of words on the call of its .next method (hint: use regex!)
// Then attach it as a method to the prototype of a constructor Words. Hint: research Symbol.iterator!
function Words(string) {
  this.str = string;
}

Words.prototype[Symbol.iterator] = function() {
  // YOUR CODE HERE
  const words = this.str.split(' ');
  let idx = 0;
  return {
    next() {
      if (idx < words.length) {
        const word = words[idx++];
        return {
          value: word,
          done: false,
        };
      }
      return { done: true };
    }
  }
}

// Uncomment the lines below to test your work
// const helloWorld = new Words('Hello World');
// for (word of helloWorld) { console.log(word); } // -> should log 'Hello' and 'World'

// CHALLENGE 7

function valueAndPrevIndex(array){

}

const returnedSentence = valueAndPrevIndex([4,5,6])
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());


//CHALLENGE 8

function* createConversation(string) {


}

console.log(createConversation('english').next());



//CHALLENGE 9
function waitForVerb(noun) {

}

async function f(noun) {

}

f("dog");

