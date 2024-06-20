import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { MinioModule as minioClient } from 'nestjs-minio-client';

@Module({
  imports: [
    minioClient.register({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: `v7UGFV2h8sxDDld3BY0n`,
      secretKey: `rYgL0ztUvc6CYLx97dUfKweEW4uAFnd0Rk55nh3Y`,
    }),
  ],
  controllers: [MinioController],
  providers: [MinioService],
})
export class MinioModule {}
