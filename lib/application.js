const Router = require('./router');
const http = require('http');
const methods = require('methods');
const slice = Array.prototype.slice;
function Application(){
    
}
Application.prototype.lazyload = function(){
    if(!this._router){
        this._router = new Router();
    }
}
methods.forEach(function(method){
    Application.prototype[method] = function (path){
        this.lazyload();
        //这样写可以支持处理多个处理函数
        this._router[method].apply(this._router,slice.call(arguments));
        return this;
    }
})

Application.prototype.listen = function (){
    let self = this;
    let server = http.createServer(function(req,res){
        // let {pathname} = url.parse(req.url);
        // for(let i=1;i<self._router.length;i++){
        //     let {path,handler,method} = self._router[i];
        //     if(pathname == path && method == req.method.toLowerCase()){
        //         return handler(req,res);
        //     }
        // }
        // self._router[0].handler(req,res);
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`)
        }
        self._router.handle(req,res,done);
    })
    server.listen.apply(server,arguments);
}
module.exports = Application;
