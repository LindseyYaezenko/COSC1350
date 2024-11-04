/*
    Student Name: Lindsey Yaezenko
    File Name: guessing.js
    Date: 11.3.2024
*/

// Generate a random number between 1 and 100
  let randomNumber = Math.floor(Math.random() * 100) + 1;
    let guessesRemaining = 10;
      let previousGuesses = [];

// Get HTML elements
let feedback = document.getElementById('feedback');
  let previousGuessesDisplay = document.getElementById('previousGuesses');
    let guessField = document.getElementById('guessField');
      let submitGuessButton = document.getElementById('submitGuess');
        let resetButton = document.getElementById('reset');

// Add click event to submit guess
submitGuessButton.onclick = function() {
     // Prevent form from submitting and reloading the page
        event.preventDefault();
          // Get user's guess
             let userGuess = Number(guessField.value);

  // Check if guess is valid
    if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    feedback.textContent = 'Please enter a whole number between 1 and 100.';
    return;
  }

  // Track the guess and decrease remaining turns
    previousGuesses.push(userGuess);
      guessesRemaining--;

  // Show previous guesses
  previousGuessesDisplay.textContent = 'Its not: ' + previousGuesses.join(', ');

  // Check if the guess is correct, too low, or too high
  if (userGuess === randomNumber) {
    feedback.textContent = 'Your intuition is strong! Well Done!';
    endGame();
  } else if (guessesRemaining === 0) {
    feedback.textContent = 'Not good enough... ' + randomNumber + '.';
    endGame();
  } else {
    feedback.textContent = userGuess < randomNumber ? 'Too low!' : 'Too high!';
    feedback.textContent += ' You have ' + guessesRemaining + ' guesses left.';
  }

  // Clear the input field for the next guess
  guessField.value = '';
  guessField.focus();
};

// End the game and show reset button
function endGame() {
    // Prevent form from submitting and reloading the page
    event.preventDefault();
  guessField.disabled = true;
  submitGuessButton.disabled = true;
  resetButton.style.display = 'inline';
}

// Add click event to reset button
resetButton.onclick = function() {
    // Prevent form from submitting and reloading the page
    event.preventDefault();
  // Reset variables and UI elements
      randomNumber = Math.floor(Math.random() * 100) + 1;
        guessesRemaining = 10;
          previousGuesses = [];

  feedback.textContent = '';
  previousGuessesDisplay.textContent = 'Previous guesses: ';
  guessField.disabled = false;
  submitGuessButton.disabled = false;
  resetButton.style.display = 'none';

  guessField.value = '';
  guessField.focus();
};

  
  
  
