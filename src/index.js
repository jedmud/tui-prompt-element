const { Type } = require('@jedmud/tui-elements')
const Cursor = require('./cursor')
const History = require('./history')
const defaultOptions = require('../options.json')

require('colors')

module.exports = class extends Type {
    construct() {
        this.line  = ''
        this.cursor = new Cursor(this)
        this.history = new History(this)
        this.selected = false

        this.mergeOptions(defaultOptions)
    }

    set(chr) {
        if (this.selected === true) {
            this.clear()
        }

        this.line = this.line.slice(0, this.cursor.index + 1) + chr + this.line.slice(this.cursor.index + 1)

        this.cursor.increase()

        return this
    }

    clear() {
        this.line = ''

        this.cursor.reset()
        this.deselect()

        return this
    }

    write() {
        const chrs = this.visible().split('')

        if (this.selected !== true || this.line.length === 0) {
            chrs.push(' ')

            chrs[this.cursor.visible()] = chrs[this.cursor.visible()][this.options.bg]
        }

        let line = chrs.join('')

        if (this.selected === true) {
            line = line[this.options.bg]
        }

        this.print([line[this.options.fg]])
    }

    select(history = true) {
        if (this.line.length > 0) {
            this.selected = true

            this.cursor.reset()

            if (history === true) {
                this.history.set(this.line)
            }
        }

        return this
    }

    deselect() {
        this.selected = false

        return this
    }

    visible() {
        const i = this.cursor.index
        const w = this.width()
        const str = this.line.slice(i - w + 1, i + 1)

        return str.length < w ? this.line.slice(0, w) : str
    }

    width() {
        return this.config.params.width - 1
    }

    pop() {
        if (this.selected === true) {
            this.clear()
        } else if (this.cursor.index >= 0) {
            this.line = this.line.slice(0, this.cursor.index) + this.line.slice(this.cursor.index + 1)

            this.cursor.decrease()
        }

        return this
    }
}
