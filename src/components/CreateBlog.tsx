import React, { useEffect, useState } from 'react';
import { createBlog } from '../controllers/DataService/DataService';
import { EntryFormPage } from './EntryFormPage';
import { User } from '../types/TypeDefs';
import { Redirect } from 'react-router';


interface ICreateBlogProps {
  currentUser?: User;
}

export const CreateBlog: React.FC<ICreateBlogProps> = (props) => {

  const { currentUser } = props;

  const [userId,setUserId] = useState<string>('');
  const [completed,setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if(currentUser){
      const retrieveUserId = ():Promise<string> => {

        return new Promise((resolve) => {
            currentUser.user.getUserAttributes((_,result) => {
              if(result){
                resolve(result[0].Value);
              }
            })
        })
      }

      retrieveUserId().then(res => { 
        setUserId(res);
      });
    }
  },[currentUser]);

  return (
      <div className="s4-cc">
        <h1>Create blog</h1>
        <EntryFormPage
          onSubmission={(title:string,content:string,blogPhotoId:string) => {
            createBlog({
              title,
              content,
              blogPhotoId,
              user: userId
            }).then(res => {
              if(res === true) setCompleted(true);
            }).catch(err => console.log(err));

          }}
          userId={userId}
        />
        {completed && <Redirect to='/dashboard' />}
      </div>
    );
};
