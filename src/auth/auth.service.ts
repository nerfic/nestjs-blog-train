import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signUp.dto';
import { authConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userService.findOne(username);

        if (!user)
            throw new UnauthorizedException();

        const passwordMatch = bcrypt.compareSync(pass, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(signUpDto: SignUpDto) {
        const user = await this.userService.findOne(signUpDto.email);

        if (user)
            throw new UnauthorizedException("User already exists");

        const hashPass = await bcrypt.hash(signUpDto.password, authConstants.bcryptSaltOrRound);

        return this.userService.create(signUpDto.email, signUpDto.username, hashPass);
    }
}
