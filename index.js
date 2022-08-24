import { ancientsData } from "./ancients/ancients.js";
import { greenCards } from "./green/green.js";
import { brownCards } from "./brown/brown.js";
import { blueCards } from "./blue/blue.js";

let activeAncient;
let difficulty;

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
    /* console.log(activeAncient) */
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

function mediumShuffle(deck) {
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
        alert('Choose your ancient!');
        return; 
    } else if (difficulty === undefined) {
        alert('Choose difficulty!');
        return;
    }

    const azathoth = ancientsData[0];
    const cthulhu = ancientsData[1];
    const iogSothoth = ancientsData[2];
    const shubNiggurath = ancientsData[3];

    let stageOneDecks = [];
    let stageTwoDecks = [];
    let stageThreeDecks = [];

    if (difficulty === 'medium') {
        mediumShuffle(greenCards);
        mediumShuffle(brownCards);
        mediumShuffle(blueCards);
    }
    let ancient;
    activeAncient === 'azathoth' ? ancient = azathoth
    : activeAncient === 'cthulhu' ? ancient = cthulhu
    : activeAncient === 'iogSothoth' ? ancient = iogSothoth
    : activeAncient === 'shubNiggurath' ? ancient = shubNiggurath
    : false;
    //начало первого этапа тасовки
    for (let i = 0; i < ancient.firstStage.greenCards; i++) {
        stageOneDecks.push(greenCards[0]);
        greenCards.shift();
    }
    for (let i = 0; i < ancient.firstStage.brownCards; i++) {
        stageOneDecks.push(brownCards[0]);
        brownCards.shift();
    }
    for (let i = 0; i < ancient.firstStage.blueCards; i++) {
        stageOneDecks.push(blueCards[0]);
        blueCards.shift();
    }

    const counter = document.querySelector('.counter');
    const stageOneCounter = counter.children[0];
    const stageTwoCounter = counter.children[1];
    const stageThreeCounter = counter.children[2];

    stageOneCounter.children[1].textContent = ancient.firstStage.greenCards;
    stageOneCounter.children[2].textContent = ancient.firstStage.brownCards;
    stageOneCounter.children[3].textContent = ancient.firstStage.blueCards;

    mediumShuffle(stageOneDecks);
    //окончание первого этапа и начало второго этапа
    for (let i = 0; i < ancient.secondStage.greenCards; i++) {
        stageTwoDecks.push(greenCards[0]);
        greenCards.shift();
    }
    for (let i = 0; i < ancient.secondStage.brownCards; i++) {
        stageTwoDecks.push(brownCards[0]);
        brownCards.shift();
    }
    for (let i = 0; i < ancient.secondStage.blueCards; i++) {
        stageTwoDecks.push(blueCards[0]);
        blueCards.shift();
    }

    stageTwoCounter.children[1].textContent = ancient.secondStage.greenCards;
    stageTwoCounter.children[2].textContent = ancient.secondStage.brownCards;
    stageTwoCounter.children[3].textContent = ancient.secondStage.blueCards;

    mediumShuffle(stageTwoDecks);
    //окончание второго этапа и начало третьего этапа
    for (let i = 0; i < ancient.thirdStage.greenCards; i++) {
        stageThreeDecks.push(greenCards[0]);
        greenCards.shift();
    }
    for (let i = 0; i < ancient.thirdStage.brownCards; i++) {
        stageThreeDecks.push(brownCards[0]);
        brownCards.shift();
    }
    for (let i = 0; i < ancient.thirdStage.blueCards; i++) {
        stageThreeDecks.push(blueCards[0]);
        blueCards.shift();
    }

    stageThreeCounter.children[1].textContent = ancient.thirdStage.greenCards;
    stageThreeCounter.children[2].textContent = ancient.thirdStage.brownCards;
    stageThreeCounter.children[3].textContent = ancient.thirdStage.blueCards;

    mediumShuffle(stageThreeDecks);

    finalDeck.push(stageOneDecks);
    finalDeck.push(stageTwoDecks);
    finalDeck.push(stageThreeDecks);

    const stageOneHeader = document.querySelector('.counter__stage1').children[0];
    stageOneHeader.classList.add('stage-header--active');
    deckBg.classList.add('deck-background--active');
    shuffleBtn.classList.remove('shuffle-button--active');
    shuffleBtn.removeEventListener('click', shuffleAllCards);   
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
            finalDeck[0][0].color === 'green' ? counter1.children[1].textContent = Number(counter1.children[1].textContent) - 1 : false;
            finalDeck[0][0].color === 'brown'? counter1.children[2].textContent = Number(counter1.children[2].textContent) - 1 : false;
            finalDeck[0][0].color === 'blue' ? counter1.children[3].textContent = Number(counter1.children[3].textContent) - 1 : false;
            finalDeck[0].shift();
        } else if (finalDeck[0].length === 0 && finalDeck[1].length > 0) { //проверка длины деки для stage2
            stageOneHeader.classList.contains('stage-header--active') ? stageOneHeader.classList.remove('stage-header--active') : false;
            stageTwoHeader.classList.add('stage-header--active');
            openedCards.style.backgroundImage = `url(${finalDeck[1][0].url})`;
            finalDeck[1][0].color === 'green' ? counter2.children[1].textContent = Number(counter2.children[1].textContent) - 1 : false;
            finalDeck[1][0].color === 'brown' ? counter2.children[2].textContent = Number(counter2.children[2].textContent) - 1 : false;
            finalDeck[1][0].color === 'blue' ? counter2.children[3].textContent = Number(counter2.children[3].textContent) - 1 : false;
            finalDeck[1].shift();
        } else if (finalDeck[1].length === 0 && finalDeck[2].length > 0) {
            stageTwoHeader.classList.contains('stage-header--active') ? stageTwoHeader.classList.remove('stage-header--active') : false;
            stageThreeHeader.classList.add('stage-header--active');
            openedCards.style.backgroundImage = `url(${finalDeck[2][0].url})`;
            finalDeck[2][0].color === 'green' ? counter3.children[1].textContent = Number(counter3.children[1].textContent) - 1 : false;
            finalDeck[2][0].color === 'brown' ? counter3.children[2].textContent = Number(counter3.children[2].textContent) - 1 : false;
            finalDeck[2][0].color === 'blue' ? counter3.children[3].textContent = Number(counter3.children[3].textContent) - 1 : false;
            finalDeck[2].shift();
        }
        if (finalDeck[2].length === 0) {
            stageThreeHeader.classList.remove('stage-header--active');
            deckBg.classList.remove('deck-background--active');
            deckBg.removeEventListener('click', withdrawCard);
            deckBg.addEventListener('click', () => alert('Restart the page to start again'));
        } 
    } else alert('Shuffle your deck first!');
}

const deckBg = document.querySelector('.deck-background');
deckBg.addEventListener('click', withdrawCard);