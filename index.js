import { ancientsData } from "./data/ancients.js";
import { greenCards } from "./data/green.js";
import { brownCards } from "./data/brown.js";
import { blueCards } from "./data/blue.js";

let activeAncient;
let difficulty;

/* function playMusic() {
    const audio = new Audio();
    audio.src = '../assets/audio/Satanic Music.mp3';
    audio.play();
    audio.volume = 0.2;
}
window.onload = playMusic(); */

const ancients = document.querySelector('.ancients');
ancients.onclick = function(event) {
    let target = event.target;
    if (!target.classList.contains('ancient-image')) return;
    chooseAncient(target);
}

function chooseAncient(event) {
    const azathoth = document.getElementById('azathoth');
    const cthulhu = document.getElementById('cthulhu');
    const iogSothoth = document.getElementById('iogSothoth');
    const shubNiggurath = document.getElementById('shubNiggurath');

    event === azathoth ? activeAncient = 'azathoth' 
        : event === cthulhu ? activeAncient = 'cthulhu' 
        : event === iogSothoth ? activeAncient = 'iogSothoth' 
        : event === shubNiggurath ? activeAncient = 'shubNiggurath' 
        : false;

    if (event.classList.contains('ancient-image--active')) {
        event.classList.remove('ancient-image--active');
        activeAncient = undefined;
        shuffleBtn.classList.remove('shuffle-button--active');
    } else {
        azathoth.classList.remove('ancient-image--active');
        cthulhu.classList.remove('ancient-image--active');
        iogSothoth.classList.remove('ancient-image--active');
        shubNiggurath.classList.remove('ancient-image--active');
        event.classList.add('ancient-image--active');
        (activeAncient !== undefined && difficulty !== undefined) ? shuffleBtn.classList.add('shuffle-button--active') : shuffleBtn.classList.remove('shuffle-button--active');
    }
}

const difficultyContainer = document.querySelector('.difficulty-container');
function chooseDifficulty(event) {
    const veryEasy = document.querySelector('.very-easy');
    const easy = document.querySelector('.easy');
    const medium = document.querySelector('.medium');
    const hard = document.querySelector('.hard');
    const veryHard = document.querySelector('.very-hard');

    event === veryEasy ? difficulty = 'very easy' 
                : event === easy ? difficulty = 'easy' 
                : event === medium ? difficulty = 'medium' 
                : event === hard ? difficulty = 'hard' 
                : event === veryHard ? difficulty = 'very hard' 
                : false;

    if (event.classList.contains('difficulty-btn--active')) {
        event.classList.remove('difficulty-btn--active');
        difficulty = undefined;
        shuffleBtn.classList.remove('shuffle-button--active');
    } else {
        veryEasy.classList.remove('difficulty-btn--active');
        easy.classList.remove('difficulty-btn--active');
        medium.classList.remove('difficulty-btn--active');
        hard.classList.remove('difficulty-btn--active');
        veryHard.classList.remove('difficulty-btn--active');
        event.classList.add('difficulty-btn--active');
        (activeAncient !== undefined && difficulty !== undefined) ? shuffleBtn.classList.add('shuffle-button--active') : shuffleBtn.classList.remove('shuffle-button--active');
    }
}

difficultyContainer.onclick = function(event) {
    let target = event.target;
    if (!target.classList.contains('difficulty-btn')) return;
    chooseDifficulty(target);
}

const unshuffledGreenCards = [...greenCards];
const unshuffledBrownCards = [...brownCards];
const unshuffledBlueCards = [...blueCards];

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

