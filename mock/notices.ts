import {Request,Response} from 'express'
import { number } from 'yargs'
export default {
    // 支持值为 Object 和 Array
    'GET /api/users': (req:Request,res:Response)=>{
        function fn(){
            if(req.query.time=="5"){
                return res.end('ok')
            }else{
                return res.end('nice')
            }
           
        }
        if(req.query.time=="5"){
            setTimeout(fn,3000)
        }else{
            setTimeout(fn,5000)
        }
        
        // setTimeout(fn,ti*100)
    },
  
    // GET 可忽略
    '/api/users/1': { id: 1 },
  
  }