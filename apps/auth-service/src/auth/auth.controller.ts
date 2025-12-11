import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("/register")
    async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterDto): Promise<any> {
        try {
            const result = await this.authService.register(registerDto)
            return response.status(201).json(
                {
                    status: "ok",
                    result: result
                }
            )
        }
        catch (err) {
            return response.status(500).json({
                status: "error",
                message: err
            })
        }
    }

    @Post("/login")
    async login(@Req() request: Request, @Res() response: Response, @Body() loginDto: LoginDto): Promise<any> {
        try {
            const result = await this.authService.login(loginDto)
            return response.status(201).json(
                {
                    status: "ok",
                    result: result
                }
            )
        }
        catch (err) {
            return response.status(500).json({
                status: "error",
                message: err
            })
        }
    }

}