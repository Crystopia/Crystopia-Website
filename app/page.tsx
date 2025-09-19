"use client";
import {NextPage} from "next";
import {useEffect, useState} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";

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

            setLang(navigator.language === "de-DE" ? "de" : "en");

            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

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
                <meta name="description" content="Explore, build, and dream in Crystopia."/>
            </Head>

            <main className="min-h-screen text-white rounded-full  font-sans">
                {/* HERO SECTION */}
                <section
                    className="h-screen flex items-center justify-center overflow-hidden ">
                    <div
                        className="absolute inset-0 bg-[url('/images/background-pixel.png')] bg-cover bg-center opacity-60"></div>
                    <motion.div
                        className="absolute inset-0"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 2}}
                    >
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 h-1 bg-[#78D5F5] rounded-full absolute"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                                animate={{y: ["0%", "100%"], opacity: [1, 0]}}
                                transition={{duration: Math.random() * 4 + 2, repeat: Infinity, ease: "linear"}}
                            />
                        ))}
                    </motion.div>

                    {/* Titel */}
                    <div className="relative z-10 text-center px-6">
                        <motion.h1
                            className="text-6xl p-10 md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#78D5F5] via-[#62c2e6] to-[#7c8d92] drop-shadow-[0_0_30px_rgba(120,213,245,0.8)]"
                            initial={{opacity: 0, y: -50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1.2, ease: "easeOut"}}
                        >
                            Crystopia.net
                        </motion.h1>
                        <motion.div whileHover={{scale: 1.05}} className="mt-8">
                            <Button
                                asChild
                                className="bg-gradient-to-r from-[#78D5F5] via-[#62c2e6] to-[#7c8d92] text-black hover:brightness-110 transition duration-300"
                            >
                                <Link href="/blog">Start Your Adventure</Link>
                            </Button>
                        </motion.div>
                    </div>
                </section>

                {/* LATEST POST */}
                <section className="bg-[#0d0d0d] py-20 px-6 text-white rounded-2xl">
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.h2
                            className="text-4xl md:text-5xl text-[#78D5F5] font-bold mb-2"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.5}}
                        >
                            Latest Update
                        </motion.h2>
                        <p className="text-gray-400 mb-10">
                            The newest news from the Crystopia world.
                        </p>

                        {latestPost && (
                            <motion.div
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0px 0px 25px rgba(120,213,245,0.5)",
                                }}
                                className="mx-auto max-w-3xl bg-[#1a1a1a] border border-[#78D5F5] rounded-3xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300"
                            >
                                <Link href={`/blog/${latestPost.slug}?lang=${lang}`}>
                                    <div
                                        className="relative w-full h-48 overflow-hidden rounded-t-2xl shadow-lg">
                                        <Image
                                            src={latestPost.image}
                                            alt={latestPost.title}
                                            fill
                                            className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 text-left">
                                        <h3 className="text-2xl font-bold text-white">{latestPost.title}</h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {new Date(latestPost.date).toLocaleDateString(navigator.language, {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        )}

                        <motion.div whileHover={{scale: 1.05}} className="mt-8">
                            <Button
                                asChild
                                className="bg-gradient-to-r from-[#78D5F5] via-[#62c2e6] to-[#7c8d92] text-black hover:brightness-110 transition duration-300"
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
                            initial={{opacity: 0, x: -40}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.6}}
                        >
                            <Image
                                src="/images/discord.png"
                                alt="Community"
                                width={600}
                                height={400}
                                className="rounded-3xl shadow-2xl object-cover border-2 border-[#78D5F5]"
                            />
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, x: 40}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.6}}
                        >
                            <h2 className="text-4xl text-[#78D5F5] mb-6 font-bold drop-shadow">
                                What is Crystopia?
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Crystopia is a unique Minecraft experience built around creativity,
                                community, and collaboration. Whether you're into architecture, redstone
                                engineering or exploring beautiful landscapes – you'll find your place here.
                            </p>
                            <p className="text-gray-400 mt-4">
                                Join the growing community and leave your mark.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <motion.div whileHover={{scale: 1.05}}>
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-[#78D5F5] via-[#62c2e6] to-[#7c8d92] text-black hover:brightness-110"
                                    >
                                        <Link href="/blog">Read Our Blog</Link>
                                    </Button>
                                </motion.div>

                                <motion.div whileHover={{scale: 1.05}}>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-[#78D5F5] text-[#78D5F5] hover:bg-[#1a1a1a] hover:border-[#62c2e6]"
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
