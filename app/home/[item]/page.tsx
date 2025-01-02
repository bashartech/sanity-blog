

"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { PortableText } from "next-sanity";


interface IBook {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  content:any
}

interface BlogPageProps {
  params: {
    item?: string;
  };
}

export default function BlogPage
  ({ params }: BlogPageProps)
  // { params }: { params: { item?: string } }) 
  {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let query = '*[_type == "books"]';
        if (params.item) {
          // Use a case-insensitive match for the item name
          query = `*[_type == "books" && lower(name) == "${params.item.toLowerCase()}"]`;
        }
        const fetchedBooks: IBook[] = await client.fetch(query);
        console.log("Fetched books:", fetchedBooks); // For debugging
        setBooks(fetchedBooks);
        console.log(fetchedBooks)

      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.item]);

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </motion.div>
    );
  }

  if (books.length === 0) {
    return (
      <motion.p
        className="text-center text-lg text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No books available for "{params.item}". Please check the item name and try again.
      </motion.p>
    );
  }

  return (
    
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-4 sm:p-8">
//     <motion.h1
//       className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {params.item ? `Blog: ${params.item}` : "Futuristic Tech Blog"}
//     </motion.h1>

//     <div className="max-w-4xl mx-auto space-y-16">
//       {books.map((blog, index) => {
                
//         return(
//         <motion.article
//           key={blog._id}
//           className="bg-gray-800 bg-opacity-50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//         >
//           <div className="relative h-64 sm:h-96 w-full">
//             <Image
//               src={blog.imageUrl ? urlFor(blog.imageUrl).url() : "/placeholder.svg?height=600&width=1200"}
//               alt={blog.name}
//               layout="fill"
//               objectFit="cover"
//               className="transition-transform duration-300 hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
//             <div className="absolute bottom-0 left-0 p-6">
//               <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{blog.name}</h2>
//               <div className="flex items-center text-sm text-gray-300">
//                 <span className="mr-3">
//                   <i className="fas fa-calendar-alt mr-1"></i> {new Date().toLocaleDateString()}
//                 </span>
//                 <span>
//                   <i className="fas fa-user mr-1"></i> John Doe
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="p-6 sm:p-8">
//             <div className="prose prose-invert max-w-none">
//               <div className="text-gray-300 mb-6">              {blog.description}
//               </div>
//               <h3 className="text-xl font-semibold mb-4"></h3>
//               <div className="prose dark:prose-invert  prose-xl">
//                 <PortableText value={blog.content} />
//               </div>
//               <p className="text-gray-300 mb-4">
//                 As we delve deeper into the realms of {blog.name}, we uncover a world of possibilities that were once confined to the pages of science fiction. The rapid advancements in technology have propelled us into an era where the lines between reality and imagination are increasingly blurred.
//               </p>
             
//             </div>
//             <Link href={"/home"}>
//             <motion.button
//               className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-colors duration-300 flex items-center"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Read More Article 
//               <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//               </svg>
//             </motion.button>
//             </Link>
//           </div>
//         </motion.article>
//         )
//       }
      
//       )}
//     </div>
//   </div>
<div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-8">
<motion.h1
  className="text-4xl sm:text-5xl font-bold text-center mb-12 text-red-700"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {params.item ? `Blog: ${params.item}` : "MensBlog Articles"}
</motion.h1>

<div className="max-w-4xl mx-auto space-y-16">
  {books.map((blog, index) => (
    <motion.article
      key={blog._id}
      className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-red-700/50 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative h-64 sm:h-96 w-full">
        <Image
          src={blog.imageUrl ? urlFor(blog.imageUrl).url() : "/placeholder.svg?height=600&width=1200"}
          alt={blog.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{blog.name}</h2>
          <div className="flex items-center text-sm text-gray-300">
            <span className="mr-3">
              <i className="fas fa-calendar-alt mr-1"></i> {new Date().toLocaleDateString()}
            </span>
            <span>
              <i className="fas fa-user mr-1"></i> John Doe
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-300 mb-6">{blog.description}</div>
          <h3 className="text-xl font-semibold mb-4"></h3>
          <div className="prose dark:prose-invert prose-xl">
            <PortableText value={blog.content} />
          </div>
          <p className="text-gray-300 mb-4">
            As we delve deeper into the realms of {blog.name}, we uncover a world of possibilities that were once confined to the pages of science fiction. The rapid advancements in technology have propelled us into an era where the lines between reality and imagination are increasingly blurred.
          </p>
        </div>
        <Link href={"/home"}>
          <motion.button
            className="mt-8 px-6 py-3 bg-red-700 text-white rounded-full font-semibold hover:bg-red-800 transition-colors duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More Articles 
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </Link>
      </div>
    </motion.article>
  ))}
</div>
</div>
  );
}














