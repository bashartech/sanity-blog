import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { GetStaticProps } from 'next';

// Define the type for blog post
interface BlogPost {
  _id: string;
  title: string;
  description: string;
  images: Array<{ asset: { _ref: string } }>;
}

// Fetch data using getStaticProps
export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "blog"]{
    _id,
    title,
    description,
    images
  }`;

  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

interface HomeProps {
  posts: BlogPost[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative w-full h-48">
            {post.images && post.images.length > 0 && (
              <img
                src={urlFor(post.images[0].asset._ref).width(400).height(250).url()}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
            <p className="mt-4 text-gray-600">{post.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
