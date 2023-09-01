import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable()
export class RegistrationGuard implements CanActivate {
    constructor(private authService: AuthService) {
    }
    async canActivate(
        context: ExecutionContext,
    ){
        const request = context.switchToHttp().getRequest();
        const {username} = request.body;
        const user = await this.authService.validateUser(username);

        if (user) {
            throw new UnauthorizedException(`Користувач ${username} вже існує.`,);
        }

        return true;
    }
}