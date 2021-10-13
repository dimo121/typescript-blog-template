import { Blog, Search } from "../types/TypeDefs"

const filter = (blogs:Blog[], text:string, search:Search):Blog[] => {

    if(text){
        search === "Title"
        ? (blogs = blogs.filter((item:Blog) => item.title.includes(text)))
        : (blogs = blogs.filter((item:Blog) => item.content.includes(text)));
    }

    return blogs;

}


export default filter;