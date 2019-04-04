class Game {
    constructor() {
        // pobieramy wszystkie divy
        this.panelLeft = document.querySelector('.panel--left');
        this.leftTotalScore = document.querySelector('.panel__box--totalScore');
        this.leftRoundScore = document.querySelector('.panel__box--roundScore');
        this.leftDice = document.querySelector('.panel__box--dice img');

        this.panelRight = document.querySelector('.panel--right');
        this.rightTotalScore = document.querySelector('.panel__box--totalScore');
        this.rightRoundScore = document.querySelector('.panel__box--roundScore');
        this.rightDice = document.querySelector('.panel__box--dice img');

        this.divRoll = document.querySelector('.menu__item--roll');
        this.divHold = document.querySelector('.menu__item--hold');
        this.divRestart = document.querySelector('.menu__item--restart');

        // ustawiamy event listiner na przycisku ROLL
        this.divRoll.addEventListener('click', this.startRound);

    }


}