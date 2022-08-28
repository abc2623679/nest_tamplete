import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

export interface Response<T> {
    data: T;
  }
  
@Injectable()
export class LoggingInterceptor implements NestInterceptor{

  
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        console.log("before")
        const now = Date.now()

        return next.handle().pipe(tap(()=>console.log(`after${Date.now()- now}`)))
        
    }
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    console.log("TRTT",next)
    return next
      .handle()
      .pipe(map(data => {
        return { data }
      }));
  }
}