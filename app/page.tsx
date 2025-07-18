"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Post {
  title: string;
  slug: string;
  image: string;
  file: string;
  date: string;
  lang: string;
}

const HomePage: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    async function fetchPosts() {
      const url =
        "https://raw.githubusercontent.com/Crystopia/Content/refs/heads/main/website/blog/bloglist.json";

      if (navigator.language === "de-DE") setLang("de");
      else setLang("en");

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Post[] = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const latestPost = posts.length > 0 ? posts[0] : null;

  return (
    <>
      <Head>
        <title>Crystopia – A Minecraft Universe</title>
        <meta
          name="description"
          content="Explore, build, and dream in Crystopia."
        />
      </Head>

      <main className="min-h-screen text-white bg-black">
        {/* HERO SECTION */}
        <section
          className="bg-cover bg-center h-screen relative"
          style={{ backgroundImage: "url(/images/background.png)" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="container mx-auto flex flex-col items-center justify-center h-full relative z-10 text-center px-4 md:px-8">
            <motion.h1
              className="text-5xl md:text-7xl text-[#78D5F5]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to Crystopia
            </motion.h1>

            <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl">
              A Minecraft universe where creativity knows no bounds.
            </p>
          </div>
        </section>

        {/* LATEST POST */}
        <section className="bg-[#0d0d0d] py-20 px-6 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl text-[#78D5F5]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Latest Update
            </motion.h2>
            <p className="text-gray-400 mt-4 mb-10">
              The newest news from the Crystopia world.
            </p>

            {latestPost && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="mx-auto max-w-3xl bg-[#1a1a1a] border border-[#78D5F5] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                <Link href={`/blog/${latestPost.slug}?lang=${lang}`}>
                  <Image
                    src={latestPost.image}
                    alt={latestPost.title}
                    width={800}
                    height={400}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold text-white">
                      {latestPost.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(latestPost.date).toLocaleDateString(
                        navigator.language,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
              <Button
                asChild
                className="bg-[#7c8d92] text-black hover:bg-[#62c2e6] transition duration-300"
              >
                <Link href="/blog">Read More</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ABOUT CRYSTOPIA */}
        <section className="bg-[#121212] py-24 px-6 text-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              exit={{ opacity: 0, x: -40 }}
            >
              <Image
                src="/images/discord.png"
                alt="Community"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-4xl text-[#78D5F5] mb-6">
                What is Crystopia?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Crystopia is a unique Minecraft experience built around
                creativity, community and collaboration. Whether you're into
                architecture, redstone engineering or exploring beautiful
                landscapes – you'll find your place here.
              </p>
              <p className="text-gray-400 mt-4">
                Join the growing community and leave your mark.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    asChild
                    className="bg-[#78D5F5] text-black hover:bg-[#62c2e6]"
                  >
                    <Link href="/blog">Read Our Blog</Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#78D5F5] text-[#78D5F5] hover:bg-[#1a1a1a]"
                  >
                    <Link href="/discord">Join Discord</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
