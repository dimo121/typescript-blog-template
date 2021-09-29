import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation ($createUserInput: NewUserInput!) {
    createUser(input: $createUserInput) {
      id
      username
      email
      password
      createdAt
      tokens
    }
  }
`;

export const LOGIN_USER = gql`
  mutation ($loginInput: AuthInput!) {
    login(input: $loginInput) {
      id
      username
      email
      password
      tokens
    }
  }
`;

export const FIND_USER = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      id
      username
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation ($createBlogInput: NewBlogInput!) {
    createBlog(input: $createBlogInput) {
      id
      title
      content
      createdAt
    }
  }
`;

export const CREATE_ENTRY = gql`
  mutation ($createEntryInput: NewEntryInput!) {
    createEntry(input: $createEntryInput) {
      id
      title
      content
      createdAt
      blog_id
      user
    }
  }
`;
export const BLOGS_BY_USER = gql`
  query Query($userId: ID!) {
    blogsByUser(id: $userId) {
      id
      title
      content
      createdAt
      entries {
        id
      }
      owner {
        username
      }
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation ($deleteBlogId: String!) {
    deleteBlog(id: $deleteBlogId) {
      id
    }
  }
`;
export const LOAD_BLOGS = gql`
  query {
    blogs {
      id
      title
      content
      createdAt
      entries {
        id
      }
      owner {
        username
      }
    }
  }
`;

export const FIND_BLOG = gql`
  query Query($blogId: ID!) {
    blog(id: $blogId) {
      id
      title
      content
      createdAt
      entries {
        id
        title
        content
        createdAt
        owner {
          username
        }
      }
      owner {
        username
      }
    }
  }
`;
