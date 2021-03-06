'use strict';

// Closures
// - aren't features that we explicitly use
// - they happen automatically in certain situations

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();

booker();
booker();
booker();

// booker can access the secureBooking - passenger count and increase the passenger count after it's finshed on the call stack
// possible because of closures

// booker function exists in the global scope, with the environment in which the function was created is no longer active (secureBooking)
// booker function however continues to have access to the variables that were present at the time the function was created - in particular the passenger count variable
// closure makes a function remember all the variables that existed at the functions birthplace
// any function always has access to the variable environment of the execution context in which the function was created
// in the case of booker the function was born in the execution context of secureBooking
// therefore the booker function will get access to the secureBooking variable environment
// this is how the function will be able to read and manipulate the passengerCount varibale
// it's this connection we call closure
// closure also has priority over the scope chain

console.dir(booker);

// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);
// re-assigning f function
h();
f();
console.dir(f);
// even though the f variable was defined in the global scope, it still closes over the variable environment of the g function - including the a variable that it has access to even after the g function has finished its execution
//  a variable inside the backpack of the f function
// closure changes as variable re-assigned

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now borading all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  // setTimeout function able to use all the variables from the environment it was created in - boardPassengers function despite it working independently
  console.log(`Will start boarding in ${wait} seconds`);
};
boardPassengers(180, 3);

// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector(`body`).addEventListener('click', function () {
    header.style.color = `blue`;
  });
})();
