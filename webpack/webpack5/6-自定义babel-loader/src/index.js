class Demo{
    constructor(name) {
        this.name = name
    }
    setName(val) {
        this.name = val
    }
    getName() {
        return this.name
    }
}

const demo = new Demo('lin')
demo.setName('mo')

console.log(demo.getName());