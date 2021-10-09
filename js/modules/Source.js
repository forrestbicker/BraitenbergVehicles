class Source {
    constructor(x, y, intensity=DEFAULT_INTENSITY) {
        this.r = new Vector(x, y); //position
        this.intensity = intensity;
    }
}