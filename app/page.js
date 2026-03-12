"use client";
import { useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardTopBar from "../components/DashboardTopBar";
import Footer from "../components/Footer";

// Partner logos
const partners = [
  { name: "Loudoun County Public Schools", logo: "/lcps.png", alt: "Loudoun County Public Schools Logo" },
  { name: "S2Alliance", logo: "/s2alliance_inc_logo.jpeg", alt: "S2Alliance Logo" },
  { name: "Beaverbots", logo: "/beaverbots.png", alt: "Beaverbots Team Robots" },
];

// Icons for "what we help you build" grid (school tools)
const buildItems = [
  { label: "Grade calculators", icon: "chart" },
  { label: "Seating charts", icon: "users" },
  { label: "Yearbook formatting", icon: "document" },
  { label: "Classroom tools", icon: "building" },
  { label: "Study & productivity", icon: "code" },
  { label: "Custom school tools", icon: "globe" },
];

// Rotating hero endings: "Student-Built Tools for Our School to [phrase]"
const heroPhrases = [
  "support teaching",
  "save teachers time",
  "help students learn",
  "organize your classroom",
  "serve our community",
  "power learning",
];

const buildIcons = {
  globe: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  building: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 21h16.5M3.75 9h16.5m-16.5 6h16.5M2.25 6l9 3.75L20.25 6M2.25 21V6l9 3.75 9-3.75v15" /></svg>,
  users: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  chart: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  code: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  document: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
};

const TYPE_MS = 70;
const DELETE_MS = 45;
const HOLD_MS = 2200;

export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayLength, setDisplayLength] = useState(() => heroPhrases[0].length);
  const [phase, setPhase] = useState("holding");

  useLayoutEffect(() => {
    document.title = "Code4Community | Home";
  }, []);

  useEffect(() => {
    let intervalId = null;
    let holdTimeoutId = null;

    if (phase === "holding") {
      holdTimeoutId = setTimeout(() => setPhase("deleting"), HOLD_MS);
      return () => clearTimeout(holdTimeoutId);
    }

    if (phase === "deleting") {
      intervalId = setInterval(() => {
        setDisplayLength((len) => {
          if (len <= 1) {
            setPhase("typing");
            setPhraseIndex((i) => (i + 1) % heroPhrases.length);
            return 0;
          }
          return len - 1;
        });
      }, DELETE_MS);
      return () => clearInterval(intervalId);
    }

    if (phase === "typing") {
      intervalId = setInterval(() => {
        setDisplayLength((len) => {
          const full = heroPhrases[(phraseIndex + heroPhrases.length) % heroPhrases.length].length;
          if (len >= full) {
            setPhase("holding");
            return full;
          }
          return len + 1;
        });
      }, TYPE_MS);
      return () => clearInterval(intervalId);
    }
  }, [phase, phraseIndex]);

  const visibleText = heroPhrases[phraseIndex].slice(0, displayLength);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardTopBar title="Code4Community" showNavLinks={true} />

      {/* Split hero + right panel */}
      <div className="flex-1 flex flex-col lg:flex-row lg:min-h-[calc(100vh-4rem)]">
        {/* Left: Hero */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:py-16 lg:pl-12 xl:pl-24 max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-snug mb-6 overflow-visible">
            Student-Built Tools for Our School to{" "}
            <span className="inline-block pb-1.5 overflow-visible bg-gradient-to-r from-violet-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
              {visibleText}
            </span>
            <span className="inline-block w-0.5 h-8 md:h-10 ml-0.5 bg-foreground animate-pulse align-middle" aria-hidden />
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
            Code4Community is a student-led club at Broad Run High School that builds <strong>free tools and software</strong> for students and teachers—grade calculators, seating charts, yearbook formatting, and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Our Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-foreground font-medium rounded-lg hover:bg-foreground hover:text-background transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>

        {/* Right: What we help you build */}
        <div className="flex-1 bg-muted/30 border-l border-border flex flex-col justify-center p-6 lg:p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative max-w-md mx-auto w-full">
            <h2 className="text-lg font-semibold text-foreground mb-1">We build tools for</h2>
            <p className="text-sm text-muted-foreground mb-6">Students and teachers at Broad Run—free to use.</p>
            <div className="grid grid-cols-2 gap-3">
              {buildItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-background border border-border rounded-lg px-4 py-3 shadow-sm"
                >
                  <span className="flex-shrink-0 text-violet-500">{buildIcons[item.icon]}</span>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-6 text-center">
              Grade calculators, seating charts, yearbook tools, and more—built by the Code4Community club for our school.
            </p>
          </div>
        </div>
      </div>

      {/* Trusted By / Partners */}
      <section className="border-t border-border bg-background py-16 md:py-20 px-6">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground mb-10">
          Trusted partners
        </p>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center w-full aspect-[2/1] max-h-28 md:max-h-32"
            >
              <Image
                src={partner.logo}
                alt={partner.alt}
                width={280}
                height={140}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section className="border-t border-border bg-muted/20 py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Students and Teachers Need Practical Tools
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            From tracking grades to organizing seating to formatting yearbook captions.
          </p>
          <p className="text-foreground leading-relaxed mb-6">
            Many of these tools are hard to find, cost money, or don&apos;t fit how our school works. We wanted to build solutions that are free, easy to use, and made for Broad Run.
          </p>
          <p className="font-semibold text-foreground">
            Code4Community was created to do exactly that.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="border-t border-border bg-background py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Our student team at Broad Run High School designs and builds digital tools for students and teachers—free of charge.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-semibold text-foreground mb-2">Grade Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate grades, see what you need to reach a target, and understand how weighted grades work.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-semibold text-foreground mb-2">Seating Charts</h3>
              <p className="text-sm text-muted-foreground">
                Build classroom layouts, assign students to seats, and respect rules like who can&apos;t sit together.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-semibold text-foreground mb-2">Yearbook Tools</h3>
              <p className="text-sm text-muted-foreground">
                Format student names and captions for yearbook so everything is consistent and quick to produce.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-semibold text-foreground mb-2">More on the Way</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;re always adding new tools—practice activities, study aids, and whatever the school needs next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-muted/20 py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background font-bold text-lg mb-4">1</span>
              <h3 className="font-semibold text-foreground mb-2">Browse Our Services</h3>
              <p className="text-sm text-muted-foreground">
                Go to Services and pick the tool you need—grade calculator, seating chart, yearbook formatting, and more.
              </p>
            </div>
            <div className="relative">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background font-bold text-lg mb-4">2</span>
              <h3 className="font-semibold text-foreground mb-2">Use the Tool</h3>
              <p className="text-sm text-muted-foreground">
                Everything is free and runs in your browser. No sign-up required for most tools.
              </p>
            </div>
            <div className="relative">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background font-bold text-lg mb-4">3</span>
              <h3 className="font-semibold text-foreground mb-2">Save or Share</h3>
              <p className="text-sm text-muted-foreground">
                Many tools let you save your work locally or print so you can use it in class or at home.
              </p>
            </div>
            <div className="relative">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background font-bold text-lg mb-4">4</span>
              <h3 className="font-semibold text-foreground mb-2">Give Us Feedback</h3>
              <p className="text-sm text-muted-foreground">
                Have an idea for a new tool or something to improve? Contact us—we&apos;re the Code4Community club at Broad Run.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Some of Our Work */}
      <section className="border-t border-border bg-background py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            Our Tools
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
            Free tools built by the Code4Community club for students and teachers at Broad Run High School.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Grade Calculator", desc: "Calculate grades and see what you need to reach your target.", href: "/grade-calculator" },
              { title: "Seating Chart", desc: "Build classroom layouts and assign students with rules like who can't sit together.", href: "/seating-chart" },
              { title: "Yearbook Formatting", desc: "Format names and captions for yearbook quickly and consistently.", href: "/yearbook-formatting" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-border bg-background overflow-hidden shadow-sm transition-shadow hover:shadow-md block"
              >
                <div className="aspect-video bg-muted/50 border-b border-border flex items-center justify-center">
                  <span className="text-4xl text-muted-foreground group-hover:text-violet-500 transition-colors">→</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
