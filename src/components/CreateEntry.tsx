import EntryFormPage from './EntryFormPage';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { User } from '../types/TypeDefs';
import { DataService } from '../controllers/DataService/DataService';
import { Redirect } from 'react-router';

interface ICreateEntryProps {
  dataService: DataService;
  currentUser?: User;
}

interface CustomState {
  blog_id: string;
}

export const CreateEntry:React.FC<ICreateEntryProps & RouteComponentProps<{}>> = (props) => {

  const { state } = useLocation<CustomState>();
  const [userId,setUserId] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if(props.currentUser){
      const retrieveUserId = () => {
        return new Promise((resolve) => {
            props.currentUser!.user.getUserAttributes((err,result) => {
              if(err){
                alert(err);
                return '';
              } else{
                if(result){
                  resolve(result[0].Value);
                }
              }
            })
        })
      }

      retrieveUserId().then(res => { 
        setUserId(res as string);
      });
    }
  },[props.currentUser]);

  return (
    <div className="create-container">
      <h1>Create entry</h1>
      <EntryFormPage
        onSubmission={(title:string,content:string,blogPhotoId:string) => {

          props.dataService.createEntry({
            title,
            content,
            user: userId,
            blog_id : state.blog_id,
            entryPhotoId: blogPhotoId
          }).then(res => {
            if(res === true) setCompleted(true);
          }).catch(() => console.log('Error creating entry'));

        }}
        dataService={props.dataService}
        userId={userId}
      />
      {completed && <Redirect to='/dashboard' />}
    </div>
  );
};

