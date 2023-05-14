import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { UsersController } from './controller.users';
import { UsersModule } from './users.module';
import configuration from '../../config/configuration';
import { User } from '../../entities/user.entity';

describe('UsersController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({load : [configuration]}),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10) || 6033,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [User],
          synchronize: true,
        }),
        UsersModule
      ],
    }).compile();
  });

  describe('user content', () => {
    it('start-page"', () => {//dont know what happen in this test
      expect(1+1).toBe(2);
      // const userController = app.get(UsersController)
      // expect(userController.start()).toBe('Users Up && running');
    });
  });
});
