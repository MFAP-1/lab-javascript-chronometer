// WEEK 1 - DAY 2: LAB | JS IronChronometer [MFAP-1]

// Instantiating a new Chronometer object:
const chronometer = new Chronometer();

// get the buttons:
const btnLeftElement = document.getElementById('btnLeft');
const btnRightElement = document.getElementById('btnRight');

// get the DOM elements that will serve us to display the time:
const minDecElement = document.getElementById('minDec');
const minUniElement = document.getElementById('minUni');
const secDecElement = document.getElementById('secDec');
const secUniElement = document.getElementById('secUni');
const milDecElement = document.getElementById('milDec');
const milUniElement = document.getElementById('milUni');
const splitsElement = document.getElementById('splits');

// getting the ordered list. Will serve us to 
const olElement = document.getElementById('splits');

function printTime() {
  chronometer.intervalId = setInterval(() => {
    printSeconds();
    printMinutes();
  });
}

function printMinutes() {
  minUniElement.innerHTML = String(chronometer.getMinutes() % 10);
  minDecElement.innerHTML = String(parseInt((chronometer.getMinutes() / 10)));
}

function printSeconds() {
  secUniElement.innerText = String(chronometer.getSeconds() % 10);
  secDecElement.innerText = String(parseInt((chronometer.getSeconds() / 10)));
} 

// ==> BONUS
function printMilliseconds() {
  // ... your code goes here
}

function printSplit() {
  const newLi = document.createElement("li"); // Creating the new li
  newLi.innerText = chronometer.split();  // Inputing the text information required
  olElement.appendChild(newLi); // Adding the newly li created to the html
}

function clearSplits() {
    while (olElement.firstChild) { // loop until there is no first child
      olElement.removeChild(olElement.firstChild); // removing one by one
    }
  }

function setStopBtn() {
  btnLeftElement.classList.toggle("stop");
  btnLeftElement.innerText = 'STOP';
  btnLeftElement.classList.remove("start");
}

function setSplitBtn() {
  btnRightElement.classList.toggle("split");
  btnRightElement.innerText = 'SPLIT';
  btnRightElement.classList.remove("reset");
}

function setStartBtn() {
  btnLeftElement.classList.toggle("start");
  btnLeftElement.innerText = 'START';
  btnLeftElement.classList.remove("stop");
}

function setResetBtn() {
  btnRightElement.classList.toggle("reset");
  btnRightElement.innerText = 'RESET';
  btnRightElement.classList.remove("split"); 
}


// Start/Stop Button - EVENTS LISTENERS
btnLeftElement.addEventListener('click', () => {
  // Case where left button is clicked while the chronometer is stopped
  if (btnLeftElement.classList.contains('start')) { 
    setStopBtn(); // setting the left button from START to STOP
    setSplitBtn(); // setting the right button from RESET to SPLIT
    chronometer.start(printTime()); // Starting the chronometer and printing the values on the screen thru a callback
    
  // Case where left button is clicked while the chronometer is running
  } else if (btnLeftElement.classList.contains('stop')) { 
    setStartBtn(); // setting the left button from STOP to START
    setResetBtn(); // setting the right button from SPLIT TO RESET
    chronometer.stop(); // Stopping the chronometer
  }
});


// Reset/Split Button - EVENTS LISTENERS
btnRightElement.addEventListener('click', () => {
  // Case where right button is clicked while the chronometer is running (to split)
  if (btnRightElement.classList.contains('split')) { 
    printSplit();

  // Case where right button is clicked while the chronometer is stopped (to reset)
  } else if (btnRightElement.classList.contains('reset')) { 
    chronometer.reset(); // Reseting the chronometer
    clearSplits();     // Reseting the split list
  }
});