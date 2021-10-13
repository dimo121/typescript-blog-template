import { Blog } from "../types/TypeDefs"

const paginateLocal = (blogs:Blog[], page:number):Blog[] => {

    const end:number = page * 5;
    const start:number = end - 5;
    const result:Blog[] = [];

    for (let i = start; i < end; i++) {
      if (blogs[i]) result.push(blogs[i]);
    }

    return result;

}


export default paginateLocal;