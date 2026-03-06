"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, Compass } from "lucide-react";
import { useEasterEgg } from "@/contexts/easter-egg-context";

const links = [
  { href: "#luogo", label: "Il Luogo" },
  { href: "#programma", label: "Programma" },
  { href: "#aggiornamenti", label: "Aggiornamenti" },
];

const punkLinks = [
  { href: "#luogo", label: "Il Bunker" },
  { href: "#programma", label: "Il Manifesto" },
  { href: "#aggiornamenti", label: "Dispacci" },
];

const sectionIds = links.map((l) => l.href.slice(1));

function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY + offset;

      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveId(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return activeId;
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(sectionIds);
  const { isActive } = useEasterEgg();

  const activeLinks = isActive ? punkLinks : links;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsOpen(false);
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL hash without jumping
        window.history.pushState(null, "", href);
      }
    },
    [],
  );

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gold/10 bg-parchment/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Navigazione principale"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", " ");
          }}
          className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-70"
          aria-label="Torna in cima alla pagina"
        >
          <Compass className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span className="font-serif text-sm font-semibold tracking-wide">
            {isActive ? "La Resistenza" : "Il Ritrovo"}
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {activeLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative text-sm transition-colors duration-200 ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-gold/10 bg-parchment/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`rounded-md px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-parchment-dark font-medium text-foreground"
                      : "text-muted-foreground hover:bg-parchment-dark hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
