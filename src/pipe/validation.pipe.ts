import { PipeTransform,Injectable,ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { validate, Validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { AnyTxtRecord } from "dns";

@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any,  metadata : ArgumentMetadata) {

        if(!metadata || !this.toValidate(metadata)){
            return value
        }

        // const object = plainToClass(metadata,value);
        // const errors = await validate(object);

        // if(errors.length>0){
        //     throw new BadRequestException("Validator 실패");
        // }

        // return value

    }

        private toValidate(metadata: any):boolean {
            const types : Function[] =[String,Boolean,Number,Array,Object];
            return !types.includes(metadata)
        }
}