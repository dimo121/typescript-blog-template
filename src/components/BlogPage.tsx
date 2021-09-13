import React from "react";
import BlogItem from "./BlogItem";
import { EntryItem } from "./EntryItem";
import { Blog } from '../types/TypeDefs';
// import { useQuery } from "@apollo/react-hooks";
// import { FIND_BLOG } from "../apollo/protocol";
import { db_mock } from "../apollo/db_mock";
import { RouteComponentProps } from "react-router-dom";

type IBlogPageProps = RouteComponentProps<{ id: string }>

export class BlogPage extends React.Component<IBlogPageProps,{}> {

  // constructor(props:IBlogPageProps){
  //   super(props);
  // }

  // const {
  //   data = { blog: {} },
  //   loading,
  //   error,
  // } = useQuery(FIND_BLOG, {
  //   variables: {
  //     blogId: this.props.match.params.id,
  //   },
  // });

  // if (loading) {
  //   return <p>loading...</p>;
  // }

  // if (error) {
  //   data.blog = db_mock[props.match.params.id - 1];
  // }

  render(){


    let data:Blog[] = db_mock.filter(item => item.id === parseInt(this.props.match.params.id))

    return (
      <div className="page-container">
        <div className="blog-container">
          <BlogItem key={data[0].id} blog={{ ...data[0] }} />
          {data[0].entries?.map((item) => {
            return <EntryItem key={item.id} entry={item} />;
          })}
        </div>
      </div>
    );
  }
};

export default BlogPage;
