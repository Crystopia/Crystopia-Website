"use client";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Guide {
  title: string;
  slug: string;
  image: string;
  de: string;
  en: string;
  date: string;
  description: string;
}

const GuidePage: NextPage = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [lang, setLang] = useState<string>(".en");

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setGuides([]);
      } catch (error) {
        console.error("Error fetching guides data:", error);
      }
    };
    fetchGuides();
  }, []);

  return (
    <>
      <Head>
        <title>Crystopia.net | Guides</title>
        <meta
          name="description"
          content="Detaillierte Anleitungen und Tutorials zu Minecraft, Servern und Crystopia."
        />
      </Head>
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6 justify-center">
            <Image
              className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
              src="/images/crystopia.png"
              alt="Crystopia.net"
              sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
              width={48}
              height={48}
            />
            <h1 className="text-5xl">Crystopia.net | Guide</h1>
          </div>
          <br></br>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Entdecke spannende Anleitungen und Tutorials zu Minecraft, Servern
            und Crystopia.
          </p>
        </motion.header>

        {/* Guide Grid */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {guides.length < 1 ? (
            guides.map((guide) => (
              <article
                key={guide.slug}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition duration-300 overflow-hidden group relative"
              >
                <Link
                  href={`/guides/${guide.slug}${lang}`}
                  className="block h-full"
                  legacyBehavior
                >
                  {/* Image */}
                  <div className="relative w-full h-48 sm:h-56 md:h-48 overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                      {guide.description}
                    </p>
                    <span className="mt-auto text-sm text-blue-500 dark:text-blue-400 font-medium">
                      Zum Guide →
                    </span>
                  </div>
                </Link>

                {/* Date Badge */}
                <time className="absolute top-4 right-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold shadow">
                  {new Date(guide.date).toLocaleDateString()}
                </time>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              <p>Currently, there are no guides available.</p>
            </div>
          )}
        </motion.section>
      </main>
    </>
  );
};

export default GuidePage;
