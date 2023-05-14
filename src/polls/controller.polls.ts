import { 
    Body, Controller, 
    Get, Post, UseGuards, 
    Req,  
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CreatepollDto } from './createpoll.dto/createpoll.dto';
import { PollsService } from './polls.service';

import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Param } from '@nestjs/common';

@Controller('polls')
export class PollsController {
    constructor(
        private readonly pollsService: PollsService,
        private readonly jwtService: JwtService
        ) {}

    @UseGuards(AuthGuard)
    @Post() async newPoll(@Body() createPoll:CreatepollDto, @Req() req: Request) {
        const options = {
            secret: process.env.JWT_TOKEN,
            privateKey: process.env.JWT_PRIKEY,
        }
        const token = (req.headers.authorization).split(" ")[1]
        const token_decode = this.jwtService.decode(token)
        
        const poll = await this.pollsService.createPoll(createPoll, token_decode['un']);

        return {success: true, data: poll, }
    };
    @Get() async allPoll(){
        const poll = await this.pollsService.allPoll()
        return {success: true, data: poll}
    }

    @Get(":id") async getPoll(@Param('id') id:number){
        const poll = await this.pollsService.getPoll(id)
        return {success: true, data: poll}
    }

    @UseGuards(AuthGuard)
    @Post(":id/:vote") async votePoll(@Param('id') id:number, @Param('vote') vote:string, @Req() req: Request){
        const options = {
            secret: process.env.JWT_TOKEN,
            privateKey: process.env.JWT_PRIKEY,
        }
        const token = (req.headers.authorization).split(" ")[1]
        const token_decode = this.jwtService.decode(token)

        let votedata: boolean = false;
        switch(vote.toLowerCase() ){
            case "y" : case "yeah" : case "yes" : case "true" : case "right" :  votedata = true; break;
            default : votedata = false; break;
        }

        const poll = await this.pollsService.votePoll(id, votedata, token_decode['un'])
        return {success: true, data: poll}
    }
}
