import { ancientsData } from "./ancients/ancients.js";
import { greenCards } from "./green/green.js";
import { brownCards } from "./brown/brown.js";
import { blueCards } from "./blue/blue.js";

let activeAncient;

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

    event === azathoth ? activeAncient = 'azathoth' : false;
    event === cthulhu ? activeAncient = 'cthulhu' : false;
    event === iogSothoth ? activeAncient = 'iogSothoth' : false;
    event === shubNiggurath ? activeAncient = 'shubNiggurath' : false;

    /* event.classList.add('ancient-image--active');

    if (event.classList.contains('ancient-image--active')) {
        event.classList.remove('ancient-image--active');
        activeAncient = undefined;
    }; */

    /* else {
        event.classList.add('ancient-image--active');
    } */
    console.log(activeAncient)
}

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
        alert('Choose your ancient!');
        return; 
    }

    const azathoth = ancientsData[0];
    const cthulhu = ancientsData[1];
    const iogSothoth = ancientsData[2];
    const shubNiggurath = ancientsData[3];

    let stageOneDecks = [];
    let stageTwoDecks = [];
    let stageThreeDecks = [];
    
    shuffle(greenCards);
    shuffle(brownCards);
    shuffle(blueCards);

    if (activeAncient === 'azathoth') {
        //начало первого этапа тасовки
        for (let i = 0; i < azathoth.firstStage.greenCards; i++) {
            stageOneDecks.push(greenCards[0]);
            greenCards.shift();
        }
        for (let i = 0; i < azathoth.firstStage.brownCards; i++) {
            stageOneDecks.push(brownCards[0]);
            brownCards.shift();
        }
        for (let i = 0; i < azathoth.firstStage.blueCards; i++) {
            stageOneDecks.push(blueCards[0]);
            blueCards.shift();
        }

        const counter = document.querySelector('.counter');
        const stageOneCounter = counter.children[0];
        const stageTwoCounter = counter.children[1];
        const stageThreeCounter = counter.children[2];

        stageOneCounter.children[1].textContent = azathoth.firstStage.greenCards;
        stageOneCounter.children[2].textContent = azathoth.firstStage.brownCards;
        stageOneCounter.children[3].textContent = azathoth.firstStage.blueCards;

        shuffle(stageOneDecks);
        //окончание первого этапа и начало второго этапа
        for (let i = 0; i < azathoth.secondStage.greenCards; i++) {
            stageTwoDecks.push(greenCards[0]);
            greenCards.shift();
        }
        for (let i = 0; i < azathoth.secondStage.brownCards; i++) {
            stageTwoDecks.push(brownCards[0]);
            brownCards.shift();
        }
        for (let i = 0; i < azathoth.secondStage.blueCards; i++) {
            stageTwoDecks.push(blueCards[0]);
            blueCards.shift();
        }

        stageTwoCounter.children[1].textContent = azathoth.secondStage.greenCards;
        stageTwoCounter.children[2].textContent = azathoth.secondStage.brownCards;
        stageTwoCounter.children[3].textContent = azathoth.secondStage.blueCards;

        shuffle(stageTwoDecks);
        //окончание второго этапа и начало третьего этапа
        for (let i = 0; i < azathoth.thirdStage.greenCards; i++) {
            stageThreeDecks.push(greenCards[0]);
            greenCards.shift();
        }
        for (let i = 0; i < azathoth.thirdStage.brownCards; i++) {
            stageThreeDecks.push(brownCards[0]);
            brownCards.shift();
        }
        for (let i = 0; i < azathoth.thirdStage.blueCards; i++) {
            stageThreeDecks.push(blueCards[0]);
            blueCards.shift();
        }

        stageThreeCounter.children[1].textContent = azathoth.thirdStage.greenCards;
        stageThreeCounter.children[2].textContent = azathoth.thirdStage.brownCards;
        stageThreeCounter.children[3].textContent = azathoth.thirdStage.blueCards;

        shuffle(stageThreeDecks);

        finalDeck.push(stageOneDecks);
        finalDeck.push(stageTwoDecks);
        finalDeck.push(stageThreeDecks);
    }
}

const shuffleBtn = document.querySelector('.shuffle-button');
shuffleBtn.addEventListener('click', shuffleAllCards);

function withdrawCard() {
    const openedCards = document.querySelector('.opened-cards');
    const counter1 = document.querySelector('.counter__stage1');
    const counter2 = document.querySelector('.counter__stage2');
    const counter3 = document.querySelector('.counter__stage3');

    if (finalDeck[0].length > 0) { //проверка длины деки для stage1
        openedCards.style.backgroundImage = `url(${finalDeck[0][0].url})`;
        finalDeck[0][0].color === 'green' ? counter1.children[1].textContent = Number(counter1.children[1].textContent) - 1 : false;
        finalDeck[0][0].color === 'brown'? counter1.children[2].textContent = Number(counter1.children[2].textContent) - 1 : false;
        finalDeck[0][0].color === 'blue' ? counter1.children[3].textContent = Number(counter1.children[3].textContent) - 1 : false;
        finalDeck[0].shift();
    } else if (finalDeck[0].length === 0 && finalDeck[1].length > 0) { //проверка длины деки для stage2
        openedCards.style.backgroundImage = `url(${finalDeck[1][0].url})`;
        finalDeck[1][0].color === 'green' ? counter2.children[1].textContent = Number(counter2.children[1].textContent) - 1 : false;
        finalDeck[1][0].color === 'brown' ? counter2.children[2].textContent = Number(counter2.children[2].textContent) - 1 : false;
        finalDeck[1][0].color === 'blue' ? counter2.children[3].textContent = Number(counter2.children[3].textContent) - 1 : false;
        finalDeck[1].shift();
    } else if (finalDeck[1].length === 0 && finalDeck[2].length > 0) {
        openedCards.style.backgroundImage = `url(${finalDeck[2][0].url})`;
        finalDeck[2][0].color === 'green' ? counter3.children[1].textContent = Number(counter3.children[1].textContent) - 1 : false;
        finalDeck[2][0].color === 'brown' ? counter3.children[2].textContent = Number(counter3.children[2].textContent) - 1 : false;
        finalDeck[2][0].color === 'blue' ? counter3.children[3].textContent = Number(counter3.children[3].textContent) - 1 : false;
        finalDeck[2].shift();
    }
    console.log(finalDeck[0].length)
    console.log(finalDeck[1].length)
    console.log(finalDeck[2].length)
}

const deckBg = document.querySelector('.deck-background');
deckBg.addEventListener('click', withdrawCard);
