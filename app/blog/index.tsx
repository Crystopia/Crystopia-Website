import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  title: string;
  slug: string;
  image: string;
  de: string; // URL zur deutschen MDX-Datei
  en: string; // URL zur englischen MDX-Datei
  date: string;
  description: string;
}

const HomePage: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lang, setLang] = useState<string>('.en'); // default .en

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url =
          'https://raw.githubusercontent.com/Crystopia/Content/main/website/blog/bloglist.json';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Post[] = await response.json();
        setPosts(data);

        // Sprache setzen wie im PostPage
        setLang(navigator.language === 'de-DE' ? '.de' : '.en');
        console.log('Browser language:', navigator.language);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Crystopia.net | Blog</title>
        <meta
          name="description"
          content="Aktuelle Blogbeiträge zu Minecraft, Servern und Crystopia"
        />
      </Head>
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex flex-col items-center mb-12 space-y-4">
          <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6 justify-center">
            <Image
              className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
              src="/images/crystopia.png"
              alt="Crystopia.net"
              sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
              width={48}
              height={48}
            />
            <h1 className="text-5xl">Crystopia.net | Blog</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl text-center text-lg">
            Discover exciting articles and news about Minecraft, servers and
            Crystopia.
          </p>
        </header>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="relative rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300 w-full h-full group"
              >
                <Link
                  href={`/blog/${post.slug}${lang}`}
                  className="block group"
                  aria-label={`Zum Blogbeitrag: ${post.title}`}
                  legacyBehavior>
                  <div className="relative w-full h-48 sm:h-56 md:h-48 overflow-hidden rounded-t-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={1000}
                      height={1000}
                      className="group-hover:scale-105 transition-transform duration-500 ease-in-out object-cover rounded-t-2xl w-full h-full"
                      priority={false}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </Link>
                <time className="absolute top-4 right-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              </article>
            ))}
          </section>
        </motion.div>
      </main>
    </>
  );
};

export default HomePage;
