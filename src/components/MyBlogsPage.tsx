// *** Under construction - transferring to Appsync client - currently using mock data*** //

import React from 'react';
import { DataService } from '../services/DataService/DataService';
import { Blog } from '../types/TypeDefs';
import { BlogItem } from './BlogItem';
//import { Blog } from '../types/TypeDefs';
//import { useQuery } from '@apollo/react-hooks';
//import config from '../config/config';
//import { useMutation } from '@apollo/react-hooks';
//import { BLOGS_BY_USER, DELETE_BLOG } from '../apollo/protocol';

interface IMyBlogsPageProps {
  dataService: DataService;
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

  componentDidMount(){
    this.loadBlogs();
  }

  private async loadBlogs():Promise<void>{
    const blogCollection = await this.props.dataService.getBlogs();
    this.setState({ blogCollection,
                    loading: false });
  
  }


  render(){

    if(this.state.loading) return (
      <div className="page-container">
        <div className="lds-container">
          <div className="lds-default">
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
          </div>
        </div>
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

