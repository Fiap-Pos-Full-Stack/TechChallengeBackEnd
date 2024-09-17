import IComment from "./IComment";
import ITeacher from "./ITeacher";

interface IPost {
    id?: number;
    title: string;
    description: string;
    author: string;
    created: Date;
    teacher: ITeacher;
    comments?: IComment[]
}

export default IPost;