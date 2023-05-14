import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule } from '@nestjs/config';

import { UsersService } from './users.service';
import { UsersController } from './controller.users';
import { User } from '../../entities/user.entity';
import configuration from '../../config/configuration';//config/configuration

import { CollectionMiddleware } from '../collection.middleware';//src/collection.middleware

@Module({
  imports: [
    ConfigModule.forRoot({load : [configuration]}),//<<why we should add this twice?
    JwtModule.register({ 
      global: true,
      signOptions: { expiresIn: process.env.JWT_EXPIRESIN },//<<its one-day i know its hard-coded but whocares...
      secret: process.env.JWT_TOKEN,
      privateKey: process.env.JWT_PRIKEY,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CollectionMiddleware)
      .forRoutes(UsersController);
  }
}
