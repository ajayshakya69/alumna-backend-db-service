import { Controller, Get, Post } from '@nestjs/common';
import { CollegeService } from './colleges.service';

@Controller()
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @Get('api/property')
  async getAllColleges() {
    return await this.collegeService.getAllColleges();
  }
}
