// "use client";
// import { motion } from "framer-motion";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";

// interface IBook {
//   name: string;
//   price: number;
//   description: string;
//   imageUrl: string; // Use `string` instead of `any`
// }

// export default function BlogPage({ params }: { params: Promise<{ item: string }> }) {
//   const [data, setData] = useState<IBook | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [item, setItem] = useState<string>("");

//   useEffect(() => {
//     const unwrapParams = async () => {
//       const resolvedParams = await params; // Unwrap the `params` Promise
//       setItem(resolvedParams.item);
//     };
//     unwrapParams();
//   }, [params]);

//   useEffect(() => {
//     if (item) {
//       const fetchData = async () => {
//         setLoading(true);
//         const books: IBook[] = await client.fetch(
//           `*[_type == "books"]`
//         );
//         console.log(books)
//         setData(books[0] || null); // Get the first book or set `null`
//         setLoading(false);
//       };
//       fetchData();
//     }
//   }, [item]);

//   if (loading) {
//     return (
//       <motion.p
//         className="text-center text-lg text-gray-600"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         Loading...
//       </motion.p>
//     );
//   }

//   if (!data) {
//     return (
//       <motion.p
//         className="text-center text-lg text-gray-600"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         No product data available.
//       </motion.p>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
//       <motion.h1
//         className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Futuristic Tech Blog
//       </motion.h1>

//       <div className="max-w-6xl mx-auto grid gap-12">
//         <motion.article
//           className="bg-gray-800 bg-opacity-50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="md:flex">
//             <div className="md:flex-shrink-0 relative h-64 md:h-auto md:w-1/3">
//               <Image
//                 src={data.imageUrl ? urlFor(data.imageUrl).url(): "not found"}
//                 alt={data.name}
//                 layout="fill"
//                 objectFit="cover"
//                 className="transition-transform duration-300 hover:scale-110"
//               />
//             </div>
//             <div className="p-8 md:w-2/3">
//               <div className="uppercase tracking-wide text-sm text-blue-400 font-semibold">
//                 Blog Post
//               </div>
//               <a
//                 href="#"
//                 className="block mt-1 text-2xl leading-tight font-bold text-white hover:text-blue-300 transition-colors duration-300"
//               >
//                 {data.name}
//               </a>
//               <p className="mt-2 text-gray-300">{data.description}</p>
//               <motion.button
//                 className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-colors duration-300"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Read More
//               </motion.button>
//             </div>
//           </div>
//         </motion.article>
//       </div>
//     </div>
//   );
// }

"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";


interface IBook {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function BlogPage({ params }: { params: { item?: string } }) {
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
    // <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
    //   <motion.h1
    //     className="text-5xl  font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
    //     initial={{ opacity: 0, y: -50 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //   >
    //     {params.item ? `Blog: ${params.item}` : "All Books"}
    //   </motion.h1>

    //   <div className="max-w-6xl mx-auto grid gap-12">
    //     {books.map((book, index) => (
    //       <motion.article
    //         key={book._id}
    //         className="bg-gray-800 bg-opacity-50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
    //         initial={{ opacity: 0, y: 50 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.5, delay: index * 0.1 }}
    //       >
    //         <div className="md:flex">
    //           <div className="md:flex-shrink-0 relative h-64 md:h-auto md:w-1/3">
    //             <Image
    //               src={book.imageUrl ? urlFor(book.imageUrl).url() : "/placeholder.svg?height=400&width=300"}
    //               alt={book.name}
    //               layout="fill"
    //               objectFit="cover"
    //               className="transition-transform duration-300 hover:scale-110"
    //             />
    //           </div>
    //           <div className="p-8 md:w-2/3">
    //             <div className="uppercase tracking-wide text-sm text-blue-400 font-semibold">
    //               Blog
    //             </div>
    //             <h2 className="block mt-1 text-2xl leading-tight font-bold text-white hover:text-blue-300 transition-colors duration-300">
    //               {book.name}
    //             </h2>
    //             <p className="mt-2 text-gray-300">{book.description}</p>
    //             {/* <p className="mt-4 text-xl font-bold text-green-400">${book.price.toFixed(2)}</p> */}
    //             <motion.button
    //               className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-colors duration-300"
    //               whileHover={{ scale: 1.05 }}
    //               whileTap={{ scale: 0.95 }}
    //             >
    //               Read More
    //             </motion.button>
    //           </div>
    //         </div>
    //       </motion.article>
    //     ))}
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-4 sm:p-8">
    <motion.h1
      className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {params.item ? `Blog: ${params.item}` : "Futuristic Tech Blog"}
    </motion.h1>

