import React from 'react';
import { NavLink } from 'react-router-dom';
import { Blog } from '../types/TypeDefs';

interface IBlogItemProps {
  blog: Blog ;
}

export default class BlogItem extends React.Component<IBlogItemProps,{}> {


  render(){
    return (
      <React.Fragment>
        <NavLink style={{ textDecoration: 'none' }} to={`/blog/${this.props.blog.id}`}>
          <div className="item-container">
            <div className="itemUpper">
              <h1>{this.props.blog.title}</h1>
              <span>{this.props.blog.createdAt}</span>
            </div>
            <div className="itemInner">
              <p>{this.props.blog.content}</p>
            </div>
            <div className="itemLower">
              <p>Written by: {this.props.blog.owner?.username}</p>
              <p>Replies: {this.props.blog.entries?.length}</p>
            </div>
          </div>
        </NavLink>
        <NavLink
          to={{
            pathname: '/createentry',
            state: {
              blog_id: this.props.blog.id,
            },
          }}
        >
          <button className="blog-button">Reply</button>
        </NavLink>
      </React.Fragment>
    );
  };
}