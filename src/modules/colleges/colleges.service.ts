import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import { CollegeModel } from './colleges.schema';

@Injectable()
export class CollegeService {
  private readonly CollegeModel = CollegeModel;
  async getAllColleges() {
    try {
      const res = await this.CollegeModel.findAll();

      return res;
    } catch (err: any) {
      Logger.error('Error fetching colleges:', err);
      throw new BadRequestException('Error fetching colleges');
    }
  }
}
