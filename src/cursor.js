module.exports = class {
    constructor(prompt) {
        this.prompt = prompt
        this.index = -1
    }

    increase() {
        if (this.index < this.prompt.line.length - 1) {
            this.index++
        }

        this.prompt.deselect()

        return this.prompt
    }

    decrease() {
        if (this.index >= 0) {
            this.index--
        }

        this.prompt.deselect()

        return this.prompt
    }

    visible() {
        const width = this.prompt.width()

        return this.index < width - 1 ? this.index + 1 : width
    }

    reset() {
        this.index = this.prompt.line.length - 1
    }
}
