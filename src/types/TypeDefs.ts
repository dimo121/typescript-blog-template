import { CognitoUser } from "@aws-amplify/auth";


export interface NewUserInput {
    username?: string;
    email: string;
    password: string;
}

export interface User {
    username: string;
    user: CognitoUser;
}

export interface UserAttribute {
    Name: string;
    Value: string;
}

type Item = {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    owner?: {
        username: string
    }
}

export interface Blog extends Item{
    entries?: Entry[];
}

export interface Entry extends Item{
    blog_id: number;
}

export type Search = 'Title'|'Content';