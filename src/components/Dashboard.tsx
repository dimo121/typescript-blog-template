// *** transferring to Appsync client *** //


import BlogItem from "./BlogItem";
import BlogListFilter from "./BlogListFilter";
import React from "react";
import { Blog, Search } from "../types/TypeDefs";
import { DataService } from "../services/DataService";

interface IDashState {
  text: string;
  search: Search;
  page: number;
  dataCollection: Blog[] ;
  blogsLength: number;
  //loading: boolean;
}

interface IDashProps {
  dataService: DataService
}

export default class Dashboard extends React.Component<IDashProps,IDashState> {

  constructor(props:IDashProps) {
    super(props);

    this.state = {
      text : '',
      search : 'Title',
      page : 1,
      dataCollection: [],
      blogsLength: 0,
      //loading: true
    }

    this.loadBlogs = this.loadBlogs.bind(this);

  }

  componentDidMount(){
    this.loadBlogs();
  }

  private async loadBlogs():Promise<void> {
    
    let resultBlogs: Blog[] = await this.props.dataService.getBlogs();

    this.setState({dataCollection: resultBlogs});

  }
  
  //Also paginate server side

  private paginateLocal (blogs:Blog[]):Blog[] {

    const end:number = this.state.page * 5;
    const start:number = end - 5;
    const result:Blog[] = [];

    for (let i = start; i < end; i++) {
      if (blogs[i]) result.push(blogs[i]);
    }

    return result;
  };

  public render() {

  // if (this.state.loading) {
    //   return (
    //     //loader-spinner
    //     <div class="lds-default">
    //       <div></div><div></div><div></div>
    //       <div></div><div></div><div></div>
    //       <div></div><div></div><div></div>
    //       <div></div><div></div><div></div>
    //     </div>
    //   );
    // } else {

  let resultBlogs = this.state.dataCollection;

  if(this.state.text){
    this.state.search === "Title"
    ? (resultBlogs = resultBlogs.filter((item) => item.title.includes(this.state.text)))
    : (resultBlogs = resultBlogs.filter((item) => item.content.includes(this.state.text)));
  }

  let displayLength = resultBlogs.length;

  resultBlogs = this.paginateLocal(resultBlogs);
  
  return (
    <div className="page-container">
      <BlogListFilter
        text={this.state.text}
        search={this.state.search}
        setText={(textArg:string) => this.setState({
                                                      text: textArg,
                                                      page: 1
                                                    })}
        setSearch={(searchArg:Search) => this.setState({search: searchArg})}
      />
      <div className="blog-container">
        {resultBlogs?.map((item) => (
          <BlogItem key={item.id} blog={{ ...item }} />
        ))}
        <div className="page-numbers">
          {[...Array(Math.ceil(displayLength / 5))].map((_, index) => (
            <button
              key={index}
              className="page-button"
              onClick={() => this.setState({page: (index+1)})}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
    );
  };

}