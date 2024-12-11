import entityClass from "src/utils/entityClass";
import { Excel } from "src/excel/excel";
import { Column, Entity } from "typeorm";

@Entity()
export class Logs extends entityClass {

    @Excel({ header: 'ip' })
    @Column({ comment: "ip", type: 'varchar', length: 255, nullable: true })
    ip: string;

    @Excel({ header: '状态码'})
    @Column({ comment: "状态码", type: 'varchar', length: 255, nullable: true })
    statusCode: number;

    @Excel({ header: '请求方式'})
    @Column({ comment: "请求方式", type: 'varchar', length: 255, nullable: true })
    method: string;

    @Excel({ header: 'query参数'})
    @Column({ comment: "query参数", type: 'simple-json', nullable: true })
    query: Object;

    @Excel({ header: 'url请求路径'})
    @Column({ comment: "url请求路径", type: 'varchar', length: 255, nullable: true })
    url: string;

    @Excel({ header: 'body请求体'})
    @Column({ comment: "body请求体", type: 'simple-json', nullable: true })
    body: Object;
}