let finalDeck = []
function shuffleAllCards() {
    if (activeAncient === undefined) { 
        alert('Choose the Ancient!');
        return; 
    } else if (difficulty === undefined) {
        alert('Choose the difficulty!');
        return;
    }

    const azathoth = ancientsData[0];
    const cthulhu = ancientsData[1];
    const iogSothoth = ancientsData[2];
    const shubNiggurath = ancientsData[3];

    let stageOneDecks = [];
    let stageTwoDecks = [];
    let stageThreeDecks = [];

    let shuffledGreenCards = [];
    let shuffledBrownCards = [];
    let shuffledBlueCards = [];

    let ancient;
    activeAncient === 'azathoth' ? ancient = azathoth
    : activeAncient === 'cthulhu' ? ancient = cthulhu
    : activeAncient === 'iogSothoth' ? ancient = iogSothoth
    : activeAncient === 'shubNiggurath' ? ancient = shubNiggurath
    : false;

    const requiredGreenCardsNum = ancient.firstStage.greenCards + ancient.secondStage.greenCards + ancient.thirdStage.greenCards;
    const requiredBrownCarsNum = ancient.firstStage.brownCards + ancient.secondStage.brownCards + ancient.thirdStage.brownCards;
    const requiredBlueCardsNum = ancient.firstStage.blueCards + ancient.secondStage.blueCards + ancient.thirdStage.blueCards;

    function checkShortageOfCards(color, unshuffledDeck, shuffledDeck) {
        let shortage;
        if (color === 'green') {
            shortage = requiredGreenCardsNum - shuffledGreenCards.length;
            unshuffledDeck = unshuffledGreenCards;
            shuffledDeck = shuffledGreenCards;
        } else if (color === 'brown') {
            shortage = requiredBrownCarsNum - shuffledBrownCards.length;
            unshuffledDeck = unshuffledBrownCards;
            shuffledDeck = shuffledBrownCards;
        } else if (color === 'blue') {
            shortage = requiredBlueCardsNum - shuffledBlueCards.length;
            unshuffledDeck = unshuffledBlueCards;
            shuffledDeck = shuffledBlueCards;
        }
        for (let i = 0; i < unshuffledDeck.length && shortage > 0; i++) {
            if (unshuffledDeck[i].difficulty === 'normal') {
                shuffledDeck.push(unshuffledDeck[i]);
                shortage--;
            }
        }
    }

    shuffle(unshuffledGreenCards);
    shuffle(unshuffledBrownCards);
    shuffle(unshuffledBlueCards);

    if (difficulty === 'medium') {
        shuffledGreenCards = [...unshuffledGreenCards];
        shuffledBrownCards = [...unshuffledBrownCards];
        shuffledBlueCards = [...unshuffledBlueCards];
    } else if(difficulty === 'very easy') {
        for (let i = 0; i < unshuffledGreenCards.length; i++) {
            unshuffledGreenCards[i].difficulty === 'easy' ? shuffledGreenCards.push(unshuffledGreenCards[i]) : false;
        }
        checkShortageOfCards('green', unshuffledGreenCards, shuffledGreenCards);
       for (let i = 0; i < unshuffledBrownCards.length; i++) {
        unshuffledBrownCards[i].difficulty === 'easy' ? shuffledBrownCards.push(unshuffledBrownCards[i]) : false;
       }
       checkShortageOfCards('brown', unshuffledBrownCards, shuffledBrownCards);
       for (let i = 0; i < unshuffledBlueCards.length; i++) {
        unshuffledBlueCards[i].difficulty === 'easy' ? shuffledBlueCards.push(unshuffledBlueCards[i]) : false;
       }
       checkShortageOfCards('blue', unshuffledBlueCards, shuffledBlueCards);
    } else if (difficulty === 'easy') {
        for (let i = 0; i < unshuffledGreenCards.length; i++) {
            unshuffledGreenCards[i].difficulty !== 'hard' ? shuffledGreenCards.push(unshuffledGreenCards[i]) : false;
        };
        for (let i = 0; i < unshuffledBrownCards.length; i++) {
            unshuffledBrownCards[i].difficulty !== 'hard' ? shuffledBrownCards.push(unshuffledBrownCards[i]) : false;
        };
        for (let i = 0; i < unshuffledBlueCards.length; i++) {
            unshuffledBlueCards[i].difficulty !== 'hard' ? shuffledBlueCards.push(unshuffledBlueCards[i]) : false;
        }
    } else if (difficulty === 'hard') {
        for (let i = 0; i < unshuffledGreenCards.length; i++) {
            unshuffledGreenCards[i].difficulty !== 'easy' ? shuffledGreenCards.push(unshuffledGreenCards[i]) : false;
        };
        for (let i = 0; i < unshuffledBrownCards.length; i++) {
            unshuffledBrownCards[i].difficulty !== 'easy' ? shuffledBrownCards.push(unshuffledBrownCards[i]) : false;
        };
        for (let i = 0; i < unshuffledBlueCards.length; i++) {
            unshuffledBlueCards[i].difficulty !== 'easy' ? shuffledBlueCards.push(unshuffledBlueCards[i]) : false;
        }
    } else if (difficulty === 'very hard') {
       for (let i = 0; i < unshuffledGreenCards.length; i++) {
            unshuffledGreenCards[i].difficulty === 'hard' ? shuffledGreenCards.push(unshuffledGreenCards[i]) : false;
       } 
        checkShortageOfCards('green', unshuffledGreenCards, shuffledGreenCards);
        for (let i = 0; i < unshuffledBrownCards.length; i++) {
            unshuffledBrownCards[i].difficulty === 'hard' ? shuffledBrownCards.push(unshuffledBrownCards[i]) : false;
        }
        checkShortageOfCards('brown', unshuffledBrownCards, shuffledBrownCards);
        for (let i = 0; i < unshuffledBlueCards.length; i++) {
            unshuffledBlueCards[i].difficulty === 'hard' ? shuffledBlueCards.push(unshuffledBlueCards[i]) : false;
        }
        checkShortageOfCards('blue', unshuffledBlueCards, shuffledBlueCards);
    }

    //начало первого этапа тасовки
    const counter = document.querySelector('.counter');
    const stageOneCounter = counter.children[0];
    const stageTwoCounter = counter.children[1];
    const stageThreeCounter = counter.children[2];
    
    for (let i = 0; i < ancient.firstStage.greenCards; i++) {
        stageOneDecks.push(shuffledGreenCards[0]);
        shuffledGreenCards.shift();
    }
    for (let i = 0; i < ancient.firstStage.brownCards; i++) {
        stageOneDecks.push(shuffledBrownCards[0]);
        shuffledBrownCards.shift();
    }
    for (let i = 0; i < ancient.firstStage.blueCards; i++) {
        stageOneDecks.push(shuffledBlueCards[0]);
        shuffledBlueCards.shift();
    }

    stageOneCounter.children[1].textContent = ancient.firstStage.greenCards;
    stageOneCounter.children[2].textContent = ancient.firstStage.brownCards;
    stageOneCounter.children[3].textContent = ancient.firstStage.blueCards;

    shuffle(stageOneDecks);
    //окончание первого этапа и начало второго этапа
    for (let i = 0; i < ancient.secondStage.greenCards; i++) {
        stageTwoDecks.push(shuffledGreenCards[0]);
        shuffledGreenCards.shift();
    }
    for (let i = 0; i < ancient.secondStage.brownCards; i++) {
        stageTwoDecks.push(shuffledBrownCards[0]);
        shuffledBrownCards.shift();
    }
    for (let i = 0; i < ancient.secondStage.blueCards; i++) {
        stageTwoDecks.push(shuffledBlueCards[0]);
        shuffledBlueCards.shift();
    }

    stageTwoCounter.children[1].textContent = ancient.secondStage.greenCards;
    stageTwoCounter.children[2].textContent = ancient.secondStage.brownCards;
    stageTwoCounter.children[3].textContent = ancient.secondStage.blueCards;

    shuffle(stageTwoDecks);
    //окончание второго этапа и начало третьего этапа
    for (let i = 0; i < ancient.thirdStage.greenCards; i++) {
        stageThreeDecks.push(shuffledGreenCards[0]);
        shuffledGreenCards.shift();
    }
    for (let i = 0; i < ancient.thirdStage.brownCards; i++) {
        stageThreeDecks.push(shuffledBrownCards[0]);
        shuffledBrownCards.shift();
    }
    for (let i = 0; i < ancient.thirdStage.blueCards; i++) {
        stageThreeDecks.push(shuffledBlueCards[0]);
        shuffledBlueCards.shift();
    }

    stageThreeCounter.children[1].textContent = ancient.thirdStage.greenCards;
    stageThreeCounter.children[2].textContent = ancient.thirdStage.brownCards;
    stageThreeCounter.children[3].textContent = ancient.thirdStage.blueCards;

    shuffle(stageThreeDecks);

    finalDeck.push(stageOneDecks);
    finalDeck.push(stageTwoDecks);
    finalDeck.push(stageThreeDecks);

    const stageOneHeader = document.querySelector('.counter__stage1').children[0];
    stageOneHeader.classList.add('stage-header--active');

    const counter1 = document.querySelector('.counter__stage1');
    counter1.classList.add('counter__stage1--active');

    deckBg.classList.add('deck-background--active');
    
    shuffleBtn.classList.remove('shuffle-button--active');
    shuffleBtn.removeEventListener('click', shuffleAllCards);   
    shuffleBtn.remove();
}
    
