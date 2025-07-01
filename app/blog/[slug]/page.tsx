"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Markdown from "markdown-to-jsx";
import Head from "next/head";
import { motion } from "framer-motion";

interface Post {
  title: string;
  slug: string;
  image: string;
  de: string;
  en: string;
  date: string;
  description: string;
}

const PostPage: NextPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const slug = window.location.pathname.split("/").pop()?.split("?")[0];
        if (!slug) return;

        const res = await fetch(
          "https://raw.githubusercontent.com/Crystopia/Content/main/website/blog/bloglist.json"
        );
        if (!res.ok) throw new Error("Failed to fetch post list");

        const posts: Post[] = await res.json();
        const foundPost = posts.find((p) => p.slug === slug);
        if (!foundPost) throw new Error("Post not found");

        setPost(foundPost);

        const lang = navigator.language.startsWith("de")
          ? foundPost.de
          : foundPost.en;
        const contentRes = await fetch(lang);
        if (!contentRes.ok) throw new Error("Failed to fetch post content");

        const text = await contentRes.text();
        setContent(text);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      <Head>
        <title>{post?.title ?? "Loading..."} – Crystopia Blog</title>
        <meta name="description" content={post?.description} />
        <meta property="og:title" content={post?.title} />
        <meta property="og:image" content={post?.image} />
        <meta property="og:description" content={post?.description} />
        <meta property="article:published_time" content={post?.date} />
        <meta name="twitter:title" content={post?.title} />
        <meta name="twitter:description" content={post?.description} />
        <meta name="twitter:image" content={post?.image} />
      </Head>

      {loading ? (
        <div className="w-full h-screen flex items-center justify-center text-gray-600 dark:text-gray-300 text-xl">
          Loading post...
        </div>
      ) : post ? (
        <motion.section
          className="w-full bg-zinc-50 dark:bg-zinc-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Header */}
          <div className="relative h-64 sm:h-96 w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 flex flex-col justify-end p-6 md:p-12">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
                {post.title}
              </h1>
              <time dateTime={post.date} className="text-sm text-white/80 mt-2">
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          {/* Blog Content */}
          <article className="prose dark:prose-invert prose-lg max-w-5xl mx-auto px-4 py-10 sm:px-6">
            <Markdown>{content}</Markdown>
          </article>
        </motion.section>
      ) : (
        <div className="w-full h-screen flex items-center justify-center text-red-500 text-xl">
          Post not found.
        </div>
      )}
    </>
  );
};

export default PostPage;
