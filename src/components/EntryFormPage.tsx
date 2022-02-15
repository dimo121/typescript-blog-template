import React, { useState, useEffect } from 'react';
import { DataService } from '../controllers/DataService/DataService';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import img from './image_box.png';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface IEntryFormProps {
  onSubmission : (title:string,content:string,blogPhotoId:string) => void;
  dataService: DataService;
  userId: String;
}

const EntryFormPage: React.FC<IEntryFormProps> = (props) => {

  const [title,setTitle] = useState<string>('');
  const [error,setError] = useState<string>('');
  const [imageToUpload,setImage] = useState<string>('');
  const [editorState,setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const onSubmit = async (e:React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const content:ContentState = editorState.getCurrentContent();
    const contentToSubmit:string = JSON.stringify(convertToRaw(content));

    if (!title||!contentToSubmit){
      setError('Both title and content are required');
    } else if(props.userId) {
      setError('');
      
      const input = document.getElementById('file-upload') as HTMLInputElement;
    
      const file = input.files![0];

      let blogPhotoId: string = '';

      if(file)
      await props.dataService.uploadBlogFile(file).then(res => blogPhotoId = res).catch(err => console.log(err));

      props.onSubmission(
        title,
        contentToSubmit,
        blogPhotoId
      );

    } else {
      setError('Please sign in');
    }

  }

  const onEditorChange = (editorState:EditorState) => {
    setEditorState(editorState);
  }

  useEffect(() => {

    const fileSelector = document.getElementById('file-upload');

    const handleImageUpload = (event:any) => {

      const file: any | null = (event.target as HTMLInputElement).files![0]

      const binaryData:string[] = [];

      binaryData.push(file);

      const image = URL.createObjectURL(new Blob(binaryData, {type: "image/*"}));

      setImage(image);

    }

    fileSelector!.addEventListener('change', handleImageUpload);

    return () => fileSelector?.removeEventListener('change', handleImageUpload);

  },[imageToUpload]);

  console.log('User id from CreateBlog component', props.userId);

    return (
      <div className="entry-form-container">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            placeholder="..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          ></input>
          <br />
          <br />
          <Editor 
            editorState={editorState}
            wrapperClassName="entryEditorWrapper"
            onEditorStateChange={onEditorChange}
          />
          <br />
          <br />
          <label htmlFor="file-upload">Upload image:</label>
          <br />
          <br />
          <input type="file" id="file-upload" name="file" accept="image/*" />
          <br />
          <br />
          <input className="button" type="submit" value="Save" />
        </form>
        {error && <p className="entry-error">Error : {error}</p>}
        <br/>
        <button onClick={() => setImage('')}>Clear image</button>
        <br/>
        {imageToUpload     ? 
                                        <img 
                                          src={imageToUpload}
                                          alt='imageRetrieved' 
                                          style={{ height: "50%", width: "50%", marginTop: "20px" }} />
                                      : <img 
                                          src={img} 
                                          alt='blog'
                                          style={{ height: "10rem", width: "13rem", marginTop: "40px" }}></img>
                                      }
      </div>
    );
}

export default EntryFormPage;