const shuffleBtn = document.querySelector('.shuffle-button');
shuffleBtn.addEventListener('click', shuffleAllCards);

function withdrawCard() {
    const openedCards = document.querySelector('.opened-cards');
    const counter1 = document.querySelector('.counter__stage1');
    const counter2 = document.querySelector('.counter__stage2');
    const counter3 = document.querySelector('.counter__stage3');
    const stageOneHeader = document.querySelector('.counter__stage1').children[0];
    const stageTwoHeader = document.querySelector('.counter__stage2').children[0];
    const stageThreeHeader = document.querySelector('.counter__stage3').children[0];

    if (finalDeck.length !== 0) { 
        if (finalDeck[0].length > 0) { //проверка длины деки для stage1
            openedCards.style.backgroundImage = `url(${finalDeck[0][0].url})`;
            finalDeck[0][0].color === 'green' ? counter1.children[1].textContent = Number(counter1.children[1].textContent) - 1 
            : finalDeck[0][0].color === 'brown'? counter1.children[2].textContent = Number(counter1.children[2].textContent) - 1 
            : finalDeck[0][0].color === 'blue' ? counter1.children[3].textContent = Number(counter1.children[3].textContent) - 1 
            : false;
            finalDeck[0].shift();
        } else if (finalDeck[0].length === 0 && finalDeck[1].length > 0) { //проверка длины деки для stage2
            stageOneHeader.classList.contains('stage-header--active') ? stageOneHeader.classList.remove('stage-header--active') : false;
            stageTwoHeader.classList.add('stage-header--active');
            counter1.classList.remove('counter__stage1--active');
            counter2.classList.add('counter__stage2--active');
            openedCards.style.backgroundImage = `url(${finalDeck[1][0].url})`;
            finalDeck[1][0].color === 'green' ? counter2.children[1].textContent = Number(counter2.children[1].textContent) - 1 
            : finalDeck[1][0].color === 'brown' ? counter2.children[2].textContent = Number(counter2.children[2].textContent) - 1 
            : finalDeck[1][0].color === 'blue' ? counter2.children[3].textContent = Number(counter2.children[3].textContent) - 1 
            : false;
            finalDeck[1].shift();
        } else if (finalDeck[1].length === 0 && finalDeck[2].length > 0) {
            stageTwoHeader.classList.contains('stage-header--active') ? stageTwoHeader.classList.remove('stage-header--active') : false;
            stageThreeHeader.classList.add('stage-header--active');
            counter2.classList.remove('counter__stage2--active');
            counter3.classList.add('counter__stage3--active');
            openedCards.style.backgroundImage = `url(${finalDeck[2][0].url})`;
            finalDeck[2][0].color === 'green' ? counter3.children[1].textContent = Number(counter3.children[1].textContent) - 1 
            : finalDeck[2][0].color === 'brown' ? counter3.children[2].textContent = Number(counter3.children[2].textContent) - 1 
            : finalDeck[2][0].color === 'blue' ? counter3.children[3].textContent = Number(counter3.children[3].textContent) - 1 
            : false;
            finalDeck[2].shift();
        }
        if (finalDeck[2].length === 0) {
            stageThreeHeader.classList.remove('stage-header--active');
            counter3.classList.remove('counter__stage3--active');
            deckBg.classList.remove('deck-background--active');
            deckBg.removeEventListener('click', withdrawCard);
            deckBg.addEventListener('click', () => {
                alert('Your page will be reloaded.');
                location.reload();
            });
        } 
    } else alert('Shuffle your deck first!');
}

const deckBg = document.querySelector('.deck-background');
deckBg.addEventListener('click', withdrawCard);