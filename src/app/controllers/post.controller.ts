import { Request, Response, Router } from 'express';
import { PostRepository } from '../repositories/post.repository';
import { CustomRequest } from '../middleware/auth';
import { CommentRepository } from '../repositories/comment.repository';


export class PostController {

  private repository: PostRepository;
  private commentRepository: CommentRepository;
  constructor(repository: PostRepository,commentRepository: CommentRepository) {
    this.repository = repository;
    this.commentRepository = commentRepository
  }
  read = async (_: Request, res: Response) => {
     // #swagger.description = 'Buscar lista de todos os posts'
    try {
      const posts = await this.repository.getPosts();
      return res.json(posts);
    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  readId = async (req: Request, res: Response) => {
     // #swagger.description = 'Buscar um post por um id especifico'
    try {
      const postId = parseInt(req.params.id); 
      const post = await this.repository.getPostById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.json(post);
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }


  addPostComment = async (req: Request, res: Response) => {
    // #swagger.description = 'Buscar um post por um id especifico'
   try {
     const postId = parseInt(req.params.id); 
     const {name, comentary} = req.body
     if (!name) {
      return res.status(400).json({ mensagem: 'The name is mandatory' })
    }
    if (!comentary) {
      return res.status(400).json({ mensagem: 'The comentary is mandatory' })
    }
     const comment = await this.commentRepository.insertNewComment(postId,name,comentary)
     if (!comment) {
       return res.status(404).json({ message: 'Error in insert comment' });
     }
     return res.json(comment);
   } catch (error) {
     console.error(error)
     return res.status(500).json({ message: 'Internal Server Error' });
   }
 }


  create = async (req: CustomRequest, res: Response) => {
     // #swagger.description = 'Criar um post'
    const {title, description,author} = req.body
    const teacherId = req._id
    if (!title) {
      return res.status(400).json({ mensagem: 'The title is mandatory' })
    }
    if (!description) {
      return res.status(400).json({ mensagem: 'The description is mandatory' })
    }
    if (!author) {
      return res.status(400).json({ mensagem: 'The author is mandatory' })
    }
    try {
      if (teacherId) {
        const newPost = await this.repository.createPost({ title: title, description: description,author:author,created:new Date() ,teacher: { id: teacherId } })
        return res.status(201).json(newPost)
      }
      return res.status(500).json({ message: 'Invalid teacher' })

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  update = async (req: CustomRequest, res: Response) => {
     // #swagger.description = 'Atualizar um post'
    const {title, description,author} = req.body
    const teacherId = req._id
    const { id } = req.params;
    if (!title) {
      return res.status(400).json({ mensagem: 'The title is mandatory' })
    }
    if (!description) {
      return res.status(400).json({ mensagem: 'The description is mandatory' })
    }
    if (!author) {
      return res.status(400).json({ mensagem: 'The author is mandatory' })
    }
    try {
      if (teacherId) {
        const newPost = await this.repository.updatePost(parseInt(id),teacherId,{ title: title, description: description,author:author })
        if(newPost)
        {
          return res.status(200).json(newPost)
        }
        return res.status(404).json({ message: 'Post not found' })
      }
      return res.status(500).json({ message: 'Invalid teacher' })

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  readTeacherPosts = async (req: CustomRequest, res: Response) => {
     // #swagger.description = 'Buscar lista de todos os posts criado pelo usuario'
    try {
      const teacherId = req._id
      if (teacherId) {
        const posts = await this.repository.getPostByTeacherId(teacherId);
        return res.json(posts);
      }
      return res.status(404).json({ message: 'Invalid Teacher' });

    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  delete = async (req: CustomRequest, res: Response) => {
     // #swagger.description = 'Deleter um post pelo id'
    try {
      const { id } = req.params;
      const teacherId = req._id
      if(!teacherId){
        return res.status(404).json({ message: 'Invalid Teacher' });
      }
      const isDeleted = await this.repository.deletePost(parseInt(id), teacherId);
      if(isDeleted)
      {
        return res.status(204).json({ message: 'Post successfully removed' });
      }
      return res.status(404).json({ message: 'Post not found' })
      
    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  searchPosts = async (req: Request, res: Response) => {
     // #swagger.description = 'Buscar posts por uma palavra'
    try {
      const keyword = req.query.keyword?.toString().toLowerCase()
      if (keyword) {
        const posts = await this.repository.searchInPosts(keyword)
        return res.json(posts);
      }
      const posts = await this.repository.getPosts()
      return res.json(posts);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' })

    }
  }

}
