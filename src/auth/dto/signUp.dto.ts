import { IsString, IsArray, IsBoolean, IsDateString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
