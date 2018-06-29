const Layer = require('./layer');
const methods = require('methods');
const slice = Array.prototype.slice;
function Route(path){
    this.path = path;
    this.stack = [];
    this.methods = {};
}
Route.prototype.handle_method = function(method){
    method = method.toLowerCase();
    return this.methods[method];
}

methods.forEach((method)=>{
    Route.prototype[method] = function(){
        let handlers = slice.call(arguments);
        this.methods[method] = true;
        for(let i=0;i<handlers.length;i++){
            let layer = new Layer('/',handlers[i]);
            layer.method = method;
            this.stack.push(layer);
        }
        return this;
    }
})
Route.prototype.dispatch = function(req,res,out){
    // TODO
    let idx = 0,self = this;
    function next(){
        if(idx>=self.stack.length){
            return out();
        }
        let layer = self.stack[idx++];
        if(layer.method == req.method.toLowerCase()){
            layer.handle_request(req,res,next);
        }else{
            next();
        }
    }
    next();
}
module.exports = Route;