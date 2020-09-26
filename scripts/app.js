// ----------------------------- Tamagotchi

// - Global Variables
// - Helper Functions
// - Tamagotchi Class
// - Game Object
// - Events

// ----------------------------- Global Variables



const screen = document.querySelector('.screen');
const pauseButton = document.querySelector('.pause');
const messageP = document.querySelector('.message');
const characterImg = document.querySelector('.character');


const teachOptions = document.querySelector('.teach-options');
const playOptions = document.querySelector('.play-options');
const feedOptions = document.querySelector('.feed-options');

const imageFiles = {
  happyDown: [
    './images/sprite/gotchi-young-happy-down.png',
    './images/sprite/gotchi-midage-happy-down.png',
    './images/sprite/gotchi-big-happy-down.png'
  ],
  happyUp: [
    './images/sprite/gotchi-young-happy-up.png',
    './images/sprite/gotchi-midage-happy-up.png',
    './images/sprite/gotchi-big-happy-up.png'
  ],
  reallyHappyDown: [
    './images/sprite/gotchi-young-really-happy-down.png',
    './images/sprite/gotchi-midage-really-happy-down.png',
    './images/sprite/gotchi-big-really-happy-down.png'
  ],
  reallyHappyUp: [
    './images/sprite/gotchi-young-really-happy-up.png',
    './images/sprite/gotchi-midage-really-happy-up.png',
    './images/sprite/gotchi-big-really-happy-up.png'
  ],
  back: [
    './images/sprite/gotchi-young-back.png',
    './images/sprite/gotchi-midage-back.png',
    './images/sprite/gotchi-big-back.png'
  ],
  deadUnimpressed: [
    './images/sprite/gotchi-young-dead-unimpressed.png',
    './images/sprite/gotchi-midage-dead-unimpressed.png',
    './images/sprite/gotchi-big-dead-unimpressed.png'
  ],
  openMouth: [
    './images/sprite/gotchi-young-open-mouth.png',
    './images/sprite/gotchi-midage-open-mouth.png',
    './images/sprite/gotchi-big-open-mouth.png'
  ],
  sad: [
    './images/sprite/gotchi-young-sad.png',
    './images/sprite/gotchi-midage-sad.png',
    './images/sprite/gotchi-big-sad.png'
  ],
  sleep: [
    './images/sprite/gotchi-young-sleep.png',
    './images/sprite/gotchi-midage-sleep.png',
    './images/sprite/gotchi-big-sleep.png'
  ],
  worried: [
    './images/sprite/gotchi-young-worried.png',
    './images/sprite/gotchi-midage-worried.png',
    './images/sprite/gotchi-big-worried.png'
  ],
  surprisedBad: [
    './images/sprite/gotchi-young-surprised-bad.png',
    './images/sprite/gotchi-midage-surprised-bad.png',
    './images/sprite/gotchi-big-surprised-bad.png'
  ],
  catch: [
    './images/sprite/gotchi-young-catch.png',
    './images/sprite/gotchi-midage-catch.png',
    './images/sprite/gotchi-big-catch.png'
  ],
  eat: [
    './images/sprite/gotchi-young-eat.png',
    './images/sprite/gotchi-midage-eat.png',
    './images/sprite/gotchi-big-eat.png'
  ],
  bird: [
    './images/bird-down.png',
    './images/bird-up.png'
  ],
  catBoard: [
    './images/cat-board-100.png',
    './images/cat-board-c-100.png',
    './images/cat-board-a-100.png',
    './images/cat-board-t-100.png',
    './images/cat-board-cat-100.png'
  ],
  mathboard: [
    './images/whiteboard-after-100.png',
    './images/whiteboard-before-100.png'
  ],
  loveBugs: [
    './images/images/love-bugs.png',
    './images/images/love-bugs-love.png',
    './images/images/love-bugs-love-2.png'
  ],
  squirrel: [
    './images/squirrel-happy.png',
    './images/squirrel-run-open.png',
    './images/squirrel-run-closed.png',
    './images/squirrel-upsidedown-open.png',
    './images/squirrel-upsidedown-closed.png'
  ]
}

// ----------------------------- Helper Functions

function changeCharacterImage(image, sizeIndex) {
  characterImg.setAttribute('src', imageFiles[image][sizeIndex]);
}

// used with pause button
// trying to use with toggling interaction buttons... not working
function addDisplayNoneToOptions() {
  document.querySelector('.teach-options').classList.add('display-none');
  document.querySelector('.play-options').classList.add('display-none');
  document.querySelector('.feed-options').classList.add('display-none');
}

