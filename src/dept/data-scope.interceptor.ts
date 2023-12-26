import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Cache } from 'cache-manager'
import { Observable, concat } from "rxjs";

@Injectable()
export class DataScopeInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    //读写redis
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const aliaObj = this.reflector.get(
      "dataScope",
      context.getHandler(),
    );
    if (aliaObj) {
      const request = context.switchToHttp().getRequest();
      return concat(this.setDataScope(request, aliaObj), next.handle());
    } else {
      return next.handle();
    }
  }

  /* 获取数据权限 */
  async setDataScope(request, aliaObj) {
    // console.log(await request.user.getDataScope(), 'request.user');
    console.log(request.user.deptId, 'user');
    console.log(request.user, 'user');
    const { roles } = request.user;
    let sqlString = '';
    // for (let i = 0; i < roles.length; i++) {
    //   if (roles[i].powerkey === 1) {
    //     sqlString += ``
    //   } else if (roles[i].powerkey === 2) {
    //     // sqlString += ` OR dept.deptId IN ( SELECT deptId FROM role_depts_dept WHERE roleRoleId = ${role.roleId} )`;
    //   } else if (roles[i].powerkey === 3) {
    //     //本部门及以下数据权限
    //     sqlString += ` OR dept.deptId IN ( SELECT deptId FROM dept WHERE concat('.',mpath) like '%.${deptId}.%')`;
    //   } else if (roles[i].powerkey === 4) {

    //   } else if (roles[i].powerkey === 5) {

    //   }
    // }

    // let sqlString = '';
    // /* 如果是超级管理员 ，就具备所有权限 */
    // const roleArr: Role[] = JSON.parse(
    //   await this.redis.get(`${USER_ROLEKS_KEY}:${userId}`),
    // );
    // if (!roleArr.map((role) => role.roleKey).includes('admin')) {
    //   const userDeptId = await this.redis.get(`${USER_DEPTID_KEY}:${userId}`);
    //   const deptId = userDeptId ? userDeptId : null;
    //   for (let index = 0; index < roleArr.length; index++) {
    //     const role = roleArr[index];
    //     const dataScope = role.dataScope;
    //     if (dataScope == '1') {
    //       //全部数据权限
    //       sqlString = '';
    //       return;
    //     } else if (dataScope == '2') {
    //       //自定义数据权限
    //       sqlString += ` OR ${aliaObj.deptAlias}.dept_id IN ( SELECT deptDeptId FROM role_depts_dept WHERE roleRoleId = ${role.roleId} )`;
    //     } else if (dataScope == '3') {
    //       //本部门数据权限
    //       sqlString += ` OR ${aliaObj.deptAlias}.dept_id = ${deptId}`;
    //     } else if (dataScope == '4') {
    //       //本部门及以下数据权限
    //       sqlString += ` OR ${aliaObj.deptAlias}.dept_id IN ( SELECT dept_id FROM dept WHERE concat('.',mpath) like '%.${deptId}.%')`;
    //     } else if (dataScope == '5') {
    //       //仅本人数据权限
    //       sqlString += ` OR ${aliaObj.userAlias}.user_id = ${userId}`;
    //     }
    //   }
    // }
    // if (sqlString) {
    //   request.dataScope = '(' + sqlString.substring(4) + ')';
    // }
    request.sqlString = sqlString
  }
}
