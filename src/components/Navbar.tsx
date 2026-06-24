import { Logo } from "./Logo";
import { Phone, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-0">
      <div className="glass mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full px-5 py-2 md:mx-6 md:px-6 shadow-[var(--shadow-elegant)] border border-white/5">
        <a href="#hero" className="flex items-center"><Logo size={44} /></a>
        <nav className="hidden items-center gap-7 text-[13px] font-medium tracking-wide text-foreground/75 md:flex">
          <a href="#about" className="transition hover:text-primary">About</a>
          <a href="#services" className="transition hover:text-primary">Services</a>
          <a href="#gallery" className="transition hover:text-primary">Gallery</a>
          <a href="#why" className="transition hover:text-primary">Why Us</a>
          <a href="#testimonials" className="transition hover:text-primary">Testimonials</a>
          <a href="#contact" className="transition hover:text-primary">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="tel:+919639099990"
            className="flex items-center justify-center gap-2 rounded-full bg-primary p-2.5 sm:px-4 sm:py-2 text-[13px] font-medium text-primary-foreground transition hover:opacity-90 shadow-sm"
            aria-label="Call CIKAY Elevator"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline font-semibold">+91 96390 99990</span>
          </a>
          <button
            onClick={onMenuClick}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/80 text-foreground hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Open sidebar menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
