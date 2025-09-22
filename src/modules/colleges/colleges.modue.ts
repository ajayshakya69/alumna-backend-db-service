import { Module } from '@nestjs/common';
import { CollegeController } from './colleges.controller';
import { CollegeService } from './colleges.service';

@Module({
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule {}
