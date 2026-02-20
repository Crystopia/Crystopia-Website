"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PlayPage() {
  const [showTitle, setShowTitle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    setShowTitle(true);
    const timer = setTimeout(() => setShowParagraph(true), 800); // Nach 0.8s Paragraph zeigen
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("crystopia.net").then(() => {
      toast("Copied IP to clipboard", { type: "success" });
    });
  };

  const handleClose = () => {
    window.location.href = "/";
  };

  const imageSlider = [
    "https://cdn.xyzhub.link/u/eyp53G.png",
    "https://cdn.xyzhub.link/u/YFwnw2.png",
    "https://cdn.xyzhub.link/u/zNCOBY.png",
  ];

  return (
    <>
      <div className="blur-2xl relative min-h-screen bg-zinc-800 text-white"></div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className=" bg-zinc-900 rounded-2xl shadow-xl p-6 max-w-5xl w-full flex gap-6 relative">
          <button onClick={handleClose}>
            <X className="absolute top-4 right-4 rounded-full w-8 h-8 text-lg font-bold cursor-pointer"></X>
          </button>

          <div className="flex-1 flex flex-col p-6 max-w-7xl mx-auto">
            <Carousel
              opts={{ axis: "x", align: "start", loop: true }}
              className="w-full max-w-xs mx-auto"
            >
              <CarouselContent>
                {imageSlider.map((image, index) => (
                  <CarouselItem key={index} className="w-full">
                    <Card className="w-full h-96 relative overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        width={800}
                        height={600}
                        className="object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-105 mx-auto"
                      />
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">How to connect</h2>
            <p>
              Join us with your Minecraft Java Edition, completely free-to-play!
            </p>

            <button
              onClick={handleCopy}
              className="bg-blue-400 hover:bg-blue-900 text-black font-bold py-2 px-4 rounded-md w-fit cursor-pointer"
            >
              COPY ADDRESS
            </button>

            <div className="bg-zinc-700 p-3 rounded-lg flex items-start">
              <span className="bg-zinc-900 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3">
                1
              </span>
              Start your Minecraft Java Edition with the latest version
            </div>

            <div className="bg-zinc-700 p-3 rounded-lg flex items-start">
              <span className="bg-zinc-900 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3">
                2
              </span>
              Select Multiplayer and add a new server.
            </div>

            <div className="bg-zinc-700 p-3 rounded-lg flex items-start">
              <span className="bg-zinc-900 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3">
                3
              </span>
              Enter the server address:{" "}
              <span className="text-blue-400 font-bold ml-2">
                crystopia.net
              </span>
            </div>

            <div className="bg-zinc-700 p-3 rounded-lg flex items-start">
              <span className="bg-zinc-900 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3">
                4
              </span>
              Click Join Server and enjoy your time in Crystopia!
            </div>

            <div className="font-bold mt-2">
              Happy Playtime and welcome to the Crystopia community!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
