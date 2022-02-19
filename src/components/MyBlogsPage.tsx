import React, { useState, useEffect } from 'react';
import { DataService } from '../controllers/DataService/DataService';
import { Blog, Search, User } from '../types/TypeDefs';
import BlogItem from './BlogItem';
import { BlogListFilter } from './BlogListFilter';
import { Spinner } from './Spinner';
import { Redirect } from 'react-router-dom';
import paginateLocal from '../utils/paginate';
import filter from '../utils/filter';


interface IMyBlogsPageProps {
  dataService: DataService;
  user: User|undefined;
}


const MyBlogsPage:React.FC<IMyBlogsPageProps> = (props) => {
  
  const { user, dataService } = props;

  const [blogCollection,setBlogCollection] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [text, setText] = useState<string>('');
  const [search, setSearch] = useState<Search>('Title');
  const [userId, setUserId] = useState<string>(''); 
  const [deleted, setDeleted] = useState<boolean>(false);


  useEffect(() => {
    const retrieveUserId = (): Promise<string> => {
      return new Promise((res,rej) => {
        if(user) {
          user.user.getUserAttributes((err,result) => {
            if(err){
              alert(err);
              return '';
            } else{
              if(result){
                res(result[0].Value);
              }
            }
          })
        } else {
          rej('Error retrieving user id');
        }
      })
    }

    const loadBlogs = async ():Promise<void> => {

      let id:string;
  
      try {
        id = await retrieveUserId() as string;
      } catch (error) {
        console.log(error);
        return;
      }
  
      const blogCollection:Blog[] = await dataService.getBlogsByUser(id);
  
      setBlogCollection(blogCollection);
      setLoading(false);
      setUserId(id);
    
    }

    loadBlogs();
  },[user,dataService]);


    if(!user) return <h1 style={{fontSize : '1em', color:'white', padding:'4em',marginTop:'0'}}>Login to see user specific blogs</h1>;

    if(loading) return <Spinner />;

    let resultBlogs: Blog[] = filter(blogCollection,text,search)

    const displayLength = resultBlogs.length;

    resultBlogs = paginateLocal(resultBlogs, page);    

    return (
      <div>
         <BlogListFilter
            text={text}
            search={search}
            setText={(textArg:string) => {
              setText(textArg);
              setPage(1);
            }}
            setSearch={(searchArg:Search) => setSearch(searchArg)}
          />
        <div className="s3-bc">
          {resultBlogs.map((item,index) => (
            <div key={index}>
              <BlogItem blog={{ ...item }} dataService={dataService}/>
              <button
                className="blog-button delete-button"
                onClick={async () => {
                  const result:boolean = await dataService.deleteBlog(item.id,userId)
                
                  if(result){
                    setDeleted(true);
                  }
                }}
              >
                Delete
              </button>
            </div>
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
          {deleted && <Redirect to='/dashboard' />}
      </div>
    );
};


export default MyBlogsPage;