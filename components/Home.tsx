"use client"
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"


// Interface for the book
interface IBook {
  name: string;
  price: number;
  description: string;
  imageUrl: any;
}


export default function Section1() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

const [data, setData] = useState<IBook[]>([])
    useEffect(()=>{
        const fetchData = async () => {
        const booksPost: IBook[] = await client.fetch('*[_type == "books"]');
        setData(booksPost)
    }
    fetchData()
  },[setData])

  const testimonials = [
  { quote: "This is the best blog for men.", name: "John Doe" },
  { quote: "Inspirational and stylish!", name: "Mike Smith" },
  { quote: "A must-follow for every man.", name: "Alex Brown" },
];
const [menuOpen, setMenuOpen] = useState(false);

const comments = [
  { author: "Sarah", text: "Amazing content! Keep it up." },
  { author: "James", text: "Loved the latest post." },
];
   return (
    

    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
    {/* Navbar */}
    {/* <motion.nav 
      className="bg-black bg-opacity-90 py-4 sticky top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <motion.div 
          className="text-2xl font-bold text-red-600"
          whileHover={{ scale: 1.05 }}
        >
          MensBlog
        </motion.div>
        <div className="hidden md:flex space-x-6">
          {['Home', 'Books', 'About', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
              className="hover:text-red-500 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-gray-800 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {['Home', 'Books', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                className="block py-2 px-4 text-center text-white hover:text-red-500 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav> */}
    <div className="bg-gray-900 text-gray-200 " >
    <motion.nav
        className="fixed w-full flex justify-between items-center px-6 py-4 backdrop-blur-md z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-2xl font-bold text-red-600 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          Men’s Blog
        </motion.div>
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-red-500">Home</a>
          <a href="#about" className="hover:text-red-500">About</a>
          <a href="#books"
          className="hover:text-red-500">Featured</a>
          <a href="#testimonials" className="hover:text-red-500">Testimonials</a>
          <a href="#comments" className="hover:text-red-500">Comments</a>
        </div>
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-gray-200 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-200 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-200"></div>
        </div>
      </motion.nav>
    </div>

    {/* Hero Section */}
    <motion.div 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-red-900 opacity-50"></div>
      
      <div className="relative text-center z-10 px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Welcome to MensBlog
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Discover our curated collection of books for the modern man
        </motion.p>
        <Link href={"#books"}>    
        <motion.button
          className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors duration-300 shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(220,38,38)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Explore Books
        </motion.button>
           </Link>
      </div>
    </motion.div>

    {/* Featured Books */}
    <div id="books" className="container mx-auto px-4 py-16">
      <motion.h2 
        className="text-4xl font-bold text-center mb-12 text-red-600"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Featured Books
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-red-500/50 transition-all duration-300"
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
                <span className="text-lg font-bold text-red-500">${item.price}</span>
                <Link href={`/home/${item.name}`}>
                  <motion.button
                    className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(75,85,99)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View More
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* About Section */}
    <section id="about" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-red-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About MensBlog
        </motion.h2>
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            MensBlog is your ultimate destination for curated content tailored to the modern man. We believe in empowering men through knowledge, style, and personal growth.
          </motion.p>
          <motion.p
            className="text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Our carefully selected collection of books covers a wide range of topics including personal development, career success, fitness, and lifestyle - all designed to help you become the best version of yourself.
          </motion.p>
        </div>
      </div>
    </section>
     {/* Comments Section */}
     <section id="comments" className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center text-red-600 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Comments
          </motion.h2>
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gray-900 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h4 className="font-bold text-red-500">{comment.author}</h4>
                <p className="text-gray-300">{comment.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* Testimonials Section */}
<section id="testimonials" className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center text-red-600 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                <h4 className="text-lg font-bold mt-4 text-red-500">
                  {testimonial.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


     <footer className="py-6 bg-gray-900 text-center">
        <p className="text-gray-400">&copy; 2025 Mens Blog. All rights reserved.</p>
      </footer>
  </div>

   );


};
