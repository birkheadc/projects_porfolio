import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  ping(): string {
    return "You've reached the projects portfolio API.";
  }
}
