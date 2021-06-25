import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './App.service';

@Controller("/")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  private root(@Res() res: Response) {
    return res.render(
      this.appService.getRootViewName(),
      { message: 'Hello world!' },
    );
  }
}
