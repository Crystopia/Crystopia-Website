import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useEffect, useMemo } from 'react';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';

interface Post {
  title: string;
  slug: string;
  image: string;
  de: string;
  en: string;
  date: string;
  description: string;
}

interface PostPageProps {
  post: Post;
  content: string;
}

const PostPage: NextPage<PostPageProps> = ({ post, content }) => {
  const { title, image, description, date, slug } = post;

  const BlogPost = useMemo(() => getMDXComponent(content), [content]);

  useEffect(() => {
    const currentLang = navigator.language === 'de-DE' ? 'de' : 'en';
    if (slug + '.' + currentLang !== location.href.split('/')[4]) {
      window.location.href = `/blog/${slug}.${currentLang}`;
    }
  }, [slug]);

  return (
    <>
      <Head>
        <title>{title} - Crystopia</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:image" content={image} />
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={date} />
        <meta property="article:author" content="Crystopia" />
        <meta property="article:section" content="Minecraft" />
        <meta property="article:tag" content="Minecraft" />
        <meta property="article:tag" content="Server" />
        <meta property="article:tag" content="Crystopia" />
        <meta property="article:tag" content="Blog" />
      </Head>

      <motion.div
        className="max-w-3xl mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <main>
          <div className="max-w-4xl mx-auto p-6 md:p-12">
            <div className="relative w-full h-52 overflow-hidden rounded-t-2xl">
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute bottom-6 left-6 text-zinc-800 z-10">
                <p className="text-3xl md:text-5xl font-extrabold drop-shadow-lg text-zinc-900">
                  {title}
                </p>
                <time
                  dateTime={date}
                  className="block mt-1 text-sm md:text-base opacity-80 drop-shadow"
                >
                  {new Date(date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>

            <BlogPost />
          </div>
        </main>
      </motion.div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsResponse = await fetch(
    'https://raw.githubusercontent.com/Crystopia/Content/main/website/blog/bloglist.json'
  );
  const posts: Post[] = await postsResponse.json();

  const paths = posts.flatMap((post) => [
    { params: { slug: `${post.slug}.en` } },
    { params: { slug: `${post.slug}.de` } },
    { params: { slug: `${post.slug}` } },
  ]);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug || '';

  const language = slug.endsWith('.de') ? 'de' : 'en';
  const cleanSlug = slug.replace(`.${language}`, '');

  const postResponse = await fetch(
    'https://raw.githubusercontent.com/Crystopia/Content/main/website/blog/bloglist.json'
  );
  const posts: Post[] = await postResponse.json();
  const post = posts.find((p) => p.slug === cleanSlug) || {
    title: 'Not found',
    slug,
    image: '',
    de: '',
    en: '',
    date: '',
    description: '',
  };

  const filePath = language === 'de' ? post.de : post.en;

  let mdxContent = '';
  try {
    const response = await fetch(filePath);
    mdxContent = await response.text();
  } catch (error) {
    console.error('Error fetching MDX content:', error);
  }

  const bundleResult = await bundleMDX({ source: mdxContent });
  const content = bundleResult.code;

  return {
    props: {
      post,
      content,
    },
  };
};

export default PostPage;
