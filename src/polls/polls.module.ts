import { Module } from '@nestjs/common';
import { PollsController } from './controller.polls';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from 'entities/poll.entity';
import { PollsService } from './polls.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({load : [configuration]}),//<<why we should add this twice?
    JwtModule.register({ 
      global: true,
      signOptions: { expiresIn: process.env.JWT_EXPIRESIN },//<<its one-day i know its hard-coded but whocares...
      secret: process.env.JWT_TOKEN,
      privateKey: process.env.JWT_PRIKEY,
    }),
    TypeOrmModule.forFeature([Poll]),
  ],
  controllers: [PollsController],
  providers: [PollsService]
})
export class PollsModule {}
