import { IsString, Length } from "class-validator";

export class LoginDto {
    @IsString()
    @Length(5, 30)
    email: string;

    @IsString()
    @Length(3, 20)
    password: string
}