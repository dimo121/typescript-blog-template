import BlogItem from "./BlogItem";
import { BlogListFilter } from "./BlogListFilter";
import React, { useEffect, useState } from "react";
import { Blog, Search } from "../types/TypeDefs";
import { DataService } from "../controllers/DataService/DataService";
import { Spinner } from './Spinner';
import paginateLocal from '../utils/paginate';
import filterBlogs from '../utils/filter';

interface IDashProps {
  dataService: DataService
}

const Dashboard:React.FC<IDashProps> = (props) => {

  const { dataService } = props

  const [text,setText] = useState<string>('');
  const [search,setSearch] = useState<Search>('Title');
  const [page,setPage] = useState<number>(1);
  const [blogCollection,setBlogCollection] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    dataService.getBlogs().then(resultBlogs => {
      setBlogCollection(resultBlogs);
      setLoading(false);
    }).catch((e) => console.log(e));
    
  },[dataService]);
  
  if(loading) return <Spinner />;

  let resultBlogs: Blog[] = filterBlogs(blogCollection,text,search)

  const displayLength = resultBlogs.length;

  resultBlogs = paginateLocal(resultBlogs, page);
      
      return (
        <div>
          <BlogListFilter
            text={text}
            search={search}
            setText={(textArg:string) => {  setText(textArg);
                                            setPage(1);}}
            setSearch={(searchArg:Search) => setSearch(searchArg)}
          />
          <div className="s3-bc">
            {resultBlogs?.map((item:Blog) => (
              <BlogItem key={item.id} blog={{ ...item }} dataService={dataService}/>
            ))}
          </div>
          <div className="page-numbers">
              {[...Array(Math.ceil(displayLength / 5))].map((_, index) => (
                <button
                  key={index}
                  className="page-button"
                  onClick={() => setPage(index+1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
        </div>
      )
  }

export default Dashboard;