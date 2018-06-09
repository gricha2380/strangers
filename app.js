'use strict'; // no sloppy JS habits allowed here.

// event listener to stop script from loading until page is fully rendered
document.addEventListener('DOMContentLoaded', function(){
  // ask for user name
  var userName = prompt('Hi, what\'s your name?');
  // if user provides a name, use it
  if (userName == null || userName.length == 0) {
    document.querySelector('.userName').innerHTML = 'Hi Anonymous Strangers! ';
  }
  // otherwise be snarky
  else {
    document.querySelector('.userName').innerHTML = 'Hi ' + userName + '. ';
    console.log(userName);
  }
  // saving object of correct answers. Used in button event listners to compare user input
  var choices = {'yes':['yes','y'],'no':['no','n']};
  // initiate score to track points and counter to incriment progress
  var score = 0;
  var counter = 0;

  let questionSet = [
    "Given the choice of anyone in the world, whom would you want as a dinner guest?",
    "Would you like to be famous? In what way?",
    "Before making a telephone call, do you ever rehearse what you are going to say? Why?",
    "What would constitute a “perfect” day for you?",
    "When did you last sing to yourself? To someone else?",
    "Name three things you each appear to have in common.",
    "For what in your life do you feel most grateful?",
    "If you could change anything about the way you were raised, what would it be?",
    "Give your life summary in the form of your favorite sitcom theme song",
    "If you could wake up tomorrow having gained any one quality or ability, what would it be?",
    "If a crystal ball could tell you the truth about yourself, your life, the future or anything else, what would you want to know?",
    "Is there something that you’ve dreamed of doing for a long time? Why haven’t you done it?",
    "What is the greatest accomplishment of your life?",
    "What do you value most in a friendship?",
    "What is your most treasured memory?",
    "What is your most terrible memory?",
    "What's your favorite Youtube channel?",
    "Who's your favorite imaginary super hero?",
    "Who's your favorite real life hero?"
  ];

  questionSet = questionSet.sort(()=> {return .5 - Math.random()})

  // if user clicks 'begin', launch question function
  document.querySelector('.begin').addEventListener('click', function(event){
    document.querySelector('.progress').setAttribute('style','display:block');
    if (counter <= questionSet.length) {
      askQuestions();
    }
  });

  const askQuestions = () => {
    document.querySelector('.inner').innerHTML = questionSet[counter];
    document.querySelector('.beginHolder').setAttribute('style','display:none');
    document.querySelector('.nextHolder').setAttribute('style','display:block');
    document.querySelector('.next').addEventListener('click', function(event){
      increaseCounter();
    })
  }

  const increaseCounter = () => {
    if (counter < questionSet.length - 1) {
      counter++
      document.querySelector('.progressInner').setAttribute('style',`width:${counter/questionSet.length*100}%`);
      document.querySelector('.inner').innerHTML = questionSet[counter];
      
        // animate 'correct' badge with CSS then hide after delay
      document.querySelector('.feedback').innerHTML = '👍';
      document.querySelector('.feedback').classList.toggle('live');
      hideFeedback();

      
    }
    else {
      document.querySelector('.intro').setAttribute('style','background-color:green');
      document.querySelector('.progress').setAttribute('style','background-color:green');
      document.querySelector('.inner').innerHTML = `You've answered ${questionSet.length} questions! I bet you two know each other pretty well now!`
      document.querySelector('.nextHolder').innerHTML = `<button class="restart">Restart</button>`;
      document.querySelector('.restart').addEventListener('click', function(event){
        location.reload();
      })
    }
  }

  // delay function to hide feedback div
  function hideFeedback(){
    setTimeout(function() {
      document.querySelector('.feedback').classList.toggle('live');
    }, 1000);
  }

  // incriment counter and print status
  function updateStatus(){
    console.log('question was: ' + questions[counter].question);
    console.log('answer was ' + questions[counter].answer[0]);
    console.log('score is ' + score);
    counter++;
  }

  // show score and reset code
  function thanksForPlaying(){
    document.querySelector('.beginHolder').setAttribute('style','display:none');
    document.querySelector('.answerChoices').setAttribute('style','display:block');
    document.querySelector('.inner').innerHTML = 'Thanks for playing!';
    document.querySelector('.results').innerHTML = 'Score is ' + score + ' out of ' + questions.length;
    document.querySelector('.answerChoices').innerHTML = '<button onClick="location.reload();">Restart</button>';
  }

  // incriment score if correct then show next question. Otherwise show score
  function ifCorrect() {
    // increase score
    score++;

    // show feedback for current question
    document.querySelector('.caption').innerHTML = questions[counter].correct;

    // go to next question
    updateStatus();

    // animate 'correct' badge with CSS then hide after delay
    document.querySelector('.feedback').innerHTML = 'Correct!';
    document.querySelector('.feedback').classList.toggle('live');
    hideFeedback();

    // only run if there are questions left to show
    if (counter < questions.length) {
      document.querySelector('.inner').innerHTML = questions[counter].question;
    } else {
      thanksForPlaying();
    }
  } // end correct

  // if there are questions left, show next one. Otherwise show score
  function ifIncorrect() {
    // show feedback for current question
    document.querySelector('.caption').innerHTML = questions[counter].incorrect;

    // go to next question
    updateStatus();

    // only run if there are questions left to show
    if (counter < questions.length) {
      document.querySelector('.inner').innerHTML = questions[counter].question;
    } else {
      thanksForPlaying();
    }
  } // end incorrect

}); // end document ready
