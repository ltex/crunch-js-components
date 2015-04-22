'use strict'

module.exports = function filterTestFile(filepath, options) {
    filterByFileName.next = filterByFeature
    filterByFeature.next = noFilter
    return filterByFileName(filepath, options)
}

function filterByFileName(filepath, options) {
    var results
        ;

    options = options || {}

    if(!options.file) {
        results = filterByFileName.next(filepath, options)
    } else {
        results = filepath === options.file
    }

    return results
}

function filterByFeature(filepath, options) {
    var results
        , featuresList
        , feats = options.features
        ;

    featuresList = typeof feats === 'string' && feats.split(',')

    if(!featuresList.length) {
        results = filterByFeature.next()
    } else {
        results = featuresList.some(function(feat) {
            return filepath.split('/')[1] === feat
        })
    }

    return results
}

function noFilter() {
    return true
}