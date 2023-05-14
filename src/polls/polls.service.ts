import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from 'entities/poll.entity';
import { Repository } from 'typeorm';
import { CreatepollDto } from './createpoll.dto/createpoll.dto';

import { Request } from 'express';

@Injectable()
export class PollsService {
    constructor(
        @InjectRepository(Poll) private readonly PollRepository: Repository<Poll>,
    ){}

    async createPoll(createpollDto: CreatepollDto, un:string) {
        try {
            if(!createpollDto.poll_title){throw new Error("No Title for polls")}
            if(!un){throw new Error("Who are you?")}

            const poll = await this.PollRepository.create({
                poll_title: createpollDto.poll_title, poll_context: createpollDto.poll_context,
                createdBy:un,
            });
            const savedPoll = await this.PollRepository.save(poll);
            return {success: true,data: savedPoll};
        } catch (error) {
            return {success : false, message : error.message};
        }
    }
    async allPoll(){
        try {
            const allPoll = await this.PollRepository.find();
            return {success: true,data: allPoll};
        } catch (error) {
            return {success : false, message : error.message};
        }
    }
    async getPoll(pollID:number){
        try {
            const onePoll = await this.PollRepository.findBy({id : pollID} )
            if(!(onePoll.length > 0) ){throw new Error("No Poll or id number is wrong")}
            return {success: true,data: onePoll};
        } catch (error) {
            return {success : false, message : error.message};
        }
    }

    async votePoll(pollID:number, vote:boolean, un:string){
        try {
            
            //get selected poll
            const selectedPoll = await this.getPoll(pollID)
            if(!(selectedPoll.data.length > 0) ){throw new Error("No Poll or id number is wrong")}

            //is poll already voted
            const votedPoll = await this.PollRepository.findBy({id : pollID, voted_by: un} )
            if(votedPoll.length > 0){throw new Error("You are already voting or no ones voting again")}

            const updatePoll = this.PollRepository.update({id : pollID}, {is_voted : vote, voted_by: un} )

            return {success: true,data: updatePoll};
        } catch (error) {return {success : false, message : error.message};}
    }
}
