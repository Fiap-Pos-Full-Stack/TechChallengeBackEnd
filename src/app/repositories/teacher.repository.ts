import Teacher from "../entities/teacher.entity";
import ITeacher from "../interfaces/ITeacher";
import { AppDataSource } from "../../database/data-source";

export class TeacherRepository {
    private repository = AppDataSource.getRepository(Teacher);
    findUsernameByNameAndPassword = (username: string, password:string): Promise<ITeacher | null> => {
       return this.repository.findOne({ where: { username:username, password:password } });
    }

    insertNewUser = async (username: string, password:string): Promise<ITeacher> => {
 
        const newPost = this.repository.create({
            username,
            password,
        });
        return await this.repository.save(newPost);
     }
  }


export default { TeacherRepository };