function toggleDisplayOnToButtons() {
  document.getElementById('feed').classList.toggle('display-none');
  document.getElementById('play').classList.toggle('display-none');
  document.getElementById('teach').classList.toggle('display-none');
  document.getElementById('tuck-in').classList.toggle('display-none');
}

function pauseGame() {
  pauseButton.classList.toggle('pause-game'); // pauses timer!!!
  addDisplayNoneToOptions();
  toggleDisplayOnToButtons()
}

function displayDropImage(e) {
  const className = e.target.classList[0];
  const matchingImage = document.querySelector(`.drop-${className}`);
  if (!matchingImage) {
    console.log('className: ', className)
    return;
  }
  matchingImage.classList.remove('display-none');
  matchingImage.classList.add('object-drop')
}

function hideDropImage(e) {
  const className = e.target.classList[0];
  const matchingImage = document.querySelector(`.drop-${className}`);
  matchingImage.classList.add('display-none');
  matchingImage.classList.remove('object-drop')
}

function hideScreenBoxes() {
  pauseButton.classList.add('display-none');
  document.querySelector('.star-box').classList.add('display-none');
  document.querySelector('.message-box').classList.add('display-none');
  document.querySelector('.stats-box').classList.add('display-none');
  document.querySelector('.interactions').classList.add('display-none');
}

function showScreenBoxes() {
  pauseButton.classList.remove('display-none');
  document.querySelector('.star-box').classList.remove('display-none');
  document.querySelector('.message-box').classList.remove('display-none');
  document.querySelector('.stats-box').classList.remove('display-none');
  document.querySelector('.interactions').classList.remove('display-none');
}


// ----------------------------- Tamagotchi Class

