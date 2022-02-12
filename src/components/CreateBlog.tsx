import React from 'react';
import { DataService } from '../controllers/DataService/DataService';
import EntryFormPage from './EntryFormPage';
import { User } from '../types/TypeDefs';
import { Redirect } from 'react-router';


interface ICreateBlogProps {
  dataService: DataService;
  user?: User;
}

interface ICreateBlogState {
  userId: string;
  completed: boolean;
}

export class CreateBlog extends React.Component<ICreateBlogProps,ICreateBlogState> {

  constructor(props:ICreateBlogProps) {
    super(props);
    
    this.state = {
      userId: '',
      completed: false
    };

    this.retrieveUserId = this.retrieveUserId.bind(this);
  }

  async componentDidMount(){

    let userId:string = '';
    try {
      userId = await this.retrieveUserId() as string;
    } catch (error) {
      console.log(error)
    }
    
    console.log(userId);

    if(userId) this.setState({userId});
    
  }

  private retrieveUserId(){
    return new Promise((resolve,reject) => {
      if(this.props.user) {
        this.props.user.user.getUserAttributes((err,result) => {
          if(err){
            return err;
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

  render(){

    return (
      <div className="create-container">
        <h1>Create blog</h1>
        <EntryFormPage
          onSubmission={async (title:string,content:string,blogPhotoId:string) => {
            const result:boolean = await this.props.dataService.createBlog({
              title,
              content,
              blogPhotoId,
              user: this.state.userId
            });

            if(result === true){
              this.setState({completed:true});
            }
          }}
          dataService={this.props.dataService}
          userId={this.state.userId}
        />
        {this.state.completed && <Redirect to='/dashboard' />}
      </div>
      );
  };
};

export default CreateBlog;
