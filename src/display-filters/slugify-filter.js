'use strict'

module.exports = SlugifyFilter

function SlugifyFilter() {
    return function filter(value) {
        if(typeof value !== 'string') {
            return ''
        }

        return value
            .replace(/[^\w\s-]/gi, '')
            .trim()
            .toLowerCase()
            .replace(/[-_\s]+/gi, '-')
    }
}

SlugifyFilter.$inject = []
