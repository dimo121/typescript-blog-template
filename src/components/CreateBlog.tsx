// *** transferring to Appsync client *** //

import React from 'react';
import { DataService } from '../services/DataService';
import EntryFormPage from './EntryFormPage';
//import { useMutation } from '@apollo/react-hooks';
//import { CREATE_BLOG } from '../apollo/protocol';


interface ICreateBlogProps {
  dataService: DataService;
}

export class CreateBlog extends React.Component<ICreateBlogProps,{}>{

  render(){
    return (
      <div className="page-container">
        <div className="create-container">
          <h1>Create blog</h1>
          <EntryFormPage
            onSubmission={(title:string,content:string) => {
              this.props.dataService.addBlog(title,content);
              // newBlog({
              //   variables: {
              //     createBlogInput: {
              //       title: blogEntry.title,
              //       content: blogEntry.content,
              //     },
              //   },
              // }).then((response) => {
              //   window.location.replace('/');
              // });
            }}
          />
        </div>
      </div>
      );
  };
};

export default CreateBlog;
