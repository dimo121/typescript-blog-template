import React from 'react';
import { DataService } from '../controllers/DataService/DataService';
import { Blog, Search, User } from '../types/TypeDefs';
import BlogItem from './BlogItem';
import { BlogListFilter } from './BlogListFilter';
import { Spinner } from './Spinner';
import { Redirect } from 'react-router-dom';
import paginateLocal from '../utils/paginate';
import filter from '../utils/filter';


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
  userId: string;
  deleted:boolean;
}

export class MyBlogsPage extends React.Component<IMyBlogsPageProps, IMyBlogsPageState> {
  
  constructor(props:IMyBlogsPageProps){
    super(props);

    this.state = {
      blogCollection: [],
      loading: true,
      page: 1,
      text: '',
      search: "Title",
      userId: '',
      deleted: false
    }
  }

  private retrieveUserId(): Promise<string>{
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

    let id:string;

    try {
      id = await this.retrieveUserId() as string;
    } catch (error) {
      console.log(error);
      return;
    }

    const blogCollection:Blog[] = await this.props.dataService.getBlogsByUser(id);

    this.setState({ blogCollection,
                    loading: false,
                    userId:id });
  
  }


  render(){

    if(!this.props.user) return <h1 style={{fontSize : '1em', color:'white', padding:'4em',marginTop:'0'}}>Login to see user specific blogs</h1>;

    if(this.state.loading) return <Spinner />;

    let resultBlogs: Blog[] = filter(this.state.blogCollection,this.state.text,this.state.search)

    const displayLength = resultBlogs.length;

    resultBlogs = paginateLocal(resultBlogs, this.state.page);    

    return (
      <div>
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
          {this.state.blogCollection.map((item,index) => (
            <div key={index}>
              <BlogItem blog={{ ...item }} dataService={this.props.dataService}/>
              <button
                className="blog-button delete-button"
                onClick={async () => {
                  const result:boolean = await this.props.dataService.deleteBlog(item.id,this.state.userId)
                
                  if(result){
                    this.setState({deleted:true});
                  }
                }}
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
          {this.state.deleted && <Redirect to='/dashboard' />}
      </div>
    );
  };
}

