import React from 'react';

interface IEntryFormState {
  title: string;
  content: string;
  error: string;
}

interface IEntryFormProps {
  onSubmission : (title:string,content:string) => void;
}

export default class EntryFormPage extends React.Component<IEntryFormProps,IEntryFormState> {

  constructor(props:IEntryFormProps) {
    super(props);

    this.state ={
      title:'',
      content:'',
      error:''
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  private onSubmit(e:React.SyntheticEvent<EventTarget>) {
    e.preventDefault();
    if (!this.state.title||!this.state.content){
      this.setState({error: 'Both title and content are required'});
    } else {
      this.props.onSubmission(
        this.state.title,
        this.state.content
      );
    }
  }

  render(){
    return (
      <div className="entry-form-container">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            placeholder="..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({title: e.target.value})}
          ></input>
          <br />
          <br />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            id="content"
            name="content"
            cols={100}
            rows={20}
            placeholder="Enter content here"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>):void => this.setState({content: e.target.value})}
          ></textarea>
          <br />
          <br />
          <input className="button" type="submit" value="Save" />
        </form>
        {this.state.error && <p className="entry-error">Error : {this.state.error}</p>}
      </div>
    );
  }

}
