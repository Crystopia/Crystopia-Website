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
        <h1 className="text-5xl">Crystopia.net | Terms</h1>
      </div>
      <main className="max-w-3xl mx-auto mt-10 px-4 text-white space-y-6">
        <p>
          You agree to be bound by our website rules and any laws which may
          apply to this website and your participation.
        </p>
        <p>
          The website administration have the right to terminate your account at
          any time, delete any content you may have posted, and your IP address
          and any data you input to the website is recorded to assist the site
          staff with their moderation duties.
        </p>
        <p>
          The site administration have the right to change these terms and
          conditions, and any site rules, at any point without warning. Whilst
          you may be informed of any changes, it is your responsibility to check
          these terms and the rules at any point.
        </p>

        <section>
          <h2 className=" text-3xl font-semibold mb-4">EXTRA AND EXPANSION</h2>
        </section>

        <section>
          <h2 className=" text-3xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By using our services, you agree to the following terms and
            conditions.
          </p>
        </section>

        <section>
          <h2 className=" text-3xl font-semibold mb-4">
            2. Privacy and Data Usage
          </h2>
          <p>
            We collect and store certain information, including IP addresses and
            usage analytics, in our database for improving our services and
            ensuring proper functioning.
          </p>
        </section>

        <section>
          <h2 className=" text-3xl font-semibold mb-4">
            3. Minecraft Server Rules
          </h2>
          <p>
            You agree to follow the rules and guidelines set forth for using our
            Minecraft server. Any violations may result in account suspension or
            termination.
          </p>
        </section>

        <section>
          <h2 className=" text-3xl font-semibold mb-4">
            4. Intellectual Property
          </h2>
          <p>
            All content provided by us, including but not limited to text,
            graphics, logos, and software, is the property of [Your Company
            Name] and protected by copyright laws.
          </p>
        </section>

        <section>
          <h2 className=" text-3xl font-semibold mb-4">
            5. Disclaimer of Liability
          </h2>
          <p>
            We are not responsible for any damages, losses, or liabilities
            arising from your use of our services.
          </p>
        </section>

        <section>
          <h2 className=" text-3xl font-semibold mb-4">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of our services constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className=" text-3xl font-semibold mb-4">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of [Your Jurisdiction]. Any
            disputes shall be resolved in the appropriate courts of [Your
            Jurisdiction].
          </p>
        </section>

        <section>
          <h2 className=" text-3xl font-semibold mb-4">8. Age and User</h2>
          <p>Only members over 16 are allowed to create an account.</p>
        </section>

        <p>
          By using our services, you acknowledge that you have read, understood,
          and agreed to these terms.
        </p>
      </main>
      <ul className="flex mt-6 space-x-8 md:space-x-9 lg:space-x-10 justify-center">
        {[].map((href) => (
          <li key={href}>
            <Link
              className="block h-8 text-black lg:h-9 dark:text-white"
              href={href}
              target="_blank"
              rel="noreferrer"
              legacyBehavior />
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
