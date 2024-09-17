import { Request, Response } from 'express';
import { TeacherRepository } from '../repositories/teacher.repository';
import * as jwt from 'jsonwebtoken';


export class TeacherController {

  private repository:  TeacherRepository;

  constructor(repository:  TeacherRepository) {
    this.repository = repository;
  }
  login = async(req: Request, res: Response) => {
     // #swagger.description = 'Autenticar usuario'
    try {
      const { username,password } = req.body
      const teacher = await this.repository.findUsernameByNameAndPassword(username,password)
      if(teacher)
      {
        const token = jwt.sign({ _id: teacher?.id, username: teacher?.username },process.env.JWT_KEY as string,{ expiresIn: "1d",});
        return res.json({"token":token});
      }
      return res.status(404).json({ message: '' })
      
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Authentication error' })
    }
  }

  teste = async(req: Request, res: Response) => {
    res.json({"ok":"ok"});
  }

}
