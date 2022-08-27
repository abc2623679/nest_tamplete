import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req:Request, res: Response, next:NextFunction){
        console.log("----------------");
        console.log(req.body)
        //console.log(res)
        next();
        
    }
}

