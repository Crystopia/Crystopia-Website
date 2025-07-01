import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
  textcolor: string;
}

const TeamCard: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const url =
          "https://raw.githubusercontent.com/Crystopia/Content/refs/heads/main/website/teamlist.json";

        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data: TeamMember[] = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <>
      <Head>
        <title>Team – Crystopia.net</title>
        <meta
          name="description"
          content="Unique Minecraft server with a focus on community and creativity. Join us today!"
        />
      </Head>

      {/* Header */}
      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6 justify-center">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
          width={48}
          height={48}
        />
        <h1 className="text-5xl">Crystopia.net | Team</h1>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="rounded-full shadow-md mb-4"
                />
                <h3 className={`text-2xl font-semibold ${member.textcolor}`}>
                  {member.name}
                </h3>
                <span
                  className={`${member.bgColor} text-white px-3 py-1 rounded-full text-sm mt-2`}
                >
                  {member.title}
                </span>
                <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <section>
          <div className="mt-10 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Interested in joining our team?{" "}
              <Link
                href="https://cloud.xyzjesper.dev/apps/forms/s/pQK35jfXFDeo43E9rX6DdfZY"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Click here to fill out the application form
              </Link>{" "}
              and apply! Or join our{" "}
              <Link
                href="https://crystopia.link/discord"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Discord
              </Link>{" "}
              and ask in xyzjesper for more information.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default TeamCard;
