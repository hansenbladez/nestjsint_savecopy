import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';//config/configuration

import { UsersModule } from './users/users.module';
import { User } from '../entities/user.entity';
import { PollsModule } from './polls/polls.module';
import { Poll } from 'entities/poll.entity';

@Module({
  imports: [ 
    ConfigModule.forRoot({load : [configuration]}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 6033,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Poll],
      synchronize: true,
    }),
    UsersModule,
    PollsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
