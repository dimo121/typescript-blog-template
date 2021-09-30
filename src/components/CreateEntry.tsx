// *** transferring to Appsync client *** //

import EntryFormPage from './EntryFormPage';
import React from 'react';
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

            let userId:string = '';

            props.user.user.getUserAttributes((err,result) => {
              if(err) console.log(err)
              else{
                userId = result![0].Value;
              }
            }) 

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

