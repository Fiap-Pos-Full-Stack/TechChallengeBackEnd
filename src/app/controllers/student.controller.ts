import { Request, Response } from 'express';
import { StudentRepository } from '../repositories/student.repository';
import * as jwt from 'jsonwebtoken';
import { CustomRequest } from '../middleware/auth';


export class StudentController {

  private repository: StudentRepository;

  constructor(repository: StudentRepository) {
    this.repository = repository;
  }

  readAll = async (_: Request, res: Response) => {
    // #swagger.description = 'Buscar lista de todos os estudantes'
   try {
     const students = await this.repository.getStudents();
     return res.json(students);
   }
   catch (error) {
     console.error(error)
     return res.status(500).json({ message: 'Internal Server Error' })
   }
 }
 readId = async (req: Request, res: Response) => {
  // #swagger.description = 'Buscar um estudante por um id especifico'
 try {
   const id = parseInt(req.params.id); 
   const student = await this.repository.getStudentById(id);
   if (!student) {
     return res.status(404).json({ message: 'student not found' });
   }
   return res.json(student);
 } catch (error) {
   console.error(error)
   return res.status(500).json({ message: 'Internal Server Error' });
 }
}

  login = async (req: Request, res: Response) => {
    // #swagger.description = 'Autenticar usuario'
    try {
      const { username, password } = req.body
      const teacher = await this.repository.findUsernameByNameAndPassword(username, password)
      if (teacher) {
        const token = jwt.sign({ _id: teacher?.id, username: teacher?.username }, process.env.JWT_KEY as string, { expiresIn: "1d", });
        return res.json({ "token": token });
      }
      return res.status(404).json({ message: '' })

    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Authentication error' })
    }
  }

  teste = async (req: Request, res: Response) => {
    res.json({ "ok": "ok" });
  }

  create = async (req: CustomRequest, res: Response) => {
    // #swagger.description = 'Criar um estudante'
    const { user, password, name } = req.body
    const teacherId = req._id
    if (!user) { return res.status(400).json({ mensagem: 'The user is mandatory' }) }
    if (!password) { return res.status(400).json({ mensagem: 'The password is mandatory' }) }
    if (!name) { return res.status(400).json({ mensagem: 'The name is mandatory' }) }
    try {
      if (teacherId) {
        const newStudent = await this.repository.createStudent(user, password,name)
        return res.status(201).json(newStudent)
      }
      return res.status(500).json({ message: 'Invalid teacher' })

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  update = async (req: CustomRequest, res: Response) => {
    // #swagger.description = 'Atualizar um professor'
    const { user, password, name } = req.body
    const teacherId = req._id
    const { id } = req.params;
    if (!user) { return res.status(400).json({ mensagem: 'The user is mandatory' }) }
    if (!password) { return res.status(400).json({ mensagem: 'The password is mandatory' }) }
    if (!name) { return res.status(400).json({ mensagem: 'The name is mandatory' }) }
    try {
      if (teacherId) {
        const newStudent= await this.repository.updateStudent(parseInt(id), teacherId, { username: user, password: password, name:name })
        if (newStudent) {
          return res.status(200).json(newStudent)
        }
        return res.status(404).json({ message: 'Student not found' })
      }
      return res.status(500).json({ message: 'Invalid teacher' })

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  delete = async (req: CustomRequest, res: Response) => {
    // #swagger.description = 'Deleter um professor pelo id'
    try {
      const { id } = req.params;
      const teacherId = req._id
      if (!teacherId) {
        return res.status(404).json({ message: 'Invalid Teacher' });
      }
      const isDeleted = await this.repository.deleteStudent(parseInt(id));
      if (isDeleted) {
        return res.status(204).json({ message: 'Student successfully removed' });
      }
      return res.status(404).json({ message: 'Student not found' })

    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

}
