import EntryFormPage from './EntryFormPage';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { User } from '../types/TypeDefs';
import { DataService } from '../services/DataService/DataService';
import { Redirect } from 'react-router';

interface ICreateEntryProps {
  dataService: DataService;
  user: User|undefined;
}

interface CustomState {
  blog_id: string;
}

export const CreateEntry:React.FC<ICreateEntryProps & RouteComponentProps<{}>> = (props) => {

  const { state } = useLocation<CustomState>();
  const [userId,setId] = useState<string>('');
  const [completed, setResult] = useState<boolean>(false);


  useEffect(() => {
    const retrieveUserId = () => {
      return new Promise((resolve,reject) => {
        if(props.user) {
          props.user.user.getUserAttributes((err,result) => {
            if(err){
              alert(err);
              return '';
            } else{
              if(result){
                resolve(result[0].Value);
              }
            }
          })
        } else {
          reject('');
        }
      })
    }

    retrieveUserId().then(response => {
      setId(response as string);
    });

  },[props.user])


  return (
    <div className="create-container">
      <h1>Create entry</h1>
      <EntryFormPage
        onSubmission={async (title:string,content:string) => {

          const result: boolean = await props.dataService.createEntry({
            title,
            content,
            user: userId,
            blog_id : state.blog_id
          });

          setResult(result);
          
        }}
      />
      {completed && <Redirect to='/dashboard' />}
    </div>
  );
};

