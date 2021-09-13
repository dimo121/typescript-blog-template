import { Blog, Entry } from '../types/TypeDefs';
import { db_mock } from '../apollo/db_mock';
import { entry_mock } from '../apollo/entry_mock'
//import { useQuery } from "@apollo/react-hooks";
//import { LOAD_BLOGS } from "../apollo/protocol";

export class DataService {

    private blogCollection: Blog[] = db_mock;
    private entryCollection: Entry[] = entry_mock;

    public async getBlogs(): Promise<Blog[]>{
        
        return this.blogCollection;
    }

    public getEntries():Entry[] {
        return this.entryCollection
    }

    public addBlog(title:string,content:string): Blog[] {

        const createdAt = new Date().toLocaleString();
        const id = 10001;

        const blog = {
            id,
            createdAt,
            title,
            content
        };

        this.blogCollection.push(blog);

        return this.blogCollection;
    }

    public addEntry(entry:Entry):void {
        this.entryCollection.push(entry); 
    }

}