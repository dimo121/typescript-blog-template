import { Blog, Entry, NewBlogInput, NewEntryInput, NewUserInput } from '../../types/TypeDefs';
import awsconfig from '../../aws-exports';
import Amplify, { API, Auth } from 'aws-amplify';
import { LOAD_BLOGS, FIND_BLOG, CREATE_BLOG, CREATE_ENTRY, BLOGS_BY_USER, CREATE_USER } from "./protocol";
import { base64Encode } from '../../utils/base64Encode';
import AWS, { S3 } from 'aws-sdk';
import { config } from '../config';
import { generateRandomId } from '../../utils/generateId';

Amplify.configure(awsconfig);
API.configure(awsconfig);

AWS.config.region = 'ap-southeast-2';

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.IDENTITY_POOL_ID
});

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
        } catch(err){
            console.log('From dataservice ',err);
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
        } catch (error:any) {
            console.log('500 - ', error);
        }

        return result;
    }

    public async uploadBlogFile(file: File){

        let authToken;

        try{
            authToken = await this.getAuthToken();
        }catch(e){
            console.log(e);
        }
        
        let fileBase64 = await base64Encode(file);

        const blogPhotoId = generateRandomId();

        let result: any; 
        
        try{
            result = await API.post('blogs-photos-api',`blogs/?filename=${blogPhotoId}`, {
                body: fileBase64,
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-type": 'image/jpeg'
                }
            });
            
        }catch(e){
            console.log(e);
            return '';
        } 

        console.log('From REST : ', result)

        return blogPhotoId;
    }

    public async createBlog(blog:NewBlogInput): Promise<boolean>{

        let resultBlog: Blog;


        try{
            const authToken = await this.getAuthToken();

            console.log('Auth token: ', authToken);

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

    // public async deleteBlog(id: string): Promise<void> {

    // }

    public async createEntry(entry:NewEntryInput): Promise<boolean>{
        
        let resultEntry: Entry;

        try{
            const authToken = await this.getAuthToken();

            resultEntry = await API.graphql({   query:CREATE_ENTRY, 
                                                variables:{createEntryInput:{ ...entry}},
                                                authMode: 'AMAZON_COGNITO_USER_POOLS',
                                                authToken }) as Entry;
        }catch(e){
            console.log(e);
            return false;
        }

        console.log('Entry created succesfully ', resultEntry)

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
    // public getEntries():Entry[] {
    //     //return this.entryCollection
    //     return [];
    // }


    // public addEntry():void {
    //     //this.entryCollection.push(entry); 
    //     return;
    // }

}