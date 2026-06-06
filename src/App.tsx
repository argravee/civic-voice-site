import { ArrowRight, Leaf, Play, Menu, CheckCircle2, Bookmark, Home, FileText, Settings, UserCircle, AlertCircle, Sparkles, Eye, UserCheck, Mail, Send, Check, MapPin, MessageSquare, Newspaper, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// @ts-ignore
import logo from '../civic-voice-logo.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'landing' | 'privacy' | 'support'>('landing');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Testing/Get the App Modal Program States
  const [isTestingModalOpen, setIsTestingModalOpen] = useState(false);
  const [testingEmail, setTestingEmail] = useState('');
  const [testingRole, setTestingRole] = useState('citizen');
  const [testingPlatform, setTestingPlatform] = useState('ios');
  const [testingSubmitted, setTestingSubmitted] = useState(false);

  const handleTestingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testingEmail) return;

    const subject = encodeURIComponent('Civic Voice Beta Testing Request');
    const body = encodeURIComponent(
      [
        'Hello Civic Voice team,',
        '',
        'I would like to join the Civic Voice beta testing pool.',
        '',
        `Email: ${testingEmail}`,
        `Civic profile: ${testingRole}`,
        `Platform: ${testingPlatform.toUpperCase()}`,
        '',
        'Thank you.',
      ].join('\n'),
    );

    window.location.href = `mailto:nasar.siddi@gmail.com?subject=${subject}&body=${body}`;
    setTestingSubmitted(true);
  };

  const closeTestingModal = () => {
    setIsTestingModalOpen(false);
    // Reset form states on close after animation completed
    setTimeout(() => {
      setTestingEmail('');
      setTestingRole('citizen');
      setTestingPlatform('ios');
      setTestingSubmitted(false);
    }, 300);
  };

  // Contact form submission states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
      // Clean up fields
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }, 1200);
  };

  const handleNavClick = (view: 'landing' | 'privacy' | 'support', scrollToFeatures = false) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (scrollToFeatures) {
      setTimeout(() => {
        featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18
      }
    }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: "easeIn" } }
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: custom * 0.15
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-sans text-slate-900 selection:bg-red-100 selection:text-red-900 overflow-x-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              y: -80,
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 bg-[#F9F8F6] z-[9999] flex flex-col items-center justify-center p-6 select-none"
          >
            <div className="flex flex-col items-center max-w-sm w-full text-center relative">
              
              {/* Logo with high-precision entry scaling & branding indicator */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.85, 1.05, 1], 
                  opacity: 1,
                  transition: { 
                    duration: 0.7, 
                    ease: "easeOut"
                  }
                }}
                className="relative mb-6"
              >
                <span className="absolute inset-0 rounded-full bg-red-100/50 animate-ping -m-4 scale-75" />
                <img 
                  src={logo} 
                  className="w-24 h-24 object-contain relative z-10" 
                  alt="Civic Voice Logo" 
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Brand Title */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.15, duration: 0.5, ease: "easeOut" }
                }}
                className="text-4xl font-extrabold tracking-tight text-slate-900 mb-8"
              >
                Civic Voice
              </motion.h1>

              {/* High-definition smooth progress indicator */}
              <div className="w-48 h-[3px] bg-slate-200/60 rounded-full overflow-hidden mb-4 relative">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: "100%",
                    transition: { duration: 1.5, ease: "easeInOut" }
                  }}
                  className="h-full bg-[#E64C4C] rounded-full"
                />
              </div>

              {/* Custom subtle pulse indicator */}
              <motion.div
                initial={{ opacity: 0.4 }}
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  transition: { 
                    delay: 0.5, 
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  } 
                }}
                className="font-mono text-[9px] text-slate-400 uppercase tracking-widest"
              >
                Loading...
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-4 md:px-12 bg-[#F9F8F6] border-b border-slate-100 relative z-50">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <motion.button 
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-0 text-2xl font-black tracking-tight cursor-pointer hover:opacity-85 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={logo} className="w-12 h-12 object-contain -mr-1" alt="Civic Voice Logo" referrerPolicy="no-referrer" />
              Civic Voice
            </motion.button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <button 
                onClick={() => handleNavClick('landing', true)}
                className="hover:text-slate-900 transition-colors cursor-pointer relative py-1"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E64C4C] transition-all duration-300 hover:w-full"></span>
              </button>
              <button 
                onClick={() => handleNavClick('privacy')}
                className={`hover:text-slate-900 transition-all cursor-pointer relative py-1 ${currentView === 'privacy' ? 'text-[#E64C4C] font-semibold' : ''}`}
              >
                Privacy Policy
                {currentView === 'privacy' && (
                  <motion.span layoutId="activeNavLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E64C4C]" />
                )}
              </button>
              <button 
                onClick={() => handleNavClick('support')}
                className={`hover:text-slate-900 transition-all cursor-pointer relative py-1 ${currentView === 'support' ? 'text-[#E64C4C] font-semibold' : ''}`}
              >
                Support
                {currentView === 'support' && (
                  <motion.span layoutId="activeNavLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E64C4C]" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button 
              onClick={() => handleNavClick('support')}
              className="px-5 py-2 text-sm font-medium border border-slate-300 rounded-full hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Support
            </motion.button>
            <motion.button 
              onClick={() => setIsTestingModalOpen(true)}
              className="px-5 py-2 text-sm font-medium bg-red-600 text-white rounded-full hover:bg-[#c93d3d] shadow-sm transition-all cursor-pointer font-semibold"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Get the App
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-600 p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu />
          </button>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-[#F9F8F6] border-b border-slate-200 shadow-lg p-6 flex flex-col gap-4 md:hidden z-40"
              >
                <button 
                  onClick={() => handleNavClick('landing', true)}
                  className="text-left text-lg font-medium text-slate-700 hover:text-slate-900"
                >
                  Features
                </button>
                <button 
                  onClick={() => handleNavClick('privacy')}
                  className={`text-left text-lg font-medium hover:text-slate-900 ${currentView === 'privacy' ? 'text-[#E64C4C]' : 'text-slate-700'}`}
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => handleNavClick('support')}
                  className={`text-left text-lg font-medium hover:text-slate-900 ${currentView === 'support' ? 'text-[#E64C4C]' : 'text-slate-700'}`}
                >
                  Support
                </button>
                <div className="border-t border-slate-200 pt-4 mt-2 flex flex-col gap-3">
                  <button 
                    onClick={() => handleNavClick('support')}
                    className="w-full text-center py-2.5 text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 font-medium text-sm"
                  >
                    Contact Support
                  </button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsTestingModalOpen(true);
                    }}
                    className="w-full text-center py-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 font-medium text-sm shadow-sm cursor-pointer"
                  >
                    Get the App
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* View Switcher Routing */}
        <AnimatePresence mode="wait">
          {currentView === 'landing' && (
            <motion.div
              key="landing"
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Main Content */}
              <main className="flex min-h-[calc(100svh-81px)] flex-col items-center justify-center px-4 py-12 md:py-16">
                <motion.div 
                  className="flex flex-col items-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {/* Hero Eyebrow */}
                  <motion.p 
                    className="text-[#E64C4C] font-semibold tracking-wide text-sm mb-4 uppercase"
                    variants={itemVariants}
                  >
                    AI-Powered Summaries &amp; Context for Legislation
                  </motion.p>

                  {/* Hero Headline */}
                  <motion.h1 
                    className="text-center text-[40px] leading-[1.08] md:text-6xl lg:text-[68px] xl:text-[76px] font-bold tracking-tight max-w-6xl mb-6"
                    variants={itemVariants}
                  >
                    Follow your representatives,<br className="hidden md:block" />
                    <span className="font-serif italic font-normal text-[#E64C4C] tracking-normal">and Have Your Say</span>
                  </motion.h1>

                  {/* Hero Subheadline */}
                  <motion.p 
                    className="text-center text-lg md:text-xl text-slate-600 font-medium max-w-2xl mb-8 leading-relaxed px-4"
                    variants={itemVariants}
                  >
                    Civic Voice helps you understand what your representatives are doing, track issues that matter to you, and take action when it counts.
                  </motion.p>

                  {/* Hero CTA Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center px-4"
                    variants={itemVariants}
                  >
                    <motion.button 
                      onClick={() => setIsTestingModalOpen(true)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-red-600 text-white font-semibold rounded-full hover:bg-[#c93d3d] shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Join Testing Pool
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button 
                      onClick={() => handleNavClick('landing', true)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-slate-300 text-slate-800 font-medium rounded-full hover:bg-white hover:shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-semibold animate-none"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Explore Features
                    </motion.button>
                  </motion.div>
                </motion.div>
              </main>
              
              {/* Features Section */}
              <section ref={featuresRef} className="w-full py-24 bg-white border-t border-slate-100 scroll-mt-6">
                <div className="max-w-6xl mx-auto px-6">
                  <div className="text-center mb-16">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900"
                    >
                      Everything you need to <span className="font-serif italic font-normal text-[#E64C4C]">stay informed</span>
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                      className="text-slate-500 text-lg max-w-2xl mx-auto"
                    >
                      Civic Voice turns complex government updates into clear, practical information you can actually use.
                    </motion.p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-10">
                    {/* Feature 1 */}
                    <motion.div 
                      custom={0}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={featureCardVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="flex flex-col items-center text-center p-8 border border-transparent hover:border-slate-100 hover:bg-[#F9F8F6] rounded-2xl cursor-default transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)]"
                    >
                      <div className="w-14 h-14 bg-red-50 text-[#E64C4C] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
                        <Eye size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Track Bills & Policy</h3>
                      <p className="text-slate-600 leading-relaxed md:text-[15px]">
                        Stay updated on the legislation that matters to you. Follow bills from their introduction through the committee stages to royal assent.
                      </p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div 
                      custom={1}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={featureCardVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="flex flex-col items-center text-center p-8 border border-transparent hover:border-slate-100 hover:bg-[#F9F8F6] rounded-2xl cursor-default transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)]"
                    >
                      <div className="w-14 h-14 bg-red-50 text-[#E64C4C] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
                        <Sparkles size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">AI Context & Summaries</h3>
                      <p className="text-slate-600 leading-relaxed md:text-[15px]">
                        No more dense legal jargon. Instantly get clear, AI-driven summaries and historical context so you understand exactly what's at stake.
                      </p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div 
                      custom={2}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={featureCardVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="flex flex-col items-center text-center p-8 border border-transparent hover:border-slate-100 hover:bg-[#F9F8F6] rounded-2xl cursor-default transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)]"
                    >
                      <div className="w-14 h-14 bg-red-50 text-[#E64C4C] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
                        <UserCheck size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Representative Votes</h3>
                      <p className="text-slate-600 leading-relaxed md:text-[15px]">
                        Hold your elected officials accountable. Easily see a transparent history of how your local representative has voted on key topics.
                      </p>
                    </motion.div>

                    {/* Feature 4 */}
                    <motion.div 
                      custom={3}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={featureCardVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="flex flex-col items-center text-center p-8 border border-transparent hover:border-slate-100 hover:bg-[#F9F8F6] rounded-2xl cursor-default transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)]"
                    >
                      <div className="w-14 h-14 bg-red-50 text-[#E64C4C] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
                        <MapPin size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Find Your Representatives</h3>
                      <p className="text-slate-600 leading-relaxed md:text-[15px]">
                        Enter your postal code to instantly see who represents you, how to contact them, and what decisions they influence.
                      </p>
                    </motion.div>

                    {/* Feature 5 */}
                    <motion.div 
                      custom={4}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={featureCardVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="flex flex-col items-center text-center p-8 border border-transparent hover:border-slate-100 hover:bg-[#F9F8F6] rounded-2xl cursor-default transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)]"
                    >
                      <div className="w-14 h-14 bg-red-50 text-[#E64C4C] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
                        <MessageSquare size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Have Your Say</h3>
                      <p className="text-slate-600 leading-relaxed md:text-[15px]">
                        Use guided message prompts to contact your representative with a position, concern, or question before key decisions are finalized.
                      </p>
                    </motion.div>

                    {/* Feature 6 */}
                    <motion.div 
                      custom={5}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={featureCardVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="flex flex-col items-center text-center p-8 border border-transparent hover:border-slate-100 hover:bg-[#F9F8F6] rounded-2xl cursor-default transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)]"
                    >
                      <div className="w-14 h-14 bg-red-50 text-[#E64C4C] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
                        <Newspaper size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized Civic Feed</h3>
                      <p className="text-slate-600 leading-relaxed md:text-[15px]">
                        Follow the issues you care about, save bills and policy items, and get updates tailored to your location and interests.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'privacy' && (
            <motion.main 
              key="privacy"
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-3xl mx-auto px-6 py-16 md:py-24"
            >
              <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-200/60 p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-slate-900">
                  Privacy Policy for Civic Voice
                </h1>
                <p className="text-slate-400 font-mono text-xs mb-8 uppercase tracking-wider">
                  Effective date: April 2026
                </p>

                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8">
                  <p className="text-lg font-medium text-slate-800">
                    Civic Voice is a Canadian civic information app that helps users follow bills, policy, and representatives.
                  </p>

                  <div className="border-t border-slate-100 pt-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">Information We Collect</h2>
                    <p>
                      Civic Voice may store information you provide in the app, such as selected topics, postal code, saved items, notification preferences, and onboarding state.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">How Information Is Used</h2>
                    <p>
                      This information is used to personalize the app experience, support saved content, and provide relevant updates and notifications.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">Data Sharing</h2>
                    <p>
                      Civic Voice does not sell your personal information.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">Data Storage</h2>
                    <p>
                      Some app data may be stored locally on your device. If cloud or server-backed features are added later, this policy may be updated.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">Third-Party Services</h2>
                    <p>
                      Civic Voice may rely on third-party infrastructure or platform services required for app functionality, notifications, analytics, or hosting.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">Your Choices</h2>
                    <p>
                      You can manage certain stored preferences within the app and can stop using the app at any time.
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center flex-wrap gap-4">
                  <motion.button 
                    onClick={() => handleNavClick('landing')}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium text-sm shadow-sm transition-all cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Return Home
                  </motion.button>
                  <button 
                    onClick={() => handleNavClick('support')}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Have questions? Contact Support
                  </button>
                </div>
              </div>
            </motion.main>
          )}

          {currentView === 'support' && (
            <motion.main 
              key="support"
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-3xl mx-auto px-6 py-16 md:py-24 w-full"
            >
              <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-200/60 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-50 text-[#E64C4C] rounded-2xl flex items-center justify-center border border-red-100">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                      Support Desk
                    </h1>
                    <p className="text-slate-500 text-sm">
                      How can we help you today?
                    </p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-emerald-50 border border-emerald-100 text-slate-800 rounded-xl p-8 text-center my-8"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"
                      >
                        <Check size={28} />
                      </motion.div>
                      <h3 className="font-bold text-lg text-emerald-900 mb-2">Message Sent Successfully!</h3>
                      <p className="text-sm text-emerald-700 max-w-md mx-auto mb-6">
                        Thank you for reaching out to the Civic Voice team. We appreciate your feedback and will review your inquiry within 1-2 Canadian business days.
                      </p>
                      <motion.button 
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-medium transition-all cursor-pointer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleContactSubmit} 
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Your Full Name <span className="text-red-500">*</span>
                          </label>
                          <input 
                            required
                            type="text" 
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="e.g. Michael Miller"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E64C4C] focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-none transition-all placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input 
                            required
                            type="email" 
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="e.g. michael@example.ca"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E64C4C] focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-none transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Subject
                        </label>
                        <input 
                          type="text" 
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          placeholder="e.g. Question about Bill Tracking feature"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E64C4C] focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          How Can We Help? <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                          required
                          rows={5}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Please details how we can support you..."
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E64C4C] focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-none transition-all placeholder:text-slate-400 resize-none"
                        ></textarea>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-4">
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <AlertCircle size={14} /> Fields marked with <span className="text-red-500">*</span> are required.
                        </p>
                        <motion.button 
                          type="submit"
                          disabled={formSubmitting}
                          className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-[#c93d3d] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {formSubmitting ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending Message...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Submit Inquiry
                              <Send size={16} />
                            </span>
                          )}
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.main>
          )}
        </AnimatePresence>
      </div>

      {/* Footer minimal just to complete the page feel */}
      <footer className="border-t border-slate-200/60 py-10 px-6 md:px-12 text-center text-slate-500 text-sm bg-[#F9F8F6] relative z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.015)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.button 
            onClick={() => handleNavClick('landing')}
            className="flex items-center justify-center gap-0 font-extrabold text-[#E64C4C] text-lg hover:opacity-85 transition-opacity cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={logo} className="w-10 h-10 object-contain -mr-1" alt="Civic Voice Logo" referrerPolicy="no-referrer" />
            Civic Voice
          </motion.button>
          
          <div className="flex flex-wrap justify-center gap-8 text-xs font-medium text-slate-500">
            <button 
              onClick={() => handleNavClick('landing', true)}
              className="hover:text-slate-950 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick('privacy')}
              className="hover:text-slate-950 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNavClick('support')}
              className="hover:text-slate-950 transition-colors cursor-pointer"
            >
              Support Desk
            </button>
          </div>

          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Civic Voice Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* Beta Testing Pool Modal */}
      <AnimatePresence>
        {isTestingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 md:pt-24 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTestingModal}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200/80 overflow-hidden z-10"
            >
              {/* Civic Accent Accent Line */}
              <div className="h-1.5 w-full bg-[#E64C4C]" />

              {/* Header */}
              <div className="flex justify-between items-start p-6 pb-2">
                <div className="flex items-center gap-1">
                  <img src={logo} className="w-10 h-10 object-contain -mr-1" alt="Civic Voice Logo" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Join Beta Pool</h3>
                    <p className="text-xs font-mono font-medium text-[#E64C4C] uppercase tracking-wider">Private Tester Application</p>
                  </div>
                </div>
                <button
                  onClick={closeTestingModal}
                  className="p-1 px-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Close Dialog"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content / Success Panel */}
              <div className="p-6 pt-4">
                <AnimatePresence mode="wait">
                  {testingSubmitted ? (
                    <motion.div
                      key="testing-success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 180, delay: 0.15 }}
                        className="w-16 h-16 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Check size={32} />
                      </motion.div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Your request is ready to send</h4>
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed px-4">
                        Your email app should open a prepared request addressed to <strong>nasar.siddi@gmail.com</strong>. Send that email to complete your application, and we will reply to <strong>{testingEmail}</strong> if you are selected.
                      </p>
                      
                      {/* Interactive details */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left max-w-sm mx-auto mb-6 text-xs text-slate-500 space-y-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-600">Selected Platform:</span>
                          <span className="font-black text-slate-700 uppercase">{testingPlatform}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-600">Your Civic Profile:</span>
                          <span className="font-black text-slate-700 capitalize">{testingRole}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-600">Request Status:</span>
                          <span className="font-black text-amber-600">Ready to Send</span>
                        </div>
                      </div>

                      <button
                        onClick={closeTestingModal}
                        className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer"
                      >
                        Awesome, Thank You
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="testing-form"
                      onSubmit={handleTestingSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <p className="text-slate-500 text-sm leading-relaxed">
                        We are currently running a private beta. Drop your email below to join the waitlist and get an invite when new testing slots open up.
                      </p>

                      {/* Email Input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Your Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={testingEmail}
                          onChange={(e) => setTestingEmail(e.target.value)}
                          placeholder="e.g. citizen@civicvoice.ca"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E64C4C] focus:bg-white rounded-xl text-slate-900 text-sm focus:outline-none transition-all placeholder:text-slate-400"
                          autoFocus
                        />
                      </div>

                      {/* Civic Role Selection */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Your Civic Voice Focus
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'citizen', label: 'Citizen / Voter' },
                            { id: 'NGO', label: 'Advocacy Group / NGO' },
                            { id: 'official', label: 'Elected Official' },
                            { id: 'academic', label: 'Academic / Media' }
                          ].map((role) => (
                            <button
                              key={role.id}
                              type="button"
                              onClick={() => setTestingRole(role.id)}
                              className={`py-2 px-3 text-xs font-semibold rounded-xl text-center border cursor-pointer transition-all ${
                                testingRole === role.id
                                  ? 'bg-red-50 text-[#E64C4C] border-[#E64C4C] shadow-[0_2px_10px_rgba(230,76,76,0.06)]'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              {role.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Platform Selection */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Primary Device Platform
                        </label>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setTestingPlatform('ios')}
                            className={`flex-1 py-3 px-4 border rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
                              testingPlatform === 'ios'
                                ? 'bg-red-50 text-[#E64C4C] border-[#E64C4C]'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <span className="font-semibold text-sm">Apple iOS App Beta</span>
                          </button>
                          <div
                            className="flex-1 py-3 px-4 border border-slate-200 bg-slate-50/70 text-slate-400 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed select-none relative opacity-60"
                            title="Android build is currently in development"
                          >
                            <span className="font-semibold text-sm text-slate-500">Google Android Build</span>
                            <span className="absolute -top-2.5 -right-1.5 bg-slate-800 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider shadow-sm">Coming Soon</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Banner note */}
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed bg-[#F9F8F6] p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                        <Sparkles size={16} className="text-[#E64C4C] shrink-0" />
                        Applicants are accepted continuously as test build slots expand. Keep an eye on your inbox!
                      </p>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-[#c93d3d] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center gap-1.5">
                          Submit Request to Join
                          <ArrowRight size={16} />
                        </span>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
