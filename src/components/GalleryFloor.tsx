import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ArrowUpRight, CheckCircle } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 1,
    title: "Imperial Gold & Mirror Cabin",
    category: "Luxury Cabins",
    description: "Premium gold-trim elevator cabin with luxurious custom wood accents, integrated ambient warm lighting, and a mirror wall finish.",
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Royal Capsule Panorama Lift",
    category: "Capsule & Glass",
    description: "Futuristic semi-circular capsule elevator built with curved glass structural panels, giving a full panoramic view of the building courtyard.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Sleek Corporate Atrium Lifts",
    category: "Commercial Systems",
    description: "High-speed modern commercial elevators operating in a synchronized multi-shaft configuration inside a glossy corporate building bank.",
    image: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Heavy Duty Traction Geared Motor",
    category: "Technical Hardware",
    description: "Premium heavy-duty cast iron traction geared machinery designed with high-grade copper wires to move heavy passenger blocks flawlessly.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Brushed Black Titanium Cabin",
    category: "Luxury Cabins",
    description: "Elegant layout styled with custom dark vertical lines, satin-brushed titanium steel frames, and precision laser-cut floor patterns.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Panoramic Architectural Glass Elevator",
    category: "Capsule & Glass",
    description: "Fully transparent structural glass elevator utilizing high-tensile safety glass and smooth gearless magnetic traction guides.",
    image: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    title: "Premium Residential Elevator Bank",
    category: "Commercial Systems",
    description: "Silent, energy-efficient residential passenger elevator lobby with smart indicator LED arrows and precise VVVF leveling boards.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    title: "Microprocessor VVVF Control Panel",
    category: "Technical Hardware",
    description: "Smart digital controller boards designed with Japanese processors to monitor floor decel, ARD backup battery, and door sensors.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
  }
];

const CATEGORIES = ["All", "Luxury Cabins", "Capsule & Glass", "Commercial Systems", "Technical Hardware"];

interface GalleryFloorProps {
  onSelectImage: (details: string) => void;
}

export function GalleryFloor({ onSelectImage }: GalleryFloorProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredImages = activeCategory === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const handleEnquire = (item: GalleryItem) => {
    setSelectedItem(null);
    const textToFill = `I am interested in the "${item.title}" from your Bespoke Gallery. Please provide quotation details and technical specifications.`;
    onSelectImage(textToFill);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-left space-y-3 max-w-2xl">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Design <span className="text-[#dfa057]">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Take a visual tour of our bespoke passenger cabins, architectural transparent capsule elevators, and heavy-duty technical components engineered with absolute safety.
          </p>
        </div>

        {/* Categories Tab Filters */}
        <div className="flex flex-wrap gap-2 justify-start md:justify-end self-start md:self-end">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#dfa057] border-[#dfa057] text-black shadow-lg"
                  : "bg-[#090e16]/60 border-border text-muted-foreground hover:border-[#dfa057]/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Images with Framer Motion Layout Animations */}
      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#090e16]/60 border border-border/65 hover:border-[#dfa057]/60 hover:shadow-[var(--shadow-glow)] transition-all duration-300 aspect-[4/3] flex flex-col justify-end"
            >
              {/* Main image with zoom effect */}
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Smooth dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent transition-opacity duration-300" />

              {/* Detail Contents */}
              <div className="relative p-5 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1.5 text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfa057] bg-[#dfa057]/10 px-2.5 py-1 rounded-md border border-[#dfa057]/30">
                  {item.category}
                </span>
                <h3 className="font-display font-bold text-base text-white pt-1 flex items-center justify-between gap-2 leading-tight">
                  {item.title}
                  <ZoomIn className="h-4 w-4 text-[#dfa057] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shrink-0" />
                </h3>
                <p className="text-[11px] text-muted-foreground/90 line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Gallery Image Details Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-5xl bg-[#070b12] border border-border/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Side: Large image preview */}
              <div className="relative lg:w-3/5 overflow-hidden bg-black flex items-center justify-center h-[40vh] lg:h-auto">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#dfa057] text-black text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                    {selectedItem.category}
                  </span>
                </div>
              </div>

              {/* Right Side: Deep spec content */}
              <div className="lg:w-2/5 p-8 flex flex-col justify-between overflow-y-auto text-left space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#dfa057] font-semibold">
                    CIKAY ARCHITECTURAL ARCHIVE
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {selectedItem.title}
                  </h3>
                  <div className="h-px w-16 bg-[#dfa057]" />
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2.5 text-xs text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-[#dfa057] shrink-0" />
                      <span>Premium Anti-Vibration Base Railings</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-[#dfa057] shrink-0" />
                      <span>Satin Finished Gold/Black Architectural Trim</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-[#dfa057] shrink-0" />
                      <span>Digital VVVF Synchronized Door Controllers</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Action Button to contact form */}
                <button
                  onClick={() => handleEnquire(selectedItem)}
                  className="w-full bg-[#dfa057] text-black font-semibold py-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#c98e46] transition-all duration-300 shadow-md transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Request Consultation & Quote <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
