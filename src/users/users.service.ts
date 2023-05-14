import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './register.dto/register.dto';
import { ResponseDto } from './response.dto/response.dto';
import { LoginDto } from './login.dto/login.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
    ) {}

    async create(registerDto: RegisterDto): Promise<ResponseDto> {
        try {
            if(!registerDto.un){throw new Error("No Username")}
            if(!registerDto.pw){throw new Error("Need a password to create")}

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(registerDto.pw, salt);
            const user = await this.UserRepository.create({
                un:registerDto.un, pw: hashedPassword,
            });
            const savedUser = await this.UserRepository.save(user);
            return {success: true,data: savedUser,};
        } catch (error) {return {success : false, message : error.message};}
    }

    async findByUNandPW(loginDto: LoginDto): Promise<ResponseDto> {
        const user = await this.UserRepository.findOne({where: { un: loginDto.un }, });
        if (!user) {throw new Error('Invalid un or pw');}
        
        const passwordMatch = await bcrypt.compare(loginDto.pw, user.pw);
        if (!passwordMatch) {
            return {
                success: false,
                message: 'Invalid un or pw',
            };
        }
        return {
            success: true,
            data: {id: user.id, un: user.un,},
        };
    }
}