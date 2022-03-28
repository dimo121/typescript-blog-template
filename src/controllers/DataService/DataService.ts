import { Blog, Entry, NewBlogInput, NewEntryInput, NewUserInput } from '../../types/TypeDefs';
import { API, Auth } from 'aws-amplify';
import { LOAD_BLOGS, FIND_BLOG, CREATE_BLOG, CREATE_ENTRY, BLOGS_BY_USER, CREATE_USER, DELETE_BLOG } from "./protocol";
import { base64Encode } from '../../utils/base64Encode';
import { S3 } from 'aws-sdk';
import { config } from '../../config';
import { nanoid } from 'nanoid';


export class DataService {

    private async getAuthToken():Promise<string>{
        return (await Auth.currentSession()).getIdToken().getJwtToken()
    }

    public async getBlogs(): Promise<Blog[]>{
     
        const result:any = await API.graphql({query:LOAD_BLOGS});

        return result.data.blogs;
    }

    public async getBlogsByUser(id:string):Promise<Blog[]>{
        
        try{    
            const result: any = await API.graphql({query:BLOGS_BY_USER, variables:{ userId: id}});
            return result.data.blogsByUser;
        } catch {
            return [];
        }
    }

    public async loadBlog(id:string): Promise<Blog>{
        
        const result: any = await API.graphql({query:FIND_BLOG, variables:{ blogId: id }})

        return result.data.blog;
    }

    public async getBlogFile(key:string):Promise<string>{

        let result: any;

        const s3Client = new S3({
            region: config.REGION
        })

        const params = {
            "Bucket": config.BLOGS_PHOTOS_BUCKET,
            "Key": 'blogs/' + key
        };

        try {
            result = await s3Client.getObject(params).promise();    
        } catch (e) {
            console.log('500 - ', e);
        }

        return result;
    }

    public async uploadBlogFile(file: File){

        let authToken;

        try{
            authToken = await this.getAuthToken();
        }catch(e){
            console.log('500 -', e);
        }
        
        let fileBase64 = await base64Encode(file);

        const blogPhotoId = nanoid();
        
        try{
            await API.post('blogs-photos-api',`blogs/?filename=${blogPhotoId}`, {
                body: fileBase64,
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-type": 'image/jpeg'
                }
            });
            
        }catch(e){
            return '';
        } 


        return blogPhotoId;
    }

    public async createBlog(blog:NewBlogInput): Promise<boolean>{

        try{
            const authToken = await this.getAuthToken();

            console.log('Auth token: ', authToken);

            await API.graphql({    query:CREATE_BLOG, 
                                                variables:{createBlogInput:{ ...blog }},
                                                authMode: 'AMAZON_COGNITO_USER_POOLS',
                                                authToken }) as Blog;
        } catch {
            return false;
        }

        return true;
    }

    public async deleteBlog(id:string,user:string): Promise<boolean> {
        
        try {
            const authToken = await this.getAuthToken();

            await API.graphql({
                query:DELETE_BLOG,
                variables:{deleteBlogInput: {id,user}},
                authMode: 'AMAZON_COGNITO_USER_POOLS',
                authToken
            });

            return true;
        } catch {
            return false;           
        }
    }

    public async createEntry(entry:NewEntryInput): Promise<boolean>{
        
       

        try{
            const authToken = await this.getAuthToken();

            await API.graphql({   query:CREATE_ENTRY, 
                                                variables:{createEntryInput:{ ...entry}},
                                                authMode: 'AMAZON_COGNITO_USER_POOLS',
                                                authToken }) as Entry;
        }catch {
            return false;
        }

        return true;
    }

    public async createUser(user:NewUserInput): Promise<boolean>{

        try{    
            await API.graphql({ query:CREATE_USER, 
                                variables:{createUserInput: {...user }}});
            return true;
        } catch(err){
            console.log('From dataservice ',err);
            return false;
        }

    }

}