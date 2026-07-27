import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Clock, ShieldCheck, Heart, ChevronRight, Menu, X, Star, Quote, CheckCircle2, User, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

import { BookingModal } from "@/components/BookingModal";

// --- Helper Components for Premium Animations ---

const RevealText = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block origin-bottom-left"
      initial={{ y: "120%", rotate: 3, opacity: 0 }}
      whileInView={{ y: 0, rotate: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.span>
  </span>
);

const CurtainImage = ({ src, alt, className = "", imgClassName = "" }: { src: string, alt: string, className?: string, imgClassName?: string }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <motion.div 
      className="absolute inset-0 bg-background z-10 origin-bottom"
      initial={{ scaleY: 1 }}
      whileInView={{ scaleY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
    />
    <motion.img 
      initial={{ scale: 1.15 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      src={src} 
      alt={alt} 
      className={`w-full h-full object-cover ${imgClassName}`} 
    />
  </div>
);

const LuxuryButton = ({ children, className = "", variant = "primary" }: { children: React.ReactNode, className?: string, variant?: "primary" | "outline" | "ghost" | "dark" }) => {
  const base = "group relative transition-all duration-700 h-14 px-8 text-sm uppercase tracking-widest overflow-hidden font-medium flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-foreground hover:text-background",
    outline: "border border-foreground/20 text-foreground hover:bg-foreground hover:text-background hover:border-foreground",
    ghost: "border-b border-foreground/20 hover:border-primary pb-1 h-auto px-0",
    dark: "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
  };
  
  const isGhost = variant === 'ghost';
  
  return (
    <button className={`${base} ${variants[variant]} ${className}`}>
      {!isGhost && (
         <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[30deg] group-hover:animate-sweep pointer-events-none z-0"></span>
      )}
      <span className="relative z-10 flex items-center justify-center gap-2 w-full h-full">
        {children}
      </span>
    </button>
  );
};

// --- Main Page ---

const Index = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1500], [0, 400]);
  const rotate1 = useTransform(scrollY, [0, 1500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Booking State
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTreatment, setSelectedTreatment] = useState<string>("consultation");
  const [selectedDentist, setSelectedDentist] = useState<string>("dr-hayes");
  const [selectedTime, setSelectedTime] = useState<string>("09:00 AM");
  const [isBooked, setIsBooked] = useState(false);

  const treatments = [
    { id: "consultation", name: "Initial Consultation" },
    { id: "veneers", name: "Porcelain Veneers" },
    { id: "implants", name: "Dental Implants" },
    { id: "whitening", name: "Signature Whitening" }
  ];

  const dentists = [
    { id: "dr-hayes", name: "Dr. Julian Hayes" },
    { id: "dr-chen", name: "Dr. Elena Chen" }
  ];

  const timeSlots = ["09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30 selection:text-primary-foreground">
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground cursor-pointer"
            >
              <Sparkles size={16} />
            </motion.div>
            <span className="font-serif text-2xl font-medium tracking-tight">Aura Dental</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {["Services", "Philosophy", "Patient Stories", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium tracking-wide text-foreground/80 hover:text-primary transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex">
            <a href="#booking-section">
              <LuxuryButton variant="dark">
                Book Appointment
              </LuxuryButton>
            </a>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(true)}>
            <Menu />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-background flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-2xl">Aura Dental</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-3xl font-serif">
              {["Services", "Philosophy", "Patient Stories", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto pb-8" onClick={() => { setMobileMenuOpen(false); }}>
              <a href="#booking-section">
                <LuxuryButton variant="dark" className="w-full h-16 text-lg">
                  Book Appointment
                </LuxuryButton>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Floating Parallax Surprise */}
        <motion.div 
          style={{ y: y3, rotate: rotate1 }} 
          className="absolute -right-[15%] top-[10%] text-primary/10 -z-10 pointer-events-none"
        >
          <Sparkles size={800} strokeWidth={0.2} />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-primary">Esthetic Dentistry</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] mb-8 text-balance">
                <RevealText delay={0.1}>Artistry in</RevealText>
                <RevealText delay={0.3}><span className="italic text-foreground/80">Dentistry.</span></RevealText>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-lg leading-relaxed"
              >
                Experience world-class dental care in an environment designed for your absolute comfort and aesthetic excellence.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="#booking-section">
                  <LuxuryButton variant="primary">
                    Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </LuxuryButton>
                </a>
                <LuxuryButton variant="outline">
                  Our Services
                </LuxuryButton>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative h-[60vh] lg:h-[80vh] w-full"
            >
              <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                <div className="w-full h-full bg-primary/10 absolute -top-8 -right-8 -z-10"></div>
                <CurtainImage 
                  src="https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBzbWlsZSUyMGNsZWFuJTIwdGVldGh8ZW58MHx8fHwxNzg0NjU2NTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Beautiful smile"
                  className="w-full h-full"
                  imgClassName="grayscale-[20%] contrast-125"
                />
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="absolute -left-8 md:-left-16 bottom-12 bg-background p-6 shadow-elegant max-w-[240px] border border-border/50 cursor-pointer"
              >
                <div className="flex gap-1 text-primary mb-2">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="font-serif text-lg leading-tight mb-2">"The most luxurious dental experience I've ever had."</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">— Sarah Jenkins</p>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Decorative background element */}
        <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest writing-vertical-rl">Scroll</span>
          <div className="w-[1px] h-12 bg-border relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* Features / Philosophy Section */}
      <section id="philosophy" className="py-32 bg-foreground text-background relative overflow-hidden">
        {/* Floating Background Element */}
        <motion.div 
          style={{ 
            y: useTransform(scrollY, [500, 2500], [0, -300]), 
            rotate: useTransform(scrollY, [500, 2500], [0, -90]) 
          }} 
          className="absolute -left-[10%] top-[10%] text-background/5 -z-0 pointer-events-none"
        >
          <Star size={600} strokeWidth={0.1} />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Sparkles, title: "Aesthetic Focus", desc: "Every treatment is designed not just for function, but for flawless visual harmony." },
              { icon: ShieldCheck, title: "Advanced Tech", desc: "Utilizing 3D imaging and AI-driven design for precision in every procedure." },
              { icon: Heart, title: "Anxiety-Free", desc: "A spa-like environment with sedation options to ensure complete relaxation." }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
              >
                <div className="mb-6 w-14 h-14 rounded-full border border-background/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-500 group-hover:scale-110">
                  <feature.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                  {feature.title}
                  <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary" />
                </h3>
                <p className="text-background/60 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-primary">Our Expertise</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-serif leading-tight">
                <RevealText delay={0.1}>Bespoke Dental</RevealText>
                <RevealText delay={0.2}>Treatments.</RevealText>
              </h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <LuxuryButton variant="ghost">
                View All Services
              </LuxuryButton>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Porcelain Veneers", desc: "Hand-crafted ultra-thin porcelain to completely transform the shape, color, and alignment of your smile.", img: "https://images.unsplash.com/photo-1617812191081-2a24e3f30e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwyfHxiZWF1dGlmdWwlMjBzbWlsZSUyMGNsZWFuJTIwdGVldGh8ZW58MHx8fHwxNzg0NjU2NTMxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
              { title: "Implantology", desc: "State-of-the-art permanent tooth replacement that looks, feels, and functions exactly like natural teeth.", img: "https://images.unsplash.com/photo-1782397132123-0166b524d6bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODQ2NTY1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080" }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group relative overflow-hidden bg-card"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-foreground/90 via-foreground/60 to-transparent text-background translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                  <h3 className="text-3xl font-serif mb-3">{service.title}</h3>
                  <p className="text-background/80 font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-2">{service.desc}</p>
                  <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-primary font-medium">
                    Explore <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Imagery Parallax Section */}
      <section className="h-[70vh] relative overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: y2 }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1771270731007-5998fa136d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODQ2NTY1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Clinic Interior" 
            className="w-full h-[120%] object-cover object-center grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-foreground/50"></div>
        </motion.div>
        
        <div className="relative z-10 text-center text-background px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Designed for Comfort.</h2>
            <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-background/80 mb-10">
              Our clinic environment is meticulously curated to calm the senses and elevate your dental experience.
            </p>
            <LuxuryButton variant="dark" className="mx-auto bg-background text-foreground hover:bg-primary hover:text-primary-foreground">
              Tour The Clinic
            </LuxuryButton>
          </motion.div>
        </div>
      </section>

      {/* The Art of Dentistry - New Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative">
              <CurtainImage 
                src="https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3ODQ2NTcwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Lead Specialist"
                className="aspect-[3/4]"
                imgClassName="grayscale-[20%]"
              />
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="absolute -bottom-8 -right-8 bg-card p-8 shadow-2xl max-w-[280px] border border-border/40 z-20 cursor-pointer"
              >
                 <h4 className="font-serif text-2xl mb-1">Dr. Julian Hayes</h4>
                 <p className="text-primary text-sm uppercase tracking-widest mb-4">Lead Aesthetic Dentist</p>
                 <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" alt="Signature" className="h-12 opacity-40 invert dark:invert-0" />
              </motion.div>
            </div>

            <div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-primary">Mastery</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                <RevealText delay={0.1}>Where medical precision</RevealText>
                <RevealText delay={0.2}>meets artistic vision.</RevealText>
              </h2>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="prose prose-lg text-muted-foreground font-light mb-10"
              >
                <p className="mb-4">
                  Dentistry is not merely about function; it is about restoring confidence, harmony, and proportion to your face. At Aura Dental, we approach every smile as a unique canvas.
                </p>
                <p>
                  With over two decades of exclusive focus on cosmetic and restorative procedures, our team combines the latest in digital smile design with handcrafted porcelain mastery.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-6 mb-10"
              >
                {[
                  "Digital Smile Design",
                  "Master Ceramists",
                  "Minimally Invasive",
                  "Holistic Approach"
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + (i * 0.1) }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 size={18} className="text-primary" />
                    <span className="text-sm uppercase tracking-wider">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                 <LuxuryButton variant="outline">
                  Meet The Team
                </LuxuryButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Stories / Testimonials */}
      <section id="patient-stories" className="py-32 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="uppercase tracking-[0.2em] text-xs font-semibold text-primary">Testimonials</span>
              <div className="h-[1px] w-8 bg-primary"></div>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif">
              <RevealText delay={0.1}>Transformations.</RevealText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                quote: "For years I hid my smile. The team at Aura didn't just fix my teeth; they gave me back my confidence. The attention to detail is truly unmatched.",
                name: "Eleanor V.",
                procedure: "Full Arch Restoration",
                img: "https://images.unsplash.com/photo-1544507888-56d73eb6046e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwyfHxoYXBweSUyMGNvbmZpZGVudCUyMHNtaWxlfGVufDB8fHx8MTc4NDY1NzAxM3ww&ixlib=rb-4.1.0&q=80&w=1080"
              },
              {
                quote: "From the moment you walk in, you know you're in a different tier of care. The porcelain veneers look so natural that even my family thought I just had them whitened.",
                name: "Marcus T.",
                procedure: "Signature Veneers",
                img: "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvbmZpZGVudCUyMHNtaWxlfGVufDB8fHx8MTc4NDY1NzAxM3ww&ixlib=rb-4.1.0&q=80&w=1080"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card p-10 md:p-14 relative group border border-border/40 hover:border-primary/50 transition-colors duration-700"
              >
                <Quote size={40} className="text-primary/20 absolute top-10 left-10 group-hover:text-primary/40 transition-colors duration-500" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex gap-1 text-primary mb-8">
                    {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-xl md:text-2xl font-serif leading-relaxed mb-10 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground uppercase tracking-widest text-sm">{testimonial.name}</h5>
                      <span className="text-xs text-muted-foreground">{testimonial.procedure}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Details Grid */}
      <section className="py-4 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
           {[
             { img: "https://images.unsplash.com/photo-1781513144825-aa1e284c5950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjbGluaWMlMjBkZXRhaWxzfGVufDB8fHx8MTc4NDY1NzAxM3ww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Reception" },
             { img: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODQ2NTY1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Treatment Room" },
             { img: "https://images.unsplash.com/photo-1778151270886-f227700b0eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBjbGluaWMlMjBkZXRhaWxzfGVufDB8fHx8MTc4NDY1NzAxM3ww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Consultation" },
             { img: "https://images.unsplash.com/photo-1771270731007-5998fa136d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODQ2NTY1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Lounge" }
           ].map((item, i) => (
             <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-square relative group overflow-hidden"
             >
               <img src={item.img} alt={item.alt} className="w-full h-full object-cover grayscale-[40%] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out" />
               <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-700"></div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Full Page In-line Booking Section */}
      <section id="booking-section" className="py-32 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8"
            >
              <CalendarIcon size={24} />
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-serif mb-6 text-balance">
              <RevealText delay={0.2}>Reserve</RevealText>
              <RevealText delay={0.3}>Your Time.</RevealText>
            </h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-muted-foreground font-light mb-4"
            >
              Select your preferred date, treatment, and specialist to schedule your visit.
            </motion.p>
          </div>

          {!isBooked ? (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-6xl mx-auto bg-background border border-border/50 shadow-elegant flex flex-col lg:flex-row overflow-hidden"
            >
              {/* Left Column: Calendar */}
              <div className="lg:w-1/2 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-border/50 bg-secondary/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-serif">1</div>
                  <h3 className="text-2xl font-serif">Select Date</h3>
                </div>
                
                <div className="bg-background border border-border/50 p-4 inline-block w-full flex justify-center shadow-sm">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => { if (d) setDate(d); }}
                    className="rounded-none scale-110 sm:scale-125 md:scale-150 origin-top transform-gpu my-8 sm:my-10"
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  />
                </div>
              </div>

              {/* Right Column: Options & Confirmation */}
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col">
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-serif">2</div>
                  <h3 className="text-2xl font-serif">Preferences</h3>
                </div>

                <div className="space-y-8 flex-grow">
                  
                  {/* Treatment Selection */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">1. Treatment Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {treatments.map(t => (
                        <div 
                          key={t.id}
                          onClick={() => setSelectedTreatment(t.id)}
                          className={`p-4 border cursor-pointer transition-all duration-300 flex justify-between items-center ${selectedTreatment === t.id ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50 text-foreground'}`}
                        >
                          <span className="font-medium text-sm">{t.name}</span>
                          {selectedTreatment === t.id && <CheckCircle2 size={16} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dentist Selection */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">2. Specialist</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dentists.map(d => (
                        <div 
                          key={d.id}
                          onClick={() => setSelectedDentist(d.id)}
                          className={`p-4 border cursor-pointer transition-all duration-300 flex justify-between items-center ${selectedDentist === d.id ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50 text-foreground'}`}
                        >
                          <span className="font-medium text-sm">{d.name}</span>
                          {selectedDentist === d.id && <CheckCircle2 size={16} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">3. Available Time ({date ? format(date, "MMM d") : ""})</label>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map(t => (
                        <div 
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 text-center border cursor-pointer transition-all duration-300 text-sm ${selectedTime === t ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/50 text-foreground'}`}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="mt-12 pt-8 border-t border-border/50">
                  <div onClick={() => setIsBooked(true)}>
                    <LuxuryButton variant="dark" className="w-full h-16 text-lg">
                      Confirm Reservation <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </LuxuryButton>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto bg-background border border-border/50 shadow-elegant p-12 text-center"
            >
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                <Sparkles size={32} />
              </div>
              <h3 className="text-4xl font-serif mb-4">Reservation Confirmed</h3>
              <p className="text-muted-foreground font-light mb-10 text-lg">
                We look forward to welcoming you to Aura Dental. A confirmation email has been sent to your inbox.
              </p>
              
              <div className="bg-secondary/20 border border-border/50 p-6 text-left mb-10">
                <div className="flex items-center gap-4 mb-4 text-foreground text-lg">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="font-serif">{treatments.find(t => t.id === selectedTreatment)?.name}</span>
                </div>
                <div className="flex items-center gap-4 mb-4 text-foreground/80">
                  <User size={20} className="text-muted-foreground" />
                  <span>{dentists.find(d => d.id === selectedDentist)?.name}</span>
                </div>
                <div className="flex items-center gap-4 text-foreground/80">
                  <CalendarIcon size={20} className="text-muted-foreground" />
                  <span>{date && format(date, "MMMM d, yyyy")} at {selectedTime}</span>
                </div>
              </div>

              <div onClick={() => setIsBooked(false)}>
                 <LuxuryButton variant="outline" className="mx-auto">
                    Book Another Appointment
                 </LuxuryButton>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* True Footer */}
      <footer className="bg-foreground text-background py-16 border-t border-background/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  <Sparkles size={12} />
                </div>
                <span className="font-serif text-xl font-medium tracking-tight">Aura Dental</span>
              </div>
              <p className="text-background/60 font-light max-w-sm">
                A sanctuary for aesthetic dentistry, blending advanced medical science with artistic vision.
              </p>
            </div>
            
            <div>
              <h4 className="uppercase tracking-widest text-xs font-semibold mb-6 text-primary">Location</h4>
              <p className="text-background/80 font-light leading-relaxed">
                124 Luxury Avenue<br/>
                Suite 400<br/>
                Beverly Hills, CA 90210
              </p>
            </div>
            
            <div>
              <h4 className="uppercase tracking-widest text-xs font-semibold mb-6 text-primary">Contact</h4>
              <p className="text-background/80 font-light leading-relaxed flex flex-col gap-2">
                <a href="tel:+13105550198" className="hover:text-primary transition-colors">+1 (310) 555-0198</a>
                <a href="mailto:hello@auradental.com" className="hover:text-primary transition-colors">hello@auradental.com</a>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-background/10 text-background/40 text-sm font-light">
            <p>© {new Date().getFullYear()} Aura Dental. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
      
      <BookingModal isOpen={false} onClose={() => {}} />
    </div>
  );
};

export default Index;