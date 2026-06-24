import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Clock, 
  Users, 
  ShieldCheck, 
  LayoutGrid,
  Settings
} from "lucide-react";
import { Logo } from "./Logo";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Why Us", href: "#why" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (href: string) => {
    onClose();
    // Smooth scroll transition
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm"
          />

          {/* Sidebar drawer body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed bottom-0 right-0 top-0 z-[110] flex h-full w-full max-w-[420px] flex-col border-l border-border/80 bg-background/95 p-6 shadow-2xl backdrop-blur-md overflow-y-auto"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border/60">
              <a href="#hero" onClick={() => onClose()}>
                <Logo size={42} />
              </a>
              <button
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full border border-border/65 hover:border-primary/50 hover:bg-foreground/5 text-foreground transition-colors cursor-pointer"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Links */}
            <div className="py-8 text-left space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary font-semibold mb-3">
                NAVIGATION DECK
              </p>
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.href)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-display font-medium text-foreground/85 hover:text-primary hover:bg-foreground/5 transition-all text-left cursor-pointer group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            {/* Professional Business Info Section */}
            <div className="flex-1 text-left space-y-6 pt-6 border-t border-border/50">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary font-semibold">
                LOCALIZED SPECIFICATIONS
              </p>

              {/* Core Features Badges */}
              <div className="grid grid-cols-2 gap-3 pb-2 text-[11px] font-mono">
                <div className="flex items-center gap-2 text-foreground/95 bg-foreground/5 p-2 rounded-lg border border-border/80">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <span>Approved (VVVF)</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/95 bg-foreground/5 p-2 rounded-lg border border-border/80">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>24/7 Red-Line</span>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase">HOTLINE DISPATCH</span>
                    <a href="tel:+919639099990" className="text-foreground font-semibold hover:text-primary transition-colors">
                      +91 96390 99990
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase">SUPPORT REGULATION</span>
                    <a href="mailto:info@cikayelevator.com" className="text-foreground font-semibold hover:text-primary transition-colors block leading-tight">
                      info@cikayelevator.com
                    </a>
                    <a href="mailto:contact@cikay.co" className="text-foreground font-semibold hover:text-primary transition-colors block text-[11px] text-muted-foreground">
                      contact@cikay.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase">MANUFACTURING HQ</span>
                    <p className="text-foreground leading-normal font-semibold text-[11px]">
                      CIKAY Industrial Gate, Sector 4, Haridwar Industrial Area, Uttarakhand, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="mt-auto pt-6 border-t border-border/60 text-center font-mono text-[9px] text-muted-foreground/60">
              © {new Date().getFullYear()} CIKAY Elevator Private Limited.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
