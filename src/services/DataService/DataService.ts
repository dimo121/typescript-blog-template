import { Blog, Entry, NewBlogInput, NewEntryInput } from '../../types/TypeDefs';
import awsconfig from '../../aws-exports';
import Amplify, { API, Auth } from 'aws-amplify';
import { LOAD_BLOGS, FIND_BLOG, CREATE_BLOG, CREATE_ENTRY } from "./protocol";
//import { GraphQLResult } from '@aws-amplify/api-graphql';

Amplify.configure(awsconfig);

export class DataService {

    private entryCollection: Entry[] = [];

    private async getAuthToken():Promise<string>{
        return (await Auth.currentSession()).getIdToken().getJwtToken()
    }

    public async getBlogs(): Promise<Blog[]>{
     
        const result:any = await API.graphql({query:LOAD_BLOGS});

        return result.data.blogs;
    }

    public async loadBlog(id:string): Promise<Blog>{
        
        const result: any = await API.graphql({query:FIND_BLOG, variables:{ blogId: id }})

        return result.data.blog;
    }

    public async createBlog(blog:NewBlogInput): Promise<boolean>{
        let resultBlog: Blog;

        const authToken = await this.getAuthToken();

        try{
            resultBlog = await API.graphql({    query:CREATE_BLOG, 
                                                variables:{createBlogInput:{ ...blog }},
                                                authMode: 'AMAZON_COGNITO_USER_POOLS',
                                                authToken }) as Blog;
        } catch(e){
            console.log(e);
            return false;
        }

        console.log('Blog created succesfully ', resultBlog);

        return true;
    }

    public async createEntry(entry:NewEntryInput): Promise<boolean>{
        
        let resultEntry: Entry;

        const authToken = await this.getAuthToken();

        try{
            resultEntry = await API.graphql({
                query:CREATE_ENTRY, 
                variables:{createEntryInput:entry},
                authMode: 'AMAZON_COGNITO_USER_POOLS',
                authToken }) as Entry;
        }catch(e){
            console.log(e);
            return false;
        }

        console.log('Entry created succesfully', resultEntry)

        return true;
    }

    public getEntries():Entry[] {
        return this.entryCollection
    }


    public addEntry(entry:Entry):void {
        this.entryCollection.push(entry); 
    }

}