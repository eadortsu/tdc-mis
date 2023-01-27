import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Readable } from 'stream';

//import { FastCsvParser } from 'fast-csv-parser';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly PlayerRepository: Repository<Player>,
    private readonly connection: Connection,
  ) {}

  create(createPlayerDto: CreatePlayerDto) {
    return 'This action adds a new player';
  }

  findAll() {
    return `This action returns all players`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
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
        const player = await this.PlayerRepository.findOne({
          where: { mobile: row['MOBILE'] },
        });
        if (player) {
          // Update the existing player
          player.lastName = row['LAST NAME'];
          player.otherName = row['OTHER NAMES'];
          player.promotionalConsent =
            row['PROMOTIONAL CONSENT'] === 'Y' ||
            row['PROMOTIONAL CONSENT'] === 'y';
          player.created = row['CREATED'];
          await this.PlayerRepository.save(player);
        } else {
          // Create a new player
          const newPlayer = new Player();
          newPlayer.lastName = row['LAST NAME'];
          newPlayer.otherName = row['OTHER NAMES'];
          newPlayer.mobile = row['MOBILE'];
          newPlayer.promotionalConsent =
            row['PROMOTIONAL CONSENT'] === 'Y' ||
            row['PROMOTIONAL CONSENT'] === 'y';
          newPlayer.created = row['CREATED'];

          await this.PlayerRepository.save(newPlayer);
        }
      });

      await stream.on('end', () => {
        console.log(`Import successful`);
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
