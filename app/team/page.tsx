"use client";
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
      <div className="flex flex-col items-center mt-12 mb-6">
        <Image
          className="w-16 h-16 rounded-full"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          width={64}
          height={64}
        />
        <h1 className="text-4xl md:text-5xl font-bold mt-4 text-white">
          Meet the Crystopia Team
        </h1>
        <p className="text-gray-400 mt-2 max-w-xl text-center">
          The people behind the magic – developers, moderators, creatives and
          more.
        </p>
      </div>

      {/* <p className="text-red-500 bg-red-500 text-red-400 bg-red-400 bg-pink-400 text-pink-400 bg-blue-400 text-blue-400"></p> */}
      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] ring-1 ring-[#2c2c2c] hover:ring-[#78D5F5]/50 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:scale-[1.03]"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full shadow-md mb-4 ring-2 ring-[#2a2a2a]"
                />
                <h3 className={`text-xl font-semibold ${member.textcolor}`}>
                  {member.name}
                </h3>
                <h4
                  className={`${member.bgColor} text-white px-3 py-1 rounded-full text-sm mt-2 font-semibold text-center shadow-md`}
                >
                  {member.title}
                </h4>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <section>
          <div className="mt-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Interested in joining our team?{" "}
              <Link
                href="https://cloud.xyzjesper.dev/apps/forms/s/pQK35jfXFDeo43E9rX6DdfZY"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Apply here
              </Link>{" "}
              or hop into our{" "}
              <Link
                href="https://crystopia.link/discord"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Discord
              </Link>{" "}
              to learn more.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default TeamCard;
