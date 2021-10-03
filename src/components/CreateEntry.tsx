// *** transferring to Appsync client *** //

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
      return new Promise((res) => {
        if(props.user) {
          props.user.user.getUserAttributes((err,result) => {
            if(err){
              alert(err);
              return '';
            } else{
              if(result){
                res(result[0].Value);
              }
            }
          })
        } else {
          res('');
        }
      })
    }

    retrieveUserId().then(res => {
      setId(res as string);
    });

  },[props.user])


  return (
    <div className="page-container">
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

            if(result === true){
              setResult(true);
            }
            

          }}
        />
        {completed && <Redirect to='/dashboard' />}
      </div>
    </div>
  );
};

