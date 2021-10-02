import React from 'react';
import { Search } from "../types/TypeDefs";


interface IFilterProps {
  text: string;
  search: Search;
  setText: (textArg:string) => void;
  setSearch: (search:Search) => void;
}

export const BlogListFilter:React.FC<IFilterProps> = (props) => {
  
    return(
      <div className="list-filter-container">
        <input
          className="search-bar"
          type="text"
          value={props.text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setText(e.target.value)}
        />
        <span>
          <select
            className="search-pulldown"
            value={props.search}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => props.setSearch(e.target.value as Search)}
          >
            <option value='Title'>Title</option>
            <option value='Content'>Content</option>
          </select>
        </span>
      </div>
  );
}
