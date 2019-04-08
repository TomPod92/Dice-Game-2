class Game {
    constructor(winCondition = 100) {
        // ustalamy liczbe puntktow ktora daje zwyciestwo
        this.winCondition = winCondition;
        // pobieramy wszystkie divy
        // lewy panel
        this.panelLeft = document.querySelector('.panel--left');
        this.leftTotalScore = document.querySelector('.panel--left .panel__box--totalScore');
        this.leftRoundScore = document.querySelector('.panel--left .panel__box--roundScore');
        this.leftDice = document.querySelector('.panel--left .panel__box--dice');

        // prawy panel
        this.panelRight = document.querySelector('.panel--right');
        this.rightTotalScore = document.querySelector('.panel--right .panel__box--totalScore');
        this.rightRoundScore = document.querySelector('.panel--right .panel__box--roundScore');
        this.rightDice = document.querySelector('.panel--right .panel__box--dice');

        // menu
        this.menu = document.querySelector('.menu');
        this.divRoll = document.querySelector('.menu__item--roll');
        this.divHold = document.querySelector('.menu__item--hold');
        this.divRestart = document.querySelector('.menu__item--restart');

        // ustawiamy event listinera na przyciskach
        this.divRoll.addEventListener('click', this.rollDice.bind(this));
        this.divHold.addEventListener('click', this.endRound.bind(this));
        this.divRestart.addEventListener('click', this.Restart.bind(this));
    }
    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------
    rollDice() {
        // sprawdzamy ktory gracz jest "aktywny" (zwroci tablice [obiekt, DOM element])
        const activePlayer = this.checkPlayer();

        // losujemy liczbe i wrzucamy ja do zmiennej "currentRoll" w obiekcie DRAW
        draw.roll();
        console.log(`wylosowalismy: ${draw.getCurrentRoll()}`)

        // wyrenderowac kosc na panelu
        this.renderDice(activePlayer, draw.getCurrentRoll());

        // sprawdzamy czy juz raz jej nie wyrzucilismy
        if (draw.getResults().includes(draw.getCurrentRoll())) {
            console.log('to juz bylo');
            // resetujemy "current roll" i tablice "results" w obiekcie DRAW
            draw.deleteRoll();
            // zerujemy "round score" w obiekcie PLAYER
            activePlayer[0].resetRoundScores();
            console.log(`current roll w obiekcie Draw wynosi: ${draw.getCurrentRoll()}`);
            console.log(`tablica w obiekcie Draw wynosi: ${draw.getResults()}`);

            // zmiana aktywnego gracza - koniec kolejki
            this.changeActivePlayer()

            // usuniecie kosci z panelu
            this.leftDice.innerHTML = '';
            this.rightDice.innerHTML = '';

            // przesuniecie menu
            // this.slideMenu(activePlayer);
        }

        // wrzucamy wynik rzutu do tablicy "results" w obiekcie DRAW (chyba ze wyzerowalismy rzut) 
        if (draw.getCurrentRoll() !== 0) draw.pushToArray(draw.getCurrentRoll());
        console.log(`Nie rzucilismy dubletu, wiec tablica w obiekcie Draw wynosi: ${draw.getResults()}`);

        // aktualizujemy "round score" gracza i panel
        this.updateRoundScore(activePlayer);

        console.log('-------------------------------------')
    }
    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------
    checkPlayer() {
        if (this.panelLeft.classList.contains('active')) return [player_1, this.panelLeft];
        else if (this.panelRight.classList.contains('active')) return [player_2, this.panelRight];
    }
    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------
    updateRoundScore(player) {
        // aktualizacja "roundScore" w obiekcie
        player[0].updateRoundScore(draw.getCurrentRoll());
        console.log(`current roll wynosi ${draw.getCurrentRoll()} !!!!!!!`);
        console.log(`Round score gracza wynosi ${player[0].getRoundScore()}`);
        // aktualizacja "roundScore" na panelu
        player[1].querySelector('.panel__box--roundScore').textContent = `round score: ${player[0].getRoundScore()}`;
    }
    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------
    updateTotalScore(player) {
        // aktualizacja "roundScore" w obiekcie
        player[0].updateTotalScore(player[0].getRoundScore());

        // aktualizacja "roundScore" na panelu
        player[1].querySelector('.panel__box--totalScore').textContent = `total score: ${player[0].getTotalScore()}`;
    }
    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------
    endRound() {
        // nacisniecie holda mozliwe jest tylko jezeli juz cos wylosowalismy
        if (draw.getCurrentRoll() == 0) return;

        // sprawdzamy ktory gracz jest "aktywny" (zwroci tablice [obiekt, DOM element])
        const activePlayer = this.checkPlayer();

        // aktualizacja "totalScore" w obiekcie PLAYER i na panelu
        this.updateTotalScore(activePlayer)

        // zerujemy "roundScore" w obiekcie PLAYER
        activePlayer[0].resetRoundScores();

        // zerujemy "round score" na panelu
        activePlayer[1].querySelector('.panel__box--roundScore').textContent = 'roundScore = 0';

        // sprwadzenie czy nie zostal osiagniety koniec gry
        this.checkWinner(activePlayer);

        // resetowanie obiektu DRAW
        draw.deleteRoll();

        // zmiana aktywnego gracza - koniec kolejki
        this.changeActivePlayer()

        // usuniecie kosci z panelu
        this.renderDice(activePlayer, draw.getCurrentRoll())
    }
    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------
    changeActivePlayer() {
        this.panelLeft.classList.toggle('active');
        this.panelLeft.classList.toggle('passive');

        this.panelRight.classList.toggle('active');
        this.panelRight.classList.toggle('passive');
    }
    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------
    renderDice(player, number) {
        let markup = '';

        // jezeli gracz nacisnal "hold" lub wyrzucil dublet "markup" bedzie puste co usunie kosc z panelu
        if (number !== 0) markup = `<img src="images/dice-${number}.png" alt="dice">`;

        player[1].querySelector('.panel__box--dice').innerHTML = markup;
    }
    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------
    Restart() {
        player_1 = new Player();
        player_2 = new Player();
        draw = new Draw();
        result = new Result();

        this.changeActivePlayer();
        this.leftTotalScore.innerHTML = 'total score: 0';
        this.leftRoundScore.innerHTML = 'round score: 0';
        this.leftDice.innerHTML = '';

        this.rightTotalScore.innerHTML = 'total score: 0';
        this.rightRoundScore.innerHTML = 'round score: 0';
        this.rightDice.innerHTML = '';
    }
    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------
    checkWinner(player) {
        if (player[0].getTotalScore() >= this.winCondition) {
            alert('wygrales');
            this.Restart();
        }
    }

    // slideMenu(player) {
    //     const diceWidth = this.leftDice.offsetWidth;
    //     let diceLeftX;
    //     console.log(player[1]);
    //     if (player[1].classList.contains('panel--left')) {
    //         console.log('przesunw w prawo');
    //         diceLeftX = game.rightDice.offsetLeft;
    //         this.menu.style.transform = 'translateX(-100%)';
    //     } else if (player[1].classList.contains('panel--right')) {
    //         console.log('przesunw w lewo');
    //         diceLeftX = game.leftDice.offsetLeft;
    //         this.menu.style.transform = 'translateX(0)';
    //     }
    //     console.log(`przesun o ${game.leftDice.offsetLeft}`);

    //     const center = diceLeftX + (diceWidth / 2);


    //     this.menu.style.left = `${center}px`;
    // }
}