import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';

// Define a type for the blog post structure
interface BlogPost {
  title: string;
  description: string;
  image?: {
    asset: {
      url: string;
    };
  };
}

const BlogPostPage = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const router = useRouter();

  // This effect will run once the component is mounted on the client-side
  useEffect(() => {
    // Ensure the router is ready and we have a valid 'id' param
    if (router.isReady && router.query.id) {
      const { id } = router.query;

      // Fetch the blog post from Sanity using the `id`
      client
        .fetch(`*[_id == $id][0]`, { id })
        .then((data) => setPost(data))
        .catch((error) => console.error('Error fetching blog post:', error));
    }
  }, [router.isReady, router.query.id]);

  // Loading state when post data is not fetched yet
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.description}</p>
      {post.image && <img src={post.image.asset.url} alt={post.title} className="mt-4" />}
    </div>
  );
};

export default BlogPostPage;
