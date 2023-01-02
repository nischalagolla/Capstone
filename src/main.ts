import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppClusterService } from './app.service';
import  cluster from 'cluster';
import  os from 'os';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const numCPUs = os.cpus().length;

  //swagger 

  const config = new DocumentBuilder()
    .setTitle('Airlines')
    .setDescription('Airline Operations')
    .setVersion('1.0')
    .addTag('airline')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


}

AppClusterService.clusterize(bootstrap);