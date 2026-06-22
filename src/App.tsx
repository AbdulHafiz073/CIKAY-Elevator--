import React, { useState } from "react";
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
  Sparkle
} from "lucide-react";

import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
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
  const [loading, setLoading] = useState(true);
  
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

  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      // Auto-reset after some time
    }, 10000);
  };

  const projectDetails = [
    {
      id: 1,
      title: "Royal Regency Arcade",
      location: "New Delhi, India",
      floors: "18 Floors",
      units: "4 Duplex High Speed Lifts",
      type: "Commercial Hub",
      desc: "Complete luxury gold marble design with German VVVF controller. Speed operates at 2.0 m/s with fully custom microprocessor sync.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Elysium Premium Heights",
      location: "Mumbai, India",
      floors: "32 Floors",
      units: "6 High-Rise Cabin Passenger Lifts",
      type: "Residential Elite",
      desc: "Ultra silent operation under 40dB, geared traction motors, smart energy regenerative drives saving up to 35% electricity.",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Apollo Medical Care Facility",
      location: "Dehradun, India",
      floors: "8 Floors",
      units: "2 Stretcher Lifts + 1 Dumbwaiter",
      type: "Healthcare Hospital",
      desc: "Sterile stainless-steel antimicrobial panels, absolute exact millimeter floor alignment logic for seamless stretcher transit.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
    },
  ];

  return (
    <>
      {/* 1. Custom Elevator Entrance Loading Screen */}
      <LoadingScreen />

      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-300">
        <Navbar />

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
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-widest text-primary w-fit shadow-sm bounce-slow">
                  <Sparkles className="h-3.5 w-3.5" /> High-Performance Elevators
                </span>
                
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                  Pioneering <span className="gold-text">Luxury Speed</span> & Robust Engineering
                </h1>
                
                <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
                  CIKAY Elevator Pvt Ltd redefines vertical transit with high-end German microprocessor controls, premium gearless traction machines, and mesmerizing aesthetic custom cabins. Experience travel of class.
                </p>

                {/* Industrial Stats badges */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/80">
                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-bold gold-text">1500+</div>
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
                    href="#configurator" 
                    className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--shadow-glow)] flex items-center gap-2 cursor-pointer"
                  >
                    Custom Cabin Configurator <ArrowRight className="h-4 w-4" />
                  </a>
                  <a 
                    href="#contact" 
                    className="px-6 py-3 rounded-full glass border border-border hover:border-primary/50 text-foreground transition-all font-semibold text-sm cursor-pointer"
                  >
                    Get Free Feasibility Report
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
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                    Crafting Seamless, High-Safety Journeys Since Inception
                  </h2>
                </div>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  CIKAY Elevator Private Limited has established itself as an engineering power-broker in the vertical transit sector. We design, manufacture, install, and service architectural passenger lifts, cargo systems, hospital stretcher complexes, capsule pods, and futuristic escalators.
                </p>

                <p className="text-muted-foreground text-xs sm:text-sm">
                  Our development focus rests heavily on eliminating risk mechanics. By matching premium high-tensile steel frames with German copper wire VVVF motors, our systems maintain effortless stability even under critical peak weight hours.
                </p>

                {/* Dynamic corporate values */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-card border border-border/80 flex gap-3">
                    <Award className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">ISO 9001:2015 Approved</h4>
                      <p className="text-xs text-muted-foreground mt-1">Strictest manufacture standards for industrial installations</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border/80 flex gap-3">
                    <Users className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Expert Field Operatives</h4>
                      <p className="text-xs text-muted-foreground mt-1">24/7 localized structural help units in your metropolitan area</p>
                    </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Services List */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold font-display">SYSTEM RANGE</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                    Custom Engineered Lifting Mechanisms
                  </h2>
                  <p className="text-muted-foreground text-sm max-w-lg">
                    Whether you are developing a modern high-rise commercial complex, a boutique duplex residency, or a crucial critical-care health hub, CIKAY delivers perfectly mapped lifting assets.
                  </p>
                </div>

                {/* Service Cards Layout */}
                <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-3 scrollbar-thin">
                  
                  {/* Service Card 1 */}
                  <div className="p-4 rounded-xl bg-card border border-border/80 hover:border-primary/40 transition-colors duration-300 group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-mono group-hover:bg-primary group-hover:text-primary-foreground transition-colors">01</span>
                        <h3 className="font-display font-semibold text-base transition-colors group-hover:text-primary">Passenger Luxury Traction Lifts</h3>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 pl-9">
                      Equipped with gearless traction technology, high-end quiet operation, and customized marble or gold interior trim. Designed primarily for executive corporate hubs and high-rise condominiums.
                    </p>
                  </div>

                  {/* Service Card 2 */}
                  <div className="p-4 rounded-xl bg-card border border-border/80 hover:border-primary/40 transition-colors duration-300 group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-mono group-hover:bg-primary group-hover:text-primary-foreground transition-colors">02</span>
                        <h3 className="font-display font-semibold text-base transition-colors group-hover:text-primary">Heavy Stretcher Hospital Lifts</h3>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 pl-9">
                      Specifically engineered with precise speed transition profiles to avoid passenger discomfort. Features antimicrobial stainless finish and reliable Automatic Rescue Device (ARD) default mapping.
                    </p>
                  </div>

                  {/* Service Card 3 */}
                  <div className="p-4 rounded-xl bg-card border border-border/80 hover:border-primary/40 transition-colors duration-300 group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-mono group-hover:bg-primary group-hover:text-primary-foreground transition-colors">03</span>
                        <h3 className="font-display font-semibold text-base transition-colors group-hover:text-primary">Bespoke Glass Capsule Pods</h3>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 pl-9">
                      Panoramas centered beautifully. Full 180° or 360° clear visibility panels styled with brushed metals, creating majestic exterior accents for high-end boutique hotels and modern shopping arcades.
                    </p>
                  </div>

                  {/* Service Card 4 */}
                  <div className="p-4 rounded-xl bg-card border border-border/80 hover:border-primary/40 transition-colors duration-300 group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-mono group-hover:bg-primary group-hover:text-primary-foreground transition-colors">04</span>
                        <h3 className="font-display font-semibold text-base transition-colors group-hover:text-primary">Heavy Industrial Freight Elevators</h3>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 pl-9">
                      Engineered for intense warehouses. Built using high-impact structural checker-plates and robust gearboxes, holding capacities ranging up to 10 Metric Tons securely.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column Interactive Exploded View */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="bg-card/30 rounded-2xl p-6 border border-border max-w-sm w-full relative">
                  <h4 className="text-sm font-display font-bold gold-text text-center mb-1">INTERACTIVE CUTAWAY</h4>
                  <p className="text-[10px] text-muted-foreground text-center mb-6">Exploded diagram of traction lift parameters</p>
                  <LiftCutaway />
                </div>
              </div>

            </div>
          </Floor>


          {/* ========================================================= */}
          {/* FLOOR 4: OUR STRENGTHS & KEY DIFFERENTIATORS (WHY US) */}
          {/* ========================================================= */}
          <Floor id="why" number="4" label="Architectural Strengths">
            <div className="space-y-12">
              <div className="text-center space-y-3">
                <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">THE CIKAY SHIELD</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                  Why Leading Builders Choose CIKAY
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
                  <h3 className="font-display font-bold text-lg mb-2">Zero-Failure Safety Sockets</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Fitted with robust overspeed governors and dynamic safety clamps that mechanically anchor the cab immediately if safe operating velocities are ever breached.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">German VVVF Microprocessors</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Precision controller drives optimize current loops and door transition speeds, conserving up to 40% more energy compared to conventional systems.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Instant Rescue (ARD)</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    If power lines fail, the integrated backup Automatic Rescue Device kicks in instantly to smoothly navigate the cabin to the nearest floor and unlock the doors safely.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Real-time Pulse Monitoring</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Smart diagnostic sensors trace rail friction, floor alignment millisecond offsets, and door mechanical fatigue to warn technicians of wear patterns way before fault codes trigger.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">24/7 Red-Line Assistance</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    A dedicated emergency dispatch grid is standing by. All CIKAY client installations can trigger immediate direct cellular tickets if mechanical queries ever arise.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Millimeter Levelling Accuracy</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Sensory leveling flags coordinate with the magnetic deceleration units, preventing any stepping trip hazards for wheelchair boundaries or medical carts.
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
                              ? "bg-primary border-primary text-primary-foreground font-semibold" 
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
                              ? "bg-primary border-primary text-primary-foreground font-semibold" 
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
                              ? "bg-primary border-primary text-primary-foreground font-semibold" 
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
                <div className="flex bg-primary/10 border border-primary/20 rounded-xl p-4 gap-3">
                  <Sparkle className="h-5 w-5 text-primary shrink-0 animate-pulse mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-normal">
                    Based on your selected material (<span className="text-foreground font-bold">{config.style}</span>), our standard fabrication delivery time is <span className="text-primary font-bold">14 Working Days</span>, fully shipped with dual mechanical rail stabilizers.
                  </p>
                </div>
              </div>

              {/* Right Column Custom Live Spec readout sheet */}
              <div className="lg:col-span-5">
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
                    className="block text-center w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-glow)] cursor-pointer"
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
          {/* FLOOR 2: ARCHITECTURAL MARVELS & COMPLETED PROJECTS */}
          {/* ========================================================= */}
          <Floor id="projects" number="2" label="Completed Marvels">
            <div className="space-y-10">
              <div className="space-y-3">
                <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">REAL PERFORMANCE</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">CIKAY Landmark Installations</h2>
                <p className="text-muted-foreground text-sm max-w-xl">
                  Inspect some of our prominent national installations, showcasing exceptional cabin finishes and multi-shaft high-speed coordinations.
                </p>
              </div>

              {/* Grid of Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectDetails.map((proj, idx) => (
                  <div 
                    key={proj.id} 
                    className="group bg-card rounded-2xl overflow-hidden border border-border flex flex-col justify-between hover:border-primary/50 transition-all duration-300 shadow-sm"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute top-3 left-3 bg-black/80 text-primary text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border border-primary/30">
                        {proj.type}
                      </div>
                    </div>

                    {/* Project Text contents */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-display font-medium text-lg leading-tight transition-colors group-hover:text-primary">{proj.title}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                          <MapPin className="h-3 w-3 text-primary" /> {proj.location}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pt-1.5">
                          {proj.desc}
                        </p>
                      </div>

                      {/* Mini specs footer */}
                      <div className="border-t border-border/80 pt-4 mt-4 grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div>
                          <span className="text-muted-foreground block uppercase text-[8px]">Floors:</span>
                          <span className="text-foreground font-semibold">{proj.floors}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block uppercase text-[8px]">Configuration:</span>
                          <span className="text-foreground font-semibold">{proj.units}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Floor>


          {/* ========================================================= */}
          {/* FLOOR G: INSTANT CONCIERGE & CONTACT REQUEST (CONTACT) */}
          {/* ========================================================= */}
          <Floor id="contact" number="G" label="Ground level dispatch">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
              
              {/* Left Column Contact Mechanics Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">GET IN TOUCH</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                    Secure An Expert Structural Inspection
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
                      <a href="mailto:info@cikayelevator.com" className="text-foreground font-semibold hover:text-primary transition-colors text-sm">info@cikayelevator.com / contact@cikay.co</a>
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
                <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/40 backdrop-blur-sm shadow-[var(--shadow-elegant)]">
                  
                  <AnimatePresence mode="wait">
                    {!quoteSubmitted ? (
                      <motion.form 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleFormSubmit} 
                        className="space-y-4"
                      >
                        <h3 className="font-display text-lg font-bold">Lobby Dispatch Advisory Unit</h3>
                        <p className="text-xs text-muted-foreground">Fill in details for quick structural quote estimates</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider font-mono text-muted-foreground mb-1.5">Your Name *</label>
                            <input 
                              type="text" 
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Abdul Hafiz" 
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
                          <label className="block text-[10px] uppercase tracking-wider font-mono text-muted-foreground mb-1.5">Email Email Address *</label>
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
                            placeholder="Provide any bespoke architectural height details, dimensions, or speed targets..." 
                            className="w-full text-xs font-sans px-3.5 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/80 focus:outline-none focus:ring-1 focus:ring-primary/80"
                          ></textarea>
                        </div>

                        <button 
                          type="submit" 
                          className="w-full font-display font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl bg-primary text-primary-foreground transition-all duration-300 hover:scale-[1.01] hover:shadow-[var(--shadow-glow)] cursor-pointer"
                        >
                          Send Advisory Dispatch Request
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12 space-y-5"
                      >
                        <div className="h-16 w-16 mx-auto rounded-full bg-primary/25 border border-primary text-primary flex items-center justify-center">
                          <CheckCircle2 className="h-8 w-8 animate-bounce" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-display font-bold text-2xl gold-text">Request Dispatched Successfully!</h3>
                          <p className="text-xs text-muted-foreground max-w-md mx-auto">
                            Thank you <span className="text-foreground font-semibold">{formData.name}</span>! Your configuration specifics and contact details have been successfully transmitted to our engineering team.
                          </p>
                        </div>
                        <div className="font-mono text-[10px] text-primary/85 bg-primary/10 border border-primary/20 rounded-lg p-3 max-w-sm mx-auto">
                          REFERENCE TOKEN: CIKAY-LIFT-{(Math.random() * 100000).toFixed(0)}
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
          <footer className="border-t border-border mt-20 py-8 text-center text-xs font-mono text-muted-foreground/80 space-y-3 px-4">
            <div className="flex justify-center mb-2">
              <Logo size={28} />
            </div>
            <p>© {new Date().getFullYear()} CIKAY Elevator Private Limited. All Rights Reserved.</p>
            <p className="text-[10px] text-muted-foreground/50">Designed with desktop scroll-synchronization & German standard VVVF elevator simulation.</p>
          </footer>

        </main>
      </div>
    </>
  );
}
