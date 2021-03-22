import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { HomeController } from './controller/home/home.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'esay_save',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }),
  ],
  controllers: [HomeController],
  providers: []
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
