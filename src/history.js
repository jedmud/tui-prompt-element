module.exports = class {
    constructor(prompt) {
        this.prompt = prompt
        this.list = ['']
        this.index = 0
    }

    set(str) {
        if (str !== this.list[this.list.length - 1]) {
            this.list.push(str)

            if (this.list.length > this.prompt.options.limit) {
                this.list.shift()
            }

            this.index = this.list.length - 1
        }
    }

    get() {
        return this.index >= 0 ? this.list[this.index] : ''
    }

    up() {
        if (this.index > 0) {
            this.index--
            this.prompt.line = this.list[this.index]

            this.prompt.cursor.reset()
        }

        return this.prompt
    }

    down() {
        if (this.index < this.list.length - 1) {
            this.index++
            this.prompt.line = this.list[this.index]

            this.prompt.cursor.reset()
        }

        return this.prompt
    }
}
