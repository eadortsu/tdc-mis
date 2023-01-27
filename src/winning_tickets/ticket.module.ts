import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { WinningTicket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WinningTicket])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class WinningTicketsModule {}
