/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  allTourPackages, 
  destinationsData, 
  tanzaniteProducts, 
  artItems, 
  associationImages,
  immersiveEscapesImgs,
  immersiveEscapesReels,
  countryColors
} from "./data";
import { TourPackage } from "./types";
import { translate } from "./translations";

export default function App() {
  const tanzaniteScrollRef = useRef<HTMLDivElement>(null);
  const artScrollRef = useRef<HTMLDivElement>(null);
  const romanceScrollRef = useRef<HTMLDivElement>(null);
  const corporateScrollRef = useRef<HTMLDivElement>(null);
  const southAfricaScrollRef = useRef<HTMLDivElement>(null);
  const victoriaFallsScrollRef = useRef<HTMLDivElement>(null);
  const mauritiusScrollRef = useRef<HTMLDivElement>(null);
  const zanzibarScrollRef = useRef<HTMLDivElement>(null);
  const otherDestScrollRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref && ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const [currentView, setCurrentView] = useState<string>("home");
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileDestOpen, setMobileDestOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<{ [title: string]: { qty: number; img: string; price?: string } }>({});
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  // Language and Currency Preferences
  const [language, setLanguage] = useState<"en" | "pt">(() => {
    const saved = localStorage.getItem("language");
    return (saved === "en" || saved === "pt") ? saved : "en";
  });
  const [currency, setCurrency] = useState<string>("ZAR"); // ZAR, BRL, USD, EUR, GBP

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Boutique dynamic currency conversion helper
  const formatBoutiquePrice = (baseZarPriceStr: string | undefined, targetCurrency: string) => {
    if (!baseZarPriceStr) return "";
    const numericVal = parseFloat(baseZarPriceStr.replace(/[^0-9]/g, ""));
    if (isNaN(numericVal)) return baseZarPriceStr;

    const rates: { [key: string]: { rate: number; symbol: string } } = {
      ZAR: { rate: 1.0, symbol: "R " },
      BRL: { rate: 0.29, symbol: "R$ " },
      USD: { rate: 0.054, symbol: "$" },
      EUR: { rate: 0.050, symbol: "€" },
      GBP: { rate: 0.042, symbol: "£" }
    };

    const config = rates[targetCurrency] || rates.ZAR;
    const converted = Math.round(numericVal * config.rate);
    return `${config.symbol}${converted.toLocaleString("en-US")}`;
  };

  // Sum up boutique cart prices in selected currency
  const getCartTotal = () => {
    let totalZar = 0;
    Object.keys(cart).forEach((title) => {
      const item = cart[title];
      if (item.price) {
        const val = parseFloat(item.price.replace(/[^0-9]/g, ""));
        if (!isNaN(val)) {
          totalZar += val * item.qty;
        }
      }
    });
    return totalZar > 0 ? formatBoutiquePrice(`R ${totalZar}`, currency) : null;
  };

  // Mauritius and Zanzibar see-more toggles
  const [showAllMauritius, setShowAllMauritius] = useState<boolean>(false);
  const [showAllZanzibar, setShowAllZanzibar] = useState<boolean>(false);

  // Active perspective category factor
  const [activePerspective, setActivePerspective] = useState<string>("places");

  // Immersive escapes slider index
  const [immersiveIndex, setImmersiveIndex] = useState<number>(0);

  // Inject FontAwesome and Elfsight scripts on mount
  useEffect(() => {
    const faLink = document.createElement("link");
    faLink.rel = "stylesheet";
    faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(faLink);

    const elfsightScript = document.createElement("script");
    elfsightScript.src = "https://elfsightcdn.com/platform.js";
    elfsightScript.async = true;
    document.body.appendChild(elfsightScript);

    return () => {
      if (document.head.contains(faLink)) {
        document.head.removeChild(faLink);
      }
      try {
        if (document.body.contains(elfsightScript)) {
          document.body.removeChild(elfsightScript);
        }
      } catch (e) {
        // Safe check if script was already unmounted
      }
    };
  }, []);

  // Sync window location hashes to React state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith("#destination-")) {
        const destId = hash.replace("#destination-", "");
        if (destinationsData[destId]) {
          setSelectedDestId(destId);
          setCurrentView("destination");
        }
      } else if (hash) {
        const viewName = hash.replace("#", "") + "-view";
        const cleanView = hash.replace("#", "");
        if (["home", "tours", "corporate", "romance", "about", "store"].includes(cleanView)) {
          setCurrentView(cleanView);
          setSelectedDestId(null);
        }
      } else {
        setCurrentView("home");
        setSelectedDestId(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Trigger on initial mount
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Autoplay for Immersive Escapes
  useEffect(() => {
    const interval = setInterval(() => {
      setImmersiveIndex((prev) => (prev + 1) % immersiveEscapesImgs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Perspective Did-You-Know facts
  const perspectiveFacts: { [key: string]: { title: string; text: string } } = {
    places: {
      title: "Africa's Hidden Gems",
      text: "The Blyde River Canyon in South Africa is the third largest canyon in the world and the largest 'green canyon', a spectacular, lush marvel."
    },
    inspiration: {
      title: "The Spirit of Ubuntu",
      text: "'I am because we are.' A beautiful philosophy highlighting universal human connection, community, and hospitality."
    },
    culture: {
      title: "Ancient Roots",
      text: "The San people have exquisitely preserved rock art sites in the high Drakensberg mountains dating back over 25,000 years."
    }
  };

  const currentFact = perspectiveFacts[activePerspective] || perspectiveFacts["places"];

  // Booking details updated to match the specific calendar booking link
  const calendarBookingLink = "https://calendar.app.google/H861GnrHcVE92TLK7";

  const emailCorporateLink = (() => {
    const subject = encodeURIComponent("Corporate Retreats & Summits Consultation Request");
    const bodyText = "Hello Viemma Tours,\n\nI would like to request a consultation for our upcoming Corporate Retreat/Summit.\n\nHere are some initial details regarding our requirement:\n- Company/Organization Name: \n- Group Size: \n- Proposed Dates / Duration: \n- Target Destination(s): \n- Special Requirements (e.g., conference facilities, team-building, specific dietary requests): \n\nPlease contact me back to schedule a planning call.\n\nThank you!";
    const body = encodeURIComponent(bodyText);
    return `mailto:info@viemmatours.africa?subject=${subject}&body=${body}`;
  })();

  const emailRomanticLink = (() => {
    const subject = encodeURIComponent("Bespoke Romantic Escapes & Honeymoons Consultation Request");
    const bodyText = "Hello Viemma Tours,\n\nI would like to request a consultation for our upcoming Romantic Escape / Honeymoon.\n\nHere are some initial details:\n- Partner Names: \n- Preferred Destinations: \n- Intended Travel Dates: \n- Occasion (e.g., Honeymoon, Anniversary, Proposal, Romantic getaway): \n- Specific Desires (e.g., private beach dinner, spa treatments, catamaran charter): \n\nPlease get in touch to schedule our consultation.\n\nThank you!";
    const body = encodeURIComponent(bodyText);
    return `mailto:info@viemmatours.africa?subject=${subject}&body=${body}`;
  })();

  // Navigation switching handler
  const switchView = (view: string, destId: string | null = null) => {
    setCurrentView(view);
    setSelectedDestId(destId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (destId) {
      window.location.hash = `destination-${destId}`;
    } else {
      window.location.hash = view;
    }
  };

  // Cart operations
  const addToCart = (title: string, img: string, price?: string) => {
    setCart((prev) => {
      const existing = prev[title];
      if (existing) {
        return {
          ...prev,
          [title]: { ...existing, qty: existing.qty + 1 }
        };
      } else {
        return {
          ...prev,
          [title]: { qty: 1, img, price }
        };
      }
    });
    setCartOpen(true);
  };

  const updateQty = (title: string, delta: number) => {
    setCart((prev) => {
      const existing = prev[title];
      if (!existing) return prev;
      const nextQty = existing.qty + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[title];
        return copy;
      } else {
        return {
          ...prev,
          [title]: { ...existing, qty: nextQty }
        };
      }
    });
  };

  const getCartCount = (): number => {
    return Object.keys(cart).reduce((acc, key) => acc + cart[key].qty, 0);
  };

  const checkoutEmail = () => {
    const itemsKeys = Object.keys(cart);
    if (itemsKeys.length === 0) return;

    const isPt = language === "pt";
    const subjectLine = isPt 
      ? "Solicitação de Orçamento - Boutique Viemma"
      : "Viemma Boutique - Request for Quotation";
    const subject = encodeURIComponent(subjectLine);

    let bodyText = isPt 
      ? "Olá Viemma Tours,\n\nGostaria de solicitar um orçamento/pedido de compra para os seguintes itens da Boutique Viemma:\n\n"
      : "Hello Viemma Tours,\n\nI would like to request a quotation/purchase order for the following items from The Viemma Boutique:\n\n";

    itemsKeys.forEach((title) => {
      const item = cart[title];
      const translatedTitle = translate(title, language);
      const convertedPrice = item.price ? formatBoutiquePrice(item.price, currency) : "";
      bodyText += `- ${item.qty}x ${translatedTitle}${convertedPrice ? " (" + convertedPrice + ")" : ""}\n`;
    });

    if (getCartTotal()) {
      bodyText += `\n${isPt ? "Valor Estimado Total" : "Estimated Total"}: ${getCartTotal()}\n`;
    }

    bodyText += isPt
      ? "\nPor favor, entre em contato de volta com as opções de preço, frete e instruções de pagamento.\n\nMuito obrigado!"
      : "\nPlease contact me back with pricing, shipping options, and payment instructions.\n\nThank you!";

    const body = encodeURIComponent(bodyText);
    window.location.href = `mailto:info@viemmatours.africa?subject=${subject}&body=${body}`;
  };

  // Modal helpers
  const openTourModal = (pkg: TourPackage) => {
    setSelectedTour(pkg);
    setBookingModalOpen(true);
  };

  // South African Package List (Cape Town, Kruger, Garden Route, Johannesburg)
  // Botswana totally excluded
  const southAfricanList = allTourPackages.filter((p) => p.destId === "south-africa");
  const victoriaFallsList = allTourPackages.filter((p) => p.destId === "victoria-falls");
  const mauritiusList = allTourPackages.filter((p) => p.destId === "mauritius");
  const zanzibarList = allTourPackages.filter((p) => p.destId === "zanzibar");

  const otherDestinationsKeys = Object.keys(destinationsData).filter(
    (key) => !["south-africa", "victoria-falls", "mauritius", "zanzibar"].includes(key)
  );

  return (
    <div className="relative selection:bg-brand-accent selection:text-brand-dark overflow-x-hidden min-h-screen flex flex-col font-sans">
      
      {/* Global Background Image */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <img 
          src="https://images.pexels.com/photos/7243579/pexels-photo-7243579.jpeg" 
          className="w-full h-full object-cover scale-110 blur-[8px] opacity-65" 
          alt="Luxury Safari Backdrop Overlay" 
        />
        <div className="absolute inset-0 bg-black/35 pointer-events-none"></div>
      </div>

      {/* Top Navbar */}
      <nav className="fixed w-full z-50 transition-all duration-500 bg-black/15 md:bg-black/10 backdrop-blur-md border-b border-white/10 py-1.5 block shadow-none">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 flex justify-between items-center">
          
          {/* Logo Ribbon */}
          <a onClick={() => switchView("home")} className="flex-shrink-0 z-50 transition-transform duration-300 hover:opacity-80 py-0.5 flex items-center cursor-pointer">
            <img 
              src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXc366uzOWFLPWyEuBIMhicbjT2GajlyGrsVyeSDE68ap9hBFEamMNA78eyvIPmA-MVNbGhtCBwzKlk29IttM_jygwrCJXjmUdZt6iijoXLFzRyBcrcb_C-oH3KxcsenhczLCRl7RfOtKSy_7o02kbNgJ29iMA?key=KPDE2Lo8HhnJ3v--HqdAAw" 
              alt="Viemma Tours Logo" 
              className="h-8 md:h-10 lg:h-11 w-auto object-contain filter brightness-0 invert opacity-95 hover:opacity-100 transition-opacity duration-300"
            />
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[10px] xl:text-xs uppercase tracking-[0.2em] font-medium text-white shadow-none">
            <a onClick={() => switchView("home")} className={`hover:text-brand-accent cursor-pointer nav-link ${currentView === "home" ? "text-brand-accent animate-pulse" : "text-white"}`}>{translate("Home", language)}</a>
            
            {/* Destinations Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-brand-accent nav-link pb-1 uppercase tracking-[0.2em] cursor-pointer">
                <span>{translate("Destinations", language)}</span>
                <i className="fas fa-chevron-down text-[10px] ml-1"></i>
              </button>
              <div className="absolute top-full left-0 mt-3 w-56 bg-brand-dark/95 backdrop-blur-md shadow-xl border border-white/10 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-white z-50">
                <a onClick={() => switchView("destination", "south-africa")} className="block px-6 py-2.5 hover:bg-white/10 hover:text-brand-accent cursor-pointer transition-colors">{translate("South Africa", language)}</a>
                <a onClick={() => switchView("destination", "victoria-falls")} className="block px-6 py-2.5 hover:bg-white/10 hover:text-brand-accent cursor-pointer transition-colors">{translate("Victoria Falls", language)}</a>
                <a onClick={() => switchView("destination", "mauritius")} className="block px-6 py-2.5 hover:bg-white/10 hover:text-brand-accent cursor-pointer transition-colors">{translate("Mauritius", language)}</a>
                <a onClick={() => switchView("destination", "reunion")} className="block px-6 py-2.5 hover:bg-white/10 hover:text-brand-accent cursor-pointer transition-colors">{translate("Reunion Islands", language)}</a>
                <a onClick={() => switchView("destination", "maldives")} className="block px-6 py-2.5 hover:bg-white/10 hover:text-brand-accent cursor-pointer transition-colors">{translate("Maldives", language)}</a>
                <a onClick={() => switchView("destination", "seychelles")} className="block px-6 py-2.5 hover:bg-white/10 hover:text-brand-accent cursor-pointer transition-colors">{translate("Seychelles", language)}</a>
                <a onClick={() => switchView("destination", "zanzibar")} className="block px-6 py-2.5 hover:bg-white/10 hover:text-brand-accent cursor-pointer transition-colors">{translate("Zanzibar", language)}</a>
                <a onClick={() => switchView("destination", "mozambique")} className="block px-6 py-2.5 hover:bg-white/10 hover:text-brand-accent cursor-pointer transition-colors">{translate("Mozambique", language)}</a>
                <a onClick={() => switchView("destination", "madagascar")} className="block px-6 py-2.5 hover:bg-white/10 hover:text-brand-accent cursor-pointer transition-colors">{translate("Madagascar", language)}</a>
              </div>
            </div>

            <a onClick={() => switchView("tours")} className={`hover:text-brand-accent cursor-pointer nav-link ${currentView === "tours" ? "text-brand-accent" : "text-white"}`}>{translate("Tours", language)}</a>
            <a onClick={() => switchView("corporate")} className={`hover:text-brand-accent cursor-pointer nav-link ${currentView === "corporate" ? "text-brand-accent" : "text-white"}`}>{translate("Business Tours", language)}</a>
            <a onClick={() => switchView("about")} className={`hover:text-brand-accent cursor-pointer nav-link ${currentView === "about" ? "text-brand-accent" : "text-white"}`}>{translate("Our Story", language)}</a>
            <a onClick={() => switchView("store")} className={`hover:text-brand-accent cursor-pointer nav-link ${currentView === "store" ? "text-brand-accent" : "text-white"}`}>{translate("Boutique", language)}</a>
            <a onClick={() => setContactModalOpen(true)} className="hover:text-brand-accent cursor-pointer nav-link">{translate("Contact", language)}</a>
            
            {/* Language Toggle */}
            <div className="flex items-center gap-2 border-l border-white/20 pl-4 py-1">
              <button 
                onClick={() => setLanguage("en")} 
                className={`transition-colors font-sans hover:text-[#8c7a5b] cursor-pointer text-[10px] ${language === "en" ? "text-brand-accent font-bold underline underline-offset-4 decoration-brand-accent/60" : "text-white/60"}`}
              >
                EN
              </button>
              <span className="text-white/30 text-[10px]">|</span>
              <button 
                onClick={() => setLanguage("pt")} 
                className={`transition-colors font-sans hover:text-[#8c7a5b] cursor-pointer text-[10px] ${language === "pt" ? "text-brand-accent font-bold underline underline-offset-4 decoration-brand-accent/60" : "text-white/60"}`}
                title="Português do Brasil"
              >
                PT-BR
              </button>
            </div>

            <a 
              href={calendarBookingLink} 
              target="_blank" 
              className="w-max border border-white/30 bg-white/10 text-white px-5 py-2 hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase tracking-widest text-[9px] font-semibold cursor-pointer ml-2 rounded-none"
              id="desktop-enquire-btn"
            >
              {translate("Enquire Now", language)}
            </a>
          </div>

          {/* Quick Menu Indicator for Mobile */}
          <div className="flex items-center gap-4 lg:hidden">
            <a onClick={() => switchView("home")} className="text-white font-medium text-[10px] md:text-xs uppercase tracking-widest cursor-pointer hover:text-brand-accent transition-colors">{translate("Home", language)}</a>
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="text-2xl z-50 text-white hover:text-brand-accent focus:outline-none"
              id="mobile-menu-trigger"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

        </div>
      </nav>

      {/* Floating Cart Button (Boutique View only) */}
      {currentView === "store" && (
        <button 
          onClick={() => setCartOpen(true)} 
          id="floating-cart-btn" 
          className="fixed top-24 right-4 md:right-6 z-[60] bg-white border border-[#ecece8] text-brand-dark hover:bg-brand-dark hover:text-white rounded-none w-12 h-12 flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
        >
          <i className="fas fa-shopping-cart text-[16px]"></i>
          {getCartCount() > 0 && (
            <span id="cart-count" className="absolute -top-1.5 -right-1.5 bg-brand-dark text-white text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          )}
        </button>
      )}

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed top-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-brand-light border-b border-[#ecece8] z-[70] transform transition-transform duration-500 flex flex-col pt-6 pb-8 px-6 text-base font-serif text-brand-dark shadow-elegant rounded-b-md ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`} 
        id="mobile-menu-overlay"
      >
        <div className="w-full flex justify-between items-center mb-5">
          <span className="text-[10px] uppercase tracking-widest text-[#8c7a5b] font-sans font-semibold">{translate("Menu", language)}</span>
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-xl text-brand-dark hover:text-brand-accent transition-colors focus:outline-none cursor-pointer"
            id="close-mobile-menu"
          >
            <i className="fas fa-times text-stone-600"></i>
          </button>
        </div>

        <div className="w-full flex flex-col space-y-3.5 text-sm tracking-wide">
          <a onClick={() => { switchView("home"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer transition-colors font-light py-1 border-b border-[#ecece8]/30">{translate("Home", language)}</a>
          
          {/* Collapsible Destinations menu */}
          <div className="border-b border-[#ecece8]/30 py-1">
            <button 
              onClick={() => setMobileDestOpen(!mobileDestOpen)} 
              className="w-full flex justify-between items-center hover:text-brand-accent cursor-pointer transition-colors font-light text-left"
            >
              <span>{translate("Destinations", language)}</span>
              <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${mobileDestOpen ? "rotate-180 text-brand-accent" : ""}`}></i>
            </button>
            
            {/* Expanded items */}
            {mobileDestOpen && (
              <div className="pl-3 mt-2.5 mb-2 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-stone-600 font-sans tracking-wider animate-fade-in border-l-2 border-[#8c7a5b]/20">
                <a onClick={() => { switchView("destination", "south-africa"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer py-1 block"><i className="fas fa-angle-right mr-1.5 text-[#8c7a5b]"></i>{translate("South Africa", language)}</a>
                <a onClick={() => { switchView("destination", "victoria-falls"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer py-1 block"><i className="fas fa-angle-right mr-1.5 text-[#8c7a5b]"></i>{translate("Victoria Falls", language)}</a>
                <a onClick={() => { switchView("destination", "mauritius"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer py-1 block"><i className="fas fa-angle-right mr-1.5 text-[#8c7a5b]"></i>{translate("Mauritius", language)}</a>
                <a onClick={() => { switchView("destination", "reunion"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer py-1 block"><i className="fas fa-angle-right mr-1.5 text-[#8c7a5b]"></i>{translate("Reunion Islands", language)}</a>
                <a onClick={() => { switchView("destination", "maldives"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer py-1 block"><i className="fas fa-angle-right mr-1.5 text-[#8c7a5b]"></i>{translate("Maldives", language)}</a>
                <a onClick={() => { switchView("destination", "seychelles"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer py-1 block"><i className="fas fa-angle-right mr-1.5 text-[#8c7a5b]"></i>{translate("Seychelles", language)}</a>
                <a onClick={() => { switchView("destination", "zanzibar"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer py-1 block"><i className="fas fa-angle-right mr-1.5 text-[#8c7a5b]"></i>{translate("Zanzibar", language)}</a>
                <a onClick={() => { switchView("destination", "mozambique"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer py-1 block"><i className="fas fa-angle-right mr-1.5 text-[#8c7a5b]"></i>{translate("Mozambique", language)}</a>
                <a onClick={() => { switchView("destination", "madagascar"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer py-1 block"><i className="fas fa-angle-right mr-1.5 text-[#8c7a5b]"></i>{translate("Madagascar", language)}</a>
              </div>
            )}
          </div>

          <a onClick={() => { switchView("tours"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer transition-colors font-light py-1 border-b border-[#ecece8]/30">{translate("Tours", language)}</a>
          <a onClick={() => { switchView("corporate"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer transition-colors font-light py-1 border-b border-[#ecece8]/30">{translate("Business Tours", language)}</a>
          <a onClick={() => { switchView("romance"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer transition-colors font-light py-1 border-b border-[#ecece8]/30">{translate("Bespoke Romance", language)}</a>
          <a onClick={() => { switchView("about"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer transition-colors font-light py-1 border-b border-[#ecece8]/30">{translate("Our Story", language)}</a>
          <a onClick={() => { switchView("store"); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer transition-colors font-light py-1 border-b border-[#ecece8]/30">{translate("The Boutique", language)}</a>
          <a onClick={() => { setContactModalOpen(true); setMobileMenuOpen(false); }} className="hover:text-brand-accent cursor-pointer transition-colors font-light py-1">{translate("Contact", language)}</a>
        </div>

        {/* Mobile Language Selector */}
        <div className="w-full border-t border-[#ecece8]/40 mt-6 pt-4 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-sans">{translate("Idioma / Language", language)}</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setLanguage("en"); setMobileMenuOpen(false); }} 
              className={`text-xs font-sans tracking-wider py-1 px-3 border transition-colors ${language === "en" ? "bg-brand-dark text-white font-semibold border-brand-dark" : "text-brand-dark hover:bg-stone-100 border-stone-200"}`}
            >
              English
            </button>
            <button 
              onClick={() => { setLanguage("pt"); setMobileMenuOpen(false); }} 
              className={`text-xs font-sans tracking-wider py-1 px-3 border transition-colors ${language === "pt" ? "bg-brand-dark text-white font-semibold border-brand-dark" : "text-brand-dark hover:bg-stone-100 border-stone-200"}`}
            >
              Português
            </button>
          </div>
        </div>

        <a 
          href={calendarBookingLink} 
          target="_blank" 
          className="w-full text-center border border-[#ecece8] bg-white text-brand-dark py-2.5 mt-5 uppercase tracking-widest text-[10px] font-semibold cursor-pointer rounded-none hover:bg-brand-dark hover:text-white transition-colors"
          id="mobile-enquire-btn"
        >
          {translate("Enquire Now", language)}
        </a>
      </div>

      {/* Primary Layout Engine */}
      <main className="flex-grow pt-14 relative z-10 bg-transparent">

        {/* ----------------- VIEW: HOME ----------------- */}
        {currentView === "home" && (
          <div id="home-view" className="animate-fade-in">
            
            {/* FULLSCREEN HERO SECTION */}
            <header className="relative w-full h-[95vh] overflow-hidden flex flex-col justify-center bg-transparent">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="auto" 
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="https://www.pexels.com/download/video/33084727/" type="video/mp4" />
              </video>
              
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 pointer-events-none"></div>
              
              <div className="container relative z-20 mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 flex flex-col justify-center h-full pt-16 pb-20">
                <div className="max-w-2xl mt-12 md:mt-0">
                  <span className="text-brand-accent font-medium tracking-[0.2em] uppercase text-[10px] md:text-sm mb-4 block text-shadow-strong">Viemma Tours</span>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-light text-white mb-6 font-serif leading-tight text-shadow-strong">
                    {translate("Discover the", language)} <br/><span className="italic text-brand-accent">{translate("Extraordinary.", language)}</span>
                    <span className="block text-2xl md:text-4xl lg:text-5xl mt-2 font-light text-white">{translate("A Decade On.", language)}</span>
                  </h1>
                  <p className="text-white text-xs md:text-sm lg:text-base mb-8 leading-relaxed font-medium max-w-lg tracking-wide text-shadow-strong">
                    {translate("Experience breath-taking adventures across Southern Africa and the Indian Ocean. Unforgettable landscapes await your arrival.", language)}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <a 
                      href={calendarBookingLink} 
                      target="_blank" 
                      className="btn-outline px-6 py-3.5 text-[9px] md:text-[10px] font-medium uppercase tracking-[0.15em] flex items-center justify-center shadow-lg group rounded-sm"
                      id="hero-plan-btn"
                    >
                      <i className="far fa-calendar-alt mr-3 text-sm text-blue-300 group-hover:text-brand-dark transition-colors"></i> {translate("Plan Your Journey", language)}
                    </a>
                    <a 
                      href="https://wa.me/27681712985" 
                      target="_blank" 
                      className="btn-outline px-6 py-3.5 text-[9px] md:text-[10px] font-medium uppercase tracking-[0.15em] flex items-center justify-center shadow-lg group rounded-sm"
                      id="hero-chat-btn"
                    >
                      <i className="fab fa-whatsapp mr-3 text-base text-[#25D366] group-hover:text-brand-dark transition-colors"></i> {translate("Connect with a Guide", language)}
                    </a>
                  </div>
                </div>
              </div>

              <div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer group" 
                onClick={() => document.getElementById("tours-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="text-[8px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-white mb-3 group-hover:text-brand-accent transition-colors text-shadow-strong animate-pulse">{translate("Explore", language)}</span>
                <div className="w-10 h-10 md:w-12 md:h-12 border border-white/60 text-white rounded-full flex items-center justify-center group-hover:border-brand-accent group-hover:text-brand-accent transition-all duration-500 shadow-lg bg-black/30 backdrop-blur-sm">
                  <i className="fas fa-chevron-down text-sm md:text-base animate-bounce mt-1"></i>
                </div>
              </div>
            </header>

            {/* Cream Ribbon Buffer */}
            <div className="w-full bg-brand-light py-10 md:py-14 border-b border-[#ecece8] relative z-20 shadow-none">
              <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
                <p className="font-serif italic text-brand-dark text-xl md:text-2xl lg:text-3xl font-light tracking-wide">
                  "{translate("Step into a world of curated luxury and unparalleled African heritage.", language)}"
                </p>
              </div>
            </div>

            {/* Curated Tour Itineraries */}
            <section id="tours-section" className="py-16 md:py-24 bg-transparent relative">
              <div className="container mx-auto px-4 md:px-12 lg:px-16 2xl:px-24 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                  <div className="px-2 md:px-0">
                    <h2 className="text-2xl md:text-3xl font-light italic font-serif mb-2 text-white text-shadow-strong">{translate("Curated Leisure Itineraries", language)}</h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-6 text-shadow-subtle">{translate("Refined Escapes of Southern Africa", language)}</p>
                    
                    {/* Destination Filters (Botswana completely removed) */}
                    <div className="flex flex-wrap gap-2.5 mt-4">
                      <button onClick={() => switchView("destination", "south-africa")} className="border border-white/20 bg-white/10 text-white px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none shadow-none cursor-pointer">{translate("South Africa", language)}</button>
                      <button onClick={() => switchView("destination", "victoria-falls")} className="border border-white/20 bg-white/10 text-white px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none shadow-none cursor-pointer">{translate("Victoria Falls", language)}</button>
                      <button onClick={() => switchView("destination", "mauritius")} className="border border-white/20 bg-white/10 text-white px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none shadow-none cursor-pointer">{translate("Mauritius", language)}</button>
                      <button onClick={() => switchView("destination", "reunion")} className="border border-white/20 bg-white/10 text-white px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none shadow-none cursor-pointer">{translate("Reunion", language)}</button>
                      <button onClick={() => switchView("destination", "maldives")} className="border border-white/20 bg-white/10 text-white px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none shadow-none cursor-pointer">{translate("Maldives", language)}</button>
                      <button onClick={() => switchView("destination", "seychelles")} className="border border-white/20 bg-white/10 text-white px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none shadow-none cursor-pointer">{translate("Seychelles", language)}</button>
                      <button onClick={() => switchView("destination", "zanzibar")} className="border border-white/20 bg-white/10 text-white px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none shadow-none cursor-pointer">{translate("Zanzibar", language)}</button>
                      <button onClick={() => switchView("destination", "mozambique")} className="border border-white/20 bg-white/10 text-white px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none shadow-none cursor-pointer">{translate("Mozambique", language)}</button>
                      <button onClick={() => switchView("destination", "madagascar")} className="border border-white/20 bg-white/10 text-white px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none shadow-none cursor-pointer">{translate("Madagascar", language)}</button>
                    </div>
                  </div>
                  <button onClick={() => switchView("tours")} className="w-max ml-2 md:ml-0 text-[10px] md:text-xs font-semibold text-white/80 hover:text-[#D4AF37] uppercase tracking-[0.15em] transition-colors pb-1 border-b border-white/20 hover:border-[#D4AF37] flex-shrink-0 cursor-pointer">
                    {translate("View All Collections", language)} <i className="fas fa-long-arrow-alt-right ml-2"></i>
                  </button>
                </div>
                
                {/* 4 featured home cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 packages-grid">
                  {[
                    southAfricanList[0], // Table Mountain
                    southAfricanList[1], // Peninsula & Penguins
                    victoriaFallsList[0], // Chobe Day Trip
                    mauritiusList[0] // Sugar Beach
                  ].map((pkg, i) => {
                    return (
                      <div 
                        key={i} 
                        onClick={() => openTourModal(pkg)}
                        className="bg-white border border-[#ecece8] p-1 sm:p-1.5 group cursor-pointer transition-all duration-500 flex flex-col h-full rounded-none hover:border-[#8c7a5b] package-card"
                      >
                        <div className="w-full aspect-[4/3] bg-[#faf9f6]/40 mb-2 overflow-hidden relative">
                          <img 
                            src={pkg.img} 
                            alt={translate(pkg.title, language)}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                          />
                          
                          <div className="absolute top-2 right-2 bg-white/95 border border-[#ecece8] px-1.5 py-0.5 rounded-none z-10 flex gap-0.5">
                            {Array.from({ length: pkg.rating }).map((_, rIdx) => (
                              <i key={rIdx} className="fas fa-star text-brand-accent text-[8px]"></i>
                            ))}
                          </div>
                          <span className="absolute bottom-2 left-2 bg-[#faf9f6] text-brand-dark text-[8px] uppercase tracking-widest font-normal border border-[#ecece8] px-2 py-0.5 rounded-none">
                            {translate(pkg.country, language)}
                          </span>
                        </div>
                        <div className="p-1.5 pt-1 flex flex-col flex-grow text-center sm:text-left">
                          <h3 className="text-sm font-light text-brand-dark mb-1 font-serif italic group-hover:text-[#8c7a5b] transition-colors leading-tight">{translate(pkg.title, language)}</h3>
                          <p className="century-gothic text-brand-dark/50 text-[10.5px] leading-relaxed flex-grow font-light tracking-wide mb-3 line-clamp-3">{translate(pkg.desc, language)}</p>
                          <div className="flex items-center justify-between pt-3 border-t border-[#ecece8] mt-auto">
                            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.15em] font-light text-brand-dark/40 flex items-center">
                              <i className="far fa-clock mr-1.5 text-[#8c7a5b] text-[10px]"></i> {translate(pkg.duration, language)}
                            </span>
                            <span className="text-[#8c7a5b] text-[9px] font-semibold uppercase tracking-widest">{translate("Discover", language)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Corporate/Business Travel Preview Section */}
            <section 
              className="py-24 md:py-32 relative overflow-hidden bg-fixed min-h-[500px] flex items-center justify-center z-20"
              style={{ backgroundImage: "url('https://images.pexels.com/photos/14527417/pexels-photo-14527417.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/60 z-0"></div>
              <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
                <span className="text-brand-accent text-shadow-subtle text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4 block">{translate("Executive Engagements", language)}</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 italic">{translate("Corporate Retreats & Summits", language)}</h2>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xl mx-auto mb-8 tracking-wide font-light">
                  {translate("Elevate your organization's vision. From high-stakes board meetings and international expos to pristine networking retreats in private wilderness, we coordinate impeccable luxury and logistics from takeoff to arrival.", language)}
                </p>
                <button 
                  onClick={() => switchView("corporate")} 
                  className="px-6 py-3 border border-white text-white hover:bg-white hover:text-brand-dark text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 mx-auto cursor-pointer flex items-center justify-center gap-2 rounded-none bg-transparent"
                >
                  <span>{translate("View Executive Packages", language)}</span>
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </section>

            {/* Honeymoons & Romantic Escapes Section */}
            <section 
              className="py-24 md:py-32 relative overflow-hidden bg-fixed min-h-[500px] flex items-center justify-center z-20"
              style={{ backgroundImage: "url('https://images.pexels.com/photos/3608797/pexels-photo-3608797.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/60 z-0"></div>
              <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
                <span className="text-brand-accent text-shadow-subtle text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4 block">{translate("Bespoke Romance", language)}</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 italic">{translate("Honeymoons & Romantic Escapes", language)}</h2>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xl mx-auto mb-8 tracking-wide font-light">
                  {translate("Celebrate love in the world's most breathtaking sanctuaries. Highly curated magnificent honeymoon tours, isolated white-sand picnics, private catamaran sails, candlelit coastal dining, and romantic resort villas designed exclusively for couples.", language)}
                </p>
                <button 
                  onClick={() => switchView("romance")} 
                  className="px-6 py-3 border border-white text-white hover:bg-white hover:text-brand-dark text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 mx-auto cursor-pointer flex items-center justify-center gap-2 rounded-none bg-transparent"
                >
                  <span>{translate("View Romantic Escapes", language)}</span>
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </section>

            {/* Store Preview Banner */}
            <section 
              className="py-24 md:py-32 relative overflow-hidden bg-fixed min-h-[500px] flex items-center justify-center z-20"
              style={{ backgroundImage: "url('https://images.pexels.com/photos/16037756/pexels-photo-16037756.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/60 z-0"></div>
              <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
                <span className="text-brand-accent text-shadow-subtle text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4 block">{translate("Exclusive Keep-sakes", language)}</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 italic">{translate("The Viemma Boutique", language)}</h2>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xl mx-auto mb-8 tracking-wide font-light">
                  {translate("Explore our premium, certified Tanzanites alongside authentic hand-carved local masterworks.", language)}
                </p>
                <button 
                  onClick={() => switchView("store")} 
                  className="px-6 py-3 border border-white text-white hover:bg-white hover:text-brand-dark text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 mx-auto cursor-pointer flex items-center justify-center gap-2 rounded-none bg-transparent"
                >
                  <span>{translate("Enter Boutique", language)}</span>
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </section>

            {/* Stories & Categories */}
            <section className="py-20 md:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
              <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                  
                  <div className="lg:w-2/3">
                    <div className="flex items-center mb-8 md:mb-10">
                      <h2 className="text-2xl md:text-3xl font-light text-white text-shadow-strong font-serif italic mr-6">{translate("Travel Stories", language)}</h2>
                      <div className="flex-1 h-px bg-white/15"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-8 pb-6 md:pb-0">
                      <a className="col-span-2 md:col-span-1 group flex flex-col gap-2 md:gap-4 items-start cursor-pointer bg-white/95 backdrop-blur-sm p-4 border border-white/10 rounded-none shadow-none hover:border-[#D4AF37] transition-all h-full">
                        <div className="w-full h-32 md:h-48 overflow-hidden rounded-none relative">
                          <img 
                            src="https://cdn.prod.website-files.com/5ed4430d97a20a41629058ab/5ed463e64b317b48197e2448_annie-spratt-cVEOh_JJmEE-unsplash.jpg" 
                            alt="Story panel 1" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                        </div>
                        <div className="pr-2 flex flex-col flex-grow">
                          <span className="text-[8px] md:text-[9px] font-semibold text-[#8c7a5b] tracking-widest uppercase mb-1 md:mb-2 block">{translate("Inspiration", language)}</span>
                          <h4 className="font-serif text-sm md:text-base font-medium text-brand-dark mb-1 md:mb-2 group-hover:text-[#8c7a5b] transition-colors leading-tight">{translate("The Heartbeat of the Continent", language)}</h4>
                          <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">{translate("Discovering deep cultural roots and untold narratives through diverse local communities.", language)}</p>
                        </div>
                      </a>
                      <a className="col-span-2 md:col-span-1 group flex flex-col gap-2 md:gap-4 items-start cursor-pointer bg-white/95 backdrop-blur-sm p-4 border border-white/10 rounded-none shadow-none hover:border-[#D4AF37] transition-all h-full">
                        <div className="w-full h-32 md:h-48 overflow-hidden rounded-none relative">
                          <img 
                            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800" 
                            alt="Story panel 2" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                        </div>
                        <div className="pr-1 flex flex-col flex-grow">
                          <span className="text-[8px] md:text-[9px] font-semibold text-[#8c7a5b] tracking-widest uppercase mb-1 md:mb-2 block">{translate("Experience", language)}</span>
                          <h4 className="font-serif text-sm md:text-base font-medium text-brand-dark mb-1 md:mb-2 group-hover:text-[#8c7a5b] transition-colors leading-tight">{translate("Echoes of the Savannah", language)}</h4>
                          <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">{translate("Immersive wildlife encounters and sunset game drives in the heart of Africa's ultimate wilderness.", language)}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/3">
                    <div className="flex items-center mb-8 md:mb-10">
                      <h5 className="text-xl md:text-2xl font-light text-white text-shadow-strong font-serif italic mr-4">{translate("Perspectives", language)}</h5>
                      <div className="flex-1 h-px bg-white/15"></div>
                    </div>
                    <div className="flex flex-col gap-3 mb-8">
                       <button 
                        onMouseEnter={() => setActivePerspective("places")}
                        onClick={() => setActivePerspective("places")}
                        className={`w-full text-left px-6 py-4 border font-medium text-[10px] md:text-xs tracking-widest uppercase transition-all flex justify-between items-center group rounded-none cursor-pointer ${activePerspective === "places" ? "bg-[#D4AF37] border-[#D4AF37] text-brand-dark" : "border-white/10 text-white bg-black/20 hover:border-white hover:bg-black/35"}`}
                      >
                        {translate("Places", language)} <i className={`fas fa-angle-right transition-opacity ${activePerspective === "places" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></i>
                      </button>
                      <button 
                        onMouseEnter={() => setActivePerspective("inspiration")}
                        onClick={() => setActivePerspective("inspiration")}
                        className={`w-full text-left px-6 py-4 border font-medium text-[10px] md:text-xs tracking-widest uppercase transition-all flex justify-between items-center group rounded-none cursor-pointer ${activePerspective === "inspiration" ? "bg-[#D4AF37] border-[#D4AF37] text-brand-dark" : "border-white/10 text-white bg-black/20 hover:border-white hover:bg-black/35"}`}
                      >
                        {translate("Inspiration", language)} <i className={`fas fa-angle-right transition-opacity ${activePerspective === "inspiration" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></i>
                      </button>
                      <button 
                        onMouseEnter={() => setActivePerspective("culture")}
                        onClick={() => setActivePerspective("culture")}
                        className={`w-full text-left px-6 py-4 border font-medium text-[10px] md:text-xs tracking-widest uppercase transition-all flex justify-between items-center group rounded-none cursor-pointer ${activePerspective === "culture" ? "bg-[#D4AF37] border-[#D4AF37] text-brand-dark" : "border-white/10 text-white bg-black/20 hover:border-white hover:bg-black/35"}`}
                      >
                        {translate("Culture", language)} <i className={`fas fa-angle-right transition-opacity ${activePerspective === "culture" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></i>
                      </button>
                    </div>
                    <div className="bg-white border border-[#ecece8] p-6 transition-all duration-300 shadow-none rounded-none block">
                      <h6 className="font-serif font-medium text-brand-dark mb-2 italic">{translate(currentFact.title, language)}</h6>
                      <p className="text-stone-600 font-light text-xs leading-relaxed">{translate(currentFact.text, language)}</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Immersive Escapes Slide Gallery (with watching dynamic links) */}
            <section className="py-20 md:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
              <div className="container mx-auto px-4 md:px-12 lg:px-16 2xl:px-24 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                  <span className="text-[#D4AF37] text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] mb-4 block text-shadow-subtle">{translate("Visual Journeys", language)}</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 text-white text-shadow-strong italic">{translate("Immersive Escapes", language)}</h2>
                </div>
                
                <div className="relative w-full max-w-4xl mx-auto h-[350px] md:h-[550px] rounded-none overflow-hidden border border-[#ecece8] shadow-none" id="immersive-gallery">
                  <img 
                    src={immersiveEscapesImgs[immersiveIndex]} 
                    alt="Immersive Escape Banner" 
                    className="w-full h-full object-cover transition-all duration-500" 
                  />
                  <a 
                    href={immersiveEscapesReels[immersiveIndex]} 
                    target="_blank" 
                    className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center group"
                  >
                    <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                      <span className="text-white text-xs uppercase font-medium tracking-widest bg-brand-dark/45 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                        <i className="fab fa-instagram mr-2"></i> {translate("Watch Reel", language)}
                      </span>
                    </div>
                  </a>
                  
                  <button 
                    onClick={() => setImmersiveIndex((prev) => (prev - 1 + immersiveEscapesImgs.length) % immersiveEscapesImgs.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/95 border border-[#ecece8] hover:bg-brand-dark hover:text-white rounded-none flex justify-center items-center text-brand-dark shadow-none z-20 transition-colors cursor-pointer focus:outline-none"
                  >
                    <i className="fas fa-chevron-left text-xs md:text-sm"></i>
                  </button>
                  <button 
                    onClick={() => setImmersiveIndex((prev) => (prev + 1) % immersiveEscapesImgs.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/95 border border-[#ecece8] hover:bg-brand-dark hover:text-white rounded-none flex justify-center items-center text-brand-dark shadow-none z-20 transition-colors cursor-pointer focus:outline-none"
                  >
                    <i className="fas fa-chevron-right text-xs md:text-sm"></i>
                  </button>
                  
                  <div className="absolute top-4 right-4 pointer-events-none z-20">
                    <span className="bg-black/60 text-white text-[10px] px-3 py-1.5 rounded-none backdrop-blur-sm tracking-widest">
                      {immersiveIndex + 1} / {immersiveEscapesImgs.length}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Guest Reviews Integrated (TripAdvisor with no side QR codes for wide focus) */}
            <section className="py-20 md:py-24 bg-[#FCFAF8]/40 backdrop-blur-md relative overflow-hidden border-t border-[#ecece8] shadow-none z-25">
              <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:px-24">
                <div className="text-center mb-10">
                  <span className="text-brand-accent text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] mb-4 block">{translate("Guest Feedback", language)}</span>
                  <h3 className="text-2xl md:text-4xl font-serif font-light text-brand-dark italic mb-4">{translate("What Our Customers Say", language)}</h3>
                  <div className="h-px w-24 bg-[#ecece8] mx-auto mb-8 shadow-sm"></div>
                </div>

                <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-none shadow-soft border border-[#ecece8] min-h-[300px] flex flex-col justify-between">
                  <div className="elfsight-app-98769dc7-2f68-4e91-a180-d83c6124e2cc" data-elfsight-app-lazy></div>
                  <div className="mt-6 text-center border-t border-stone-100 pt-4">
                    <a 
                      href="https://98769dc72f684e91a180d83c6124e2cc.elf.site" 
                      target="_blank" 
                      className="text-xs text-brand-accent font-semibold hover:underline inline-flex items-center tracking-wider uppercase"
                    >
                       {translate("View full testimonial feed directly on TripAdvisor", language)} <i className="fas fa-external-link-alt ml-1.5 text-[9px]"></i>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* General FAQs on Home Page */}
            <section className="py-20 md:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
              <div className="container mx-auto px-4 lg:px-12 max-w-4xl relative z-10 font-sans">
                <h2 className="text-3xl md:text-4xl font-serif font-light mb-10 text-center text-white text-shadow-strong italic">{translate("Frequently Asked Questions", language)}</h2>
                <div className="space-y-4">
                  {[
                    { q: "What is included in the tour packages?", a: "Our packages typically include luxury accommodation, guided tours, transportation within the destination, and selected premium meals. Specifics vary by itinerary." },
                    { q: "Do I need a visa for South Africa?", a: "Visa requirements depend on your nationality. Many tourists receive a 90-day tourist visa upon arrival. Please check with your local embassy prior to booking." },
                    { q: "Are international flights included?", a: "International flights are generally not included, allowing you the flexibility to book from your preferred location and cabin class. We seamlessly assist with domestic flight and transfer arrangements." }
                  ].map((item, index) => (
                    <div key={index} className="bg-black/35 backdrop-blur-md border border-white/10 rounded-none shadow-lg overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/30">
                       <button 
                        className="w-full px-6 md:px-8 py-5 text-left font-medium flex justify-between items-center focus:outline-none hover:bg-white/5 transition-colors text-white text-xs md:text-sm tracking-wide cursor-pointer"
                        onClick={(e) => {
                          const body = e.currentTarget.nextElementSibling;
                          body?.classList.toggle("hidden");
                          e.currentTarget.querySelector("i")?.classList.toggle("rotate-180");
                        }}
                      >
                        <span className="font-medium">{translate(item.q, language)}</span><i className="fas fa-chevron-down text-[#D4AF37] transition-transform duration-300 text-xs"></i>
                      </button>
                      <div className="px-6 md:px-8 py-5 text-stone-200 hidden bg-black/20 text-xs font-light leading-relaxed border-t border-white/5 tracking-wide">
                        {translate(item.a, language)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Scan and Share Reviews (QR Codes) Section */}
            <section className="py-16 bg-black/25 backdrop-blur-md relative overflow-hidden border-t border-b border-white/10 shadow-none z-25 font-sans">
              <div className="container mx-auto px-6 max-w-4xl text-center">
                <div className="mb-8">
                  <span className="text-[#D4AF37] text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] mb-2 block text-shadow-subtle">{translate("WRITE A REVIEW", language)}</span>
                  <h3 className="text-xl md:text-2xl font-serif font-light text-white text-shadow-strong italic">{translate("Scan & Share Your Experience", language)}</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-stretch max-w-2xl mx-auto">
                  {/* TripAdvisor QR Scan */}
                  <div className="bg-white text-brand-dark p-6 rounded-none shadow-none border border-[#ecece8] text-center flex flex-col justify-between items-center transition-all duration-300 hover:border-brand-accent">
                    <div>
                      <span className="text-brand-accent font-semibold text-[8px] md:text-[9px] tracking-widest uppercase mb-2 block">{translate("TripAdvisor Review", language)}</span>
                      <h4 className="font-serif italic text-base text-brand-dark mb-4">{translate("Share on Advisor", language)}</h4>
                      <div className="bg-[#FCFAF8] p-3 rounded-none border border-[#ecece8] shadow-none inline-block mb-4">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2F98769dc72f684e91a180d83c6124e2cc.elf.site&size=400x400" 
                          alt="TripAdvisor Review QR Code" 
                          className="w-24 h-24 object-contain mx-auto"
                        />
                      </div>
                      <p className="text-[10px] text-stone-500 font-light leading-relaxed max-w-[190px] mx-auto mb-4">
                        {translate("Scan with your smartphone camera to review us on TripAdvisor!", language)}
                      </p>
                    </div>
                    <a 
                      href="https://98769dc72f684e91a180d83c6124e2cc.elf.site" 
                      target="_blank" 
                      className="text-[10px] text-brand-accent font-semibold tracking-wider uppercase border-b border-[#ecece8] hover:border-brand-dark transition-colors inline-block pb-0.5"
                    >
                      {translate("Visit TripAdvisor", language)}
                    </a>
                  </div>

                  {/* Google Reviews QR Scan */}
                  <div className="bg-white text-brand-dark p-6 rounded-none shadow-none border border-[#ecece8] text-center flex flex-col justify-between items-center transition-all duration-300 hover:border-brand-accent">
                    <div>
                      <span className="text-brand-accent font-semibold text-[8px] md:text-[9px] tracking-widest uppercase mb-2 block">{translate("Google Review", language)}</span>
                      <h4 className="font-serif italic text-base text-brand-dark mb-4">{translate("Share on Google", language)}</h4>
                      <div className="bg-[#FCFAF8] p-3 rounded-none border border-[#ecece8] shadow-none inline-block mb-4">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Fg.page%2Fr%2FCXNYZWWHiOq3EAE%2Freview&size=400x400" 
                          alt="Google Review QR Code" 
                          className="w-24 h-24 object-contain mx-auto"
                        />
                      </div>
                      <p className="text-[10px] text-stone-500 font-light leading-relaxed max-w-[190px] mx-auto mb-4">
                        {translate("Scan with your smartphone camera to review us on Google!", language)}
                      </p>
                    </div>
                    <a 
                      href="https://g.page/r/CXNYZWWHiOq3EAE/review" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[10px] text-brand-accent font-semibold tracking-wider uppercase border-b border-[#ecece8] hover:border-brand-dark transition-colors inline-block pb-0.5"
                    >
                      {translate("Visit Google Review", language)}
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ----------------- VIEW: TOURS ----------------- */}
        {currentView === "tours" && (
          <div id="tours-view" className="bg-brand-light relative z-20 pt-16 pb-20 md:pb-24 animate-fade-in">
            <div className="container mx-auto px-4 md:px-12 lg:px-16 2xl:px-24">
              <button 
                onClick={() => switchView("home")} 
                className="w-max ml-2 md:ml-0 mb-10 flex items-center text-brand-dark hover:text-brand-accent font-medium text-[10px] md:text-xs uppercase tracking-widest transition-colors cursor-pointer focus:outline-none"
              >
                <i className="fas fa-long-arrow-alt-left mr-3"></i> {translate("Return to Home", language)}
              </button>
              
              <div className="mb-12 md:mb-16 text-center">
                <span className="text-brand-accent text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4 block">{translate("EXPLORE THE WORLD", language)}</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 text-brand-dark font-serif italic">{translate("Tour Collections", language)}</h1>
                <p className="text-stone-500 text-xs md:text-sm font-light max-w-2xl mx-auto tracking-wide px-4">{translate("Browse our comprehensive portfolio of breathtaking luxury tours across Southern Africa and the Indian Ocean.", language)}</p>
              </div>

              {/* Grouped Catalog - Botswana deleted */}
              <div className="space-y-16">
                {[
                  { name: "South Africa", list: southAfricanList },
                  { name: "Victoria Falls", list: victoriaFallsList },
                  { name: "Mauritius", list: mauritiusList },
                  { name: "Seychelles", list: allTourPackages.filter((p) => p.destId === "seychelles") },
                  { name: "Zanzibar", list: zanzibarList },
                  { name: "Reunion", list: allTourPackages.filter((p) => p.destId === "reunion") },
                  { name: "Maldives", list: allTourPackages.filter((p) => p.destId === "maldives") },
                  { name: "Mozambique", list: allTourPackages.filter((p) => p.destId === "mozambique") },
                  { name: "Madagascar", list: allTourPackages.filter((p) => p.destId === "madagascar") }
                ].map((group, gIdx) => {
                  if (group.list.length === 0) return null;
                  return (
                    <div key={gIdx} className="border-b border-[#ecece8] pb-12 last:border-none">
                      <div className="flex items-center mb-6">
                        <h3 className="text-2xl md:text-3xl font-serif italic text-brand-dark">{translate(group.name, language)}</h3>
                        <div className="flex-grow h-px bg-[#ecece8] ml-4"></div>
                        <button 
                          onClick={() => switchView("destination", group.list[0].destId)}
                          className="text-[10px] text-[#8c7a5b] font-semibold tracking-wider uppercase ml-4 hover:underline hover:text-brand-dark cursor-pointer"
                        >
                          {translate("View Destination", language)}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 tour-cards">
                        {group.list.slice(0, 4).map((pkg, pIdx) => {
                          const starsHtmlList = Array.from({ length: pkg.rating });

                          return (
                            <div 
                              key={pIdx}
                              onClick={() => openTourModal(pkg)}
                              className="bg-white border border-[#ecece8] p-1 sm:p-1.5 rounded-none shadow-none hover:border-[#8c7a5b] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full group tour-card"
                            >
                              <div className="w-full aspect-[4/3] bg-[#faf9f6]/40 mb-2 overflow-hidden relative">
                                <img 
                                  src={pkg.img} 
                                  alt={pkg.title} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <span className="absolute bottom-2 left-2 bg-[#faf9f6] text-brand-dark text-[8px] uppercase tracking-widest font-normal border border-[#ecece8] px-2 py-0.5 rounded-none">
                                  {translate(pkg.country, language)}
                                </span>
                                <div className="absolute top-2 right-2 flex gap-0.5 z-10 bg-white/95 border border-[#ecece8] px-1 py-0.5 rounded-none">
                                  {starsHtmlList.map((_, rIdx) => (
                                    <i key={rIdx} className="fas fa-star text-brand-accent text-[8px]"></i>
                                  ))}
                                </div>
                              </div>
                              <div className="pt-1 flex flex-col flex-grow text-center sm:text-left">
                                <h4 className="font-serif italic font-light text-brand-dark text-sm group-hover:text-[#8c7a5b] transition-colors leading-tight mb-2 truncate">
                                  {translate(pkg.title, language)}
                                </h4>
                                <p className="century-gothic text-stone-500 text-[10px] font-light leading-relaxed flex-grow line-clamp-3 mb-4">
                                  {translate(pkg.desc, language)}
                                </p>
                                <span className="text-[9px] text-[#8c7a5b] font-semibold tracking-widest uppercase mt-auto block pb-1 border-b border-transparent hover:border-[#8c7a5b] w-max">{translate("Discover Outing", language)}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* ----------------- VIEW: CORPORATE / BUSINESS TOURS ----------------- */}
        {currentView === "corporate" && (
          <div id="corporate-view" className="bg-brand-light relative z-20 pt-16 pb-20 animate-fade-in">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:px-24">
              <button 
                onClick={() => switchView("home")} 
                className="w-max flex items-center text-brand-dark hover:text-brand-accent font-medium text-[10px] md:text-xs uppercase tracking-widest transition-colors cursor-pointer focus:outline-none"
              >
                <i className="fas fa-long-arrow-alt-left mr-3"></i> {translate("Return to Home", language)}
              </button>
            </div>

            {/* Hero Panel */}
            <div className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] mt-6">
              <img 
                src="https://images.pexels.com/photos/5778221/pexels-photo-5778221.jpeg" 
                className="absolute inset-0 w-full h-full object-cover z-0" 
                alt="Executive Banner" 
              />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-10 px-4 z-20 text-center">
                <span className="text-brand-accent text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4 text-shadow-strong">{translate("EXECUTIVE ENGAGEMENTS", language)}</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white italic text-shadow-strong px-4">{translate("Corporate & Business", language)}</h1>
              </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 py-16">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-serif font-light text-brand-dark italic mb-6">{translate("Elevate Your Corporate Engagements", language)}</h2>
                <p className="century-gothic text-stone-600 font-light text-sm md:text-base leading-relaxed tracking-wide">
                  {translate("Whether you are organizing a high-stakes summit, an international expo, strategic business meetings, or exclusive networking retreats, Viemma Tours provides impeccable, end-to-end corporate travel solutions. We blend luxury with efficiency, ensuring your team and clients experience the best of Africa without compromising on professional standards.", language)}
                </p>
              </div>

              {/* Unique Detailed Corporate Features */}
              <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto px-2 md:px-0">
                <h3 className="text-lg md:text-xl font-serif font-light text-brand-dark italic">{translate("Corporate Solutions", language)}</h3>
              </div>

              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-2 md:px-0"
              >
                <div className="bg-white border border-[#ecece8] p-2 flex flex-col hover:border-[#8c7a5b] hover:shadow-elegant transition-all duration-300">
                  <div className="w-full aspect-[16/10] overflow-hidden mb-2.5 rounded-none bg-stone-50">
                    <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Summits" />
                  </div>
                  <div className="p-1 flex flex-col flex-grow">
                    <h3 className="text-base font-serif italic text-brand-dark font-medium mb-1.5">{translate("Summits & Expos", language)}</h3>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("Comprehensive logistical support for large-scale corporate events. From premium group accommodations to dedicated liaison services.", language)}</p>
                  </div>
                </div>

                <div className="bg-white border border-[#ecece8] p-2 flex flex-col hover:border-[#8c7a5b] hover:shadow-elegant transition-all duration-300">
                  <div className="w-full aspect-[16/10] overflow-hidden mb-2.5 rounded-none bg-stone-50">
                    <img src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Meetings" />
                  </div>
                  <div className="p-1 flex flex-col flex-grow">
                    <h3 className="text-base font-serif italic text-brand-dark font-medium mb-1.5">{translate("Business Meetings", language)}</h3>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("Secure sophisticated venues and boardrooms equipped with cutting-edge technology across top-tier African business hubs.", language)}</p>
                  </div>
                </div>

                <div className="bg-white border border-[#ecece8] p-2 flex flex-col hover:border-[#8c7a5b] hover:shadow-elegant transition-all duration-300">
                  <div className="w-full aspect-[16/10] overflow-hidden mb-2.5 rounded-none bg-stone-50">
                    <img src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Retreats" />
                  </div>
                  <div className="p-1 flex flex-col flex-grow">
                    <h3 className="text-base font-serif italic text-brand-dark font-medium mb-1.5">{translate("Networking Retreats", language)}</h3>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("Forge stronger relationships in extraordinary settings: private dinners under the stars or a sunset cruise tailored strictly to your delegates.", language)}</p>
                  </div>
                </div>

                <div className="bg-white border border-[#ecece8] p-2 flex flex-col hover:border-[#8c7a5b] hover:shadow-elegant transition-all duration-300">
                  <div className="w-full aspect-[16/10] overflow-hidden mb-2.5 rounded-none bg-stone-50">
                    <img src="https://images.pexels.com/photos/5778221/pexels-photo-5778221.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Incentives" />
                  </div>
                  <div className="p-1 flex flex-col flex-grow">
                    <h3 className="text-base font-serif italic text-brand-dark font-medium mb-1.5">{translate("Incentive Travel", language)}</h3>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("Reward your top performers with once-in-a-lifetime luxury safaris or island escapes designed to motivate and inspire.", language)}</p>
                  </div>
                </div>
              </div>

              {/* Corporate Amenities & Corporate Request Button directly in Corporate Section */}
              <div className="border-t border-stone-200 pt-8 text-center max-w-4xl mx-auto mb-16">
                <h4 className="font-serif italic text-brand-dark text-xl mb-6">{translate("Available Executive Amenities", language)}</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { icon: "dumbbell", text: "Gym" },
                    { icon: "clock", text: "24 hours" },
                    { icon: "swimming-pool", text: "Infinity pool" },
                    { icon: "wifi", text: "Free Wifi" },
                    { icon: "car", text: "Secluded Parking" },
                    { icon: "tshirt", text: "Laundry services" },
                    { icon: "shuttle-van", text: "Airport Shuttle" }
                  ].map((amenity, i) => (
                    <div key={i} className="embossed-card px-4 py-2 text-[10px] font-medium text-stone-600 uppercase tracking-widest">
                      <i className={`fas fa-${amenity.icon} mr-2 text-brand-accent`}></i> {translate(amenity.text, language)}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 font-sans">
                  <a 
                    href={emailCorporateLink}
                    className="inline-block border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white px-8 py-3.5 uppercase tracking-[0.15em] text-[10px] md:text-xs font-semibold transition-colors shadow-sm rounded-none cursor-pointer bg-transparent"
                  >
                    {translate("Request Corporate Service / Enquire", language)}
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ----------------- VIEW: BESPOKE ROMANCE / HONEYMOONS ----------------- */}
        {currentView === "romance" && (
          <div id="romance-view" className="bg-brand-light relative z-20 pt-16 pb-20 animate-fade-in">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 pt-4">
              <button 
                onClick={() => switchView("home")} 
                className="w-max flex items-center text-brand-dark hover:text-brand-accent font-medium text-[10px] md:text-xs uppercase tracking-widest transition-colors cursor-pointer focus:outline-none"
              >
                <i className="fas fa-long-arrow-alt-left mr-3"></i> {translate("Return to Home", language)}
              </button>
            </div>

            {/* Hero Panel */}
            <div className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] mt-6">
              <img 
                src="https://images.pexels.com/photos/5785086/pexels-photo-5785086.jpeg" 
                className="absolute inset-0 w-full h-full object-cover z-0" 
                alt="Romantic Banner" 
              />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-10 px-4 z-20 text-center">
                <span className="text-brand-accent text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4 text-shadow-strong">{translate("BESPOKE ROMANCE", language)}</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white italic text-shadow-strong px-4">{translate("Honeymoons & Romantic Escapes", language)}</h1>
              </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 py-16">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-serif font-light text-brand-dark italic mb-6">{translate("Love in Paradise", language)}</h2>
                <p className="century-gothic text-stone-600 font-light text-sm md:text-base leading-relaxed tracking-wide">
                  {translate("Celebrate your union in the world's most breathtaking settings. From candlelit dinners on isolated powdery sandbanks, to private infinity pools viewing the majestic savannah, we craft the ultimate honeymoon experiences with every delicate luxury detail accounted for.", language)}
                </p>
              </div>

              {/* Unique Detailed Romance Features */}
              <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto px-2 md:px-0">
                <h3 className="text-lg md:text-xl font-serif font-light text-brand-dark italic">{translate("Signature Romance Highlights", language)}</h3>
              </div>

              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-2 md:px-0"
              >
                <div className="bg-white border border-[#ecece8] p-2 flex flex-col hover:border-[#8c7a5b] hover:shadow-elegant transition-all duration-300">
                  <div className="w-full aspect-[16/10] overflow-hidden mb-2.5 rounded-none bg-stone-50">
                    <img src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Sails" />
                  </div>
                  <div className="p-1 flex flex-col flex-grow">
                    <h3 className="text-base font-serif italic text-brand-dark font-medium mb-1.5">{translate("Sunset Sails", language)}</h3>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("Private catamaran sunset sails and picnic excursions to secluded, pristine sandbanks.", language)}</p>
                  </div>
                </div>

                <div className="bg-white border border-[#ecece8] p-2 flex flex-col hover:border-[#8c7a5b] hover:shadow-elegant transition-all duration-300">
                  <div className="w-full aspect-[16/10] overflow-hidden mb-2.5 rounded-none bg-stone-50">
                    <img src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Wellness" />
                  </div>
                  <div className="p-1 flex flex-col flex-grow">
                    <h3 className="text-base font-serif italic text-brand-dark font-medium mb-1.5">{translate("Couples' Wellness", language)}</h3>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("Indulgent therapeutic spa treatments set directly over beautiful ocean or wilderness pavilions.", language)}</p>
                  </div>
                </div>

                <div className="bg-white border border-[#ecece8] p-2 flex flex-col hover:border-[#8c7a5b] hover:shadow-elegant transition-all duration-300">
                  <div className="w-full aspect-[16/10] overflow-hidden mb-2.5 rounded-none bg-stone-50">
                    <img src="https://images.pexels.com/photos/3608797/pexels-photo-3608797.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="concierge" />
                  </div>
                  <div className="p-1 flex flex-col flex-grow">
                    <h3 className="text-base font-serif italic text-brand-dark font-medium mb-1.5">{translate("Curated Touches", language)}</h3>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("Complimentary romantic upgrades, direct welcome champagne, and custom butler-level concierge planning.", language)}</p>
                  </div>
                </div>

                <div className="bg-white border border-[#ecece8] p-2 flex flex-col hover:border-[#8c7a5b] hover:shadow-elegant transition-all duration-300">
                  <div className="w-full aspect-[16/10] overflow-hidden mb-2.5 rounded-none bg-stone-50">
                    <img src="https://images.pexels.com/photos/1449729/pexels-photo-1449729.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Villas" />
                  </div>
                  <div className="p-1 flex flex-col flex-grow">
                    <h3 className="text-base font-serif italic text-brand-dark font-medium mb-1.5">{translate("Private Wilderness Villas", language)}</h3>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("Ultra-isolated villa residencies boasting private viewing platforms of native game or sparkling lagoons.", language)}</p>
                  </div>
                </div>
              </div>

              {/* Romantic Amenities & Booking Button */}
              <div className="border-t border-stone-200 pt-8 text-center max-w-4xl mx-auto mb-16">
                <h4 className="font-serif italic text-brand-dark text-xl mb-6">{translate("Exquisite Amenities Tailored for You", language)}</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { icon: "heart", text: "Private Catamaran" },
                    { icon: "spa", text: "Ocean Spa Pavilions" },
                    { icon: "glass-cheers", text: "Welcome Champagne" },
                    { icon: "leaf", text: "Eco-Luxury Living" },
                    { icon: "concierge-bell", text: "Dedicated Concierge" },
                    { icon: "swimming-pool", text: "Private Infinity Pools" }
                  ].map((amenity, i) => (
                    <div key={i} className="embossed-card px-4 py-2 text-[10px] font-medium text-stone-600 uppercase tracking-widest">
                      <i className={`fas fa-${amenity.icon} mr-2 text-brand-accent`}></i> {translate(amenity.text, language)}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 font-sans">
                  <a 
                    href={emailRomanticLink} 
                    className="inline-block border border-brand-dark bg-brand-dark text-white hover:bg-transparent hover:text-brand-dark px-10 py-3.5 uppercase tracking-[0.15em] text-[10px] md:text-xs font-semibold transition-colors shadow-sm rounded-none cursor-pointer"
                  >
                    {translate("Request Romantic Service / Get Consultation", language)}
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ----------------- VIEW: OUR STORY / ABOUT ----------------- */}
        {currentView === "about" && (
          <div id="about-view" className="bg-brand-light relative z-20 pt-16 pb-20 animate-fade-in">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 pt-4">
              <button 
                onClick={() => switchView("home")} 
                className="w-max flex items-center text-brand-dark hover:text-brand-accent font-medium text-[10px] md:text-xs uppercase tracking-widest transition-colors cursor-pointer focus:outline-none"
              >
                <i className="fas fa-long-arrow-alt-left mr-3"></i> {translate("Return to Home", language)}
              </button>
            </div>

            {/* Banner block */}
            <div className="relative w-full h-[50vh] min-h-[400px] mt-6">
              <img src="https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg" className="absolute inset-0 w-full h-full object-cover z-0" alt="About us banner" />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 px-4 text-center z-20">
                <span className="text-brand-accent text-shadow-strong text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] mb-4">{translate("OUR HERITAGE", language)}</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white italic text-shadow-strong">{translate("Our Story", language)}</h1>
              </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 py-16">
              <div className="mb-16 text-center max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-sm shadow-soft border border-stone-100">
                <h2 className="text-2xl md:text-4xl font-serif font-light mb-4 text-brand-dark italic">{translate("Connecting You to the Heart of Africa", language)}</h2>
                <p className="text-xs md:text-sm font-light text-stone-600 leading-relaxed tracking-wide">
                  {translate("Born out of deep reverence for the African continent, Viemma Tours is more than a travel agency. It is a bridge between wanderlust and authentic connection. We aim to showcase the raw, elegant beauty of Africa beyond the postcards. With deep roots in the region and a passion for luxury hospitality, our team treats every guest like family, ensuring your journey is as meaningful as the destination itself.", language)}
                </p>
              </div>

              {/* Cards row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="p-6 border border-stone-100 bg-white shadow-soft rounded-sm text-center flex flex-col items-center">
                  <i className="fas fa-bullseye text-2xl text-brand-accent mb-4"></i>
                  <h3 className="text-base font-serif italic mb-3 text-brand-dark">{translate("Our Mission", language)}</h3>
                  <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("To provide unparalleled luxury travel experiences that are sustainable, authentic, and deeply unforgettable while preserving wild ecosystems.", language)}</p>
                </div>
                <div className="p-6 border border-stone-100 bg-white shadow-soft rounded-sm text-center flex flex-col items-center">
                  <i className="fas fa-eye text-2xl text-brand-accent mb-4"></i>
                  <h3 className="text-base font-serif italic mb-3 text-brand-dark">{translate("Our Vision", language)}</h3>
                  <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("To be the preeminent luxury tour operator in Africa, recognized globally for integrity and reveal the authentic, untold narratives of the continent.", language)}</p>
                </div>
                <div className="p-6 border border-stone-100 bg-white shadow-soft rounded-sm text-center flex flex-col items-center">
                  <i className="fas fa-leaf text-2xl text-brand-accent mb-4"></i>
                  <h3 className="text-base font-serif italic mb-3 text-brand-dark">{translate("Our Promise", language)}</h3>
                  <p className="text-stone-500 text-xs font-light leading-relaxed">{translate("We are committed to eco-friendly practices that protect Africa's ecosystems while enriching local communities through sustainable tourism initiatives.", language)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- VIEW: STORE / BOUTIQUE ----------------- */}
        {currentView === "store" && (
          <div id="store-view" className="bg-brand-light relative z-20 pt-16 pb-20 animate-fade-in">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:px-24">
              <button 
                onClick={() => switchView("home")} 
                className="w-max flex items-center text-brand-dark hover:text-brand-accent font-medium text-[10px] md:text-xs uppercase tracking-widest transition-colors cursor-pointer focus:outline-none"
              >
                <i className="fas fa-long-arrow-alt-left mr-3"></i> {translate("Return to Home", language)}
              </button>
            </div>

            {/* Store Hero header */}
            <div className="relative w-full h-[45vh] min-h-[350px] mt-6">
              <img 
                src="https://images.pexels.com/photos/16037756/pexels-photo-16037756.jpeg" 
                className="absolute inset-0 w-full h-full object-cover z-0" 
                alt="Store Banner" 
              />
              <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 px-4 text-center z-20">
                <span className="text-brand-accent text-shadow-strong text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4 z-20">{translate("EXCLUSIVE KEEP-SAKES", language)}</span>
                <h1 className="text-4xl md:text-6xl font-serif font-light text-white italic">{translate("The Viemma Boutique", language)}</h1>
              </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">

              {/* Boutique Currency Toolbar */}
              <div className="border border-[#ecece8] bg-white p-4 max-w-5xl mx-auto mb-12 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
                <span className="text-xs font-sans tracking-wider text-stone-500 font-light text-center sm:text-left">
                  {translate("Choose your currency for boutique catalog:", language)}
                </span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {[
                    { code: "ZAR", label: "ZAR (Rands)", flag: "🇿🇦" },
                    { code: "BRL", label: "BRL (Reais)", flag: "🇧🇷" },
                    { code: "USD", label: "USD ($)", flag: "🇺🇸" },
                    { code: "EUR", label: "EUR (€)", flag: "🇪🇺" },
                    { code: "GBP", label: "GBP (£)", flag: "🇬🇧" }
                  ].map((cur) => (
                    <button
                      key={cur.code}
                      onClick={() => setCurrency(cur.code)}
                      className={`px-3 py-1.5 text-[10px] font-sans uppercase tracking-widest border transition-all duration-300 cursor-pointer ${currency === cur.code ? "bg-brand-dark text-white border-brand-dark font-medium" : "bg-white text-stone-600 border-stone-200 hover:border-brand-accent hover:text-brand-dark"}`}
                    >
                      <span className="mr-1">{cur.flag}</span>
                      {cur.code}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* SECTION 1: Explore our Tanzanites */}
              <div className="mb-20">
                <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto px-4 gap-4">
                  <div className="hidden md:block flex-1 h-[1px] bg-[#ecece8]"></div>
                  <h2 className="text-2xl md:text-3xl font-serif font-light text-brand-dark px-2 md:px-8 italic text-center">{translate("Explore our Tanzanites", language)}</h2>
                  <div className="hidden md:block flex-1 h-[1px] bg-[#ecece8]"></div>
                  
                  {/* Scrolling Arrows */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button 
                      onClick={() => scrollContainer(tanzaniteScrollRef, "left")} 
                      className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                      aria-label="Scroll left"
                    >
                      <i className="fas fa-chevron-left text-[9px]"></i>
                    </button>
                    <button 
                      onClick={() => scrollContainer(tanzaniteScrollRef, "right")} 
                      className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                      aria-label="Scroll right"
                    >
                      <i className="fas fa-chevron-right text-[9px]"></i>
                    </button>
                  </div>
                </div>

                {/* Horizontal Scroll on Mobile, wrapped on Desktop */}
                <div 
                  ref={tanzaniteScrollRef}
                  className="flex overflow-x-auto md:overflow-x-visible md:flex-wrap md:justify-center items-stretch gap-6 md:gap-8 max-w-5xl mx-auto scrollbar-none snap-x snap-mandatory flex-nowrap pb-4 cards-container"
                >
                  {tanzaniteProducts.map((item, idx) => (
                    <div 
                      key={idx}
                      className="w-[260px] md:w-[280px] shrink-0 h-[395px] bg-white border border-[#ecece8] rounded-none shadow-none hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group overflow-hidden card snap-center"
                    >
                      <div className="relative h-48 overflow-hidden bg-[#faf9f6]/50 shrink-0">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      </div>
                      <div className="p-5 text-center flex flex-col flex-grow justify-between">
                        <div>
                          <span className="text-brand-accent text-[8px] md:text-[9px] font-semibold uppercase tracking-[0.15em]">{translate(item.category, language)}</span>
                          <h3 className="font-serif font-light text-brand-dark text-sm mt-2 leading-relaxed h-11 overflow-hidden">{translate(item.title, language)}</h3>
                          <div className="text-brand-accent font-sans font-medium text-xs mt-1 bg-[#8c7a5b]/5 py-0.5 px-2 inline-block">
                            {formatBoutiquePrice(item.price, currency)}
                          </div>
                        </div>
                        <div className="mt-4">
                          <button 
                            onClick={() => addToCart(item.title, item.img, item.price)}
                            className="w-full bg-brand-dark text-white py-2.5 text-[9px] uppercase tracking-widest font-semibold hover:bg-brand-accent transition-colors rounded-none cursor-pointer border-none"
                          >
                            {translate("Add to Cart", language)}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: Authentic Art */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto px-4 gap-4">
                  <div className="hidden md:block flex-1 h-[1px] bg-[#ecece8]"></div>
                  <h2 className="text-2xl md:text-3xl font-serif font-light text-brand-dark px-2 md:px-8 italic text-center">{translate("Authentic Art", language)}</h2>
                  <div className="hidden md:block flex-1 h-[1px] bg-[#ecece8]"></div>
                  
                  {/* Scrolling Arrows */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button 
                      onClick={() => scrollContainer(artScrollRef, "left")} 
                      className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                      aria-label="Scroll left"
                    >
                      <i className="fas fa-chevron-left text-[9px]"></i>
                    </button>
                    <button 
                      onClick={() => scrollContainer(artScrollRef, "right")} 
                      className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                      aria-label="Scroll right"
                    >
                      <i className="fas fa-chevron-right text-[9px]"></i>
                    </button>
                  </div>
                </div>

                {/* Horizontal Scroll on Mobile, wrapped on Desktop */}
                <div 
                  ref={artScrollRef}
                  className="flex overflow-x-auto md:overflow-x-visible md:flex-wrap md:justify-center items-stretch gap-6 md:gap-8 max-w-5xl mx-auto scrollbar-none snap-x snap-mandatory flex-nowrap pb-4 cards-container"
                >
                  {artItems.map((item, idx) => (
                    <div 
                      key={idx}
                      className="w-[260px] md:w-[280px] shrink-0 h-[465px] bg-white border border-[#ecece8] rounded-none shadow-none hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group overflow-hidden card snap-center"
                    >
                      <div className="relative h-64 overflow-hidden bg-[#faf9f6]/50 shrink-0 p-3">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000"
                        />
                      </div>
                      <div className="p-5 text-center flex flex-col flex-grow justify-between">
                        <div>
                          <span className="text-brand-accent text-[8px] md:text-[9px] font-semibold uppercase tracking-[0.15em]">{translate(item.category, language)}</span>
                          <h3 className="font-serif font-light text-brand-dark text-sm mt-1.5 leading-relaxed h-11 overflow-hidden">{translate(item.title, language)}</h3>
                          <div className="text-brand-accent font-sans font-medium text-xs mt-1 bg-[#8c7a5b]/5 py-0.5 px-2 inline-block">
                            {formatBoutiquePrice(item.price, currency)}
                          </div>
                        </div>
                        <div className="mt-4">
                          <button 
                            onClick={() => addToCart(item.title, item.img, item.price)}
                            className="w-full bg-brand-dark text-white py-2.5 text-[9px] uppercase tracking-widest font-semibold hover:bg-brand-accent transition-colors rounded-none cursor-pointer border-none"
                          >
                            {translate("Add to Cart", language)}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ----------------- VIEW: DESTINATIONS DETAIL ----------------- */}
        {currentView === "destination" && selectedDestId && destinationsData[selectedDestId] && (
          <div id="destination-view" className="bg-brand-light pt-16 pb-20 relative z-20 animate-fade-in">
            <div className="container mx-auto px-4 md:px-12 lg:px-16 2xl:px-24">
              
              <button 
                onClick={() => switchView("home")} 
                className="w-max ml-2 md:ml-0 mb-8 flex items-center text-brand-dark hover:text-brand-accent font-medium text-[10px] md:text-xs uppercase tracking-widest transition-colors cursor-pointer focus:outline-none"
              >
                <i className="fas fa-long-arrow-alt-left mr-3"></i> {translate("Return to Home", language)}
              </button>
              
              {/* Destination Core details */}
              <div className="flex flex-col lg:flex-row gap-10 md:gap-16 mb-16 items-center">
                <div className="lg:w-1/2 w-full relative">
                  <div className="hidden md:block absolute -inset-4 border border-brand-accent/20 rounded-sm z-0"></div>
                  <img 
                    src={destinationsData[selectedDestId].img} 
                    alt={translate(destinationsData[selectedDestId].title, language)} 
                    className="relative z-10 w-full h-[350px] md:h-[500px] object-cover rounded-sm shadow-elegant"
                  />
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                  <span className="text-brand-accent text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-semibold mb-3 block">{translate("DESTINATION SPECIFIC", language)}</span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 text-brand-dark italic">
                    {translate(destinationsData[selectedDestId].title, language)}
                  </h1>
                  <p className="century-gothic text-stone-500 leading-relaxed mb-8 text-xs md:text-sm font-light tracking-wide max-w-lg mx-auto lg:mx-0">
                    {translate(destinationsData[selectedDestId].desc, language)}
                  </p>
                  <a 
                    href={calendarBookingLink}
                    target="_blank"
                    className="w-max mx-auto lg:mx-0 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white px-8 py-3.5 text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium transition-all duration-400 rounded-sm"
                  >
                    {translate("Plan Your Journey", language)}
                  </a>
                </div>
              </div>

              {/* Dynamic rendering criteria per country */}
              
              {/* SOUTH AFRICA (10 cards in total, 5 in a row flat, custom tags, NO categories) */}
              {selectedDestId === "south-africa" && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6 px-2 md:px-0 gap-4">
                    <h3 className="text-2xl md:text-3xl font-serif italic text-[#8c7a5b]">{translate("Curated South African Packages", language)}</h3>
                    <div className="hidden md:block flex-grow h-px bg-stone-200 ml-4 animate-pulse"></div>
                    
                    {/* Scrolling Arrows */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={() => scrollContainer(southAfricaScrollRef, "left")} 
                        className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                        aria-label="Scroll left"
                      >
                        <i className="fas fa-chevron-left text-[9px]"></i>
                      </button>
                      <button 
                        onClick={() => scrollContainer(southAfricaScrollRef, "right")} 
                        className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                        aria-label="Scroll right"
                      >
                        <i className="fas fa-chevron-right text-[9px]"></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Grid 5 columns on desktop, 2 side-by-side on mobile */}
                  <div 
                    ref={southAfricaScrollRef}
                    className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 pb-4 px-2 md:px-0"
                  >
                    {southAfricanList.map((pkg, idx) => {
                      return (
                        <div 
                          key={idx}
                          onClick={() => openTourModal(pkg)}
                          className="bg-white border border-[#ecece8] p-1 sm:p-1.5 group cursor-pointer transition-all duration-500 flex flex-col h-full rounded-none hover:border-[#8c7a5b] destination-card"
                        >
                          <div className="w-full aspect-[4/3] bg-[#faf9f6]/40 mb-2 overflow-hidden relative shrink-0">
                            <img src={pkg.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" alt={translate(pkg.title, language)} />
                            <span className="absolute bottom-2 left-2 bg-[#faf9f6] text-brand-dark text-[8px] uppercase tracking-widest font-normal border border-[#ecece8] px-1.5 py-0.5 rounded-none">
                              {translate(pkg.country, language)}
                            </span>
                          </div>
                          <div className="pt-1 flex flex-col flex-grow text-center sm:text-left justify-between">
                            <div>
                              <h4 className="font-serif italic font-medium text-brand-dark text-xs sm:text-sm group-hover:text-[#8c7a5b] transition-colors leading-tight mb-1.5">
                                {translate(pkg.title, language)}
                              </h4>
                              <p className="century-gothic text-stone-500 text-[10px] leading-relaxed font-light line-clamp-3 mb-3">
                                {translate(pkg.desc, language)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-[#ecece8] mt-auto">
                              <span className="text-[8px] md:text-[9.5px] uppercase tracking-[0.1em] font-light text-brand-dark/40 flex items-center">
                                <i className="far fa-clock mr-1 text-[#8c7a5b] text-[9px]"></i> {translate(pkg.duration || "1 Day", language)}
                              </span>
                              <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-[#8c7a5b] flex items-center font-sans">
                                {translate("Discover", language)} <i className="fas fa-chevron-right ml-1 text-[7px]"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* VICTORIA FALLS (5 in a row flat, exactly aligned) */}
              {selectedDestId === "victoria-falls" && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6 px-2 md:px-0 gap-4">
                    <h3 className="text-2xl md:text-3xl font-serif italic text-brand-dark">{translate("Curated Falls Experience", language)}</h3>
                    <div className="hidden md:block flex-grow h-px bg-stone-200 ml-4 animate-pulse"></div>
                    
                    {/* Scrolling Arrows */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={() => scrollContainer(victoriaFallsScrollRef, "left")} 
                        className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                        aria-label="Scroll left"
                      >
                        <i className="fas fa-chevron-left text-[9px]"></i>
                      </button>
                      <button 
                        onClick={() => scrollContainer(victoriaFallsScrollRef, "right")} 
                        className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                        aria-label="Scroll right"
                      >
                        <i className="fas fa-chevron-right text-[9px]"></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Grid 5 columns on desktop, 2 side-by-side on mobile */}
                  <div 
                    ref={victoriaFallsScrollRef}
                    className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 pb-4 px-2 md:px-0"
                  >
                    {victoriaFallsList.map((pkg, idx) => {
                      return (
                        <div 
                          key={idx}
                          onClick={() => openTourModal(pkg)}
                          className="bg-white border border-[#ecece8] p-1 sm:p-1.5 group cursor-pointer transition-all duration-500 flex flex-col h-full rounded-none hover:border-[#8c7a5b] destination-card"
                        >
                          <div className="w-full aspect-[4/3] bg-[#faf9f6]/40 mb-2 overflow-hidden relative shrink-0">
                            <img src={pkg.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" alt={translate(pkg.title, language)} />
                            <span className="absolute bottom-2 left-2 bg-[#faf9f6] text-brand-dark text-[8px] uppercase tracking-widest font-normal border border-[#ecece8] px-1.5 py-0.5 rounded-none">
                              {translate(pkg.country, language)}
                            </span>
                          </div>
                          <div className="pt-1 flex flex-col flex-grow text-center sm:text-left justify-between">
                            <div>
                              <h4 className="font-serif italic font-medium text-brand-dark text-xs sm:text-sm group-hover:text-[#8c7a5b] transition-colors leading-tight mb-1.5">
                                {translate(pkg.title, language)}
                              </h4>
                              <p className="century-gothic text-stone-500 text-[10px] leading-relaxed font-light line-clamp-3 mb-3">
                                {translate(pkg.desc, language)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-[#ecece8] mt-auto">
                              <span className="text-[8px] md:text-[9.5px] uppercase tracking-[0.1em] font-light text-brand-dark/40 flex items-center">
                                <i className="far fa-clock mr-1 text-[#8c7a5b] text-[9px]"></i> {translate(pkg.duration || "1 Day", language)}
                              </span>
                              <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-[#8c7a5b] flex items-center font-sans">
                                {translate("Discover", language)} <i className="fas fa-chevron-right ml-1 text-[7px]"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MAURITIUS (First 10 of Mauritus, 5 in a row, with load more arrow/expand) */}
              {selectedDestId === "mauritius" && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6 px-2 md:px-0 gap-4">
                    <h3 className="text-2xl md:text-3xl font-serif italic text-brand-dark font-light">{translate("Available Luxury Resorts", language)}</h3>
                    <div className="hidden md:block flex-grow h-px bg-stone-200 ml-4"></div>
                    
                    {/* Scrolling Arrows */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={() => scrollContainer(mauritiusScrollRef, "left")} 
                        className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                        aria-label="Scroll left"
                      >
                        <i className="fas fa-chevron-left text-[9px]"></i>
                      </button>
                      <button 
                        onClick={() => scrollContainer(mauritiusScrollRef, "right")} 
                        className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                        aria-label="Scroll right"
                      >
                        <i className="fas fa-chevron-right text-[9px]"></i>
                      </button>
                    </div>
                  </div>

                  {/* Grid 5 columns on desktop, 2 side-by-side on mobile */}
                  <div 
                    ref={mauritiusScrollRef}
                    className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 pb-4 px-2 md:px-0"
                  >
                    {mauritiusList.slice(0, showAllMauritius ? mauritiusList.length : 10).map((pkg, idx) => {
                      return (
                        <div 
                          key={idx}
                          onClick={() => openTourModal(pkg)}
                          className="bg-white border border-[#ecece8] p-1 sm:p-1.5 group cursor-pointer transition-all duration-500 flex flex-col h-full rounded-none hover:border-[#8c7a5b] destination-card"
                        >
                          <div className="w-full aspect-[4/3] bg-[#faf9f6]/40 mb-2 overflow-hidden relative shrink-0">
                            <img src={pkg.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" alt={translate(pkg.title, language)} />
                            <span className="absolute bottom-2 left-2 bg-[#faf9f6] text-brand-dark text-[8px] uppercase tracking-widest font-normal border border-[#ecece8] px-1.5 py-0.5 rounded-none">
                              {translate(pkg.country, language)}
                            </span>
                          </div>
                          <div className="pt-1 flex flex-col flex-grow text-center sm:text-left justify-between">
                            <div>
                              <h4 className="font-serif italic font-medium text-brand-dark text-xs sm:text-sm group-hover:text-[#8c7a5b] transition-colors leading-tight mb-1.5">
                                {translate(pkg.title, language)}
                              </h4>
                              <p className="century-gothic text-stone-500 text-[10px] leading-relaxed font-light line-clamp-3 mb-3">
                                {translate(pkg.desc, language)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-[#ecece8] mt-auto">
                              <span className="text-[8px] md:text-[9.5px] uppercase tracking-[0.1em] font-light text-brand-dark/40 flex items-center">
                                <i className="far fa-clock mr-1 text-[#8c7a5b] text-[9px]"></i> {translate(pkg.duration || "1 Day", language)}
                              </span>
                              <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-[#8c7a5b] flex items-center font-sans">
                                {translate("Discover", language)} <i className="fas fa-chevron-right ml-1 text-[7px]"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {mauritiusList.length > 10 && (
                    <div className="mt-10 text-center">
                      <button 
                        onClick={() => setShowAllMauritius(!showAllMauritius)}
                        className="inline-flex items-center gap-2 cursor-pointer border border-brand-dark rounded-full px-6 py-3 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-brand-dark hover:bg-brand-dark hover:text-white transition-all"
                      >
                        {showAllMauritius ? translate("Show Less", language) : translate("See More Resorts", language)}{" "}
                        <i className={`fas ${showAllMauritius ? "fa-arrow-left" : "fa-arrow-right"}`}></i>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ZANZIBAR (First 10, 5 in a row, see more expanding script) */}
              {selectedDestId === "zanzibar" && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6 px-2 md:px-0 gap-4">
                    <h3 className="text-2xl md:text-3xl font-serif italic text-brand-dark font-light">{translate("Exotic Zanzibar Resorts", language)}</h3>
                    <div className="hidden md:block flex-grow h-px bg-stone-200 ml-4"></div>
                    
                    {/* Scrolling Arrows */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={() => scrollContainer(zanzibarScrollRef, "left")} 
                        className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                        aria-label="Scroll left"
                      >
                        <i className="fas fa-chevron-left text-[9px]"></i>
                      </button>
                      <button 
                        onClick={() => scrollContainer(zanzibarScrollRef, "right")} 
                        className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                        aria-label="Scroll right"
                      >
                        <i className="fas fa-chevron-right text-[9px]"></i>
                      </button>
                    </div>
                  </div>

                  {/* Grid 5 columns on desktop, 2 side-by-side on mobile */}
                  <div 
                    ref={zanzibarScrollRef}
                    className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 pb-4 px-2 md:px-0"
                  >
                    {zanzibarList.slice(0, showAllZanzibar ? zanzibarList.length : 10).map((pkg, idx) => {
                      return (
                        <div 
                          key={idx}
                          onClick={() => openTourModal(pkg)}
                          className="bg-white border border-[#ecece8] p-1 sm:p-1.5 group cursor-pointer transition-all duration-500 flex flex-col h-full rounded-none hover:border-[#8c7a5b] destination-card"
                        >
                          <div className="w-full aspect-[4/3] bg-[#faf9f6]/40 mb-2 overflow-hidden relative shrink-0">
                            <img src={pkg.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" alt={translate(pkg.title, language)} />
                            <span className="absolute bottom-2 left-2 bg-[#faf9f6] text-brand-dark text-[8px] uppercase tracking-widest font-normal border border-[#ecece8] px-1.5 py-0.5 rounded-none">
                              {translate(pkg.country, language)}
                            </span>
                          </div>
                          <div className="pt-1 flex flex-col flex-grow text-center sm:text-left justify-between">
                            <div>
                              <h4 className="font-serif italic font-medium text-brand-dark text-xs sm:text-sm group-hover:text-[#8c7a5b] transition-colors leading-tight mb-1.5">
                                {translate(pkg.title, language)}
                              </h4>
                              <p className="century-gothic text-stone-500 text-[10px] leading-relaxed font-light line-clamp-3 mb-3">
                                {translate(pkg.desc, language)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-[#ecece8] mt-auto">
                              <span className="text-[8px] md:text-[9.5px] uppercase tracking-[0.1em] font-light text-brand-dark/40 flex items-center">
                                <i className="far fa-clock mr-1 text-[#8c7a5b] text-[9px]"></i> {translate(pkg.duration || "1 Day", language)}
                              </span>
                              <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-[#8c7a5b] flex items-center font-sans">
                                {translate("Discover", language)} <i className="fas fa-chevron-right ml-1 text-[7px]"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {zanzibarList.length > 10 && (
                    <div className="mt-10 text-center">
                      <button 
                        onClick={() => setShowAllZanzibar(!showAllZanzibar)}
                        className="inline-flex items-center gap-2 cursor-pointer border border-brand-dark rounded-full px-6 py-3 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-brand-dark hover:bg-brand-dark hover:text-white transition-all"
                      >
                        {showAllZanzibar ? translate("Show Less", language) : translate("See More Resorts", language)}{" "}
                        <i className={`fas ${showAllZanzibar ? "fa-arrow-left" : "fa-arrow-right"}`}></i>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* RENDER OTHER STANDARD DESTINATIONS */}
              {!["south-africa", "victoria-falls", "mauritius", "zanzibar"].includes(selectedDestId) && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6 px-2 md:px-0 gap-4">
                    <h3 className="text-2xl md:text-3xl font-serif italic text-brand-dark">{translate("Curated Outings & Resorts", language)}</h3>
                    <div className="hidden md:block flex-grow h-px bg-stone-200 ml-4"></div>
                    
                    {/* Scrolling Arrows */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={() => scrollContainer(otherDestScrollRef, "left")} 
                        className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                        aria-label="Scroll left"
                      >
                        <i className="fas fa-chevron-left text-[9px]"></i>
                      </button>
                      <button 
                        onClick={() => scrollContainer(otherDestScrollRef, "right")} 
                        className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center cursor-pointer bg-white shadow-soft"
                        aria-label="Scroll right"
                      >
                        <i className="fas fa-chevron-right text-[9px]"></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Grid layout on desktop, 2 side-by-side on mobile */}
                  <div 
                    ref={otherDestScrollRef}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 pb-4 px-2 md:px-0"
                  >
                    {allTourPackages.filter((p) => p.destId === selectedDestId).map((pkg, idx) => {
                      return (
                        <div 
                          key={idx}
                          onClick={() => openTourModal(pkg)}
                          className="bg-white border border-[#ecece8] p-1 sm:p-1.5 group cursor-pointer transition-all duration-500 flex flex-col h-full rounded-none hover:border-[#8c7a5b] destination-card"
                        >
                          <div className="w-full aspect-[4/3] bg-[#faf9f6]/40 mb-2 overflow-hidden relative shrink-0">
                            <img src={pkg.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" alt={translate(pkg.title, language)} />
                            <span className="absolute bottom-2 left-2 bg-[#faf9f6] text-brand-dark text-[8px] uppercase tracking-widest font-normal border border-[#ecece8] px-1.5 py-0.5 rounded-none">
                              {translate(pkg.country, language)}
                            </span>
                          </div>
                          <div className="pt-1 flex flex-col flex-grow text-center sm:text-left justify-between">
                            <div>
                              <h4 className="font-serif italic font-medium text-brand-dark text-xs sm:text-sm group-hover:text-[#8c7a5b] transition-colors leading-tight mb-1.5">
                                {translate(pkg.title, language)}
                              </h4>
                              <p className="century-gothic text-stone-500 text-[10px] leading-relaxed font-light line-clamp-3 mb-3">
                                {translate(pkg.desc, language)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-[#ecece8] mt-auto">
                              <span className="text-[8px] md:text-[9.5px] uppercase tracking-[0.1em] font-light text-[#8c7a5b] flex items-center">
                                <i className="far fa-clock mr-1 text-[#8c7a5b] text-[9px]"></i> {translate(pkg.duration || "1 Day", language)}
                              </span>
                              <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-[#8c7a5b] flex items-center font-sans">
                                {translate("Discover", language)} <i className="fas fa-chevron-right ml-1 text-[7px]"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FAQs accordion list */}
              {destinationsData[selectedDestId]?.faqs && destinationsData[selectedDestId].faqs!.length > 0 && (
                <div className="mt-16 bg-white p-6 md:p-12 lg:p-16 rounded-sm shadow-soft border border-stone-100 max-w-4xl mx-auto">
                  <div className="text-center mb-8 md:mb-12">
                    <h3 className="text-2xl md:text-3xl font-light font-serif text-brand-dark italic">{translate("Frequently Asked Questions", language)}</h3>
                  </div>
                  <div className="space-y-4">
                    {destinationsData[selectedDestId].faqs!.map((faq, fIdx) => (
                      <div key={fIdx} className="bg-white rounded-sm border border-stone-100 shadow-soft overflow-hidden">
                        <button 
                          className="w-full px-6 md:px-8 py-5 text-left font-medium flex justify-between items-center focus:outline-none hover:bg-stone-50 transition-colors text-brand-dark text-xs md:text-sm tracking-wide cursor-pointer"
                          onClick={(e) => {
                            const body = e.currentTarget.nextElementSibling;
                            body?.classList.toggle("hidden");
                            e.currentTarget.querySelector("i")?.classList.toggle("rotate-180");
                          }}
                        >
                          <span>{translate(faq.q, language)}</span>
                          <i className="fas fa-chevron-down text-brand-accent transition-transform duration-300 text-xs"></i>
                        </button>
                        <div className="px-6 md:px-8 py-5 text-stone-600 hidden bg-white text-xs font-light leading-relaxed border-t border-stone-100 tracking-wide">
                          {translate(faq.a, language)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* Global Footer (With formatted mobile numbers and specified associations list) */}
      <footer className="relative pt-20 md:pt-24 pb-10 md:pb-12 overflow-hidden border-t border-white/20 bg-brand-dark z-20">
        <img 
          src="https://images.pexels.com/photos/6363665/pexels-photo-6363665.jpeg" 
          loading="lazy" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm z-0" 
          alt="Overlay footer flora"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/95 to-brand-dark/90 z-10"></div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-16 2xl:max-w-[1600px] relative z-20">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 md:mb-16 gap-10 md:gap-16">
            <div className="w-full lg:w-1/3">
              <img 
                src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXc366uzOWFLPWyEuBIMhicbjT2GajlyGrsVyeSDE68ap9hBFEamMNA78eyvIPmA-MVNbGhtCBwzKlk29IttM_jygwrCJXjmUdZt6iijoXLFzRyBcrcb_C-oH3KxcsenhczLCRl7RfOtKSy_7o02kbNgJ29iMA?key=KPDE2Lo8HhnJ3v--HqdAAw" 
                loading="lazy" 
                className="h-16 md:h-20 lg:h-24 w-auto mb-6 md:mb-8 filter brightness-0 invert drop-shadow-md object-contain"
                alt="White Viemma Logo"
              />
              <p className="text-white/80 text-[10px] md:text-xs mb-6 md:mb-8 font-light leading-relaxed tracking-wide">
                {translate("Experience the unparalleled majesty of the African continent and the Indian Ocean. From sun-drenched savannas and rich historic landmarks, to vibrant cultures and pristine island escapes, let our experts guide your unforgettable journey through the true heart of Africa.", language)}
              </p>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-1/3 text-[10px] md:text-xs tracking-wide">
              <h5 className="text-white font-serif font-light italic text-xl md:text-2xl mb-6 md:mb-8 border-b border-white/20 pb-3 md:pb-4 inline-block">{translate("Contact Us", language)}</h5>
              <ul className="space-y-4 md:space-y-5 text-white/80 font-light">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3 md:mr-4 text-brand-accent"></i><span>{translate("Cape Town, South Africa", language)}</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone mt-0.5 mr-3 md:mr-4 text-brand-accent"></i><span>{translate("Local", language)}: (+27) 021 0137143</span>
                </li>
                {/* Formatted Mobile number spacer exactly like Local */}
                <li className="flex items-center">
                  <i className="fas fa-mobile-alt mt-0.5 mr-3 md:mr-4 text-brand-accent"></i><span>{translate("Mobile", language)}: (+27) 068 171 2985</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mt-0.5 mr-3 md:mr-4 text-brand-accent"></i>
                  <a href="mailto:info@viemmatours.africa" className="hover:text-brand-accent transition-colors">info@viemmatours.africa</a>
                </li>
              </ul>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-1/3 text-[10px] md:text-xs tracking-wide">
              <h5 className="text-white font-serif font-light italic text-xl md:text-2xl mb-6 md:mb-8 border-b border-white/20 pb-3 md:pb-4 inline-block">{translate("Quick Links", language)}</h5>
              <div className="grid grid-cols-2 gap-y-3 md:gap-y-4 gap-x-2 text-white/80 font-light">
                <a onClick={() => switchView("destination", "south-africa")} className="hover:text-brand-accent cursor-pointer transition-colors w-max"><i className="fas fa-angle-right mr-1.5 md:mr-2 text-[8px] md:text-[10px] text-brand-accent"></i> {translate("South Africa", language)}</a>
                <a onClick={() => switchView("destination", "victoria-falls")} className="hover:text-brand-accent cursor-pointer transition-colors w-max"><i className="fas fa-angle-right mr-1.5 md:mr-2 text-[8px] md:text-[10px] text-brand-accent"></i> {translate("Victoria Falls", language)}</a>
                <a onClick={() => switchView("destination", "mauritius")} className="hover:text-brand-accent cursor-pointer transition-colors w-max"><i className="fas fa-angle-right mr-1.5 md:mr-2 text-[8px] md:text-[10px] text-brand-accent"></i> {translate("Mauritius", language)}</a>
                <a onClick={() => switchView("tours")} className="hover:text-brand-accent cursor-pointer transition-colors w-max"><i className="fas fa-angle-right mr-1.5 md:mr-2 text-[8px] md:text-[10px] text-brand-accent"></i> {translate("All Tours", language)}</a>
                <a onClick={() => switchView("corporate")} className="hover:text-brand-accent cursor-pointer transition-colors w-max"><i className="fas fa-angle-right mr-1.5 md:mr-2 text-[8px] md:text-[10px] text-brand-accent"></i> {translate("Corporate", language)}</a>
                <a onClick={() => switchView("romance")} className="hover:text-brand-accent cursor-pointer transition-colors w-max"><i className="fas fa-angle-right mr-1.5 md:mr-2 text-[8px] md:text-[10px] text-brand-accent"></i> {translate("Romance", language)}</a>
              </div>
            </div>
          </div>

          {/* Associations logos in footer block exactly as requested */}
          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-[8px] md:text-[10px] text-white/60 uppercase tracking-widest font-medium gap-6 md:gap-0">
            <div className="flex flex-col gap-4 md:w-1/3">
              <div className="text-center md:text-left">&copy; {new Date().getFullYear()} Viemma Tours. {translate("All rights reserved.", language)}</div>
              <div className="flex gap-5 justify-center md:justify-start">
                <a href="https://www.facebook.com/viemmatours" target="_blank" className="hover:text-brand-accent text-xs md:text-sm transition-colors"><i className="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/viemmatours/" target="_blank" className="hover:text-brand-accent text-xs md:text-sm transition-colors"><i className="fab fa-instagram"></i></a>
                <a href="https://98769dc72f684e91a180d83c6124e2cc.elf.site" target="_blank" className="hover:text-brand-accent text-xs md:text-sm transition-colors"><i className="fab fa-tripadvisor"></i></a>
              </div>
            </div>
            
            <div className="flex flex-col gap-5 md:w-2/3 md:items-end w-full">
              {/* Association images with exact listed URLs */}
              <div className="flex flex-wrap gap-4 items-center justify-center md:justify-end w-full">
                <span className="text-white/45 text-[8px] tracking-widest mr-2 uppercase">{translate("Associations:", language)}</span>
                {associationImages.map((logoUrl, lIdx) => (
                  <div key={lIdx} className="bg-white p-1 rounded-sm shadow-sm h-7 md:h-9 flex items-center justify-center overflow-hidden">
                    <img 
                      src={logoUrl} 
                      alt={`Association Logo ${lIdx}`} 
                      className="h-full w-auto object-contain filter opacity-85 hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* Shopping Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-[110] transform transition-transform duration-500 flex flex-col ${cartOpen ? "translate-x-0" : "translate-x-full"}`} id="cart-sidebar">
        <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-brand-light">
          <h3 className="font-serif text-2xl italic font-light text-brand-dark">{translate("Your Cart", language)}</h3>
          <button onClick={() => setCartOpen(false)} className="text-stone-400 hover:text-brand-dark transition-colors cursor-pointer focus:outline-none">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div id="cart-items-container" className="flex-1 overflow-y-auto p-6 space-y-4">
          {Object.keys(cart).length === 0 ? (
            <p className="text-stone-400 text-xs font-light italic text-center py-10">{translate("Your cart is empty.", language)}</p>
          ) : (
            Object.keys(cart).map((title, idx) => {
              const item = cart[title];
              const singlePriceStr = item.price ? formatBoutiquePrice(item.price, currency) : "";
              let totalLinePriceStr = "";
              if (item.price) {
                const numericSingle = parseFloat(item.price.replace(/[^0-9]/g, ""));
                if (!isNaN(numericSingle)) {
                  totalLinePriceStr = formatBoutiquePrice(`R ${numericSingle * item.qty}`, currency);
                }
              }

              return (
                <div key={idx} className="flex items-center gap-4 bg-white p-3 border border-stone-100 rounded-sm shadow-sm">
                  <img src={item.img} className="w-16 h-16 object-cover rounded-sm shrink-0" alt={title} />
                  <div className="flex-grow">
                    <h4 className="text-xs font-medium text-brand-dark leading-tight">{translate(title, language)}</h4>
                    
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-stone-500 font-sans tracking-wide">
                        {singlePriceStr}
                      </span>
                      {totalLinePriceStr && (
                        <span className="text-xs font-sans font-semibold text-brand-accent">
                          {totalLinePriceStr}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => updateQty(title, -1)}
                        className="w-6 h-6 border border-stone-200 flex items-center justify-center rounded-sm hover:bg-stone-100 text-stone-500 transition-colors focus:outline-none cursor-pointer"
                      >
                        <i className="fas fa-minus text-[8px]"></i>
                      </button>
                      <span className="text-xs font-medium w-4 text-center">{item.qty}</span>
                      <button 
                        onClick={() => updateQty(title, 1)}
                        className="w-6 h-6 border border-stone-200 flex items-center justify-center rounded-sm hover:bg-stone-100 text-stone-500 transition-colors focus:outline-none cursor-pointer"
                      >
                        <i className="fas fa-plus text-[8px]"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-6 border-t border-stone-200 bg-stone-50 shrink-0">
          {getCartTotal() && (
            <div className="flex justify-between items-center mb-4 px-1 py-2 border-b border-stone-200/60">
              <span className="text-[10px] uppercase tracking-widest text-[#8c7a5b] font-sans font-semibold">{translate("Total Amount", language)}</span>
              <span className="text-lg font-serif italic text-brand-dark font-light">{getCartTotal()}</span>
            </div>
          )}
          <button 
            onClick={checkoutEmail}
            disabled={Object.keys(cart).length === 0}
            className={`w-full text-white py-4 rounded-none font-medium uppercase tracking-widest text-xs flex items-center justify-center transition-colors shadow-sm cursor-pointer ${Object.keys(cart).length === 0 ? "bg-stone-300 pointer-events-none" : "bg-brand-dark hover:bg-brand-accent"}`}
          >
            <i className="fas fa-envelope mr-3 text-sm"></i> {translate("Order & Request Quote via Email", language)}
          </button>
        </div>
      </div>

      {/* Booking Details Modal Popup & Custom Township Bullet points */}
      {bookingModalOpen && selectedTour && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in" id="booking-modal">
          <div className="bg-brand-light w-full max-w-2xl rounded-sm shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="relative h-48 md:h-64 bg-stone-200 shrink-0">
              <img 
                src={selectedTour.img} 
                className="w-full h-full object-cover" 
                alt={selectedTour.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.pexels.com/photos/14802795/pexels-photo-14802795.jpeg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 to-transparent"></div>
              
              <button 
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-4 right-4 bg-white/10 border border-white/20 backdrop-blur rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-white hover:text-brand-dark text-white transition-all duration-300 z-10 cursor-pointer focus:outline-none"
              >
                <i className="fas fa-times text-xs md:text-sm"></i>
              </button>
              
              <div className="absolute bottom-4 md:bottom-6 left-6 md:left-8">
                <span className={`country-badge mb-2 md:mb-3 shadow-md ${countryColors[selectedTour.country] || "bg-stone-500"}`}>
                  {translate(selectedTour.country, language)}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-white italic mb-1 md:mb-2 leading-tight pr-4 text-shadow-strong">
                  {translate(selectedTour.title, language)}
                </h3>
                <div className="flex gap-1 drop-shadow-md">
                  {Array.from({ length: selectedTour.rating }).map((_, rIdx) => (
                    <i key={rIdx} className="fas fa-star text-brand-accent text-[10px] md:text-xs"></i>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10 overflow-y-auto">
              <div className="century-gothic text-stone-600 leading-relaxed mb-1 text-xs md:text-sm font-medium tracking-wide">
                {translate(selectedTour.desc, language)}
              </div>

              {/* 🛑 SPECIAL CONDITIONAL REQUIREMENT FOR TOWNSHIP CULTURAL TOUR 🛑 */}
              {selectedTour.title.toLowerCase().includes("township") && (
                <div className="mt-4 p-4 border border-brand-accent/30 bg-brand-light/40 rounded-sm">
                  <h5 className="font-serif font-semibold text-brand-dark text-[11px] md:text-xs uppercase tracking-widest mb-2 text-brand-accent">
                    {translate("Featured Township Outing Notes:", language)}
                  </h5>
                  <ul className="list-disc pl-5 text-[11px] md:text-xs text-stone-600 space-y-1">
                    <li>{translate("There is a !Khwa ttu tours option available", language)}</li>
                    <li>{translate("Perfect for the independent visitor - hikers, bikers, and outdoor enthusiasts", language)}</li>
                    <li>{translate("Self guided museum tours included", language)}</li>
                    <li>{translate("San Guided Tours available by request", language)}</li>
                  </ul>
                </div>
              )}

              <div className="border-t border-stone-200 pt-6 md:pt-8 mt-6">
                <h5 className="font-serif font-light text-brand-dark mb-3 text-sm md:text-base">
                  {translate("Booking Inclusions:", language)}
                </h5>
                <ul className="list-disc pl-5 space-y-1 mb-8 text-stone-500 font-light text-[10px] md:text-xs tracking-wide">
                  <li>{translate("Luxury accommodations styled individually", language)}</li>
                  <li>{translate("Incredible expert local guide and host tracking", language)}</li>
                  <li>{translate("All transfers, pickups, and luggage services", language)}</li>
                  <li>{translate("24/7 dedicated concierge help desk", language)}</li>
                </ul>

                <h4 className="font-light mb-4 md:mb-6 font-serif text-base md:text-lg text-brand-dark italic">
                  {translate("Ready to embark?", language)}
                </h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href={calendarBookingLink} 
                    target="_blank" 
                    className="flex-1 flex items-center justify-center border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-medium py-3 px-4 rounded-sm transition-colors text-[9px] md:text-[10px] uppercase tracking-widest"
                  >
                    <i className="far fa-calendar-alt mr-2 text-sm animate-pulse"></i> {translate("Book via Calendar", language)}
                  </a>
                  <a 
                    href={language === "pt" 
                      ? `https://wa.me/27681712985?text=Ol%C3%A1%20Viemma%20Tours,%20tenho%20interesse%20no%20roteiro%20${encodeURIComponent(translate(selectedTour.title, language))}.`
                      : `https://wa.me/27681712985?text=Hello%20Viemma%20Tours,%20I'm%20interested%20in%20the%20${encodeURIComponent(selectedTour.title)}%20itinerary.`
                    } 
                    target="blank" 
                    className="flex-1 flex items-center justify-center border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-medium py-3 px-4 rounded-sm transition-colors text-[9px] md:text-[10px] uppercase tracking-widest"
                  >
                    <i className="fab fa-whatsapp mr-2 text-base"></i> {translate("Enquire via WhatsApp", language)}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* General Contact Us Overlay Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in" id="contact-modal">
          <div className="bg-brand-light w-full max-w-md rounded-sm shadow-2xl relative p-8 md:p-10 border border-stone-200">
            <button 
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-brand-dark w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors cursor-pointer focus:outline-none"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <h3 className="text-2xl md:text-3xl font-serif font-light mb-8 text-center text-brand-dark italic">{translate("Connect With Us", language)}</h3>
            
            <div className="space-y-4">
              <a href="tel:+270210137143" className="flex items-center p-3.5 bg-white rounded-sm shadow-sm hover:shadow-lg transition-all border border-stone-100 group">
                <div className="w-10 h-10 border border-brand-accent/40 text-brand-accent rounded-full flex items-center justify-center mr-4 group-hover:bg-brand-accent group-hover:text-white transition-colors flex-shrink-0"><i className="fas fa-phone-alt text-xs"></i></div>
                <div>
                  <div className="font-medium text-brand-dark text-[10px] uppercase tracking-widest mb-1">{translate("Call Local", language)}</div>
                  <div className="text-[10px] text-stone-500 font-light">(+27) 021 0137143</div>
                </div>
              </a>
              
              <a href="tel:+27681712985" className="flex items-center p-3.5 bg-white rounded-sm shadow-sm hover:shadow-lg transition-all border border-stone-100 group">
                <div className="w-10 h-10 border border-brand-accent/40 text-brand-accent rounded-full flex items-center justify-center mr-4 group-hover:bg-brand-accent group-hover:text-white transition-colors flex-shrink-0"><i className="fas fa-mobile-alt text-xs"></i></div>
                <div>
                  <div className="font-medium text-brand-dark text-[10px] uppercase tracking-widest mb-1">{translate("Call Mobile", language)}</div>
                  <div className="text-[10px] text-stone-500 font-light">+27 68 171 2985</div>
                </div>
              </a>
              
              <a href="https://wa.me/27681712985" target="_blank" className="flex items-center p-3.5 bg-white rounded-sm shadow-sm hover:shadow-lg transition-all border border-stone-100 group">
                <div className="w-10 h-10 border border-[#25D366]/50 text-[#25D366] rounded-full flex items-center justify-center mr-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors flex-shrink-0"><i className="fab fa-whatsapp text-lg"></i></div>
                <div>
                  <div className="font-medium text-brand-dark text-[10px] uppercase tracking-widest mb-1">{translate("WhatsApp", language)}</div>
                  <div className="text-[10px] text-stone-500 font-light">{translate("Chat with us directly", language)}</div>
                </div>
              </a>
              
              <a href="mailto:info@viemmatours.africa" className="flex items-center p-3.5 bg-white rounded-sm shadow-sm hover:shadow-lg transition-all border border-stone-100 group">
                <div className="w-10 h-10 border border-brand-dark/30 text-brand-dark rounded-full flex items-center justify-center mr-4 group-hover:bg-brand-dark group-hover:text-white transition-colors flex-shrink-0"><i className="fas fa-envelope text-xs"></i></div>
                <div>
                  <div className="font-medium text-brand-dark text-[10px] uppercase tracking-widest mb-1">{translate("Email", language)}</div>
                  <div className="text-[10px] text-stone-500 font-light break-all">info@viemmatours.africa</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
