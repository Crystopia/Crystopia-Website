"use client";
import {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import Link from "next/link";

interface Post {
    title: string;
    slug: string;
    image: string;
    de: string;
    en: string;
    date: string;
    description: string;
}

const HomePage: NextPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [lang, setLang] = useState<"en" | "de">("en");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const url =
                    "https://raw.githubusercontent.com/Crystopia/Content/main/website/blog/bloglist.json";
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data: Post[] = await response.json();
                setPosts(data);
                setLang(navigator.language === "de-DE" ? "de" : "en");
            } catch (error) {
                console.error("Error fetching blog data:", error);
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

            <main className="max-w-7xl mx-auto px-6 py-16">
                {/* Header */}
                <header className="text-center mb-16">
                    <div className="flex justify-center items-center space-x-4">
                        <Image
                            src="/images/crystopia.png"
                            alt="Crystopia Logo"
                            width={48}
                            height={48}
                            className="rounded-full w-12 h-12"
                        />
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Crystopia Blog</h1>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        {lang === "de"
                            ? "Spannende Artikel und Neuigkeiten zu Minecraft, Servern und der Crystopia-Community."
                            : "Exciting articles and updates about Minecraft, servers, and the Crystopia community."}
                    </p>
                </header>

                {/* Blog Grid */}
                <motion.section
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className="relative flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <Link href={`/blog/${post.slug}?lang=${lang}`} className="group" aria-label={post.title}>
                                <div
                                    className="relative w-full h-48 overflow-hidden rounded-t-2xl shadow-lg">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-200">
                                        {post.title}
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                        {post.description}
                                    </p>
                                    <span className="mt-auto pt-4 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString(lang === "de" ? "de-DE" : "en-US")}
                  </span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </motion.section>
            </main>
        </>
    );
};

export default HomePage;
