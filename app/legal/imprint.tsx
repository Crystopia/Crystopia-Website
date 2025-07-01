import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

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
        <h1 className="text-5xl">Crystopia.net | Imprint</h1>
      </div>
      <div className="max-w-3xl mx-auto mt-10 px-4 text-white">
        <h2 className="text-xl font-semibold mb-2">
          Imprint According to § 5 DDG
        </h2>
        <p>
          Jesper Richert
          <br />
          Kiebitzreihe 3<br />
          25813 Husum
          <br />
          Deutschland
        </p>

        <div className="mt-6">
          <h3 className="font-semibold">Contact E-Mail:</h3>
          <Link
            href="mailto:support@crystopia.net"
            className="text-blue-400 hover:underline"
          >
            support@crystopia.net
          </Link>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">
            Editorial responsibility represented by:
          </h3>
          <p>Jesper Richert</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>

          <p className="mt-4">
            <strong>§ 1 Warning about content</strong>
            <br />
            The free and freely accessible content of this website was created
            with the greatest possible care. However, the provider does not
            guarantee correctness or topicality. Contributions identified by
            name reflect the opinion of the respective author. Accessing free
            content does not establish any contractual relationship.
          </p>

          <p className="mt-4">
            <strong>§ 2 External Links</strong>
            <br />
            This site links to external websites. The respective operators are
            responsible for them. At the time of linking, no legal violations
            were evident. The provider has no influence over the current or
            future content of linked sites. Links do not imply adoption of the
            linked content. If legal violations become known, such links will be
            removed.
          </p>

          <p className="mt-4">
            <strong>§ 3 Copyright</strong>
            <br />
            All content on this site is protected under German copyright law.
            Unauthorized reproduction or use is prohibited. Downloads and copies
            are only permitted for private, non-commercial use. Displaying this
            website in external frames requires written permission.
          </p>

          <p className="mt-4">
            <strong>§ 4 Special Terms of Use</strong>
            <br />
            Deviations from the above may be explicitly noted in specific cases.
            In such cases, those special terms apply. The European Commission
            provides a platform for online dispute resolution:
            <Link
              href="http://ec.europa.eu/odr"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline ml-1"
            >
              http://ec.europa.eu/odr
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
