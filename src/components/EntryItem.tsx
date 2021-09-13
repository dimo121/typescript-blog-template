import React from 'react';
import { Entry } from '../types/TypeDefs';

interface IEntryItemProps {
  entry: Entry
}

export const EntryItem:React.FC<IEntryItemProps> = (props) => (
  <div className="item-container">
    <div className="itemUpper">
      <h1>{props.entry.title}</h1>
      <span>{props.entry.createdAt}</span>
    </div>
    <div className="itemInner">
      <p>{props.entry.content}</p>
    </div>
    <div className="itemLower">
      <p>Written by: {props.entry.owner?.username}</p>
    </div>
  </div>
);
