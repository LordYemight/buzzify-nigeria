'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  TrendingUp, 
  Camera, 
  Home, 
  Globe, 
  Video, 
  Clock, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Menu, 
  X, 
  Star, 
  Quote, 
  ImageOff,
  Zap,
  Sparkles
} from 'lucide-react';

/**
 * UTILITIES & HOOKS
 */

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 80) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplay(prev => prev + text.charAt(i));
        i++;
      } else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

/**
 * COMPONENTS
 */

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

function SafeImage({ src, alt, fill, width, height, className, priority }: SafeImageProps) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary to-secondary/30 ${className}`}>
        <ImageOff size={32} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

/**
 * DATA
 */

const BRAND = {
  name: "Buzzify Nigeria",
  tagline: "Amplify Your Buzz.",
  description: "We transform brands into digital sensations. Buzzify Nigeria delivers high-impact creative strategies, cutting-edge social media management, and cinematic video content shot exclusively on the latest iPhone technology.",
  industry: "services",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1769174869452-4f51828222bc?auto=format&fit=crop&q=80",
  about: "https://images.unsplash.com/photo-1766503206581-6824e98f49de?auto=format&fit=crop&q=80",
  studio: "https://images.unsplash.com/photo-1632419200907-fdfaf83f69f4?auto=format&fit=crop&q=80",
  products: [
    "https://images.unsplash.com/photo-1631644048778-1d0b3303641e?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1761839922047-fc58829aab61?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591167844789-bbbd26021899?auto=format&fit=crop&q=80"
  ]
};

const FEATURES = [
  { title: "5-Star Social Strategy", description: "Data-driven planning to ensure every post drives engagement and measurable growth.", icon: TrendingUp },
  { title: "iPhone Native Quality", description: "Leveraging cutting-edge mobile technology for authentic, high-resolution video content that cuts through the noise.", icon: Camera },
  { title: "Abuja Studio Access", description: "Exclusive access to our curated studio space for content shoots when you sign up for premium packages.", icon: Home }
];

const PRODUCTS = [
  { 
    name: "Monthly Hype Management", 
    price: "₦250,000", 
    desc: "Full-spectrum social media strategy, daily posting, community engagement, and performance reporting.",
    image: IMAGES.products[0]
  },
  { 
    name: "Cinematic iPhone Reel Package", 
    price: "₦150,000", 
    desc: "Production and editing of three high-quality, trending video reels optimized for Instagram and TikTok.",
    image: IMAGES.products[1]
  },
  { 
    name: "Brand Identity Overhaul", 
    price: "₦350,000", 
    desc: "Complete logo design refresh, color palette finalization, and brand guidelines documentation.",
    image: IMAGES.products[2]
  }
];

const TESTIMONIALS = [
  { name: "Ayo M.", role: "CEO, TechCo", text: "Our engagement shot up 300% in the first month. The neon aesthetic perfectly matches our new brand direction!" },
  { name: "Femi K.", role: "Creative Director", text: "The wedding highlight reel was breathtaking. They captured the mood perfectly using just the iPhone." }
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const typedHeadline = useTypewriter(BRAND.tagline);

  // Scroll visibility for sections
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const studioReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [menuOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
  };

  return (
    <main className="bg-primary text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="font-heading text-xl font-black text-white tracking-tighter hover:text-accent transition-colors">
            {BRAND.name.toUpperCase()}
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-accent transition">Services</a>
            <a href="#products" className="text-sm font-medium hover:text-accent transition">Portfolio</a>
            <a href="#studio" className="text-sm font-medium hover:text-accent transition">Studio</a>
            <a href="#contact" className="bg-accent text-white px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition flex items-center gap-2">
              Secure Your Spot <ArrowRight size={16} />
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-8 flex flex-col animate-slideIn">
            <div className="flex justify-between items-center mb-12">
              <span className="font-heading font-black text-lg">{BRAND.name}</span>
              <button onClick={() => setMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex flex-col gap-6">
              {['Services', 'Portfolio', 'Studio', 'Pricing', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '_')}`} 
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-heading font-bold hover:text-accent transition"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <a href="#contact" onClick={() => setMenuOpen(false)} className="w-full block bg-accent text-center py-4 rounded-xl font-black">
                BOOK NOW
              </a>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION - Pattern HR-D (Typewriter) */}
      <section 
        id="home" 
        ref={heroReveal.ref}
        className="min-h-screen flex items-center justify-center bg-black px-6 overflow-hidden relative pt-20"
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        
        <div className="text-center relative z-10 max-w-5xl">
          <h1 className="font-heading text-[12vw] md:text-[7.5vw] font-black text-white leading-[0.9] tracking-tighter">
            {typedHeadline}<span className="text-accent animate-pulse">_</span>
          </h1>
          <p className="text-white/50 mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {BRAND.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <a href="#contact" className="w-full sm:w-auto bg-accent text-white px-10 py-5 font-black text-lg border-2 border-accent shadow-[4px_4px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#fff] transition-all">
              SECURE YOUR SPOT
            </a>
            <a href="#features" className="w-full sm:w-auto border-2 border-white/20 text-white px-10 py-5 font-black text-lg hover:bg-white hover:text-black transition-all">
              SEE SERVICES
            </a>
          </div>
        </div>
      </section>

      {/* DIVIDER - Icon + Keyword Grid (A6d) */}
      <div className="py-16 border-y border-white/5 bg-primary">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-6 px-6">
          {['Cinematic', 'Viral', 'Strategy', 'Premium', 'Abuja Native'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-white/40 text-sm font-bold uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-accent" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES SECTION - Grid-3 */}
      <section 
        id="features" 
        ref={featuresReveal.ref}
        className={`py-32 px-6 transition-all duration-1000 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-black mb-6">Our Service Stack</h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">From strategy to execution, we handle every pixel of your online presence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feat, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <feat.icon size={32} className="text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">{feat.title}</h3>
                <p className="text-white/60 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / DESTINATION SECTION */}
      <section 
        ref={aboutReveal.ref}
        className={`py-32 bg-black/40 border-y border-white/5 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden group">
            <SafeImage src={IMAGES.about} alt="Destination shoot" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          </div>
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-8 leading-tight">Destination Feature: Shoot Anywhere</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              The world is our studio. We specialize in travelling to capture your key moments, whether it's a destination wedding in Bali or a product launch in Lagos. Quality knows no borders.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 rounded-2xl">
                <Globe className="text-accent mb-4" size={24} />
                <p className="text-3xl font-black mb-1">8</p>
                <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Countries Covered</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl">
                <Video className="text-accent mb-4" size={24} />
                <p className="text-3xl font-black mb-1">150+</p>
                <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Shoots Annually</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION - grid-3 */}
      <section 
        id="products" 
        ref={productsReveal.ref}
        className={`py-32 px-6 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-black mb-6 tracking-tight">Management & Production Rates</h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">Transparent pricing for maximum impact. Choose the package that fuels your growth.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((prod, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/10 hover:border-accent/50 transition-all duration-500 bg-white/5">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SafeImage src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-accent text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
                      Premium
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-4">{prod.name}</h3>
                  <p className="text-white/60 mb-8 line-clamp-3 text-sm leading-relaxed">{prod.desc}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-3xl font-black text-white">{prod.price}</span>
                    <a href="#contact" className="text-accent hover:text-white transition-colors flex items-center gap-2 font-bold text-sm uppercase tracking-widest">
                      Inquire <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO SPOTLIGHT - pattern C2 */}
      <section 
        id="studio" 
        ref={studioReveal.ref}
        className={`py-32 bg-secondary/10 transition-all duration-1000 ${studioReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-heading text-4xl md:text-5xl font-black mb-8">The Studio Spotlight</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Peek inside the Buzzify House—our curated physical space designed for premium content creation, branding workshops, and creative collaboration.
              </p>
              <ul className="space-y-4 mb-10">
                {['High-end lighting rigs', 'Minimalist set designs', 'Live monitoring stations', 'Prop library access'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                    <Zap size={18} className="text-accent" /> {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black hover:bg-accent hover:text-white transition-all">
                BOOK A TOUR <ArrowRight size={20} />
              </a>
            </div>
            <div className="order-1 md:order-2 relative aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src={IMAGES.studio} alt="Buzzify Studio" fill className="object-cover" />
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section 
        ref={testimonialsReveal.ref}
        className={`py-32 px-6 transition-all duration-1000 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-black mb-6">Verified Client Success</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/5 p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
                <Quote size={80} className="absolute -top-4 -right-4 text-white/5 group-hover:text-accent/10 transition-colors" />
                <div className="flex text-accent mb-6 gap-1">
                  {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" size={16} />)}
                </div>
                <p className="text-white/90 text-xl leading-relaxed italic mb-8 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-white/40 text-sm uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING GRID - Pattern C2 (Management Focus) */}
      <section 
        id="pricing_grid"
        className="py-32 bg-black/60"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl md:text-6xl font-black mb-6">Management Packages</h2>
          <p className="text-white/50 text-xl mb-16">Choose the plan that fits your ambition.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-accent transition-all">
              <h3 className="text-2xl font-black mb-2">Growth Plan</h3>
              <p className="text-accent font-bold text-lg mb-6">₦250k / Month</p>
              <ul className="space-y-4 text-white/60 mb-8">
                <li>10 Posts Per Month</li>
                <li>Cinematic iPhone Editing</li>
                <li>Community Management</li>
                <li>Monthly Analytics Report</li>
              </ul>
              <a href="#contact" className="block w-full text-center bg-white text-black py-4 rounded-xl font-bold hover:bg-accent hover:text-white transition">SELECT PLAN</a>
            </div>
            <div className="p-10 rounded-3xl bg-accent text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white text-accent px-3 py-1 rounded-full text-[10px] font-black uppercase">Most Popular</div>
              <h3 className="text-2xl font-black mb-2">Empire Plan</h3>
              <p className="text-white font-bold text-lg mb-6">₦500k / Month</p>
              <ul className="space-y-4 text-white/90 mb-8 font-medium">
                <li>Daily High-Impact Posts</li>
                <li>2 Reels per Week</li>
                <li>Direct Ad Management</li>
                <li>Dedicated Creative Director</li>
              </ul>
              <a href="#contact" className="block w-full text-center bg-black text-white py-4 rounded-xl font-bold hover:bg-white hover:text-black transition">SELECT PLAN</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - Pattern C1 */}
      <section 
        id="contact" 
        ref={contactReveal.ref}
        className={`py-32 px-6 transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-none">Let's Start Creating</h2>
            <p className="text-white/50 text-xl mb-12">Ready to amplify your buzz? Fill out the form and our team will get back to you within 24 hours.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-accent">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Email Us</p>
                  <p className="text-xl font-bold">hello@buzzify.ng</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-accent">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Call Us</p>
                  <p className="text-xl font-bold">+234 808 164 7138</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Studio Location</p>
                  <p className="text-xl font-bold">Plot 45, Garki II, Abuja</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-scaleIn py-20">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-8">
                  <Sparkles size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-black mb-4">Message Sent!</h3>
                <p className="text-white/60">We'll reach out to you within 24 hours to discuss your project.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-accent font-bold underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-3">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-3">Phone Number</label>
                    <input required type="tel" placeholder="+234..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-3">Email Address</label>
                  <input required type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-3">Service Interest</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition">
                    <option className="bg-primary">Monthly Hype Management</option>
                    <option className="bg-primary">Cinematic iPhone Reels</option>
                    <option className="bg-primary">Brand Identity Overhaul</option>
                    <option className="bg-primary">Other Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-3">Project Details</label>
                  <textarea rows={4} placeholder="Tell us about your brand..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition resize-none" />
                </div>
                <button type="submit" className="w-full bg-accent text-white py-5 rounded-xl font-black text-lg hover:brightness-110 transition shadow-lg shadow-accent/20">
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-2xl font-black tracking-tighter mb-2">{BRAND.name.toUpperCase()}</h2>
            <p className="text-white/40 text-sm max-w-xs">Quality Wey Go Loud. Cinematic strategies for the modern digital landscape.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-6">
              <a href="https://instagram.com/buzzify.ng" target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://api.whatsapp.com/send?phone=2348081647138" target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-all">
                <Phone size={20} />
              </a>
              <a href="mailto:hello@buzzify.ng" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

/**
 * MANDATORY CSS HOOKS FOR globals.css
 * (Included above in the file block but repeated for reference)
 * .animate-marquee { animation: marquee 25s linear infinite; }
 * .animate-float { animation: float 6s ease-in-out infinite; }
 * .animate-glow { animation: pulse-glow 2s ease-in-out infinite; }
 */