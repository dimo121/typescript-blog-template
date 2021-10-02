// *** transferring to Appsync client *** //

import EntryFormPage from './EntryFormPage';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { User } from '../types/TypeDefs';
import { DataService } from '../services/DataService/DataService';

type ICreateEntryType = RouteComponentProps<{}>

interface ICreateEntryProps {
  dataService: DataService;
  user: User|undefined;
}

interface CustomState {
  blog_id: string;
}

export const CreateEntry:React.FC<ICreateEntryProps & ICreateEntryType> = (props) => {

  const { state } = useLocation<CustomState>();
  const [userId,setId] = useState<string>('');


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
          onSubmission={(title:string,content:string) => {

            if(!props.user){
              console.log('Please sign in to createEntry')
              return null;
            }

            console.log('User ID: ',userId);
            console.log(typeof userId);
            console.log('State: ', state.blog_id);
            console.log(typeof state.blog_id);
            console.log('Title: ', title);
            console.log(typeof title);
            console.log('Content: ', content);
            console.log(props);

            props.dataService.createEntry({
              title,
              content,
              user: userId,
              blog_id : state.blog_id
            });

          }}
        />
      </div>
    </div>
  );
};