    <div className="max-w-4xl mx-auto space-y-16">
      {books.map((blog, index) => {
                
        return(
        <motion.article
          key={blog._id}
          className="bg-gray-800 bg-opacity-50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
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
              <div className="text-gray-300 mb-6">              {blog.description}
              </div>
              <h3 className="text-xl font-semibold mb-4">Exploring the Future</h3>
              <p className="text-gray-300 mb-4">
                As we delve deeper into the realms of {blog.name}, we uncover a world of possibilities that were once confined to the pages of science fiction. The rapid advancements in technology have propelled us into an era where the lines between reality and imagination are increasingly blurred.
              </p>
              <p className="text-gray-300 mb-4">
                From quantum computing to artificial intelligence, from augmented reality to biotechnology, the pace of innovation is breathtaking. These developments are not just changing the way we live and work; they are reshaping our understanding of what it means to be human in a digital age.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">
                "The future is already here — it's just not evenly distributed." - William Gibson
              </blockquote>
              <p className="text-gray-300">
                As we stand on the brink of these technological revolutions, it's crucial to consider both the opportunities and challenges they present. How will these advancements impact our society, our economy, and our individual lives? What ethical considerations must we address as we push the boundaries of what's possible?
              </p>
            </div>
            <Link href={"/home"}>
            <motion.button
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-colors duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More Article 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
            </Link>
          </div>
        </motion.article>
        )
      }
      
      )}
    </div>
  </div>
  );
}














// interface IBook {
//     name: string;
//     price: number;
//     description: string;
//     imageUrl: any;
//   }

// export default function BlogPage({params,}: {params:{item:string}}) {
//     // const [blogs, setBlogs] = useState<IBook[]>([])
//     //     useEffect(()=>{
//     //         if(params?.item){
//     //             const fetchData = async () => {
//     //             const booksPost: IBook[] = await client.fetch(`*[_type == "books"]/${params.item}`);
//     //             setBlogs(booksPost)
//     //         }
//     //         fetchData()
//     //     }
//     //   },[params?.item])
//   return (
//     <div>
//           <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
//       <motion.h1 
//         className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Futuristic Tech Blog
//       </motion.h1>
      
//       {/* <div className="max-w-6xl mx-auto grid gap-12">
//         {blogs.map((blog, index) => (
//           <motion.article 
//             key={index}
//             className="bg-gray-800 bg-opacity-50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <div className="md:flex">
//               <div className="md:flex-shrink-0 relative h-64 md:h-auto md:w-1/3">
//                 <Image
//                   src={blog.imageUrl}
//                   alt={blog.name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="transition-transform duration-300 hover:scale-110"
//                 />
//               </div>
//               <div className="p-8 md:w-2/3">
//                 <div className="uppercase tracking-wide text-sm text-blue-400 font-semibold">Blog Post</div>
//                 <a href="#" className="block mt-1 text-2xl leading-tight font-bold text-white hover:text-blue-300 transition-colors duration-300">{blog.name}</a>
//                 <p className="mt-2 text-gray-300">{blog.description}</p>
//                 <div className="mt-4">
//                   <h3 className="text-xl font-semibold mb-2">Article Preview</h3>
//                   <p className="text-gray-400 line-clamp-3">{blog.description}</p>
//                 </div>
//                 <motion.button 
//                   className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-colors duration-300"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Read More
//                 </motion.button>
//               </div>
//             </div>
//           </motion.article>
//         ))}
//       </div> */}
//     </div>
//     </div>
//   )
// }
