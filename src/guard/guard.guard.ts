import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class GuardGuard implements CanActivate {

  constructor(
    private authService : AuthService
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request =context.switchToHttp().getRequest();
    return this.validatorRequest(request)
  }

  private validatorRequest(request:any){
    const jwtString = request.headers.authorization.split('Bearer ')[1];
    this.authService.verify(jwtString) 

    return true
  }
}