class Gotchi {
  constructor(name) {
    this.name = name;
    this.age = 1;
    this.sizeIndex = 0;
    this.stats = {
      hungry: 6,
      sleepy: 1,
      bored: 3,
      skill: 0,
      skillCount: 0
    };
    this.care = {
      food: {
        leaves: 0,
        cherries: 0,
        sandwich: 0
      },
      play: {
        catch: 0,
        tickle: 0,
        boardGame: 0
      },
      teach: {
        read: 0,
        math: 0,
        tricks: 0
      }
    };
    this.character = {
      temper: {
        leaves: ['calm', 'green'],
        cherries: ['playful', 'pink'],
        sandwich: ['energetic', 'orange']
      },
      desire: {
        catch: 'help',
        tickle: 'love',
        boardGame: 'travel'
      },
      skills: {
        read: 'speak',
        math: 'building',
        tricks: 'fly'
      }
    },
    this.choices = {
      catch: `Find ${this.name} a friend`,
      tickle: `Send ${this.name} to college`,
      boardGame: `Set ${this.name} free`
    },
    this.result = '';
    this.desire = '';
    this.skill = '';
  }
  sleep() {
    this.stats.sleepy = 0;
    this.age++;
    this.checkAge();
    this.checkStats();
  }
  eat() {
    this.stats.hungry = 0;
    this.checkStats();
  }
  play() {
    this.stats.bored <= 2 ? this.stats.bored = 0 : this.stats.bored -= 2;
    this.stats.sleepy += 0.2;
    this.stats.skill += 0.5;
    this.stats.hungry += 0.5;
    this.checkStats();
  }
  learn() {
    this.stats.bored <= 2 ? this.stats.bored = 0 : this.stats.bored -= 2;
    this.stats.sleepy += 0.2;
    this.stats.skill += 0.5;
    this.stats.hungry += 0.5;
    this.checkStats();
  }
  incrementSize() {
    if (this.age === 3) this.sizeIndex = 1;
    if (this.age === 6) this.sizeIndex = 2;
    document.querySelector('.age').textContent = this.age;
  }
  checkStats() {
    let statNums = Object.values(this.stats);
    statNums = statNums.slice(0, 3);
    // Change message if stats go above 8
    let danger = statNums.some(num => {
      if (num >= 8) {
        messageP.textContent = `${this.name} doesn't feel so good...`;
        return true;
      } 
    });
    // Check if any stats are at 10, if so, game over
    let dead = statNums.some( num => {
      if (num > 10) {
        game.isAlive = false;
        return true;
      } 
    })

    if (this.stats.skill === 10) {
      if (this.stats.skillCount <= 3) {
        this.stats.skill = 0;
        this.stats.skillCount++;
        const skillStar = document.createElement('img');
        skillStar.setAttribute('src', './images/star.png');
        skillStar.setAttribute('alt', 'star');
        skillStar.classList.add('star');
        document.querySelector('.star-box').appendChild(skillStar);
      }
    }

    if (danger) {
        document.querySelectorAll('.bar').forEach(bar => {
        bar.classList.add('warning');
        characterImg.classList.remove('pace');
      })
      if (!dead) {
        changeCharacterImage('worried', this.sizeIndex)
      }
    } else {
        document.querySelectorAll('.bar').forEach(bar => {
        bar.classList.remove('warning');
        messageP.textContent = ' ';
        changeCharacterImage('happyDown', this.sizeIndex)
      })
    }
    // commented out below so game can continue during testing ////
    // if the game isn't paused, it won't execute gameOver yet.
    if (dead && !pauseButton.classList.contains('pause-game')) {      
      game.isAlive = false;
      game.gameOver();
    }
    document.getElementById('bored-progress').style.width = `${this.stats.bored*10}%`;
    document.getElementById('hungry-progress').style.width = `${this.stats.hungry*10}%`;
    document.getElementById('sleepy-progress').style.width = `${this.stats.sleepy*10}%`;
    document.getElementById('skills-progress').style.width = `${this.stats.skill*10}%`;
  }
  // Update desire/skill if age is 6 activate animations to hint at Tamagotchi's desire
  checkAge() {
    if (this.age === 6) {
      // activate desire / skills scenes
      this.desire = this.getDesire();
      this.skill = this.getSkills();
      console.log('this.desire: ', this.desire)
      console.log('this.skill: ', this.skill)
    }
    if (this.age === 10) {
      // activate wants a change scene
      this.result = this.getDesire();
    }
  }
  getDesire() {
    const desires = Object.keys(this.care.play);
    let mostPlayed;
    let amountPlayed = 0;
    for (let i = 0; i < desires.length; i++) {
      if (this.care.play[desires[i]] > amountPlayed) {
        mostPlayed = desires[i];
        amountPlayed = this.care.play[desires[i]];
      }
    }
    console.log('gotchi wants: ', this.character.desire[mostPlayed])
    return this.character.desire[mostPlayed];
  }
  getSkills() {
    const skillsList = Object.keys(this.care.teach);
    let mostTaught;
    let amountTaught = 0;
    for (let i = 0; i < skillsList.length; i++) {
      if (this.care.teach[skillsList[i]] > amountTaught) {
        mostTaught = skillsList[i];
        amountTaught = this.care.teach[skillsList[i]];
      }
    }
    console.log('gotchi skills: ', this.character.skills[mostTaught])
    return this.character.skills[mostTaught];
  }
}


// ----------------------------- Game Object

const game = {
  gotchis: [],
  isAlive: false,
  time: 0,
  start() {
    this.isAlive = true;
    screen.appendChild(document.querySelector('.i-one'));
  },
  life(tamagotchi) {
    const timerId = setInterval(function() {
      // timer stops if pause button clicked
      if (!pauseButton.classList.contains('pause-game')) {
        // console.log('time: ', game.time)
        if (game.time % 15 === 0) {
          const sleepyVal = tamagotchi.stats.sleepy++;
          document.getElementById('sleepy-progress').style.width = `${sleepyVal*10}%`;
        };
        if (game.time % 3 === 0) {
          const boredVal = tamagotchi.stats.bored++;
          const hungryVal = tamagotchi.stats.hungry++;
          document.getElementById('bored-progress').style.width = `${boredVal*10}%`;
          document.getElementById('hungry-progress').style.width = `${hungryVal*10}%`;
        };
        game.time++;

        if (game.isAlive === false) {
          clearInterval(timerId);
        }
        tamagotchi.checkStats();
      }
    }, 1000);
  },
  gameOver() {
    characterImg.classList.remove('pace');

    hideScreenBoxes()

    changeCharacterImage('deadUnimpressed', this.gotchis[0].sizeIndex)
    characterImg.classList.add('die-down');
    document.querySelector('.night-time').classList.add('white-out');
    let time = 0;
    const timer = setInterval(function(){
      console.log(time);
      if (time === 4) {
        document.querySelector('.game-over').classList.remove('display-none');
        document.querySelector('.game-over').classList.add('animate__fadeIn');
      }
      if (time === 7) {

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// instead of creating element here, add it in the html with display none and remove it here.
// figure out the position of the gotchi when dying... it ends up too low, idk why

        const restart = document.createElement('button');
        restart.textContent = 'play again?';
        restart.classList.add('play-again-button');
        document.querySelector('body').appendChild(restart);
        clearInterval(timer);
      }
      time++;
    }, 1000)
  }
}


