class Randomnum {
    constructor() {
        this.n = Math.random()
    }
    get num() {
        return this.n
    }
}
let hd = new Randomnum()
export { hd }
