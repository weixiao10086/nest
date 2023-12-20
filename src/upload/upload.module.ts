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
        //存储文件路径
        return callback(null, 'uploads')
      },
      filename: (req, file, callback) => {
        //保存的文件名
        const fileName = `${new Date().getTime() + extname(file.originalname)}`
        return callback(null, fileName)
      },
    }),
    limits: {
      // 限制文件大小为 10 MB
      fileSize: 10 * 1024 * 1024, // 默认无限制
      // 限制文件名长度为 50 bytes
      fieldNameSize: 50, // 默认 100 bytes
    },
    //过滤文件
    fileFilter: (req, file, callback) => {
      let filearr = new Set(['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'])
      if (req.user.username === "admin" || filearr.has(file.mimetype)) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    }
  }), TypeOrmModule.forFeature([Upload])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }
