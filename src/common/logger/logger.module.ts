import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.get<string>('LOG_LEVEL') || 'info',
          genReqId: () => Math.random().toString(36).substring(2, 15),
          redact: {
            paths: ['req.headers.authorization', 'req.body.password'],
          },
          transport: {
            targets: [
              {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  singleLine: true,
                },
              },
              {
                target: 'pino-roll',
                options: {
                  file: './logs/app',
                  frequency: 'daily',
                  mkdir: true,
                  dateFormat: 'yyyy-MM-dd',
                  extension: '.log',
                  size: '10m',
                },
              },
            ],
          },
        },
      }),
    }),
  ],
  exports: [LoggerModule],
})
export class CustomLoggerModule {}
