const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--; // decrement maxTime by -1;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time's Up! ${correctWord.toUpperCase()} was the correct word`);
        initGame(); //calling initGame function so the timer restarts
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObject = words[Math.floor(Math.random() * words.length)]; //getting random object from words
    let wordArray = randomObject.word.split(""); //splitting each letter of random word
    
    for(let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //getting random number
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerHTML = wordArray.join(""); //passing shuffled words as text
    hintText.innerHTML = randomObject.hint; //hint text displayed
    correctWord = randomObject.word.toLowerCase(); //passing random word to correct word
    inputField.value =""; //making input field empty
    inputField.setAttribute("maxlength", correctWord.length); //setting input maxlength attribute value to word length
    
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase(); //getting user value
    if(!userWord) return alert("Please enter a word"); //if the user didn't enter anything

    //if the user enters a word which doesn't match with the correct word
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not the correct word`);

    //if the user guesses the correct word
    alert(`Congrats! ${userWord.toUpperCase()} is the correct word`);
    initGame();
}
refreshBtn.addEventListener("click",initGame);
checkBtn.addEventListener("click", checkWord);
