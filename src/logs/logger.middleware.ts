import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ModuleRef } from '@nestjs/core';
import { LogsService } from './logs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logsService: LogsService;

    constructor(private moduleRef: ModuleRef) {
        this.logsService = this.moduleRef.get(LogsService, { strict: false });
    }
    use(req: Request, res: Response, next: NextFunction) {
        console.log('=====================================================');
        this.logsService.create({
            ip: req.ip,
            url: req.baseUrl,
            statusCode: res.statusCode,
            method: req.method,
            query: JSON.stringify(req.query),
            body: JSON.stringify(req.body),
        })
        console.log(`ip:         ${req.ip}`);
        console.log(`请求路径:    ${req.baseUrl}`);
        console.log(`请求方式:    ${req.method}`);
        console.log(`query参数:  `, req.query);
        console.log(`body参数:   `, req.body);
        next();
        console.log('=====================================================');
    }
}
