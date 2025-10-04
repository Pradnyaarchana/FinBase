import React from "react";
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, testimonialsData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-30">
      {/* <Button variant="destructive" > */}
      <HeroSection />
      {/* </Button> */}

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need to manage your finances </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className="p-6 m-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="space-y-4 pt-4">
                  <div className=""> {feature.icon}</div> 
                  <h3 className="text-xl font-semibold">{feature.title} </h3>
                  <p className="text-gray-600">{feature.description} </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-5 bg-gray-50 rounded-2xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            How it works?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-full 
                flex items-center justify-center mx-auto mb-16">
                  {step.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title} </h3>
                <p className="text-gray-600">{step.description} </p>
              </div>
            ))}
          </div>
        </div>
      </section>


        <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What other users say </h2>
          <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-6 ">
                <CardContent className=" pt-4">

                  <div className="flex items-center mb-4"> 
                      <Image src={testimonial.image}
                      alt={testimonial.name} 
                      width ={40} height={40} 
                      className="rounded-full "
                      />

                      <div className="ml-4"> 
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-gray-400"> {testimonial.role}</div>  
                      </div>
                  </div> 
                <div className="text-gray-700"> {testimonial.quote}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-sky-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let's get started with FinWise 
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are 
            already managing their finances with ease and intelligence.
          </p>

          <Link href="/dashboard">
            <Button size="lg" className="px-8 bg-sky-900 text-white hover:bg-blue-50 
            hover:text-sky-600 transition-colors duration-300 
            animate-out" >
              Get Started
            </Button>
          </Link>
             
        </div>
      </section>
    </div>
  );
}
