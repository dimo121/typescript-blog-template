import { User, UserAttribute } from '../../types/TypeDefs';
import { Auth } from 'aws-amplify';
import Amplify from 'aws-amplify';
import { config } from '../config';
import { CognitoUser } from '@aws-amplify/auth';


Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
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

    public async confirmSignUp(username:string, code:string) {
        try{
            await Auth.confirmSignUp(username, code);
        } catch(error){
            console.log('Error confirming sign up', error)
        }
    }

    public async signOut() {
        try{
            await Auth.signOut();
        }catch(error){
            console.log('Error signing out: ', error)
        }
    }

}
