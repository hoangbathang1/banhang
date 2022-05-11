import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configurations } from './config/common';
import { typeormConfig } from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => configurations.toObject()],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeormConfig.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
