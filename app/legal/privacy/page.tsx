import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <>
      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6 justify-center">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
          width={48}
          height={48}
        />
        <h1 className="text-5xl">Crystopia.net | Privacy</h1>
      </div>
      <div className="max-w-3xl mx-auto mt-10 px-4 text-white">
        <p>
          The following privacy policy outlines how your data is used on our
          website.
        </p>

        <section className="mt-8">
          <h2 className=" text-3xl font-semibold mb-4">Data</h2>
          <p>
            Basic non-identifiable information about your user on the website is
            collected; the majority of which is provided during registration,
            such as email addresses and usernames.
          </p>
          <p className="mt-4">
            In addition to this, IP addresses for registered users are stored
            within the system to aid with moderation duties. This includes spam
            prevention, and detecting alternative accounts.
          </p>
          <p className="mt-4">
            Accounts can be deleted by a site administrator upon request, which
            will remove all data relating to your user from our system.
          </p>
        </section>

        <section className="mt-8">
          <h2 className=" text-3xl font-semibold mb-4">Cookies</h2>
          <p>
            Cookies are used to store small pieces of non-identifiable
            information with your consent. In order to consent to the use of
            cookies, you must either close the cookie notice (as explained
            within the notice) or register on our website.
          </p>
          <p className="mt-4">
            Data stored by cookies include any recently viewed topic IDs, along
            with a unique, unidentifiable hash upon logging in and selecting
            &quot;Remember Me&quot; to automatically log you in next time you
            visit.
          </p>
        </section>
      </div>
      <ul className="flex mt-6 space-x-8 md:space-x-9 lg:space-x-10 justify-center">
        {[].map(({ href }) => (
          <li key={href}>
            <Link
              className="block h-8 text-black lg:h-9 dark:text-white"
              href={href}
              target="_blank"
              rel="noreferrer"
              legacyBehavior></Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
