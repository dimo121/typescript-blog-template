import React from 'react';
import { Search } from "../types/TypeDefs";


interface IFilterProps {
  text: string;
  search: Search;
  setText: (textArg:string) => void;
  setSearch: (search:Search) => void;
}

export const BlogListFilter:React.FC<IFilterProps> = (props) => {
  
    const { text, search, setText, setSearch } = props;

    return(
      <div className="s2-lf-wrapper">
        <h3 className="s2-lf__title">Search by:</h3>
        <div className="s2-lf__container">
          <input
            className="s2-lf__bar"
            type="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          />
          <span>
            <select
              className="s2-lf__pulldown"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearch(e.target.value as Search)}
            >
              <option value='Title'>Title</option>
              <option value='Content'>Content</option>
            </select>
          </span>
        </div>
      </div>
  );
}
