import { Controller, Get } from '@nestjs/common';
import { AppClusterService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly AppClusterService: AppClusterService) {}

}
