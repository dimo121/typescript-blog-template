import React from 'react';
import { DataService } from '../services/DataService/DataService';
import { Blog, Search, User } from '../types/TypeDefs';
import { BlogItem } from './BlogItem';
import { BlogListFilter } from './BlogListFilter';
import { Spinner } from './Spinner';
import paginateLocal from '../utils/paginate';
import filter from '../utils/filter';

//import { BLOGS_BY_USER, DELETE_BLOG } from '../apollo/protocol';

interface IMyBlogsPageProps {
  dataService: DataService;
  user: User|undefined;
}

interface IMyBlogsPageState {
  blogCollection: Blog[];
  loading: boolean;
  page: number;
  text: string;
  search: Search;
}

export class MyBlogsPage extends React.Component<IMyBlogsPageProps, IMyBlogsPageState> {
  
  constructor(props:IMyBlogsPageProps){
    super(props);

    this.state = {
      blogCollection: [],
      loading: true,
      page: 1,
      text: '',
      search: "Title"
    }
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
      } else {
        res('Error retrieving user id');
      }
    })
  }

  componentDidMount(){
    this.loadBlogs();
  }


  private async loadBlogs():Promise<void>{

    const id:string = await this.retrieveUserId() as string;

    const blogCollection:Blog[] = await this.props.dataService.getBlogsByUser(id);

    this.setState({ blogCollection,
                    loading: false });
  
  }


  render(){

    if(this.state.loading) return (
      <div className="page-container">
        <Spinner />
      </div>
    );

    let resultBlogs: Blog[] = filter(this.state.blogCollection,this.state.text,this.state.search)

    const displayLength = resultBlogs.length;

    resultBlogs = paginateLocal(resultBlogs, this.state.page);    

    return (
      <div className="page-container">
         <BlogListFilter
            text={this.state.text}
            search={this.state.search}
            setText={(textArg:string) => this.setState({
                                                          text: textArg,
                                                          page: 1
                                                        })}
            setSearch={(searchArg:Search) => this.setState({search: searchArg})}
          />
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
        <div className="page-numbers">
              {[...Array(Math.ceil(displayLength / 5))].map((_, index) => (
                <button
                  key={index}
                  className="page-button"
                  onClick={() => this.setState({page: (index+1)})}
                >
                  {index + 1}
                </button>
              ))}
          </div>
      </div>
    );
  };
}

