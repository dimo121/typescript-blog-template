import React, { useEffect, useState } from 'react';
import { DataService } from '../controllers/DataService/DataService';
import EntryFormPage from './EntryFormPage';
import { User } from '../types/TypeDefs';
import { Redirect } from 'react-router';


interface ICreateBlogProps {
  dataService: DataService;
  currentUser?: User;
}

const CreateBlog: React.FC<ICreateBlogProps> = (props) => {

  const [userId,setUserId] = useState<string>('');
  const [completed,setCompleted] = useState<boolean>(false);

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
        <h1>Create blog</h1>
        <EntryFormPage
          onSubmission={(title:string,content:string,blogPhotoId:string) => {
            props.dataService.createBlog({
              title,
              content,
              blogPhotoId,
              user: userId
            }).then(res => {
              if(res === true) setCompleted(true);
            }).catch(err => console.log(err));

          }}
          dataService={props.dataService}
          userId={userId}
        />
        {completed && <Redirect to='/dashboard' />}
      </div>
    );
};

export default CreateBlog;
