// *** transferring to Appsync client *** //

import EntryFormPage from './EntryFormPage';
//import { CREATE_ENTRY } from '../apollo/protocol';
import React from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { Entry } from '../types/TypeDefs';
//import { useMutation } from '@apollo/react-hooks';
import { v4 } from 'uuid';
import { DataService } from '../services/DataService';

type ICreateEntryType = RouteComponentProps<{}>

interface ICreateEntryProps {
  dataService: DataService;
}

interface CustomState {
  blog_id: number;
}

export const CreateEntry:React.FC<ICreateEntryProps & ICreateEntryType> = (props) => {

  const { state } = useLocation<CustomState>();

  return (
    <div className="page-container">
      <div className="create-container">
        <h1>Create entry</h1>
        <EntryFormPage
          onSubmission={(title:string,content:string) => {

            const id:number = parseInt(v4());

            const createdAt = new Date().toLocaleString();

            const result:Entry = {
              id,
              createdAt,
              title,
              content,
              blog_id : state.blog_id
            }

            props.dataService.addEntry(result);
            // newEntry({
            //   variables: {
            //     createEntryInput: {
            //       title: entry.title,
            //       content: entry.content,
            //       blog_id,
            //     },
            //   },
            // }).then(() => {
            //   window.location.replace('/');
            // });
          }}
        />
      </div>
    </div>
  );
};

