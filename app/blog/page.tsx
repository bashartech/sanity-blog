"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BlogForm = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form submission logic goes here
    // For example, handle posting to your Sanity CMS API

    // After submitting, redirect the user:
    router.push('/blog');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            accept="image/*"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Blog Post
        </button>
      </form>
    </div>
  );
};

export default BlogForm;