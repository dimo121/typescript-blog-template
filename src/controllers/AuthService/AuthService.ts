import { User, UserAttribute } from '../../types/TypeDefs';
import Amplify, { Auth } from 'aws-amplify';
import { config } from '../../config';
import { CognitoUser } from '@aws-amplify/auth';


Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.REGION,
        identityPoolId: config.IDENTITY_POOL_ID,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
        authenticationFlowType: 'USER_SRP_AUTH'
    }
})

export const login = async (email: string, password:string): Promise<User|undefined> => {
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

export const getUserAttributes = async (user: User):Promise<UserAttribute[]> => {
    const result : UserAttribute[] = []
    const attributes = await Auth.userAttributes(user.user);
    result.push(...attributes);
    return result;
}

export const signUp = async (username:string,password:string,email:string): Promise<User|undefined> => {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email
            }
        });
    
        return {
            username: user.getUsername(),
            user
        };
    } catch (error) {
        console.log('Error signing up:', error);
        return undefined;
    }
}

export const confirmSignUp = async (username:string, code:string):Promise<boolean> => {
    try{
        await Auth.confirmSignUp(username, code);
        return true;
    } catch(error){
        console.log('Error confirming sign up', error)
        return false;
    }
}

export const signOut = async ():Promise<void> =>  {
    try{
        await Auth.signOut();
    }catch(error){
        console.log('Error signing out: ', error)
    }
}

