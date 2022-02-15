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

  const [image,setImage] = useState<string>('');
  const [editorState,setEditor] = useState<EditorState>(EditorState.createEmpty());

  useEffect(() => {

    if(props.blog.content){
    const content = convertFromRaw(JSON.parse(props.blog.content));

    const editorNextState = EditorState.createWithContent(content);

    setEditor(editorNextState);
    }

    const retrieveImage = async (key:string) => {

      const result:any = await props.dataService.getBlogFile(key);
  
      let base64Data:string = '';
  
      base64Data = btoa(result.Body.reduce((data:any,byte:any) => data + String.fromCharCode(byte),''));
  
      const imageCompilation = `data:image/jpeg;base64,${base64Data}`;
  
      setImage(imageCompilation);
    }

    if(props.blog.blogPhotoId){
      retrieveImage(props.blog.blogPhotoId);
    }

  },[props.dataService, props.blog]);

  return (
    <React.Fragment>
      <NavLink style={{ textDecoration: 'none' }} to={`/blog/${props.blog.id}`}>
        <div className="item-container">
          <div className="item__upper">
            <h1>{props.blog.title}</h1>
            <span>{props.blog.createdAt}</span>
          </div>
          <div className="item__inner">
            <Editor 
              toolbarHidden
              editorState={editorState}
              wrapperClassName="entryEditorWrapper displayEditorWrapper"
              readOnly={true}
            />
          </div>
          {image && (<div className="item__image center">
            <img src={image} alt='blog_image' />
          </div>)}
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

export default BlogItem;