import { EntityManager, In, Repository } from "typeorm";
import entityClass from "./entityClass";
import { User } from "src/users/entities/user.entity";

export const dataAuth = async (manager: Repository<EntityManager | entityClass | any>,user?:User&{getDataScope?:Function}) => {
    console.log(user.roles);
    let sql=manager.createQueryBuilder()
    for (let i = 0; i < user.roles.length; i++) {
        const item = user.roles[i];
        if(item.powerkey===1){
            // sql.orWhere({})
        }else if(item.powerkey==2){
            sql.orWhere({"deptId":In(item.deptArr)})
        }else if(item.powerkey==3){
            console.log(user.getDataScope());
            sql.orWhere({"deptId":In(item.deptArr)})
        }
    }
    return sql
}
export default dataAuth;