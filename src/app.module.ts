import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { HomeController } from './controller/home/home.controller';
import { UserModule } from './controller/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'easy_save',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }),
  UserModule
  ],
  controllers: [HomeController],
  providers: []
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
