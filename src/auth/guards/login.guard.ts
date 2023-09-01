import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService) {
    }
    async canActivate(
        context: ExecutionContext,
    ){
        const request = context.switchToHttp().getRequest();
        const {username, password} = request.body;
        const user = await this.authService.validateUser(username);

        if (!user) {
            throw new UnauthorizedException(`Користувач ${username} не існує.`,);
        }

        if (user.password !== password) {
            throw new UnauthorizedException('Неправильний пароль',);
        }

        return true;
    }
}