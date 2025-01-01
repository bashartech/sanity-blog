// pages/api/createBlog.ts
import { client } from '@/sanity/lib/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, image } = req.body;

    // Sanity Image Upload Logic (you will need to handle image upload separately)
    let imageUrl = null;

    if (image) {
      // Simulating an image upload to Sanity (you may need to use a proper method like Sanity's Asset API)
      imageUrl = 'https://example.com/uploaded_image_url'; // Replace with actual URL
    }

    // Generate a unique ID for the new blog post
    const blogId = uuidv4();

    // Create the blog post in Sanity
    try {
      const createdPost = await client.create({
        _type: 'blog',
        _id: blogId,
        title: title,
        description: description,
        image: imageUrl ? { _type: 'image', asset: { _type: 'reference', _ref: imageUrl } } : null,
      });

      // Return the blog ID in the response
      res.status(200).json({ message: 'Blog created successfully', id: createdPost._id });
    } catch (error) {
      res.status(500).json({ error: 'Error creating blog post' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
