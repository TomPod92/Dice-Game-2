class Draw {
    constructor() {
        let _currentRoll = 0;
        let _results = [];

        this.getCurrentRoll = () => _currentRoll;
        this.getResults = () => _results;


        this.roll = () => {
            const roll = Math.floor(Math.random() * (6 - 1 + 1) + 1);
            _currentRoll = roll;
        }

        this.pushToArray = (value) => {
            _results.push(value);
        }
    }
}