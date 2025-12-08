import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async register(email: string, password: string, fullName: string) {
        const existingUser = await this.prisma.user.findUnique({ where: { email } })

        if (existingUser) {
            throw new BadRequestException("User with this email already exists")
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = await this.prisma.user.create({
            data: {
                email, password: hashed, fullName
            }
        })

        return {id: user.id, email: user.email, fullName: user.fullName}

    }


    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } })
        if (!user) {
            return null
        }
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            return null
        }
        return user
    }



    async validateUser(email: string, password: string) {

    }


    async validateToken() {
        
    }
}