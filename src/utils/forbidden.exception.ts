//返回异常
import { HttpException, HttpStatus } from "@nestjs/common";
import { paramsType } from "./R";
export class ForbiddenException extends HttpException {
    constructor(data: paramsType) {
        super(data, data.code ? data.code : HttpStatus.NOT_FOUND);
    }
}
