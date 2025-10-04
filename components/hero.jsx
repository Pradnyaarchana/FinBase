"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: true, margin: "-100px" });

  return (
    <div className="pb-8 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-[90px] pb-6 gradient-title">
          Manage your finances
          <br />
          with Intelligence
        </h1>

        <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
          FinWise is an AI-powered personal finance app that helps you track your expenses, set budgets, and achieve your financial goals.
        </p>

        <div className="flex justify-center items-center gap-4 mb-4">
          <Link href="/dashboard">
            <button size='lg' className="px-8">
              Get Started
            </button>
          </Link>
        </div>

        <motion.div
          ref={imageRef}
          initial={{ y: 100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
          className="hero-image-container"
        >
          <Image
            src="/landing.jpg"
            width={800}
            height={400}
            alt="image"
            priority
            className="rounded-lg shadow-2xl border mx-auto hero-image"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
