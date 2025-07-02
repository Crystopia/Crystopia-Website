import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const ErrorPage: NextPage = () => (
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
      <h1>Crystopia.net | 404</h1>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div className="text-center">
      <div>
        <p>
          The page you’re looking for doesn’t exist. Return to the{" "}
          <Link href="/">homepage</Link>.
        </p>
      </div>
    </div>
  </>
);

export default ErrorPage;
