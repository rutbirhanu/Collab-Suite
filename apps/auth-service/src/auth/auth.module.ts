import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [PassportModule, JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions:{ expiresIn: "1d"}
    })],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy]
})

export class AuthModule {}