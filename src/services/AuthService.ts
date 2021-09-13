import { User, UserAttribute } from '../types/TypeDefs';
import { Auth } from 'aws-amplify';
import Amplify from 'aws-amplify';
import { config } from './config';
import { CognitoUser } from '@aws-amplify/auth';
//import * as AWS from 'aws-sdk';
//import { Credentials } from 'aws-sdk/lib/credentials';


Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
        //identityPoolId: config.IDENTITY_POOL_ID,
        authenticationFlowType: 'USER_SRP_AUTH'
    }
})

export class AuthService {

    public async login(email: string, password:string): Promise<User|undefined>{
        try{
            const user = await Auth.signIn(email, password) as CognitoUser;
            return {
                username: user.getUsername(),
                user
            };
        } catch (error){
            return undefined;
        }
    }

    public async getUserAttributes(user: User):Promise<UserAttribute[]>{
        const result : UserAttribute[] = []
        const attributes = await Auth.userAttributes(user.user);
        result.push(...attributes);
        return result;
    }

    public async signUp(username:string,password:string,email:string): Promise<User|undefined> {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            });
            console.log(user);
            return {
                username: user.getUsername(),
                user
            };
        } catch (error) {
            console.log('error signing up:', error);
            return undefined;
        }
    }

    // public async getAWSTemporaryCreds(user:CognitoUser){
    //     const cognitoUserPool = `cognito-idp.${config.REGION}.amazonaws.com/${config.USER_POOL_ID}`;
    //     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //         IdentityPoolId: config.IDENTITY_POOL_ID,
    //         Logins: {
    //             [cognitoUserPool]: user.getSignInUserSession()!.getIdToken().getJwtToken()
    //         }
    //     }, {
    //         region: config.REGION
    //     });
    //     await this.refreshCredentials()
    // }

    // private async refreshCredentials(): Promise<void>{
    //     return new Promise((resolve,reject) => {
    //         (AWS.config.credentials as Credentials).refresh(err => {
    //             if(err){
    //                 reject(err)
    //             } else{
    //                 resolve()
    //             }
    //         })
    //     })
    // }

}
