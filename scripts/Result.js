class Result {
    static checkDouble(roll, array) {
        if (array.includes(roll)) return true;
        else return false;
    }

    static checkWinner(totalScore, winNumber) {
        if(totalScore >= winNumber) return true;
        else return false;
    }
}