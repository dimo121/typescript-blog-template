import { CognitoUser } from "@aws-amplify/auth";


export interface NewUserInput {
    username?: string;
    email: string;
    password: string;
}

type NewBlogPhoto = {
    blogPhotoId : string
}

type NewEntryPhoto = {
    entryPhotoId: string
}

export type NewEntryInput = Omit<Entry, 'id'|'createdAt'> & NewEntryPhoto

export type NewBlogInput = Omit<Item, 'id'|'createdAt' > & NewBlogPhoto

export interface User {
    username: string;
    user: CognitoUser;
}

export interface UserAttribute {
    Name: string;
    Value: string;
}

type Item = {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    user: string,
    owner?: {
        username: string
    }
}

export interface Blog extends Item{
    entries?: Entry[];
    blogPhotoId?: string;
}

export interface Entry extends Item{
    blog_id: string;
    entryPhotoId?: string;
}

export type Search = 'Title'|'Content';

export type EmailMessage = {
    name : string;
    email: string;
    subject: string;
    content: string;
}
