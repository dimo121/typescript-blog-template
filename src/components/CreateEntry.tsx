import { EntryFormPage } from './EntryFormPage';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { User } from '../types/TypeDefs';
import { createEntry } from '../controllers/DataService/DataService';
import { Redirect } from 'react-router';

interface ICreateEntryProps {
  currentUser?: User;
}

interface CustomState {
  blog_id: string;
}

export const CreateEntry:React.FC<ICreateEntryProps & RouteComponentProps<{}>> = (props) => {

  const { currentUser } = props;

  const { state } = useLocation<CustomState>();
  const [userId,setUserId] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

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
      <h1>Create entry</h1>
      <EntryFormPage
        onSubmission={(title:string,content:string,blogPhotoId:string) => {
          createEntry({
            title,
            content,
            user: userId,
            blog_id : state.blog_id,
            entryPhotoId: blogPhotoId
          }).then(res => {
            if(res === true) setCompleted(true);
          }).catch(() => console.log('Error creating entry'));

        }}
        userId={userId}
      />
      {completed && <Redirect to='/dashboard' />}
    </div>
  );
};
