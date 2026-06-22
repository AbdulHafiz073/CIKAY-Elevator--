import { Logo } from "./Logo";
import { Phone } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 lg:mx-6 lg:px-5 shadow-[var(--shadow-elegant)]">
        <a href="#hero"><Logo size={36} /></a>
        <nav className="hidden items-center gap-7 text-[13px] font-medium tracking-wide text-foreground/75 md:flex">
          <a href="#about" className="transition hover:text-primary">About</a>
          <a href="#services" className="transition hover:text-primary">Services</a>
          <a href="#why" className="transition hover:text-primary">Why Us</a>
          <a href="#projects" className="transition hover:text-primary">Projects</a>
          <a href="#contact" className="transition hover:text-primary">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="tel:+919639099990"
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition hover:opacity-90 shadow-sm"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+91 96390 99990</span>
          </a>
        </div>
      </div>
    </header>
  );
}
