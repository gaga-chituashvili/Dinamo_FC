import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const rabbitmqUrl = process.env.RABBITMQ_URL;

  if (rabbitmqUrl) {
    const queue =
      process.env.IDENTITY_EVENTS_QUEUE ?? 'dinamo.identity.events.dev';
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUrl],
        queue,
        noAck: false,
        queueOptions: { durable: true },
      },
    });
    await app.startAllMicroservices();
    logger.log(`Identity events consumer listening on ${queue}`);
  } else {
    logger.warn('RABBITMQ_URL is not set — identity events consumer disabled');
  }

  app.setGlobalPrefix('api');

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['https://dinamo-tb.vercel.app', 'http://localhost:3000'],
    credentials: true,
  });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  logger.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();
