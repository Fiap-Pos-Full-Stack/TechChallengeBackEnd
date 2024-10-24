import Teacher from "../entities/teacher.entity";
import ITeacher from "../interfaces/ITeacher";
import { AppDataSource } from "../../database/data-source";

export class TeacherRepository {
    private repository = AppDataSource.getRepository(Teacher);
    findUsernameByNameAndPassword = (username: string, password:string): Promise<ITeacher | null> => {
       return this.repository.findOne({ where: { username:username, password:password } });
    }
    getTeachers = (): Promise<ITeacher[]> => {
        return this.repository.find();
    }
    getTeacherById = (id: number): Promise<ITeacher | null> => {
        return this.repository.findOne({
            where: { id },
            select: { username:true},
        });
    };

    createTeacher = async (username: string, password:string, name :string): Promise<ITeacher> => {
        const newPost = this.repository.create({
            username,
            password,
            name,
        });
        return await this.repository.save(newPost);
     }

     updateTeacher= async (id: number, userId :number,updatedData: Partial<ITeacher>): Promise<ITeacher | null> => {
        await this.repository.update(id, updatedData);
        const updatedTeacher = await this.repository.findOne({ where: { id } });
        if (updatedTeacher != null) {
            this.repository.merge(updatedTeacher, updatedData);
            const res = this.repository.save(updatedTeacher);
            return res;
        }
        return null
    };

    deleteTeacher = async (id: number): Promise<boolean> => {
        const deleteResult = await this.repository.delete(id);
        return deleteResult.affected !== 0;
    };
  }


export default { TeacherRepository };