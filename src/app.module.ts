import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players/players.module';
import { database } from 'api.config';
import { TicketsModule } from './tickets/ticket.module';
import { WinningTicketsModule } from './winning_tickets/ticket.module';
import { TransactionsModule } from './transactions/transaction.module';

const dbConfig = database();
@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    PlayersModule,
    TicketsModule,
    WinningTicketsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
