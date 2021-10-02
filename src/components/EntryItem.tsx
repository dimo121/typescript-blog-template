import React from 'react';
import { Entry } from '../types/TypeDefs';

interface IEntryItemProps {
  entry: Entry
}

export const EntryItem:React.FC<IEntryItemProps> = (props) => (
  <div className="item-container">
    <div className="item__upper">
      <h1>{props.entry.title}</h1>
      <span>{props.entry.createdAt}</span>
    </div>
    <div className="item__inner">
      <p>{props.entry.content}</p>
    </div>
    <div className="item__lower">
      <p>Written by: {props.entry.owner?.username}</p>
    </div>
  </div>
);