// ----------------------------- Events


pauseButton.addEventListener('click', function() {
  if (!this.classList.contains('pause-game')) {
    characterImg.classList.remove('pace');
    characterImg.classList.add('display-none');
  } else {
    characterImg.classList.add('pace');
    characterImg.classList.remove('display-none');
  }
  // above is gonna cause a bug when clicking a button but no option...
  // maybe remove pause button from screen at this time
  pauseGame();
})

// maybe have the user click the tamagotchi before clicking a button that way, the captured element can be passed into the event listeners below
// buttons are inactive until tamagotchi is clicked, then they are active and can be clicked.


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!
// trying to dry up the toggling on the buttons...

// function addDisplayNoneToOptions(target) {

//   document.querySelector('.teach-options').classList.add('display-none');
//   document.querySelector('.play-options').classList.add('display-none');
//   document.querySelector('.feed-options').classList.add('display-none');

//   target.classList.remove('display-none');
// }


// ~~~~ FEED BUTTON ANIMATION && FUNCTIONALITY

document.getElementById('feed').addEventListener('click', function(e) {
  // addDisplayNoneToOptions(e.target);
  // Close other button options divs
  teachOptions.classList.add('display-none');
  playOptions.classList.add('display-none');
  feedOptions.classList.toggle('display-none');

  feedOptions.addEventListener('click', function(e) {
    pauseGame();
    e.stopPropagation();
    feedOptions.classList.add('display-none');

    characterImg.classList.remove('pace'); 
    const care = e.target.getAttribute('class')
    game.gotchis[0].care.food[care]++;
    
    
    let time = 0;
    const feedingTime = setInterval(function() {
      if (time === 0) {
        displayDropImage(e);
        hideScreenBoxes();
      }
      if (time === 3) {
        game.gotchis[0].eat();
        hideDropImage(e);
        showScreenBoxes();
        characterImg.classList.add('pace');
        pauseGame();
        clearInterval(feedingTime);
      }
      time++;
    }, 1000);
  })
});

document.getElementById('play').addEventListener('click', function(e) {
  teachOptions.classList.add('display-none');
  feedOptions.classList.add('display-none');
  playOptions.classList.toggle('display-none');
  
  playOptions.addEventListener('click', function(e) {
    pauseGame();
    e.stopPropagation();
    playOptions.classList.add('display-none');

    characterImg.classList.remove('pace'); 
    const care = e.target.getAttribute('class')
    game.gotchis[0].care.play[care]++;
    
    let time = 0;
    const playTime = setInterval(function() {
      if (time === 0) {
        displayDropImage(e);
        hideScreenBoxes();
      }
      if (time === 3) {
        game.gotchis[0].play();
        hideDropImage(e);
        showScreenBoxes();
        characterImg.classList.add('pace');
        pauseGame();
        clearInterval(playTime);
      }
      time++;
    }, 1000);
  })
});

document.getElementById('teach').addEventListener('click', function(e) {
  // addDisplayNoneToOptions(e.target);
  playOptions.classList.add('display-none');
  feedOptions.classList.add('display-none');
  teachOptions.classList.toggle('display-none');
  
  teachOptions.addEventListener('click', function(e) {
    pauseGame();
    e.stopPropagation();
    teachOptions.classList.add('display-none');

    characterImg.classList.remove('pace'); 
    const care = e.target.getAttribute('class')
    game.gotchis[0].care.teach[care]++;

    let time = 0;
    const teachTime = setInterval(function() {
      if (time === 0) {
        displayDropImage(e);
        hideScreenBoxes();
      }
      if (time === 3) {
        game.gotchis[0].learn();
        hideDropImage(e);
        showScreenBoxes();
        characterImg.classList.add('pace');
        pauseGame();
        clearInterval(teachTime);
      }
      time++;
    }, 1000);
    
  })
});

