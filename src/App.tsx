import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wrench, 
  ShieldCheck, 
  Cpu, 
  Settings, 
  Activity, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Building2, 
  Users, 
  Check, 
  ChevronRight,
  MessageSquare,
  Sparkle,
  Star,
  Quote
} from "lucide-react";

import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { GalleryFloor } from "./components/GalleryFloor";
import { ElevatorShaft } from "./components/ElevatorShaft";
import { LuxuryLift } from "./components/LuxuryLift";
import { BuildingLift } from "./components/BuildingLift";
import { LiftCutaway } from "./components/LiftCutaway";
import { Floor } from "./components/Floor";
import { Logo } from "./components/Logo";

// Types for Lift Configurator
interface LiftConfig {
  style: string;
  lighting: string;
  panel: string;
  speed: string;
  capacity: string;
  hasARD: boolean; // Automatic Rescue Device
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  
  // Lift configuration state
  const [config, setConfig] = useState<LiftConfig>({
    style: "Imperial Gold & Marble",
    lighting: "Chandelier Glow",
    panel: "Classic Brass Push-button",
    speed: "1.5 m/s (High Speed)",
    capacity: "8 Passengers (544 kg)",
    hasARD: true
  });

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    buildingType: "Residential Tower",
    customSpecs: "",
    message: ""
  });

  const [sentMessageBody, setSentMessageBody] = useState<string>("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [web3FormsKey, setWeb3FormsKey] = useState<string>(() => {
    return localStorage.getItem("cikay_web3forms_key") || (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || "";
  });
  const [showKeyConfig, setShowKeyConfig] = useState(false);

  // SMTP Configuration state
  const [isSmtpConfigured, setIsSmtpConfigured] = useState(false);
  const [smtpRecipient, setSmtpRecipient] = useState("aabdulhafiz073@gmail.com");
  const [isSimulatorResult, setIsSimulatorResult] = useState(false);
  const [referenceToken, setReferenceToken] = useState<string>("");

  useEffect(() => {
    const checkSmtpStatus = async () => {
      try {
        const res = await fetch("/api/smtp-status");
        if (res.ok) {
          const data = await res.json();
          setIsSmtpConfigured(!!data.isConfigured);
          if (data.smtpTo) {
            setSmtpRecipient(data.smtpTo);
          }
        }
      } catch (err) {
        console.warn("Unable to connect to SMTP status API", err);
      }
    };
    checkSmtpStatus();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const token = `CIKAY-LIFT-${Math.floor(10000 + Math.random() * 90000)}`;
    setReferenceToken(token);

    // Consolidate all specifications and selections into a unified, readable email message body
    const consolidatedMessage = `
--- CLIENT INQUIRY & CONTACT ---
Reference Token: ${token}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Building Architecture Type: ${formData.buildingType}

--- CABIN SPECIFICATIONS (FROM BESPOKE STUDIO) ---
Cabin Material / Style: ${config.style}
Ceiling Lighting Style: ${config.lighting}
Control Panel (COP): ${config.panel}
ARD Auto Rescue: ${config.hasARD ? "CONNECTED (VVVF Logic)" : "MANUAL CRANK"}
Max Speed Target: ${config.speed}
Max Capacity Target: ${config.capacity}
Preconfigured Specs: ${formData.customSpecs || "None loaded"}

--- CLIENT MESSAGE & SPECIAL NOTES ---
${formData.message || "No custom message provided"}
    `.trim();

    setSentMessageBody(consolidatedMessage);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          buildingType: formData.buildingType,
          customSpecs: formData.customSpecs,
          message: formData.message,
          config: config,
          referenceToken: token
        })
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
      }

      if (response.ok && data.success) {
        setIsSimulatorResult(!!data.simulator);
        setQuoteSubmitted(true);
      } else {
        setSubmitError(data.message || "Failed to transmit via SMTP. Please verify configuration.");
      }
    } catch (err: any) {
      setSubmitError(`Transmission failed: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. Custom Elevator Entrance Loading Screen */}
      <LoadingScreen />

      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-300">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* 2. Scroll-Linked Elevator Shaft Visual Anchor */}
        <ElevatorShaft />

        {/* Core Layout Wrapper */}
        <main className="max-w-7xl mx-auto z-10 relative">
          
          {/* ========================================================= */}
          {/* FLOOR 10: LUXURY SKY LOBBY (HERO) */}
          {/* ========================================================= */}
          <Floor id="hero" number="10" label="Luxury Sky Lobby">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 min-h-[75vh]">
              
              {/* Left Column Brand Presentation */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-widest text-[#dfa057] w-fit shadow-sm bounce-slow">
                  <Sparkles className="h-3.5 w-3.5" /> High-Performance Elevators
                </span>
                
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                  Reliable Elevator <span className="gold-text">Solutions For </span>Modern Buildings
                </h1>
                
                <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
                  Installation, AMC, Repair & Modernization Services across residential, commercial and industrial projects.
                </p>

                {/* Industrial Stats badges */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/80">
                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-bold gold-text">150+</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">Lifts Active</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-bold gold-text">99.9%</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">Uptime Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-bold gold-text">10 Yrs</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">Warranty</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-6">
                  <a 
                    href="#contact" 
                    className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--shadow-glow)] flex items-center gap-2 cursor-pointer text-black"
                  >
                    Get Free Quote <ArrowRight className="h-4 w-4" />
                  </a>
                  <a 
                    href="tel:+919639099990" 
                    className="px-6 py-3 rounded-full glass border border-border hover:border-primary/50 text-foreground transition-all font-semibold text-sm cursor-pointer flex items-center gap-2"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              {/* Right Column Custom Animated Elevator Cabin */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="w-[310px] sm:w-[350px] relative">
                  <LuxuryLift />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                    Interactive Luxury Preview Model
                  </div>
                </div>
              </div>
            </div>
          </Floor>


          {/* ========================================================= */}
          {/* FLOOR 8: CORPORATE HERITAGE & PROFILE (ABOUT) */}
          {/* ========================================================= */}
          <Floor id="about" number="8" label="Corporate Heritage">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Building schematic animation */}
              <div className="lg:col-span-5 order-last lg:order-first flex justify-center">
                <div className="w-[280px] sm:w-[310px] relative bg-card/20 rounded-2xl p-4 border border-border">
                  <BuildingLift />
                  <div className="mt-4 text-center">
                    <p className="font-mono text-xs text-primary font-semibold">DYNAMIC INTEGRATED TOWERS LLC</p>
                    <p className="text-[10px] text-muted-foreground">Simulated multi-tier vertical logic system</p>
                  </div>
                </div>
              </div>

              {/* Right Column Comprehensive Text Profile */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">WHO WE ARE</span>
                  <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  Engineered for safety, <span className="text-[#dfa057]">Built for trust.</span>
                </h2>
                </div>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  CIKAY Elevator Private Limited delivers reliable elevator installation, maintenance, modernization and repair services with a strong focus on safety, performance and customer satisfaction.
                </p>

                {/* Grid of four items */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/80">
                  <div>
                    <div className="text-xl sm:text-2xl font-display font-bold gold-text">1,000+</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground leading-tight">SERVICE VISIT</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-display font-bold gold-text">500+</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground leading-tight">Satisfied Clients</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-display font-bold gold-text">24/7</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground leading-tight">SUPPORT</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-display font-bold gold-text">100%</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground leading-tight">SAFETY COMMIT</div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl border border-primary/20 p-4">
                  <p className="text-xs text-foreground/80 italic font-medium">
                    "Elevator design is more than mechanics—it is the direct vertical bridge of a building's spirit. We ensure that your building feels secure from the ground level to the clouds."
                  </p>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider mt-2">- Chairman, CIKAY Elevator Pvt Ltd</p>
                </div>
              </div>

            </div>
          </Floor>


          {/* ========================================================= */}
          {/* FLOOR 6: CORE SERVICES & SYSTEMS (SERVICES) */}
          {/* ========================================================= */}
          <Floor id="services" number="6" label="Vertical Engineering">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center justify-center max-w-7xl mx-auto">

              {/* Left Column: Lift Cutaway Diagram */}
              <div className="lg:col-span-5 flex justify-center w-full max-w-md mx-auto relative">
                <LiftCutaway className="w-full h-auto" />
              </div>

              {/* Right Column: Anatomy of Service Info */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Badge: ANATOMY OF SERVICE */}
                <div>
                  <span className="inline-block px-4 py-1.5 border border-[#dfa057]/40 rounded-full text-xs font-mono font-bold tracking-[0.2em] text-[#dfa057] uppercase bg-[#dfa057]/5">
                    Anatomy of Service
                  </span>
                </div>

                {/* Heading: Every component we cover */}
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  Every component <span className="text-[#dfa057]">we cover</span>
                </h2>

                {/* Description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
                  From the traction motor in the machine room to the buffer at the pit floor — our AMC, installation, repair and modernization services keep every moving part safe, smooth and certified.
                </p>

                {/* Two-Column Grid of Components with Golden Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-4 max-w-xl">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#dfa057]" />
                      <span className="font-display font-medium text-base sm:text-lg text-foreground/90">Traction Motor</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#dfa057]" />
                      <span className="font-display font-medium text-base sm:text-lg text-foreground/90">Steel Cables</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#dfa057]" />
                      <span className="font-display font-medium text-base sm:text-lg text-foreground/90">Cabin & Doors</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#dfa057]" />
                      <span className="font-display font-medium text-base sm:text-lg text-foreground/90">Safety Brake</span>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#dfa057]" />
                      <span className="font-display font-medium text-base sm:text-lg text-foreground/90">Controller Panel</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#dfa057]" />
                      <span className="font-display font-medium text-base sm:text-lg text-foreground/90">Guide Rails</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#dfa057]" />
                      <span className="font-display font-medium text-base sm:text-lg text-foreground/90">Counterweight</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#dfa057]" />
                      <span className="font-display font-medium text-base sm:text-lg text-foreground/90">Buffer / Pit</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* 2x2 Grid of Main Services: AMC, Installation, Repair, Modernization */}
            <div className="mt-16 pt-16 border-t border-border/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                
                {/* 1. Lift AMC Card */}
                <div className="rounded-2xl bg-card border border-border/60 hover:border-[#dfa057]/50 hover:shadow-[var(--shadow-glow)] transition-all duration-300 flex flex-col overflow-hidden h-full group">
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <img 
                      src="/public/Lift AMC.jfif"
                      alt="Lift AMC Inspection and Maintenance"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 h-12 w-12 rounded-xl bg-[#dfa057] flex items-center justify-center text-black shadow-lg">
                      <Settings className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                        Lift AMC
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        Comprehensive annual maintenance contracts with scheduled inspections, control panel diagnostics and priority response.
                      </p>
                    </div>
                    <div className="pt-6">
                      <a 
                        href="#contact" 
                        className="inline-flex items-center gap-2 text-[#dfa057] text-sm font-semibold hover:underline group-hover:translate-x-1 transition-transform"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. Lift Installation Card */}
                <div className="rounded-2xl bg-card border border-border/60 hover:border-[#dfa057]/50 hover:shadow-[var(--shadow-glow)] transition-all duration-300 flex flex-col overflow-hidden h-full group">
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
                      alt="Lift shaft structural installation"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 h-12 w-12 rounded-xl bg-[#dfa057] flex items-center justify-center text-black shadow-lg">
                      <Wrench className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                        Lift Installation
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        Turnkey installation of passenger, freight and capsule elevators — from shaft design to commissioning.
                      </p>
                    </div>
                    <div className="pt-6">
                      <a 
                        href="#contact" 
                        className="inline-flex items-center gap-2 text-[#dfa057] text-sm font-semibold hover:underline group-hover:translate-x-1 transition-transform"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3. Lift Repair Card */}
                <div className="rounded-2xl bg-card border border-border/60 hover:border-[#dfa057]/50 hover:shadow-[var(--shadow-glow)] transition-all duration-300 flex flex-col overflow-hidden h-full group">
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
                      alt="Lift Repair and AMC Maintenance"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 h-12 w-12 rounded-xl bg-[#dfa057] flex items-center justify-center text-black shadow-lg">
                      <Wrench className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                        Lift Repair
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        Emergency troubleshooting, high-precision calibration, and original spare part replacement to restore safe and responsive lift operation with zero delay.
                      </p>
                    </div>
                    <div className="pt-6">
                      <a 
                        href="#contact" 
                        className="inline-flex items-center gap-2 text-[#dfa057] text-sm font-semibold hover:underline group-hover:translate-x-1 transition-transform"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4. Lift Modernization Card */}
                <div className="rounded-2xl bg-card border border-border/60 hover:border-[#dfa057]/50 hover:shadow-[var(--shadow-glow)] transition-all duration-300 flex flex-col overflow-hidden h-full group">
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=800"
                      alt="Luxurious Lift cabin Interior and Modernization"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 h-12 w-12 rounded-xl bg-[#dfa057] flex items-center justify-center text-black shadow-lg">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                        Lift Modernization
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        Elevate aging layouts with luxury architectural trims, energy-efficient gearless motors, and next-generation smart microprocessors.
                      </p>
                    </div>
                    <div className="pt-6">
                      <a 
                        href="#contact" 
                        className="inline-flex items-center gap-2 text-[#dfa057] text-sm font-semibold hover:underline group-hover:translate-x-1 transition-transform"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Floor>


          {/* ========================================================= */}
          {/* FLOOR 5: VISUAL VAULT (GALLERY) */}
          {/* ========================================================= */}
          <Floor id="gallery" number="5" label="Bespoke Gallery">
            <GalleryFloor onSelectImage={(details) => {
              setFormData((prev) => ({
                ...prev,
                message: details
              }));
              const el = document.getElementById("contact");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }} />
          </Floor>


          {/* ========================================================= */}
          {/* FLOOR 4: OUR STRENGTHS & KEY DIFFERENTIATORS (WHY US) */}
          {/* ========================================================= */}
          <Floor id="why" number="4" label="Architectural Strengths">
            <div className="space-y-12">
              <div className="text-center space-y-3">
                <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">THE CIKAY SHIELD</span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  Why Choose <span className="text-[#dfa057]">CIKAY</span>
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                  Every elevator in our inventory is backed by heavy-duty components and safety redundancies, ensuring consistent uptime and effortless client compliance reviews.
                </p>
              </div>

              {/* 3x2 Grid of absolute benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Safety Compliance</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Installations and audits aligned with national elevator safety standards.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Experienced Technicians</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                  Factory-trained engineers with decades of combined field experience.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Fast Response</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Priority dispatch with SLA-backed response times across all AMC plans.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Genuine Parts</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    SOEM-grade components for long-term reliability and safety compliance.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">24/7 Emergency Support</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                  Round-the-clock helpline for breakdowns, entrapments and urgent service. </p>
                </div>

                {/* Card 6 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Affordable AMC Plans</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Flexible silver, gold and platinum maintenance plans for every building.
                  </p>
                </div>

              </div>
            </div>
          </Floor>


          {/* ========================================================= */}
          {/* FLOOR 3: INTERACTIVE CABIN CUSTOMIZER & CONFIGURATOR */}
          {/* ========================================================= */}
          <Floor id="configurator" number="3" label="Bespoke Studio">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Configurator Fields */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">INTERACTIVE CONFIGURATOR</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                    Customize Your Luxury Cabin Specification
                  </h2>
                  <p className="text-muted-foreground text-sm max-w-lg">
                    Build your custom cabin profile below. On arrival, CIKAY engineers construct precisely to your material parameters. Adjust selectors to see live calculated technical values.
                  </p>
                </div>

                {/* Interactive Controls Grid */}
                <div className="space-y-4 p-6 rounded-2xl bg-card border border-border">
                  
                  {/* Style Select */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">Cabin Shell Material</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Imperial Gold & Marble",
                        "Brushed Surgical Steel",
                        "Elite Titanium Black",
                        "Full Panorama Glass"
                      ].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setConfig({ ...config, style: s })}
                          className={`px-4 py-2 text-xs rounded-lg border font-medium text-left transition-colors cursor-pointer ${
                            config.style === s 
                              ? "bg-primary border-primary text-[#060a12] font-semibold" 
                              : "bg-background/40 border-border text-foreground hover:border-primary/50"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lighting Select */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">Ceiling Lighting Style</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Chandelier Glow",
                        "Cove LED Warm Light",
                        "Futuristic Cool Laser"
                      ].map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setConfig({ ...config, lighting: l })}
                          className={`px-3 py-2 text-[11px] rounded-lg border text-center transition-colors cursor-pointer ${
                            config.lighting === l 
                              ? "bg-primary border-primary text-[#060a12] font-semibold" 
                              : "bg-background/40 border-border text-foreground hover:border-primary/50"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Panel Option */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">Control Operating Panel (COP)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Classic Brass Push-button",
                        "Digital Touch Glass Screen"
                      ].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setConfig({ ...config, panel: p })}
                          className={`px-3 py-2 text-xs rounded-lg border text-left transition-colors cursor-pointer ${
                            config.panel === p 
                              ? "bg-primary border-primary text-[#060a12] font-semibold" 
                              : "bg-background/40 border-border text-foreground hover:border-primary/50"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extra specs toggle */}
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-3">
                    <span className="text-xs font-mono text-muted-foreground">Default Automatic Rescue Device</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={config.hasARD} 
                        onChange={() => setConfig({ ...config, hasARD: !config.hasARD })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-background rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-muted-foreground peer-checked:after:bg-primary after:border shadow-inner after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/20 border border-border"></div>
                    </label>
                  </div>
                </div>

                {/* Call-to-action */}
                <div className="flex bg-primary/10 border border-primary/20 rounded-xl p-4 gap-3 text-left">
                  <Sparkle className="h-5 w-5 text-primary shrink-0 animate-pulse mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-normal">
                    Based on your selected material (<span className="text-foreground font-bold">{config.style}</span>), our fabrication delivery time is <span className="text-primary font-bold">14 Working Days</span>, shipped with dual mechanical rail stabilizers.
                  </p>
                </div>
              </div>

              {/* Right Column Custom Live Spec readout sheet */}
              <div className="lg:col-span-5 text-left">
                <div className="p-6 rounded-2xl border border-primary/30 bg-card/60 relative overflow-hidden shadow-[var(--shadow-elegant)] space-y-6">
                  
                  {/* Luxury backing glow */}
                  <div className="absolute top-0 right-0 h-24 w-24 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase text-primary font-bold tracking-widest">CIKAY ESTIMATION SHEET</p>
                    <h3 className="font-display text-xl font-bold">Lobby Custom Specification</h3>
                  </div>

                  {/* Specifications stack */}
                  <div className="space-y-3.5 pt-2 font-mono text-xs">
                    
                    <div className="flex justify-between border-b border-border/80 pb-2">
                      <span className="text-muted-foreground">CABIN ARCHITECTURE:</span>
                      <span className="text-foreground font-semibold">{config.style}</span>
                    </div>

                    <div className="flex justify-between border-b border-border/80 pb-2">
                      <span className="text-muted-foreground">ATMOSPHERE & COVE:</span>
                      <span className="text-foreground font-semibold">{config.lighting}</span>
                    </div>

                    <div className="flex justify-between border-b border-border/80 pb-2">
                      <span className="text-muted-foreground">OPERATING INTERFACE:</span>
                      <span className="text-foreground font-semibold">{config.panel}</span>
                    </div>

                    <div className="flex justify-between border-b border-border/80 pb-2">
                      <span className="text-muted-foreground">AUTO-RESCUE MECHANICS:</span>
                      <span className="text-primary font-bold">{config.hasARD ? "CONNECTED (VVVF)" : "MANUAL CRANK"}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-[10px]">
                      <div className="p-2.5 rounded-lg bg-background/55 border border-border">
                        <span className="text-muted-foreground block uppercase text-[8px] mb-1">Max Speed</span>
                        <span className="text-foreground font-bold">{config.speed}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-background/55 border border-border">
                        <span className="text-muted-foreground block uppercase text-[8px] mb-1">Max Capacity</span>
                        <span className="text-foreground font-bold">{config.capacity}</span>
                      </div>
                    </div>
                  </div>

                  <a 
                    href="#contact"
                    className="block text-center w-full bg-primary text-[#060a12] font-semibold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-glow)] cursor-pointer"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        customSpecs: `Model: ${config.style} | Light: ${config.lighting} | Panel: ${config.panel}`
                      });
                    }}
                  >
                    Submit Specs for Final Pricing
                  </a>
                </div>
              </div>

            </div>
          </Floor>


          {/* ========================================================= */}
          {/* FLOOR 2: TESTIMONIALS */}
          {/* ========================================================= */}
          <Floor id="testimonials" number="2" label="TRUSTED">
            <div className="space-y-12">
              <div className="text-center md:text-left space-y-3">
                
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Trusted By <span className="text-[#dfa057]">Industry Leaders</span>
                </h2>
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Testimonial 1 */}
                <div className="group bg-card/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/85 flex flex-col justify-between hover:border-primary/50 hover:shadow-[var(--shadow-glow)] transition-all duration-300 relative text-left">
                  <div className="absolute top-4 right-4 text-primary/10 font-serif text-6xl leading-none select-none">“</div>
                  <div className="space-y-4 relative z-10">
                    <div className="text-primary">
                      <Quote className="h-6 w-6 fill-primary/20 text-primary" />
                    </div>
                    <p className="text-sm sm:text-base text-foreground leading-relaxed italic">
                      "CIKAY transformed our aging elevator system. The modernization was completed on schedule with zero disruption to residents."
                    </p>
                  </div>
                  <div className="border-t border-border/60 pt-4 mt-6">
                    <h4 className="font-display font-bold text-sm text-foreground">Rajesh Kumar</h4>
                    <p className="text-xs text-muted-foreground">Facility Manager, Skyline Residency</p>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="group bg-card/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/85 flex flex-col justify-between hover:border-primary/50 hover:shadow-[var(--shadow-glow)] transition-all duration-300 relative text-left">
                  <div className="absolute top-4 right-4 text-primary/10 font-serif text-6xl leading-none select-none">“</div>
                  <div className="space-y-4 relative z-10">
                    <div className="text-primary">
                      <Quote className="h-6 w-6 fill-primary/20 text-primary" />
                    </div>
                    <p className="text-sm sm:text-base text-foreground leading-relaxed italic">
                      "Their AMC team is exceptional — proactive servicing, transparent reports and a response time we can actually rely on."
                    </p>
                  </div>
                  <div className="border-t border-border/60 pt-4 mt-6">
                    <h4 className="font-display font-bold text-sm text-foreground">Priya Nair</h4>
                    <p className="text-xs text-muted-foreground">Operations Head, Meridian Hotels</p>
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div className="group bg-card/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/85 flex flex-col justify-between hover:border-primary/50 hover:shadow-[var(--shadow-glow)] transition-all duration-300 relative text-left">
                  <div className="absolute top-4 right-4 text-primary/10 font-serif text-6xl leading-none select-none">“</div>
                  <div className="space-y-4 relative z-10">
                    <div className="text-primary">
                      <Quote className="h-6 w-6 fill-primary/20 text-primary" />
                    </div>
                    <p className="text-sm sm:text-base text-foreground leading-relaxed italic">
                      "From installation to handover, CIKAY delivered a flawless experience. Safety compliance was their top priority throughout."
                    </p>
                  </div>
                  <div className="border-t border-border/60 pt-4 mt-6">
                    <h4 className="font-display font-bold text-sm text-foreground">Anand Verma</h4>
                    <p className="text-xs text-muted-foreground">Project Director, Crescent Mall</p>
                  </div>
                </div>

              </div>
            </div>
          </Floor>


          {/* ========================================================= */}
          {/* FLOOR G: INSTANT CONCIERGE & CONTACT REQUEST (CONTACT) */}
          {/* ========================================================= */}
          <Floor id="contact" number="G" label="Ground level dispatch">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
              
              {/* Left Column Contact Mechanics Info */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="space-y-2">
                  <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">GET IN TOUCH</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                    Secure An Ex<span className="text-[#dfa057]">pert Structural Inspection</span>
                  </h2>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  Have an active construction proposal? Or do you require modernization on an aging, sluggish lift container? Drop us an inquiry, and our Senior Site Coordinators will initiate full blueprint mapping.
                </p>

                {/* Real info block */}
                <div className="space-y-4 pt-4 text-xs font-mono">
                  
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-primary/10 rounded-full border border-primary/30 flex items-center justify-center text-primary">
                      <PhoneCall className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[9px] uppercase">Corporate hotline</span>
                      <a href="tel:+919639099990" className="text-foreground font-semibold hover:text-primary transition-colors text-sm">+91 96390 99990</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-primary/10 rounded-full border border-primary/30 flex items-center justify-center text-primary">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[9px] uppercase">Official Email</span>
                      <a href="mailto:info@cikayelevator.com" className="text-foreground font-semibold hover:text-primary transition-colors text-sm">info@cikayelevator.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-primary/10 rounded-full border border-primary/30 flex items-center justify-center text-primary">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[9px] uppercase">Manufacturing HQ</span>
                      <p className="text-foreground font-semibold text-xs leading-normal">
                        CIKAY Industrial Gate, Sector 4, Haridwar Industrial Area, Uttarakhand - 249403, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Standard ISO Footer badge */}
                <div className="p-4 rounded-xl glass border border-border flex items-center gap-3.5 max-w-sm">
                  <Logo size={32} />
                  <div className="text-[10px] font-mono text-muted-foreground leading-normal">
                    Registered with Ministry of Corporate Affairs, Gov of India. Registered trademark and patent holder of VVVF auto-safety gates.
                  </div>
                </div>
              </div>

              {/* Right Column Interactive Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/40 backdrop-blur-sm shadow-[var(--shadow-elegant)] text-left">
                  
                  <AnimatePresence mode="wait">
                    {!quoteSubmitted ? (
                      <motion.form 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleFormSubmit} 
                        className="space-y-4"
                      >
                        <div className="flex justify-between items-start flex-wrap gap-2 border-b border-border/60 pb-3">
                          <div>
                            <h3 className="font-display text-lg font-bold">Lobby Advisory Unit</h3>
                            <p className="text-xs text-muted-foreground">Fill in details for quick structural quote estimates</p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-1.5">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-mono border ${isSmtpConfigured ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' : 'bg-amber-500/10 text-amber-400 border-amber-500/25'}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${isSmtpConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                              {isSmtpConfigured ? "SMTP Gateway: Active" : "SMTP Simulator Mode"}
                            </span>
                            <button 
                              type="button"
                              onClick={() => setShowKeyConfig(!showKeyConfig)}
                              className="text-[10px] text-primary hover:underline transition-colors font-mono flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                            >
                              <Settings className="h-3 w-3" />
                              {showKeyConfig ? "Hide Config" : "Check SMTP Settings"}
                            </button>
                          </div>
                        </div>

                        {/* Interactive SMTP Connection Guide and configuration drawer */}
                        <AnimatePresence>
                          {showKeyConfig && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden bg-background/60 border border-border/80 rounded-xl p-4.5 space-y-3 text-xs"
                            >
                              <div className="space-y-1">
                                <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                                  <Sparkles className="h-3.5 w-3.5 text-primary" /> SMTP Email Server Dispatch Status
                                </h4>
                                <p className="text-muted-foreground text-[11px] leading-relaxed">
                                  Submit real inquiries from this website and receive them straight to the designated SMTP inbox (<span className="text-foreground font-semibold">{smtpRecipient}</span>) in real-time.
                                </p>
                              </div>
                              
                              <div className="p-3 bg-card rounded-lg border border-border space-y-2 font-mono text-[11px]">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">SMTP Status:</span>
                                  <span className={isSmtpConfigured ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                                    {isSmtpConfigured ? "● Fully Configured & Active" : "○ Running in Sandbox Simulator"}
                                  </span>
                                </div>
                                <div className="flex justify-between border-t border-border/40 pt-1.5">
                                  <span className="text-muted-foreground">Target Recipient:</span>
                                  <span className="text-foreground">{smtpRecipient}</span>
                                </div>
                              </div>

                              <p className="text-[11px] text-muted-foreground leading-normal">
                                To send actual emails directly via your custom mail server (e.g., Gmail, Outlook, SendGrid), update the SMTP environment variables in your <span className="text-foreground font-mono">.env</span> file:
                              </p>
                              
                              <pre className="p-2.5 bg-zinc-950 text-emerald-400 font-mono text-[10px] rounded-lg overflow-x-auto leading-relaxed border border-border">
{`# SMTP Email Credentials Config
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="your-gmail-address@gmail.com"
SMTP_PASS="your-gmail-app-password"
SMTP_TO="${smtpRecipient}"`}
                              </pre>

                              <p className="text-[10px] text-muted-foreground/60 italic">
                                * Safe architecture is active. SMTP secrets are hidden safely on the backend server and never leaked to the client browser.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {submitError && (
                          <div className="p-3.5 bg-destructive/10 border border-destructive/30 text-destructive text-xs rounded-xl font-mono">
                            ⚠️ Error: {submitError}
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-mono text-muted-foreground mb-1.5">Your Name *</label>
                            <input 
                              type="text" 
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Your Name" 
                              className="w-full text-xs font-sans px-3.5 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/80 focus:outline-none focus:ring-1 focus:ring-primary/80"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-mono text-muted-foreground mb-1.5">Phone Number *</label>
                            <input 
                              type="tel" 
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="e.g. +91 96390 99990" 
                              className="w-full text-xs font-sans px-3.5 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/80 focus:outline-none focus:ring-1 focus:ring-primary/80"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-mono text-muted-foreground mb-1.5">Email Address *</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. client@architects.in" 
                            className="w-full text-xs font-sans px-3.5 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/80 focus:outline-none focus:ring-1 focus:ring-primary/80"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-mono text-muted-foreground mb-1.5">Building Architecture Type</label>
                            <select 
                              value={formData.buildingType}
                              onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                              className="w-full text-xs font-sans px-3 py-2.5 rounded-lg bg-background border border-border text-foreground focus:border-primary/80 focus:outline-none"
                            >
                              <option value="Residential Tower">Multi-tier Residential Society</option>
                              <option value="Luxury Duplex Bungalow">Private Elite Duplex Villa</option>
                              <option value="Commercial Complex">Multi-floor Business Arcade</option>
                              <option value="Critical Healthcare">Hospital Clinic / Stretcher Lifts</option>
                              <option value="Freight Warehouse">Heavy Materials Warehouse</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-mono text-muted-foreground mb-1.5">Preconfigured custom specs</label>
                            <input 
                              type="text" 
                              value={formData.customSpecs}
                              onChange={(e) => setFormData({ ...formData, customSpecs: e.target.value })}
                              placeholder="Auto-loaded from Floor 3 config" 
                              className="w-full text-xs font-mono px-3.5 py-2.5 rounded-lg bg-background/65 border border-border text-primary font-semibold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-mono text-muted-foreground mb-1.5">Project Notes or Special Demands</label>
                          <textarea 
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Provide Bespoke height details, dimensions, speed targets..." 
                            className="w-full text-xs font-sans px-3.5 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/80 focus:outline-none focus:ring-1 focus:ring-primary/80"
                          ></textarea>
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full font-display font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl bg-primary text-black transition-all duration-300 hover:scale-[1.01] hover:shadow-[var(--shadow-glow)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                              Transmitting Advisory Request...
                            </>
                          ) : (
                            "Send Advisory Dispatch Request"
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-8 space-y-6"
                      >
                        <div className="h-16 w-16 mx-auto rounded-full bg-primary/25 border border-primary text-primary flex items-center justify-center">
                          <CheckCircle2 className="h-8 w-8 animate-bounce" />
                        </div>
                        <div className="space-y-2 text-center">
                          <h3 className="font-display font-bold text-2xl gold-text">
                            {!isSimulatorResult ? "Inquiry Dispatched via SMTP!" : "Request Processed!"}
                          </h3>
                          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                            {!isSimulatorResult ? (
                              <>
                                Thank you <span className="text-foreground font-semibold">{formData.name}</span>! Your complete elevator specifications and contact details have been successfully emailed via SMTP directly to <span className="text-foreground font-semibold">{smtpRecipient}</span> in real-time.
                              </>
                            ) : (
                              <>
                                Thank you <span className="text-foreground font-semibold">{formData.name}</span>! Your structural specifications have been processed in Sandbox Simulator. <br />
                                <span className="text-amber-500 font-semibold text-[11px] block mt-1">To receive actual email notifications directly to your Gmail inbox, configure the SMTP server credentials (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO) in your environment variables.</span>
                              </>
                            )}
                          </p>
                        </div>

                        {/* Emailed Specs Details Preview */}
                        <div className="text-left bg-background/80 rounded-xl border border-border p-4 max-w-xl mx-auto space-y-2">
                          <p className="text-[10px] font-mono uppercase text-primary font-bold tracking-widest border-b border-border pb-1">
                            TRANSMITTED MESSAGE SPECIFICATIONS PREVIEW:
                          </p>
                          <pre className="text-[10px] font-mono text-foreground/80 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                            {sentMessageBody}
                          </pre>
                        </div>

                        <div className="font-mono text-[10px] text-[#060a12] bg-primary rounded-lg p-3 max-w-sm mx-auto font-bold animate-pulse">
                          REFERENCE TOKEN: {referenceToken || "CIKAY-LIFT-55266"}
                        </div>
                        <button 
                          onClick={() => {
                            setQuoteSubmitted(false);
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              buildingType: "Residential Tower",
                              customSpecs: "",
                              message: ""
                            });
                          }}
                          className="px-6 py-2.5 rounded-lg bg-card border border-border hover:border-primary/50 text-xs font-semibold cursor-pointer"
                        >
                          Submit Another Specification Request
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

            </div>
          </Floor>

          {/* Elegant Page Footer */}
          <footer className="border-t border-border mt-20 py-12 px-6 bg-card/20 rounded-t-3xl">
            <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
              
              {/* Trust & Star Rating Badge Section */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-border/60 pb-8 text-center md:text-left">
                {/* Trust score column */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-[#dfa057] text-[#dfa057]" />
                    ))}
                    <span className="ml-2 font-display font-bold text-foreground text-sm">4.9 / 5.0 Rating</span>
                  </div>
                  <h4 className="font-display font-semibold text-foreground text-base">Verified Safety & Performance</h4>
                  <p className="text-xs text-muted-foreground leading-normal max-w-sm">
                    Based on 512+ verified installations, annual maintenance inspections, and high-speed multi-tier elevator commissioning reviews.
                  </p>
                </div>

                {/* Interactive Star Rating Column */}
                <div className="flex flex-col items-center md:items-end justify-center space-y-3">
                  <span className="text-xs font-mono uppercase text-primary font-bold tracking-wider">
                    {userRating > 0 ? "Thank you for rating us!" : "Rate your CIKAY experience:"}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isHighlighted = (hoverRating || userRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 focus:outline-none transition-all hover:scale-125 cursor-pointer"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star 
                            className={`h-6 w-6 transition-all duration-200 ${
                              isHighlighted 
                                ? "fill-[#dfa057] text-[#dfa057] drop-shadow-[0_0_8px_rgba(223,160,87,0.6)]" 
                                : "text-muted-foreground/40 hover:text-primary/70"
                            }`} 
                          />
                        </button>
                      );
                    })}
                  </div>

                  {userRating > 0 && (
                    <motion.p 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-[11px] font-mono text-primary font-semibold"
                    >
                      You rated us {userRating} Star{userRating > 1 ? "s" : ""}! We appreciate your support.
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Bottom Brand, Links, & Contact Grid */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/40 text-left">
                {/* Brand Column */}
                <div className="flex flex-col items-start space-y-4">
                  <Logo size={32} />
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                  CIKAY Elevator Private Limited — reliable elevator installation, AMC, repair and modernization for modern India.
                  </p>
                </div>

                {/* Quick Links Column */}
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-foreground text-sm tracking-wide">
                    <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">Quick Links</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-foreground font-mono">
                    <li>
                      <a href="#why" className="hover:text-primary transition-colors flex items-center gap-1.5">
                        <ChevronRight className="h-3 w-3 text-primary" /> About
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="hover:text-primary transition-colors flex items-center gap-1.5">
                        <ChevronRight className="h-3 w-3 text-primary" /> Services
                      </a>
                    </li>
                    <li>
                      <a href="#testimonials" className="hover:text-primary transition-colors flex items-center gap-1.5">
                        <ChevronRight className="h-3 w-3 text-primary" /> Projects
                      </a>
                    </li>
                    <li>
                      <a href="#contact" className="hover:text-primary transition-colors flex items-center gap-1.5">
                        <ChevronRight className="h-3 w-3 text-primary" /> Contact
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact Info Column */}
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-foreground text-sm tracking-wide">
                    <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">Contact</span>
                  </h4>
                  <ul className="space-y-3 text-xs text-muted-foreground font-mono">
                    <li className="flex items-center gap-2">
                      <PhoneCall className="h-3.5 w-3.5 text-primary" />
                      <a href="tel:+919639099990" className="hover:text-primary transition-colors">+91 96390 99990</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      <a href="mailto:sales@cikayelevator.com" className="hover:text-primary transition-colors">sales@cikayelevator.com</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      <a href="mailto:info@cikayelevator.com" className="hover:text-primary transition-colors">info@cikayelevator.com</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Copyright and compliance info */}
              <div className="w-full border-t border-border/40 pt-6 text-center font-mono text-[10px] text-muted-foreground/60 space-y-2">
                <p>© {new Date().getFullYear()} CIKAY Elevator Private Limited. All Rights Reserved.</p>
                <p className="max-w-xl mx-auto leading-relaxed">
                  Designed with desktop scroll-synchronization & German standard VVVF elevator simulation. Safety compliance and ISO standard controls active.
                </p>
              </div>

            </div>
          </footer>

        </main>
      </div>
    </>
  );
}
