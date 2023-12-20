import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    CacheService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: process.env.RD_HOST,
            port: parseInt(process.env.RD_PORT),
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [CacheService],
})
export class MyCacheModule {}