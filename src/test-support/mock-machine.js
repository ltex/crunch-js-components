'use strict';

module.exports = MockMachine

var _ = require('lodash')


function isFunction(functionToCheck) {
     var getType = {};
     return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
function MockMachine(){
    if(!(this instanceof MockMachine)) {
        return new MockMachine()
    }

    _.extend(this, (_.isObject(arguments[0]) ? arguments[0] : {}))
    this.handled = {}
    this.handlers = {}
    this.namespace = 'mockMachine'
    this.emit = function(e) {
        var args = [].slice.call(arguments)
        var e = args.shift()
        var fns = this.handlers[e]
        if(!fns){
            throw new Error('no handlers for "' + e + '"')
            return
        }

        fns.forEach(function(fn){
            fn.apply(this,args)
        })
    }
    this.off =  function(e,fn) {
        var arr
        var handlers = (this.handlers[e] || [])
        if(fn) {
            this.handlers[e] = handlers.filter(function(h){
                return h !== fn
            })
            return
        }
        this.handlers[e] = []
    }
    this.on =  function(e,fn) {
        if(!isFunction(fn)) {
            throw new Error('`on` requires a function: ' + e)
        }
        var arr
        this.handlers[e] = arr = (this.handlers[e] || [])
        arr.push(fn)
    }
    this.handle = function(e,args) {
        args = [].slice.call(arguments)
        var e = args.shift()
        var arr
        this.handled[e] = arr = (this.handled[e] || [])
        arr.push(args)
    }
}
