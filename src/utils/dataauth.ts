import { EntityManager, In, Repository } from 'typeorm';
import entityClass from './entityClass';
import { User } from 'src/users/entities/user.entity';
export const dataAuth = (
  manager: Repository<EntityManager | entityClass | any>,
  user?: User ,
) => {
  let sql = manager.createQueryBuilder();
  for (let i = 0; i < user.roles.length; i++) {
    const item = user.roles[i];
    if (item.powerkey === 1) {
      //全部数据
      sql.andWhere({});
    } else if (item.powerkey === 2) {
      //自定义数据
      sql.andWhere({ deptId: In(item.deptArr) });
    } else if (item.powerkey === 3) {
      //本级及子级数据
      sql.andWhere("deptId IN " +`( SELECT id_descendant FROM dept_closure WHERE id_ancestor=${item.deptId})`)
    } else if (item.powerkey === 4) {
      //本级数据
      sql.andWhere({ deptId: item.deptId });
    } else if (item.powerkey === 5) {
      //本人数据
      sql.andWhere({ deptId: user.deptId });
    }
  }
  return sql;
};
export default dataAuth;