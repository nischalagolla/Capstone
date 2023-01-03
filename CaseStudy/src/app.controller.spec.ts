import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppClusterService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService : AppClusterService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppClusterService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

});
