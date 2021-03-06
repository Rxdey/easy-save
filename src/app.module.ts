import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { HomeController } from './controller/home/home.controller';
import { UserController } from './controller/user/user.controller';
import { GroupController } from './controller/group/group.controller';
import { CollectController } from './controller/collect/collect.controller';

import { UserModule } from './controller/user/user.module';
import { AuthModule } from './controller/auth/auth.module';
import { GroupModule } from './controller/group/group.module';
import { CollectModule } from './controller/collect/collect.module';

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
    UserModule,
    AuthModule,
    GroupModule,
    CollectModule
  ],
  controllers: [HomeController, UserController, GroupController, CollectController],
  providers: []
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
