import { ConsoleLogger } from "@nestjs/common";

export class MyLogger extends ConsoleLogger{
    error(message: any, stack?: string, context?: string){
        console.log("@@@@@@@@@@@",message)
        console.log("@@@@@@@@@@@",stack)
        console.log("@@@@@@@@@@@",context)
    super.error.apply(this,arguments);
    console.log("@@@@@@@@@@@",this)
        console.log("@@@@@@@@@@@",arguments)
        
    this.doSomething();
    }

    private doSomething(){

    }
    
    }