class Sensor extends Component {
    constructor(gyro, offset) {
        super(gyro, offset);
        this.theta = 0; // orientation of sensor
    }

    getValue() {  
        let y = Math.round(this.getR().y);
        let x = Math.round(this.getR().x);
        let grid = this.gyro.universe.stimuli;
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
            return this.gyro.universe.stimuli[y][x];
        } else {
            // if the location is outside the grid, return 0    
            return 0;
        }
    }

    getValue() {
        let y = Math.round(this.getR().y);
        let x = Math.round(this.getR().x);
        for (let source of this.gyro.universe.sources) {
            
        }
    }

}