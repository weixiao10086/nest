import { Global, Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Global()
@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: (req, file, callback) => {
        return callback(null, 'uploads')
      },
      filename: (req, file, callback) => {
        const fileName = `${new Date().getTime() + extname(file.originalname)}`
        return callback(null, fileName)
      }
    })
  }), TypeOrmModule.forFeature([Upload])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }
