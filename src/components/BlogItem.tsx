import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DataService } from '../controllers/DataService/DataService';
import { Blog } from '../types/TypeDefs';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';


interface IBlogItemProps {
  blog: Blog;
  dataService: DataService
}


const BlogItem:React.FC<IBlogItemProps> = (props) => {

  const {blog, dataService} = props;

  const [image,setImage] = useState<string>('');
  const [editorState,setEditor] = useState<EditorState>(EditorState.createEmpty());

  useEffect(() => {

    if(blog.content){
    const content = convertFromRaw(JSON.parse(blog.content));

    const editorNextState = EditorState.createWithContent(content);

    setEditor(editorNextState);
    }

    const retrieveImage = async (key:string) => {

      const result:any = await dataService.getBlogFile(key);
  
      let base64Data:string = '';
  
      base64Data = btoa(result.Body.reduce((data:any,byte:any) => data + String.fromCharCode(byte),''));
  
      const imageCompilation = `data:image/jpeg;base64,${base64Data}`;
  
      setImage(imageCompilation);
    }

    if(blog.blogPhotoId){
      retrieveImage(blog.blogPhotoId);
    }

  },[dataService, blog]);

  return (
    <React.Fragment>
      <NavLink style={{ textDecoration: 'none' }} to={`/blog/${blog.id}`}>
        <div className="section-1-bi">
          <div className="s1-bi__upper">
            <h1>{blog.title}</h1>
            <span>{blog.createdAt}</span>
          </div>
          <div className="s1-bi__inner">
            <Editor 
              toolbarHidden
              editorState={editorState}
              editorClassName="s1-bi__display-wrapper"
              editorStyle={{overflow: 'hidden'}}
              readOnly={true}
            />
          </div>
          {image && (<div className="s1-bi__image center">
            <img src={image} alt='blog_image' />
          </div>)}
          <div className="s1-bi__lower">
            <p>Written by: {blog.owner?.username}</p>
            <p>Replies: {blog.entries?.length}</p>
          </div>
        </div>
      </NavLink>
      <NavLink
        to={{
          pathname: '/createentry',
          state: {
            blog_id: blog.id,
          },
        }}
      >
        <button className="blog-button">Reply</button>
      </NavLink>
    </React.Fragment>
  );
}

export default BlogItem;