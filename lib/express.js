const http = require('http');
const url = require('url');
let router = [{
    path:'*',
    method:'*',
    handler(req,res){
        res.end(`Cannot ${req.method} ${req.url}`);
    }
}]
function createAppliction(){
    return {
        get(path,handler){
            router.push({
                path,
                handler,
                method:'get'
            })
        },
        listen(){
            let server = http.createServer(function(req,res){
                let {pathname} = url.parse(req.url);
                // router.forEach(item=>{
                //     if(pathname == item.path && req.method.toLowerCase() == item.method){
                //         item.handler(req,res);
                //     }
                // })
                for(let i=1;i<router.length;i++){
                    let {path,handler,method} = router[i];
                    if(pathname == path && method == req.method.toLowerCase()){
                        return handler(req,res);
                    }
                }
                router[0].handler(req,res);
            })
            server.listen.apply(server,arguments);
        }
    }
}
module.exports = createAppliction;