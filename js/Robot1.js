// robot with a single sensor that moves faster the more intense the light is
class Robot1 {
    constructor(gyro, sensors=[], motorControllers=[], motors=[]) {
        this.gyro = gyro;
        this.sensors = sensors;
        this.motorControllers = motorControllers;
        this.motors = motors;
    }

    step(dt) {
        this.move(dt);
        this.rotate(dt);
    }

    move(dt) {
        this.gyro.a.x = 0;
        this.gyro.a.y = 0;

        for (i = 0; i < this.motors.length; i++) {
            let motor = this.motors[i];
            let fx = Math.cos(-this.gyro.θ) * motor.getForce();
            let fy = Math.sin(-this.gyro.θ) * motor.getForce();

            // let mass be 1 so that force = acceleration
            this.gyro.a.x += fx;
            this.gyro.a.y += fy;
        }
        this.gyro.v.x += dt * this.gyro.a.x;
        this.gyro.v.y += dt * this.gyro.a.y;

        this.gyro.r.x += dt * this.gyro.v.x;
        this.gyro.r.y += dt * this.gyro.v.y;
    }

    rotate(dt) {
        // find the torque generated by the motors
        // get the position of each motor
        // find the vector of the motor
        // find the torque of the motor
        this.gyro.α = 0

        for (i = 0; i < this.motors.length; i++) {
            let motor = this.motors[i];
            let dist = Math.sqrt(Math.pow(motor.offset.x, 2), Math.pow(motor.offset.y, 2));
            let theta = Math.atan(-motor.offset.y / Math.abs(motor.offset.x)); // angle of elevation of the motor from the x-axis
            // we multiply by -1 so the torque is in the theta-direction we want to rotate
            let τ = -1 * motor.getForce() * dist * Math.sin(theta); // τ = F r sin(θ)

            this.gyro.α += 1 * τ * dt; // let moment of inertia be 1 so torque = angular accel
        }

        this.gyro.ω += this.gyro.α * dt;
        this.gyro.θ += this.gyro.ω * dt;
    }

    addSensor(sensor) {
        this.sensors.push(sensor);
    }

    addMotorController(motorController) {
        this.motorControllers.push(motorController);
    }

    addMotor(motor) {
        this.motors.push(motor);
    }
}