import { Body, Controller, Get, Post, 
    Req,
    UseGuards} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { RegisterDto } from './register.dto/register.dto';
import { ResponseDto } from './response.dto/response.dto';
import { UsersService } from './users.service';
import { LoginDto } from './login.dto/login.dto';
import { AuthGuard, Public } from '../auth.guard';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ) {}
    
    @Get() start(): string {return 'Users Up && running';}

    @Post() async register(@Body() registerDto: RegisterDto): Promise<ResponseDto> {
        const user = await this.usersService.create(registerDto);
        return {success: true, data: user, }
    };

    @Post("login") async login(@Body() loginDto: LoginDto, @Req() req: Request){
        const user = await this.usersService.findByUNandPW(loginDto)
        const token = await this.jwtService.signAsync(user.data)

        return {success: true, token };
    }

    @UseGuards(AuthGuard) @Get('profile')
    getProfile(@Req() req) {
        console.log("welcome = " +req.user)
        return "content to see";
    }
}