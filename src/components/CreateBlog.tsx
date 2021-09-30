import React from 'react';
import { DataService } from '../services/DataService/DataService';
import EntryFormPage from './EntryFormPage';
import { User } from '../types/TypeDefs';
import { Redirect } from 'react-router';


interface ICreateBlogProps {
  dataService: DataService;
  user?: User;
}

export class CreateBlog extends React.Component<ICreateBlogProps,{ userId: string, completed:boolean }>{

  constructor(props:ICreateBlogProps) {
    super(props);
    
    this.state = {
      userId: '',
      completed: false
    };
  }

  async componentDidMount(){

    let userId:string = await this.retrieveUserId() as string;

    this.setState({userId});
    
  }

  private retrieveUserId(){
    return new Promise((res) => {
      if(this.props.user) {
        this.props.user.user.getUserAttributes((err,result) => {
          if(err){
            alert(err);
            return '';
          } else{
            if(result){
              res(result[0].Value);
            }
          }
        })
      }
    })
  }

  render(){

    return (
      <div className="page-container">
        <div className="create-container">
          <h1>Create blog</h1>
          <EntryFormPage
            onSubmission={async (title:string,content:string) => {

              if(!this.props.user){
                console.log('Please sign in to create blog')
                return null;
              }

              const result:boolean = await this.props.dataService.createBlog({
                title,
                content,
                user: this.state.userId
              });

              if(result === true){
                this.setState({completed:true});
              }
              
            }}
          />
          {this.state.completed && <Redirect to='/dashboard' />}
        </div>
      </div>
      );
  };
};

export default CreateBlog;
