import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CollegeService {
  async getAllColleges() {
    try {
      const res = await axios.get(
        'https://api.admissionjockey.in/api/property',
      );

      return res.data;
    } catch (err: any) {
      throw new BadRequestException('Error fetching colleges');
    }
  }
}
