import { BlogItem } from "./BlogItem";
import { BlogListFilter } from "./BlogListFilter";
import React from "react";
import { Blog, Search } from "../types/TypeDefs";
import { DataService } from "../controllers/DataService/DataService";
import { Spinner } from './Spinner';
import paginateLocal from '../utils/paginate';
import filterBlogs from '../utils/filter';

interface IDashState {
  text: string;
  search: Search;
  page: number;
  blogCollection: Blog[];
  loading: boolean;
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
      blogCollection: [],
      loading: true
    }

    this.loadBlogs = this.loadBlogs.bind(this);

  }

  componentDidMount(){
    this.loadBlogs();
  }

  private async loadBlogs():Promise<void> {
    
    let resultBlogs: Blog[] = await this.props.dataService.getBlogs();

    this.setState({ blogCollection: resultBlogs,
                    loading: false});

  }

  public render() {

      if(this.state.loading) return <Spinner />;

      let resultBlogs: Blog[] = filterBlogs(this.state.blogCollection,this.state.text,this.state.search)

      const displayLength = resultBlogs.length;

      resultBlogs = paginateLocal(resultBlogs, this.state.page);
      
      return (
        <div>
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
            {resultBlogs?.map((item:Blog) => (
              <BlogItem key={item.id} blog={{ ...item }} dataService={this.props.dataService}/>
            ))}
          </div>
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
      )
    }
}

