import React, { useEffect, useState } from "react";
import { BlogItem } from "./BlogItem";
import { EntryItem } from "./EntryItem";
import { Blog } from '../types/TypeDefs';
import { RouteComponentProps } from "react-router-dom";
import { loadBlog } from "../controllers/DataService/DataService";


export const BlogPage:React.FC<RouteComponentProps<{ id: string }>> = (props) => {

    const {match} = props;
  
    const [blog, setBlog] = useState<Blog>({
      id: '',
      createdAt: '',
      title: '',
      content: '',
      user:'',
      blogPhotoId: '',
      entries:[]
    });

    useEffect(() => {
      const loadBlogLocal = async () => {

        const result:Blog = await loadBlog(match.params.id);
    
        setBlog({...result});
      }

      loadBlogLocal();
    },[match]);

    return (
      <div className="s3-bc">
        <BlogItem key={blog?.id} blog={{ ...blog }} />
        <h3>Entries:</h3>
        {blog?.entries?.map((item) => {
          return <EntryItem key={item.id} entry={{...item}} />;
        })}
      </div>
    );
};
