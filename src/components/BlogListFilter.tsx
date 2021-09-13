import React from 'react';
import { Search } from "../types/TypeDefs";


interface IFilterProps {
  text: string;
  search: Search;
  setText: (textArg:string) => void;
  setSearch: (search:Search) => void;
}

export default class BlogListFilter extends React.Component<IFilterProps,{}> {
  
  render() {
    return(
      <div className="list-filter-container">
        <input
          className="search-bar"
          type="text"
          value={this.props.text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.setText(e.target.value)}
        />
        <span>
          <select
            className="search-pulldown"
            value={this.props.search}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.props.setSearch(e.target.value as Search)}
          >
            <option value='Title'>Title</option>
            <option value='Content'>Content</option>
          </select>
        </span>
      </div>
  );
}
}
