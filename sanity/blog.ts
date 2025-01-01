// schemas/blog.js
export default {
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Blog Title',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Blog Description',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Blog Image',
      },
    ],
  };
  