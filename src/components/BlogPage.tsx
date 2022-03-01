import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { EntryItem } from "./EntryItem";
import { Blog } from '../types/TypeDefs';
import { RouteComponentProps } from "react-router-dom";
import { DataService } from "../controllers/DataService/DataService";

interface IBlogPageProps {
  dataService: DataService;
}

const BlogPage:React.FC<IBlogPageProps & RouteComponentProps<{ id: string }>> = (props) => {

    const {dataService, match} = props;
  
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
      const loadBlog = async () => {

        const result:Blog = await dataService.loadBlog(match.params.id);
    
        setBlog({...result});
      }

      loadBlog();
    },[dataService, match]);

    return (
      <div className="s3-bc">
        <BlogItem key={blog?.id} blog={{ ...blog }} dataService={dataService}/>
        <h3>Entries:</h3>
        {blog?.entries?.map((item) => {
          return <EntryItem key={item.id} entry={{...item}} dataService={dataService}/>;
        })}
      </div>
    );
};

export default BlogPage;
