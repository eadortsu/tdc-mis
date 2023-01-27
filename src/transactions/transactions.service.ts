import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parse } from 'csv-parse';
import { Readable } from 'stream';

//import { FastCsvParser } from 'fast-csv-parser';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly TransactionRepository: Repository<Transaction>,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
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
        const transaction = await this.TransactionRepository.findOne({
          where: { transaction_id: row['TRANSACTION ID'] },
        });
        if (transaction) {
          // Update the existing transaction
          transaction.mobile = row['MOBILE'];
          transaction.playerName = row['PLAYER NAME'];
          transaction.date = row['TRANSACTION DATE'];
          await this.TransactionRepository.save(transaction);
        } else {
          // Create a new transaction
          const newTransaction = new Transaction();
          newTransaction.mobile = row['MOBILE'];
          newTransaction.playerName = row['PLAYER NAME'];
          newTransaction.date = row['TRANSACTION DATE'];
          newTransaction.transaction_id = row['TRANSACTION ID'];

          await this.TransactionRepository.save(newTransaction);
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