// TUCK IN BUTTON FUNCTIONALITY ~~~ DONE?
document.getElementById('tuck-in').addEventListener('click', function(e) {
  addDisplayNoneToOptions();
  characterImg.classList.remove('pace'); 
  game.gotchis[0].sleep();
  e.stopPropagation();
  document.querySelector('.night-time').classList.add('night-time-on');
  pauseGame();
  changeCharacterImage('sleep', game.gotchis[0].sizeIndex)
  characterImg.classList.add('lie-down');
  document.querySelector('.blanket').classList.add('blanket-slide');
  
  // setInterval function for sleep animation and image change timing

  let time = 0;
  const sleepyTime = setInterval(function() {
    if (time === 2) {
      game.gotchis[0].incrementSize();
      changeCharacterImage('sleep', game.gotchis[0].sizeIndex)
    }
    if (time === 4) {
      document.querySelector('.blanket').classList.remove('blanket-slide');
      characterImg.classList.remove('lie-down');
      changeCharacterImage('happyDown', game.gotchis[0].sizeIndex)
    }
    if (time === 5) {
      characterImg.classList.add('pace');
      document.querySelector('.night-time').classList.remove('night-time-on');
      pauseGame();
      clearInterval(sleepyTime);
    }
    time++;
  }, 1000);

});


// ~~~~~~~~~~~~~~ start game button starting animation

document.querySelector('.start-game')
  .addEventListener('click', function() {
    document.querySelector('.start-game').remove();
    characterImg.classList.add('float-down');
    characterImg.classList.add('wobble');
    let waiting = true;
    let wait = 0;
    while (waiting) {
      const pause = setInterval(function() {
        if (wait === 5) {
          document.querySelector('body')
            .style.backgroundImage = 'url(./images/ghilbli_day_2.jpg)';
          screen.style.backgroundImage = 'url(./images/ghibli_background.jpg)';

          characterImg.classList.remove('moon');
          characterImg.classList.add('moon-top');
          characterImg.classList.add('egg-down');
        };
        // start with default character images
        if (wait === 10) {
          characterImg.setAttribute('src', './images/sprite/gotchi-young-happy-up.png')
          characterImg.classList.add('gotchi-intro');
        }
        if (wait === 12) {
          characterImg.setAttribute('src', './images/sprite/gotchi-young-really-happy-up.png')
        }
        if (wait === 13) {
          characterImg.setAttribute('src', './images/sprite/gotchi-young-happy-up.png')
        }
        if (wait === 14) {
          characterImg.remove();
          game.start();
          clearInterval(pause);
          waiting = false;
        }
        wait++
      }, 1000);
      break;
    }
  }
)


// ~~~~~~~~~~~~~~ Intro / Instructions Buttons

document.querySelector('.button-one').addEventListener('click', function() {
  document.querySelector('.i-one').remove();
  screen.appendChild(document.querySelector('.i-two'));
})

document.querySelector('.button-one').addEventListener('mouseover', function(e) {
  e.target.textContent = 'wow !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = ' wow ';
  })
})

document.querySelector('.button-two').addEventListener('mouseover', function(e) {
  e.target.textContent = 'okay !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'okay?';
  })
})

document.querySelector('.button-two').addEventListener('click', function() {
  document.querySelector('.i-two').remove();
  screen.appendChild(document.querySelector('.i-three'));
})

document.querySelector('.button-three').addEventListener('mouseover', function(e) {
  e.target.textContent = 'okay !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'okay?';
  })
})

document.querySelector('.button-three').addEventListener('click', function() {
  document.querySelector('.i-three').remove();
  screen.appendChild(document.querySelector('.i-four'));
})

document.querySelector('.name-choice').addEventListener('mouseover', function(e) {
  e.target.textContent = 'okay !';
  this.addEventListener('mouseout', function(e) {
    e.target.textContent = 'okay?';
  })
})

document.querySelector('.name-choice').addEventListener('click', function(e) {
  const gotchiName = document.getElementById('gotchi-name').value;
  const tamagotchi = new Gotchi(gotchiName);
  document.querySelector('.name').textContent = gotchiName;
  // in case I want to develop so more gotchis are born::::
  game.gotchis.push(tamagotchi);
  console.log(tamagotchi)
  document.querySelector('.i-four').remove();
  document.querySelector('header').classList.remove('display-none');    
  document.querySelector('main').classList.remove('display-none');
  document.querySelector('footer').classList.remove('display-none');

  game.life(game.gotchis[0]);
  document.querySelector('main').appendChild(characterImg);
  // the classes below were added in the beginning.. removed here for cleanliness
  characterImg.classList.remove('gotchi-intro', 'float-down', 'wobble', 'moon-top', 'egg-down');
  characterImg.classList.add('gotchi');
  // start pacing
  characterImg.classList.add('pace');
})




// ----------------------------- testing testing testing
