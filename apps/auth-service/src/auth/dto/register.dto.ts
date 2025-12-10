import { IsString, Length } from "class-validator";

export class RegisterDto {
    @IsString()
    @Length(3, 20)
    fullName: string;

    @IsString()
    @Length(5, 30)
    email: string;

    @IsString()
    @Length(3, 20)
    password: string
}