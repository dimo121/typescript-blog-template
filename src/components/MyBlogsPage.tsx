// *** Under construction - transferring to Appsync client - currently using mock data*** //

import React from 'react';
import { DataService } from '../services/DataService';
import { Blog } from '../types/TypeDefs';
import BlogItem from './BlogItem';
//import { Blog } from '../types/TypeDefs';
//import { useQuery } from '@apollo/react-hooks';
//import config from '../config/config';
//import { useMutation } from '@apollo/react-hooks';
//import { BLOGS_BY_USER, DELETE_BLOG } from '../apollo/protocol';

interface IMyBlogsPageProps {
  dataService: DataService;
}

interface IMyBlogsPageState {
  blogCollection: Blog[]
}

export class MyBlogsPage extends React.Component<IMyBlogsPageProps, IMyBlogsPageState> {
  
  constructor(props:IMyBlogsPageProps){
    super(props);

    this.state = {
      blogCollection: []
    }
  }

  componentDidMount(){
    this.loadBlogs();
  }

  //*** delete blog function */

  // const [deleteBlog, blog] = useMutation(DELETE_BLOG);

  // private funcDeleteBlog(blog_id:number):void {
  //   console.log('Deleting blog with id: ', blog_id)
  // }

  private async loadBlogs():Promise<void>{
    const blogCollection = await this.props.dataService.getBlogs();
    this.setState({blogCollection})
  
  }


  // }
  // const funcDeleteBlog = (deleteBlogId) => {
  //   deleteBlog({
  //     variables: {
  //       deleteBlogId,
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       refetch();
  //     })
  //     .catch((error) => console.log(error));
  // };

  //*** blogs by user query */

  // const { data, loading, error, refetch, networkStatus } = useQuery(
  //   BLOGS_BY_USER,
  //   {
  //     variables: {
  //       userId: decoded.id,
  //     },
  //     notifyOnNetworkStatusChange: true,
  //   },
  // );

  //if (networkStatus === 4) return <p>reloading...</p>;

  render(){
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

