class Player {
    constructor() {
        let _totalScore = 0;
        this.getTotalScore = () => _totalScore;
        this.updateTotalScore = (value) => _totalScore += value;

        let _roundScore = 0;
        this.getRoundScore = () => _roundScore;
        this.updateRoundScore = (value) => _roundScore += value;
    }

}
