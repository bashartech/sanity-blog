"use client"
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"

// Interface for the book
interface IBook {
  name: string;
  price: number;
  description: string;
  imageUrl: any;
}


export default function Section1() {
const [data, setData] = useState<IBook[]>([])
    useEffect(()=>{
        const fetchData = async () => {
        const booksPost: IBook[] = await client.fetch('*[_type == "books"]');
        setData(booksPost)
    }
    fetchData()
  },[setData])

  return (
    // <div className="min-h-screen bg-gray-100 flex flex-col">
    //   {/* Navbar */}
    //   <nav className="bg-blue-600 text-white py-4">
    //     <div className="container mx-auto flex justify-between items-center">
    //       <div className="text-lg font-semibold">My Bookstore</div>
    //       <div className="space-x-6">
    //         <a href="/" className="hover:text-gray-300">Home</a>
    //         <a href="/about" className="hover:text-gray-300">About</a>
    //         <a href="/contact" className="hover:text-gray-300">Contact</a>
    //       </div>
    //     </div>
    //   </nav>

    //   {/* Main Content */}
    //   <div className="container mx-auto px-4 py-8">
    //     <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">Welcome to Our Bookstore</h1>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    //       {data.map((item, index) => {
    //         if (item.imageUrl) {
    //           console.log("Generated Image URL:", urlFor(item.imageUrl).url());
    //         } else {
    //           console.log("No image available for:", item.name);
    //         }

    //         return (
    //           <div
    //             key={index}
    //             className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
    //           >
    //             <div className="relative w-32 h-32 mb-4">
    //               {item.imageUrl ? (
    //                 <Image
    //                   src={urlFor(item.imageUrl).url()}
    //                   alt={item.name}
    //                   className="rounded-lg object-cover"
    //                   fill
    //                 />
    //               ) : (
    //                 <p>No items</p>
    //               )}
    //             </div>
    //             <h2 className="text-xl font-semibold text-blue-700">{item.name}</h2>
    //             {/* '<p className="opacity-75 text-center mt-2">{item.description}</p>' */}
    //             <div className="mt-4 text-lg font-bold text-blue-600">
    //               ${item.price.toFixed(2)}
    //             </div>
    //             <div>
    //                 <Link href={`/home/${item.name}`} >
    //                 <button>View More</button>
    //                 </Link>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>

    //   {/* Footer */}
    //   <footer className="bg-blue-600 text-white py-6 mt-auto">
    //     <div className="container mx-auto text-center">
    //       <p>&copy; 2024 My Bookstore | All Rights Reserved</p>
    //     </div>
    //   </footer>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white flex flex-col">
      {/* Navbar */}
      <motion.nav 
        className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg py-4 sticky top-0 z-50"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <motion.div 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            whileHover={{ scale: 1.05 }}
          >
            FutureBlog
          </motion.div>
          <div className="space-x-6">
            {['Home', 'Blogs', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div 
        className="relative h-96 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50"></div>
        <div className="absolute inset-0" style={{ backgroundImage: "url('/path-to-your-particle-effect.svg')" }}></div>
        <div className="relative text-center z-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to the Future of Reading</h1>
          <p className="text-xl mb-8">Explore our curated collection of futuristic literature</p>
          <motion.button
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-100 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Books
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div id="blogs" className="container mx-auto px-4 py-16">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Books
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.map((item, index) => {
           return(
            <motion.div
              key={index}
              className="bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-64">
                {item.imageUrl ? (
                  <Image
                    src={urlFor(item.imageUrl).url()}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-700">
                    <p className="text-gray-400">No image available</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
               
                <p className="text-gray-400 mb-4 line-clamp-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-400">${item.price.toFixed(2)}</span>
                  <Link href={`/home/${item.name}`}>
                    <motion.button
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View More
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
            )
          }
          
          )}
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-black bg-opacity-50 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">FutureBlog</h3>
              <p className="text-gray-400">Exploring tomorrow's literature, today.</p>
            </div>
            <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/3 text-center md:text-right">
              <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
              <div className="flex justify-center md:justify-end space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={`fab fa-${social} text-2xl`}></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FutureBlog | All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}