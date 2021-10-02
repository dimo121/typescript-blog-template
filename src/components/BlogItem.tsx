import React from 'react';
import { NavLink } from 'react-router-dom';
import { Blog } from '../types/TypeDefs';

interface IBlogItemProps {
  blog: Blog;
}

export const BlogItem:React.FC<IBlogItemProps> = (props) => {
    return (
      <React.Fragment>
        <NavLink style={{ textDecoration: 'none' }} to={`/blog/${props.blog.id}`}>
          <div className="item-container">
            <div className="item__upper">
              <h1>{props.blog.title}</h1>
              <span>{props.blog.createdAt}</span>
            </div>
            <div className="item__inner">
              <p>{props.blog.content}</p>
            </div>
            <div className="item__lower">
              <p>Written by: {props.blog.owner?.username}</p>
              <p>Replies: {props.blog.entries?.length}</p>
            </div>
          </div>
        </NavLink>
        <NavLink
          to={{
            pathname: '/createentry',
            state: {
              blog_id: props.blog.id,
            },
          }}
        >
          <button className="blog-button">Reply</button>
        </NavLink>
      </React.Fragment>
    );
}