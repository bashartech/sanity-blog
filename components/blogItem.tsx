
import { useState } from 'react';
import { useRouter } from 'next/router';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch('/api/createBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          image: null, // Update this logic if you’re uploading the image
        }),
      });

      if (response.ok) {
        router.push('/post'); // Redirect to `/post` page
      } else {
        console.error('Failed to create blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Create a Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block font-medium">Image</label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
