import React from 'react';
import { DataService } from '../services/DataService/DataService';
import { Blog, User } from '../types/TypeDefs';
import { BlogItem } from './BlogItem';
import { Spinner } from './Spinner';

//import { BLOGS_BY_USER, DELETE_BLOG } from '../apollo/protocol';

interface IMyBlogsPageProps {
  dataService: DataService;
  user: User|undefined;
}

interface IMyBlogsPageState {
  blogCollection: Blog[];
  loading: boolean;
}

export class MyBlogsPage extends React.Component<IMyBlogsPageProps, IMyBlogsPageState> {
  
  constructor(props:IMyBlogsPageProps){
    super(props);

    this.state = {
      blogCollection: [],
      loading: true
    }
  }

  private retrieveUserId(){
    return new Promise((res,rej) => {
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
      } else {
        rej('Error retrieving user id');
      }
    })
  }

  componentDidMount(){
    this.loadBlogs();
  }


  private async loadBlogs():Promise<void>{

    const id:string = await this.retrieveUserId() as string;

    console.log('id', id);

    const blogCollection:Blog[] = await this.props.dataService.getBlogsByUser(id);

    console.log(blogCollection);

    this.setState({ blogCollection,
                    loading: false });
  
  }


  render(){

    if(this.state.loading) return (
      <div className="page-container">
        <Spinner />
      </div>
    );

    return (
      <div className="page-container">
        <div className="blog-container">
          {this.state.blogCollection.map((item) => (
            <div key={item.id}>
              <BlogItem blog={{ ...item }} />
              <button
                className="blog-button delete-button"
                //onClick={() => this.funcDeleteBlog(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
}

