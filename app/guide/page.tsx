"use client";
import { NextPage } from "next";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import Markdown from "markdown-to-jsx";
import GuideLink from "@/components/custom/GuideLink";
interface Guide {
  title: string;
  slug: string;
  image: string;
  de: string;
  en: string;
  description: string;
  type: string;
}

const HomePage: NextPage = () => {
  const [posts, setPosts] = useState<Guide[]>([]);
  const [lang, setLang] = useState<string>("en");
  const [expandedTypes, setExpandedTypes] = useState<string[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [selectedGuideContent, setSelectedGuideContent] = useState<string>("");

  const searchParams = useSearchParams();
  const typeFilter = searchParams.get("type");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url =
          "https://raw.githubusercontent.com/Crystopia/Content/refs/heads/main/website/guide/guidelist.json";
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data: Guide[] = await response.json();
        setPosts(data);
        setLang(navigator.language.startsWith("de") ? "de" : "en");

        const slug = new URLSearchParams(window.location.search).get("guide");
        if (slug) {
          const guide = data.find((post) => post.slug === slug);
          if (guide) {
            setSelectedGuide(guide);
            loadGuideContent(guide, lang);
          }
        } else {
          const defaultGuide = {
            de: "https://raw.githubusercontent.com/Crystopia/Content/refs/heads/main/website/guide/index-de.mdx",
            en: "https://raw.githubusercontent.com/Crystopia/Content/refs/heads/main/website/guide/index-en.mdx",
            image:
              "https://raw.githubusercontent.com/Crystopia/Guides/main/assets/crystopia.webp",
            title: "Welcome to Crystopia",
            slug: "welcome",
            description: "An introduction to Crystopia guides.",
            type: "General",
          };
          setSelectedGuide(defaultGuide);
          loadGuideContent(defaultGuide, lang);
        }
      } catch (error) {
        console.error("Error fetching guide data:", error);
      }
    };
    fetchPosts();
  }, []);

  const loadGuideContent = async (guide: Guide, language: string) => {
    try {
      const contentUrl = language === "de" ? guide.de : guide.en;
      const response = await fetch(contentUrl);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const content = await response.text();

      setSelectedGuideContent(content);
    } catch (error) {
      console.error("Error fetching guide content:", error);
      setSelectedGuideContent("");
    }
  };

  const handleGuideSelection = async (guide: Guide) => {
    setSelectedGuide(guide);

    const params = new URLSearchParams(window.location.search);
    if (params.get("guide") !== guide.slug) {
      params.set("guide", guide.slug);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, "", newUrl);
    }

    await loadGuideContent(guide, lang);
  };

  const groupedPosts = posts.reduce((acc: Record<string, Guide[]>, post) => {
    if (!acc[post.type]) acc[post.type] = [];
    acc[post.type].push(post);
    return acc;
  }, {});

  const toggleType = (type: string) => {
    setExpandedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sticky top-10 self-start shadow-sm">
        <h2 className="text-xl font-semibold mb-5 border-b border-zinc-300 dark:border-zinc-700 pb-2">
          Guide Categories
        </h2>
        <div className="space-y-3">
          {Object.entries(groupedPosts).map(([type, postsInType]) => {
            const isExpanded = expandedTypes.includes(type);
            const isFiltered = typeFilter === type;

            return (
              <div key={type}>
                <button
                  onClick={() => toggleType(type)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left text-sm font-medium transition-colors
                    ${
                      isFiltered
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  aria-expanded={isExpanded}
                  aria-controls={`group-${type}`}
                >
                  <span className="">{type}</span>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
                {isExpanded && (
                  <ul
                    id={`group-${type}`}
                    className="pl-4 mt-3 space-y-2 text-sm border-l border-zinc-200 dark:border-zinc-700"
                  >
                    {postsInType.map((post) => (
                      <li key={post.slug}>
                        <button
                          onClick={() => handleGuideSelection(post)}
                          className={`flex items-center w-full px-2 py-1 rounded-md text-gray-700 dark:text-gray-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                            selectedGuide?.slug === post.slug
                              ? "bg-blue-50 dark:bg-blue-900 font-semibold"
                              : ""
                          }`}
                        >
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={28}
                            height={28}
                            className="rounded-md object-cover"
                          />
                          <span className="ml-3">{post.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Content */}
      <section className="flex-1">
        <header className="mb-10 text-center max-w-3xl mx-auto">
          <div className="flex justify-center items-center space-x-5">
            <Image
              src={selectedGuide?.image || "/images/crystopia.png"}
              alt="Crystopia Logo"
              width={56}
              height={56}
              className="rounded-full w-14 h-14 object-cover"
            />
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              {selectedGuide
                ? selectedGuide.title
                : "Robit can't find this title."}
            </h1>
          </div>
          <p className="mt-5 text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto">
            {selectedGuide
              ? selectedGuide.description
              : "OoO, Robit can't find this description. Please select a guide from the sidebar."}
          </p>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto prose prose-blue dark:prose-invert prose-lg"
        >
          <Markdown
            options={{
              overrides: {
                GuideLink: {
                  component: GuideLink,
                },
                h1: {
                  component: "h1",
                  props: { className: "text-3xl font-bold mb-4" },
                },
                h2: {
                  component: "h2",
                  props: { className: "text-2xl font-semibold mb-3" },
                },
                h3: {
                  component: "h3",
                  props: { className: "text-xl font-medium mb-2" },
                },
                h4: {
                  component: "h4",
                  props: { className: "text-lg font-medium mb-2" },
                },
                h5: {
                  component: "h5",
                  props: { className: "text-base font-medium mb-2" },
                },
                h6: {
                  component: "h6",
                  props: { className: "text-sm font-medium mb-2" },
                },
                ul: {
                  props: { className: "list-disc pl-5 mb-4" },
                },
                ol: {
                  props: { className: "list-decimal pl-5 mb-4" },
                },
                li: {
                  props: { className: "mb-2" },
                },
                blockquote: {
                  component: "blockquote",
                  props: {
                    className:
                      "border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-4",
                  },
                },
                code: {
                  component: "code",
                  props: {
                    className:
                      "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 px-1 py-0.5 rounded",
                  },
                },
                pre: {
                  component: "pre",
                  props: {
                    className:
                      "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto",
                  },
                },
                table: {
                  props: {
                    className:
                      "min-w-full divide-y divide-gray-200 dark:divide-zinc-700",
                  },
                },
                th: {
                  props: {
                    className:
                      "px-6 py-3 bg-gray-50 dark:bg-zinc-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                  },
                },
                td: {
                  props: {
                    className:
                      "px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300",
                  },
                },
                strong: {
                  component: "strong",
                  props: { className: "font-semibold" },
                },
                em: {
                  component: "em",
                  props: {
                    className: "italic text-gray-600 dark:text-gray-400",
                  },
                },
                p: {
                  props: { className: "text-gray-700 dark:text-gray-300 mb-4" },
                },
                a: {
                  component: Link,
                  props: {
                    className:
                      "text-blue-600 dark:text-blue-400 hover:underline transition-colors",
                  },
                },
                img: {
                  component: "img",
                  props: {
                    className:
                      "max-w-full h-auto rounded-lg shadow-md mb-6 mx-auto",
                    loading: "lazy",
                  },
                },
              },
            }}
          >
            {selectedGuideContent ||
              "Please select a guide from the sidebar to view its content."}
          </Markdown>
        </motion.div>
      </section>
    </main>
  );
};

export default HomePage;
