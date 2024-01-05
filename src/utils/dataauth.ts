import { EntityManager, Repository } from "typeorm";
import entityClass from "./entityClass";

export const dataAuth = (manager: Repository<EntityManager | entityClass | any>) => {
    return manager.createQueryBuilder().where({ "id": "2" })
}
export default dataAuth;