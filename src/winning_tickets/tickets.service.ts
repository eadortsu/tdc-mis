import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { WinningTicket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parse } from 'csv-parse';
import { Readable } from 'stream';

//import { FastCsvParser } from 'fast-csv-parser';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(WinningTicket)
    private readonly TicketRepository: Repository<WinningTicket>,
  ) {}

  create(createTicketDto: CreateTicketDto) {
    return 'This action adds a new ticket.';
  }

  async findAll() {
    return await this.TicketRepository.find();
  }

  async count() {
    return await this.TicketRepository.count();
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }

  async processCsv(file) {
    try {
      const fileStream = new Readable({
        read() {
          this.push(file.buffer);
          this.push(null);
        },
      });

      // Create a stream transformer to parse the CSV data
      const parser = parse({
        columns: true,
      });

      // Create a stream to read the file data and pipe it through the CSV parser
      const stream = fileStream.pipe(parser);

      // Listen for data events and save the rows to the database
      await stream.on('data', async (row) => {
        // Use mobile as the unique column to avoid duplicates
        const ticket = await this.TicketRepository.findOne({
          where: { ticket: row['TICKET'] },
        });
        if (ticket) {
          // Update the existing ticket
          ticket.drawID = row['DRAW ID'];
          ticket.drawName = row['DRAW NAME'];
          ticket.drawDate = row['DRAW DATE'];
          ticket.prizeCategory = row['PRIZE CATEGORY'];
          ticket.playerName = row['PLAYER NAME'];
          ticket.mobile = row['MOBILE'];
          await this.TicketRepository.save(ticket);
        } else {
          // Create a new ticket
          const newTicket = new WinningTicket();
          newTicket.drawID = row['DRAW ID'];
          newTicket.drawName = row['DRAW NAME'];
          newTicket.drawDate = row['DRAW DATE'];
          newTicket.prizeCategory = row['PRIZE CATEGORY'];
          newTicket.playerName = row['PLAYER NAME'];
          newTicket.mobile = row['MOBILE'];
          newTicket.ticket = row['TICKET'];

          await this.TicketRepository.save(newTicket);
        }
      });

      await stream.on('end', () => {
        console.log(`Import successful.`);
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
