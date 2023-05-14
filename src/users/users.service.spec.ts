import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
});
