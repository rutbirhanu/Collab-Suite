import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import * as bcrypt from "bcryptjs"
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService,  private jwtService: JwtService) { }

    async register(registerDto : RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({ where: { email: registerDto.email } })

        if (existingUser) {
            throw new BadRequestException("User with this email already exists")
        }

        const hashed = await bcrypt.hash(registerDto.password, 10)
        const user = await this.prisma.user.create({
            data: {
                email: registerDto.email, password: hashed, fullName: registerDto.fullName
            }
        })

        return {id: user.id, email: user.email, fullName: user.fullName}

    }


    async login(loginDto : LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } })
        if (!user) {
            return null
        }
        const valid = await bcrypt.compare(loginDto.password, user.password)
        if (!valid) {
            return null
        }
        const token = this.jwtService.sign({email: loginDto.email})
        return token
    }


    // async validateUser(email: string, password: string) {

    // }


    // async validateToken() {
        
    // }

}