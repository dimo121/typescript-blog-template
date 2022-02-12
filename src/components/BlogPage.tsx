import React from "react";
import { BlogItem } from "./BlogItem";
import { EntryItem } from "./EntryItem";
import { Blog } from '../types/TypeDefs';
import { RouteComponentProps } from "react-router-dom";
import { DataService } from "../controllers/DataService/DataService";

interface IBlogPageProps {
  dataService: DataService;
}

interface IBlogPageState {
  blog: Blog;
}

export class BlogPage extends React.Component<IBlogPageProps & RouteComponentProps<{ id: string }>,IBlogPageState> {

  constructor(props:IBlogPageProps&RouteComponentProps<{id:string}>){
    super(props);

    this.state = {
      blog : {
        id: '',
        createdAt: '',
        title: '',
        content: '',
        user:'',
        blogPhotoId: ''
      } 
    }
  }

  componentDidMount(){
    this.loadBlog();
  }

  private async loadBlog(){

    const result:Blog = await this.props.dataService.loadBlog(this.props.match.params.id);
    
    this.setState({blog: {...result}});
  }

  render(){
    //let data:Blog[] = db_mock.filter(item => item.id === parseInt(this.props.match.params.id))

    return (
      <div className="blog-container">
        <BlogItem key={this.state.blog?.id} blog={{ ...this.state.blog }} dataService={this.props.dataService}/>
        <h3>Entries:</h3>
        {this.state.blog?.entries?.map((item) => {
          return <EntryItem key={item.id} entry={item} />;
        })}
      </div>
    );
  }
};

export default BlogPage;
