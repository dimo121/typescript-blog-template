import React, { useEffect, useState } from 'react';
import { DataService } from '../controllers/DataService/DataService';
import { Entry } from '../types/TypeDefs';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';


interface IEntryItemProps {
  entry: Entry;
  dataService: DataService;
}

export const EntryItem:React.FC<IEntryItemProps> = (props) => {
  const [image,setImage] = useState<string>('');
  const [editorState,setEditor] = useState<EditorState>(EditorState.createEmpty());

  const { entry, dataService } = props;

  useEffect(() => {

    if(entry.content){
    const content = convertFromRaw(JSON.parse(entry.content));

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

    if(entry.entryPhotoId){
      retrieveImage(entry.entryPhotoId);
    }

  },[dataService, entry]);
  
  return (
    <div className="section-1-bi">
      <div className="s1-bi__upper">
        <h1>{entry.title}</h1>
        <span>{entry.createdAt}</span>
      </div>
      <div className="s1-bi__inner">
        <Editor 
          toolbarHidden
          editorState={editorState}
          wrapperClassName="s1-bi__entry-wrapper s1-bi__display-wrapper"
          readOnly={true}
        />
      </div>
      {image && (<div className="s1-bi__image center">
            <img src={image} alt='entry_image' />
          </div>)}
      <div className="s1-bi__lower">
        <p>Written by: {entry.owner?.username}</p>
      </div>
    </div>
  );
  
}
