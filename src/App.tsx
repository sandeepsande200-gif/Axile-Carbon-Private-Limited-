import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  Leaf, 
  Sun, 
  BarChart3, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Wind, 
  Droplets,
  ChevronRight,
  ClipboardList,
  AlertTriangle,
  X,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Calculator,
  Zap,
  Coins,
  TrendingUp,
  ShieldCheck,
  FileText,
  TreePine,
  Car,
  Calendar
} from 'lucide-react';

// --- Components ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive-text')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-fresh pointer-events-none z-[9999] hidden md:block will-change-transform"
      style={{
        x,
        y,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(102, 187, 106, 0.1)' : 'transparent',
      }}
    />
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fresh to-forest flex items-center justify-center text-white">
            <Leaf size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-forest">Axial Carbon</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-forest/80">
          <a href="#services" className="hover:text-fresh transition-colors">Services</a>
          <a href="#process" className="hover:text-fresh transition-colors">Process</a>
          <a href="#impact" className="hover:text-fresh transition-colors">Impact</a>
          <a href="#about" className="hover:text-fresh transition-colors">About</a>
          <a href="#contact" className="hover:text-fresh transition-colors">Contact</a>
        </div>
        <button 
          onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
          className="hidden md:block px-6 py-2.5 rounded-full bg-forest text-white text-sm font-medium hover:bg-forest/90 transition-all shadow-lg shadow-forest/20 hover:shadow-forest/30 hover:-translate-y-0.5"
        >
          Get Analysis
        </button>
      </div>
    </motion.nav>
  );
};

const Particles = () => {
  // Memoize particles to prevent re-generation on every render
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const size = Math.random() * 4 + 2; // 2px to 6px
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${size}px`,
        duration: `${Math.random() * 20 + 20}s`, // 20s to 40s
        delay: `-${Math.random() * 40}s`, // Negative delay so they are already on screen
        opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4
        xDrift: `${(Math.random() - 0.5) * 100}px`, // -50px to 50px drift
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[-45] overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white animate-float-particle will-change-transform"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            '--x-drift': p.xDrift,
            '--particle-opacity': p.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const CalculatorModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [capacity, setCapacity] = useState<number | ''>('');
  
  // Calculations
  const cap = Number(capacity) || 0;
  const annualGeneration = cap * 4 * 365; // kWh
  const carbonCredits = Math.round((annualGeneration / 1000) * 0.71); // VERs
  const minEarnings = carbonCredits * 800; // ₹
  const maxEarnings = carbonCredits * 1500; // ₹
  
  // Environmental Impact (rough estimates)
  const treesPlanted = Math.round(carbonCredits * 45); // 1 ton CO2 ~ 45 mature trees
  const carsOffRoad = Math.round(carbonCredits / 4.6); // 1 passenger car ~ 4.6 tons CO2/year

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-forest/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 z-10"
          >
            <div className="p-8 md:p-10">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-forest/5 text-forest/50 hover:text-forest transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-fresh/20 flex items-center justify-center text-fresh">
                  <Calculator size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-forest">Earnings & Impact Calculator</h3>
                  <p className="text-forest/60 text-sm font-medium">Discover the hidden value of your solar plant</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-forest mb-3">
                    What is your Solar Plant Capacity? (kW)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                      placeholder="e.g. 500"
                      className="w-full bg-white/50 border border-forest/10 rounded-xl px-5 py-4 text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-fresh/50 transition-all text-xl font-bold"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-forest/40 font-bold text-lg">kW</span>
                  </div>
                </div>

                <AnimatePresence>
                  {cap > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {/* Financial Impact */}
                        <div className="bg-gradient-to-br from-fresh/10 to-leaf/30 rounded-2xl p-6 border border-fresh/20">
                          <div className="flex items-center gap-2 text-forest/70 font-bold mb-4 text-sm uppercase tracking-wider">
                            <Coins size={16} /> Financial Return
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-end">
                              <span className="text-forest/60 text-sm font-medium">Annual Generation</span>
                              <span className="font-bold text-forest">{annualGeneration.toLocaleString()} <span className="text-xs">kWh</span></span>
                            </div>
                            <div className="flex justify-between items-end">
                              <span className="text-forest/60 text-sm font-medium">Carbon Credits</span>
                              <span className="font-bold text-forest">{carbonCredits.toLocaleString()} <span className="text-xs">VERs</span></span>
                            </div>
                            <div className="h-px w-full bg-forest/10 my-2" />
                            <div>
                              <span className="block text-forest/60 text-sm font-medium mb-1">Est. Annual Earnings</span>
                              <span className="text-2xl font-extrabold text-fresh">
                                ₹{minEarnings.toLocaleString()} - ₹{maxEarnings.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Environmental Impact */}
                        <div className="bg-gradient-to-br from-sky/10 to-sky/5 rounded-2xl p-6 border border-sky/20">
                          <div className="flex items-center gap-2 text-forest/70 font-bold mb-4 text-sm uppercase tracking-wider">
                            <Globe size={16} /> Environmental Impact
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-sky/20 flex items-center justify-center text-sky shrink-0">
                                <TreePine size={20} />
                              </div>
                              <div>
                                <span className="block font-bold text-forest">{treesPlanted.toLocaleString()}</span>
                                <span className="text-xs font-medium text-forest/60">Trees Planted Equivalent</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-sky/20 flex items-center justify-center text-sky shrink-0">
                                <Car size={20} />
                              </div>
                              <div>
                                <span className="block font-bold text-forest">{carsOffRoad.toLocaleString()}</span>
                                <span className="text-xs font-medium text-forest/60">Cars Taken Off Road</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-forest/40 text-center font-medium mb-6">
                        *Estimates based on average generation (4 units/kW/day) and current market prices (₹800 - ₹1500/VER). Actuals may vary.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={() => {
                            onClose();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex-1 py-4 rounded-xl bg-forest text-white font-bold hover:bg-forest/90 transition-colors shadow-lg shadow-forest/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                          <Calendar size={18} /> Book Free Consultation
                        </button>
                        <button 
                          onClick={() => {
                            onClose();
                            document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex-1 py-4 rounded-xl bg-forest/5 text-forest font-bold hover:bg-forest/10 transition-colors flex items-center justify-center gap-2"
                        >
                          See How It Works
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {cap === 0 && (
                  <div className="text-center py-8 text-forest/40 font-medium">
                    Enter your plant capacity above to see your potential earnings and environmental impact.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  // Subtler vertical parallax
  const y1 = useTransform(scrollY, [0, 1000], [0, 120]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -80]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 60]);
  
  // Gentle horizontal drift for a more organic, flowing feel
  const x1 = useTransform(scrollY, [0, 1000], [0, 40]);
  const x2 = useTransform(scrollY, [0, 1000], [0, -30]);
  const x3 = useTransform(scrollY, [0, 1000], [0, 20]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Solar Grid Pattern */}
      <div className="absolute inset-0 -z-20 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-forest) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Energy Pulse Element */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full -z-10 blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, var(--color-fresh) 0%, transparent 70%)'
        }}
      />
      
      {/* Organic Blobs with Parallax */}
      <motion.div style={{ y: y1, x: x1 }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-leaf rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob -z-10" />
      <motion.div style={{ y: y2, x: x2 }} className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 -z-10" />
      <motion.div style={{ y: y3, x: x3 }} className="absolute -bottom-32 left-1/3 w-96 h-96 bg-earth rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-forest mb-8">
            <span className="w-2 h-2 rounded-full bg-fresh animate-pulse" />
            Zero-Cost Carbon Monetization for C&I Solar
          </div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] drop-shadow-sm cursor-default"
          >
            Turn Your Solar Plant Into a <br className="hidden md:block" /> <span className="text-gradient">Passive Revenue Stream</span>
          </motion.h1>
          
          <p className="text-lg md:text-xl text-forest/90 font-medium mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            You already save on electricity bills. Now, let us monetize your 100kW+ commercial solar plant by generating and selling carbon credits. <span className="text-forest font-bold">Zero upfront cost.</span> We handle 100% of the documentation, verification, and trading.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => setIsCalculatorOpen(true)}
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-forest text-white font-bold hover:bg-forest/90 transition-all shadow-2xl shadow-forest/30 hover:shadow-forest/50 hover:-translate-y-1 flex items-center justify-center gap-2 group text-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-fresh/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
              Calculate Your Earnings
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 rounded-full glass-panel text-forest font-bold hover:bg-white/80 transition-all flex items-center justify-center gap-2 text-lg"
            >
              Get Free Analysis
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex items-center justify-center gap-6 text-forest/60 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-fresh" />
              <span>50+ MW Managed</span>
            </div>
            <div className="w-[1px] h-4 bg-forest/10" />
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-fresh" />
              <span>100% End-to-End</span>
            </div>
            <div className="w-[1px] h-4 bg-forest/10" />
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-fresh" />
              <span>Zero Upfront Cost</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-forest/50"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-forest/50 to-transparent" />
      </motion.div>
    </section>
  );
};

const TrustStrip = () => {
  return (
    <section className="py-16 border-y border-leaf/50 bg-white/30 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-center text-sm font-medium text-forest/50 uppercase tracking-widest mb-8">
          Trusted by forward-thinking industries
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholder Logos */}
          <div className="flex items-center gap-2 font-bold text-xl"><Wind size={24} /> AeroTech</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Droplets size={24} /> HydroSys</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Sun size={24} /> Solarix</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Globe size={24} /> EcoLogistics</div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 relative bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fresh/10 text-sm font-bold text-fresh mb-6">
            <Zap size={16} /> Our Solutions
          </div>
          <motion.h2 
            className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-sm text-forest cursor-default"
          >
            End-to-End Carbon <span className="text-gradient">Monetization</span>
          </motion.h2>
          <p className="text-forest/80 font-medium text-lg md:text-xl drop-shadow-sm leading-relaxed">
            We transform your existing rooftop solar installation from a simple cost-saving measure into a profitable, revenue-generating asset with zero upfront cost.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Large Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 glass-panel p-10 rounded-[2rem] group hover:shadow-2xl hover:shadow-fresh/10 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-fresh/10 rounded-full mix-blend-multiply filter blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-forest text-white flex items-center justify-center mb-8 shadow-lg cursor-pointer will-change-transform"
              >
                <BarChart3 size={32} />
              </motion.div>
              <h3 className="text-3xl font-bold text-forest mb-4">Smart Data Aggregation</h3>
              <p className="text-forest/80 text-lg mb-8 max-w-xl leading-relaxed">
                Single 100kW plants are too small for global carbon markets. We aggregate your generation data with similar C&I clients, unlocking institutional-grade market access and premium pricing.
              </p>
              <ul className="space-y-3">
                {['Scale advantages for smaller plants', 'Lower verification costs per kW', 'Higher market visibility & premium rates'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-forest/90 font-medium">
                    <CheckCircle2 size={20} className="text-fresh" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Small Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-10 rounded-[2rem] group hover:shadow-2xl hover:shadow-fresh/10 transition-all duration-500 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky/20 rounded-full mix-blend-multiply filter blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ duration: 0.2 }}
                className="w-14 h-14 rounded-2xl bg-sky text-forest flex items-center justify-center mb-6 cursor-pointer will-change-transform"
              >
                <ClipboardList size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold text-forest mb-4">Zero-Hassle Verification</h3>
              <p className="text-forest/80 font-medium leading-relaxed">
                Our experts handle 100% of the complex auditing, verification, and compliance paperwork required by global registries.
              </p>
            </div>
          </motion.div>

          {/* Small Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-10 rounded-[2rem] group hover:shadow-2xl hover:shadow-fresh/10 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-earth/40 rounded-full mix-blend-multiply filter blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="w-14 h-14 rounded-2xl bg-earth text-forest flex items-center justify-center mb-6 cursor-pointer will-change-transform"
              >
                <Globe size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold text-forest mb-4">Global Registration</h3>
              <p className="text-forest/80 font-medium leading-relaxed">
                We register your aggregated projects in premium Indian and Global carbon credit registries to ensure maximum validity.
              </p>
            </div>
          </motion.div>

          {/* Large Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 bg-forest p-10 rounded-[2rem] text-white group hover:shadow-2xl hover:shadow-forest/20 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-fresh/20 rounded-full mix-blend-screen filter blur-3xl -translate-y-1/2 group-hover:scale-125 transition-transform duration-700" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="max-w-xl">
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ duration: 0.2 }}
                  className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md text-fresh flex items-center justify-center mb-8 border border-white/10 cursor-pointer will-change-transform"
                >
                  <Coins size={32} />
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">Credit Trading & Monetization</h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  We don't just register your credits; we actively trade them. Leveraging our network of corporate buyers, we sell your verified carbon credits at the best market rates, delivering a new, passive revenue stream directly to your bottom line.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium">Best Market Rates</div>
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium">Transparent Payouts</div>
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium">Passive Income</div>
                </div>
              </div>
              <div className="shrink-0 hidden md:flex">
                <div className="w-48 h-48 rounded-full border-4 border-fresh/30 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-t-4 border-fresh animate-spin-slow" />
                  <div className="text-center">
                    <span className="block text-4xl font-extrabold text-fresh">100%</span>
                    <span className="text-sm font-medium text-white/70 uppercase tracking-wider">Done For You</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const [showDetails, setShowDetails] = useState(false);

  const steps = [
    { title: "Connect & Assess", desc: "Share 100kW+ plant details" },
    { title: "Group & Document", desc: "We aggregate & verify" },
    { title: "Register & Certify", desc: "Global market listing" },
    { title: "Trade & Earn", desc: "Receive cash revenue" }
  ];

  const detailedSteps = [
    {
      title: "1. Initial Assessment & Onboarding",
      details: ["Verify 100kW+ capacity and C&I status.", "Collect historical Remote Monitoring System (RMS) data.", "Sign aggregation and revenue-sharing agreement."]
    },
    {
      title: "2. Project Aggregation",
      details: ["Group your plant with similar regional projects.", "Achieve the minimum volume threshold required by global registries.", "Optimize verification costs through economies of scale."]
    },
    {
      title: "3. Validation & Verification",
      details: ["Draft the comprehensive Project Design Document (PDD).", "Coordinate with independent third-party auditors (VVBs).", "Manage all compliance, queries, and site inspections."]
    },
    {
      title: "4. Registration & Issuance",
      details: ["Submit the aggregated project to registries (e.g., Verra, Gold Standard, Universal Carbon Registry).", "Monitor the approval process.", "Receive the officially issued Carbon Credits into our trading account."]
    },
    {
      title: "5. Trading & Monetization",
      details: ["Leverage our network of global buyers and exchanges.", "Sell credits at premium market rates.", "Distribute your share of the revenue directly to you."]
    }
  ];

  return (
    <section id="process" className="py-32 bg-earth/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-sm">The Monetization <br/><span className="text-gradient">Process</span></h2>
            <p className="text-forest/90 font-medium text-lg mb-8 drop-shadow-sm">A seamless, end-to-end process designed to turn your existing solar generation data into verified carbon credits without disrupting your operations.</p>
            <button 
              onClick={() => setShowDetails(true)}
              className="flex items-center gap-2 text-fresh font-bold hover:gap-4 transition-all drop-shadow-sm"
            >
              View detailed methodology <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="lg:w-2/3 w-full">
            <div className="relative">
              {/* Flowing line background */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-leaf via-fresh to-leaf -translate-y-1/2 hidden md:block opacity-30 rounded-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center relative"
                  >
                    <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-xl font-bold text-forest mb-6 relative z-10 shadow-lg shadow-forest/5">
                      0{index + 1}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm font-medium text-forest/80">{step.desc}</p>
                    
                    {/* Mobile connector */}
                    {index < steps.length - 1 && (
                      <div className="w-1 h-8 bg-gradient-to-b from-fresh/30 to-transparent my-2 md:hidden" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Methodology Modal */}
      <AnimatePresence>
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetails(false)}
              className="absolute inset-0 bg-forest/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <div className="p-8 md:p-10 overflow-y-auto">
                <button 
                  onClick={() => setShowDetails(false)} 
                  className="absolute top-6 right-6 p-2 bg-forest/5 hover:bg-forest/10 rounded-full text-forest transition-colors z-20"
                >
                  <X size={24} />
                </button>
                <h3 className="text-3xl font-extrabold text-forest mb-2 pr-12">Detailed Monetization Methodology</h3>
                <p className="text-forest/70 font-medium mb-8">The complete end-to-end journey from solar generation to cash revenue.</p>

                <div className="space-y-6">
                  {detailedSteps.map((step, idx) => (
                    <div key={idx} className="bg-earth/30 rounded-2xl p-6 border border-forest/5">
                      <h4 className="text-xl font-bold text-forest mb-4">{step.title}</h4>
                      <ul className="space-y-3">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-3 text-forest/80 font-medium">
                            <CheckCircle2 size={20} className="text-fresh shrink-0 mt-0.5" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Impact = () => {
  return (
    <section id="impact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="glass-panel rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
          {/* Decorative background inside card */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-fresh rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
          
          <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
            <motion.h2 
              className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-sm cursor-default"
            >
              Measurable <span className="text-gradient">Impact</span>
            </motion.h2>
            <p className="text-forest/90 font-medium text-lg drop-shadow-sm">We measure our success by the tangible reduction in global emissions and the efficiency gained by our partners.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="w-16 h-16 mx-auto rounded-full bg-leaf flex items-center justify-center text-forest mb-6 cursor-pointer will-change-transform"
              >
                <Leaf size={28} />
              </motion.div>
              <div className="text-5xl md:text-6xl font-extrabold text-forest mb-2 drop-shadow-sm">50+</div>
              <div className="text-sm font-bold text-forest/80 uppercase tracking-widest">MW Solar Capacity Managed</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ duration: 0.2 }}
                className="w-16 h-16 mx-auto rounded-full bg-leaf flex items-center justify-center text-forest mb-6 cursor-pointer will-change-transform"
              >
                <Leaf size={28} />
              </motion.div>
              <div className="text-5xl md:text-6xl font-extrabold text-forest mb-2 drop-shadow-sm">100K+</div>
              <div className="text-sm font-bold text-forest/80 uppercase tracking-widest">Carbon Credits Generated</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="w-16 h-16 mx-auto rounded-full bg-leaf flex items-center justify-center text-forest mb-6 cursor-pointer will-change-transform"
              >
                <Globe size={28} />
              </motion.div>
              <div className="text-5xl md:text-6xl font-extrabold text-forest mb-2 drop-shadow-sm">$2M+</div>
              <div className="text-sm font-bold text-forest/80 uppercase tracking-widest">Extra Revenue Unlocked</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-sky/20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Abstract Axis Visual */}
            <div className="aspect-square rounded-full border border-forest/10 relative flex items-center justify-center p-8">
              <div className="absolute inset-0 border border-fresh/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-8 border border-sky/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-leaf to-sky/50 glass-panel flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="w-32 h-32 rounded-full bg-white shadow-2xl flex items-center justify-center z-10">
                  <Leaf size={48} className="text-forest" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-sm cursor-default"
            >
              Unlocking the Hidden Value of <br/><span className="text-gradient">C&I Solar</span>
            </motion.h2>
            <p className="text-forest/90 font-medium text-lg mb-6 leading-relaxed drop-shadow-sm">
              For years, commercial and industrial solar plants have been viewed solely as a way to decrease electricity bills. We saw a missed opportunity.
            </p>
            <p className="text-forest/90 font-medium text-lg mb-8 leading-relaxed drop-shadow-sm">
              By aggregating 100kW+ rooftop installations, we give individual businesses access to the lucrative global and Indian carbon markets. We take on the burden of verification, documentation, and trading, allowing you to earn passive income from the clean energy you're already generating.
            </p>
            
            <ul className="space-y-4">
              {['100kW+ Capacity Focus', 'Zero Upfront Cost', 'End-to-End Management'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-forest font-medium">
                  <CheckCircle2 size={20} className="text-fresh" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center glass-panel p-12 md:p-16 rounded-[3rem] hover:shadow-[0_15px_40px_-10px_rgba(102,187,106,0.2)] transition-all duration-300 ease-in-out will-change-transform"
          >
          <div className="mb-8 flex justify-center text-fresh">
            {[1, 2, 3, 4, 5].map(i => (
              <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <motion.h3 
            whileHover={{ scale: 1.02 }}
            className="text-2xl md:text-4xl font-medium leading-tight mb-10 text-forest cursor-default"
          >
            "We installed a 500kW rooftop plant just to reduce our factory's light bill. Axial Carbon stepped in, handled all the paperwork, and now we receive a quarterly check for our carbon credits. It's pure profit."
          </motion.h3>
          <div className="flex items-center justify-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop" 
              alt="Rajesh Kumar" 
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <div className="font-bold text-forest text-lg">Rajesh Kumar</div>
              <div className="text-sm font-medium text-forest/80">Operations Director, Manufacturing Hub</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CarbonAssessment = () => {
  const [step, setStep] = useState<'intro' | 'questions' | 'results' | 'form' | 'thanks'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<{score: number, gap: string}[]>([]);

  const questions = [
    { text: "Is your installed rooftop solar capacity 100 kW or greater?", gap: "Minimum 100kW capacity requirement" },
    { text: "Is your solar plant installed on a commercial or industrial (C&I) property?", gap: "C&I property verification" },
    { text: "Do you have a Remote Monitoring System (RMS) tracking your annual generation?", gap: "Generation data tracking" },
    { text: "Can you provide the original commissioning report and installation documents?", gap: "Commissioning documentation" },
    { text: "Are your plant's environmental attributes (carbon rights) currently unregistered?", gap: "Unregistered carbon rights" },
    { text: "Do you consume the generated electricity for your own captive use?", gap: "Captive power consumption" },
    { text: "Has your solar plant been operational for at least 6 months?", gap: "Operational history" },
    { text: "Are you interested in generating a new, passive revenue stream without additional capital expenditure?", gap: "Revenue generation interest" }
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, { score, gap: questions[currentQ].gap }];
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('results');
    }
  };

  const totalScore = answers.reduce((acc, curr) => acc + curr.score, 0);
  const gaps = answers.filter(a => a.score < 10).map(a => a.gap);

  const getLevel = (score: number) => {
    if (score <= 20) return { level: 1, title: "Not Yet Eligible", color: "text-red-600", bg: "bg-red-100", border: "border-red-200", desc: "Your plant currently doesn't meet the minimum criteria (e.g., 100kW capacity) for our aggregation model.", savings: "N/A" };
    if (score <= 40) return { level: 2, title: "Missing Documentation", color: "text-orange-600", bg: "bg-orange-100", border: "border-orange-200", desc: "You have the capacity, but we need to establish proper data tracking and documentation before registering.", savings: "Pending" };
    if (score <= 60) return { level: 3, title: "Partially Ready", color: "text-yellow-600", bg: "bg-yellow-100", border: "border-yellow-200", desc: "You are close to eligibility. We need to resolve a few gaps in your operational history or documentation.", savings: "Moderate" };
    if (score <= 80) return { level: 4, title: "Eligible", color: "text-leaf", bg: "bg-leaf/20", border: "border-leaf/30", desc: "Your plant is eligible for carbon credit registration. We can begin the aggregation and verification process.", savings: "High" };
    return { level: 5, title: "Prime Candidate", color: "text-fresh", bg: "bg-fresh/20", border: "border-fresh/30", desc: "Perfect fit. You have the capacity, data, and documentation ready. We can fast-track your market registration.", savings: "Maximum" };
  };

  const result = getLevel(totalScore);

  return (
    <section id="assessment" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-sm cursor-default"
          >
            Free Solar Carbon <span className="text-gradient">Analysis</span>
          </motion.h2>
          <p className="text-forest/90 font-medium text-lg drop-shadow-sm">Discover if your existing solar plant qualifies for carbon credit monetization and identify any missing requirements.</p>
        </div>

        <div className="glass-panel rounded-[2rem] p-8 md:p-12 min-h-[450px] flex flex-col relative overflow-hidden shadow-xl shadow-forest/5">
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center my-auto"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-full bg-fresh/20 flex items-center justify-center text-fresh mb-8 cursor-pointer"
                >
                  <ClipboardList size={40} />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-forest mb-4">Is your solar plant generating its full revenue potential?</h3>
                <p className="text-forest/80 font-medium mb-8 max-w-lg">
                  Take our 2-minute solar carbon analysis to see if your commercial or industrial solar installation qualifies for carbon credit monetization.
                </p>
                <button 
                  onClick={() => setStep('questions')}
                  className="px-8 py-4 rounded-full bg-forest text-white font-bold hover:bg-forest/90 transition-all shadow-lg shadow-forest/20 hover:-translate-y-1 flex items-center gap-2"
                >
                  Start Free Analysis <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 'questions' && (
              <motion.div 
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full w-full"
              >
                <div className="mb-8">
                  <div className="flex justify-between text-sm font-bold text-forest/60 mb-2">
                    <span>Question {currentQ + 1} of {questions.length}</span>
                    <span>{Math.round(((currentQ) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-forest/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-leaf to-fresh rounded-full"
                      initial={{ width: `${((currentQ) / questions.length) * 100}%` }}
                      animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="flex-grow flex flex-col justify-center mb-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-forest leading-tight text-center">
                    {questions[currentQ].text}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto">
                  <button 
                    onClick={() => handleAnswer(10)}
                    className="py-4 px-6 rounded-xl border-2 border-forest/10 hover:border-fresh hover:bg-fresh/5 font-bold text-forest transition-all hover:-translate-y-1"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => handleAnswer(5)}
                    className="py-4 px-6 rounded-xl border-2 border-forest/10 hover:border-yellow-500 hover:bg-yellow-500/5 font-bold text-forest transition-all hover:-translate-y-1"
                  >
                    Partially
                  </button>
                  <button 
                    onClick={() => handleAnswer(0)}
                    className="py-4 px-6 rounded-xl border-2 border-forest/10 hover:border-red-500 hover:bg-red-500/5 font-bold text-forest transition-all hover:-translate-y-1"
                  >
                    No
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'results' && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col w-full"
              >
                <div className="text-center mb-8">
                  <div className="inline-block mb-4">
                    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-forest/10" />
                        <motion.circle 
                          cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 283 - (283 * totalScore) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={result.color}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-extrabold text-forest">{totalScore}</span>
                        <span className="text-xs font-bold text-forest/50 uppercase">Score</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${result.bg} ${result.border} border mb-4`}>
                    <span className={`font-bold ${result.color}`}>{result.title}</span>
                  </div>
                  <p className="text-forest/80 font-medium max-w-2xl mx-auto">
                    {result.desc}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/50 rounded-2xl p-6 border border-forest/10">
                    <h4 className="font-bold text-forest mb-4 flex items-center gap-2">
                      <AlertTriangle size={18} className="text-orange-500" /> Missing Requirements
                    </h4>
                    <ul className="space-y-3">
                      {gaps.slice(0, 3).map((gap, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm font-medium text-forest/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                          {gap}
                        </li>
                      ))}
                      {gaps.length === 0 && (
                        <li className="text-sm font-medium text-forest/60">No major requirements missing. Excellent!</li>
                      )}
                    </ul>
                  </div>
                  <div className="bg-white/50 rounded-2xl p-6 border border-forest/10 flex flex-col justify-center items-center text-center">
                    <h4 className="font-bold text-forest mb-2">Estimated Revenue Potential</h4>
                    <div className={`text-3xl font-extrabold ${result.color} mb-2`}>{result.savings}</div>
                    <p className="text-sm font-medium text-forest/60">Based on your answers.</p>
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => setStep('form')}
                    className="px-8 py-4 rounded-full bg-forest text-white font-bold hover:bg-forest/90 transition-all shadow-lg shadow-forest/20 hover:-translate-y-1 inline-flex items-center gap-2"
                  >
                    Get Detailed Analysis Report <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'form' && (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto my-auto"
              >
                <h3 className="text-2xl font-bold text-forest mb-2 text-center">Where should we send your report?</h3>
                <p className="text-forest/70 font-medium mb-8 text-center text-sm">
                  Enter your details to receive your comprehensive eligibility breakdown and actionable next steps.
                </p>
                <form 
                  className="w-full space-y-4"
                  onSubmit={(e) => { e.preventDefault(); setStep('thanks'); }}
                >
                  <div>
                    <input required type="text" placeholder="Full Name" className="w-full bg-white/50 border border-forest/10 rounded-xl px-4 py-3 text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-fresh/50 transition-all font-medium" />
                  </div>
                  <div>
                    <input required type="text" placeholder="Company Name" className="w-full bg-white/50 border border-forest/10 rounded-xl px-4 py-3 text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-fresh/50 transition-all font-medium" />
                  </div>
                  <div>
                    <input required type="email" placeholder="Work Email" className="w-full bg-white/50 border border-forest/10 rounded-xl px-4 py-3 text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-fresh/50 transition-all font-medium" />
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl bg-forest text-white font-bold hover:bg-forest/90 transition-all shadow-lg shadow-forest/20 hover:-translate-y-0.5 mt-2">
                    Send My Report
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'thanks' && (
              <motion.div 
                key="thanks"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center my-auto"
              >
                <div className="w-20 h-20 rounded-full bg-fresh/20 flex items-center justify-center text-fresh mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-forest mb-4">Report Sent!</h3>
                <p className="text-forest/80 font-medium max-w-md">
                  Your custom Eligibility Report is on its way to your inbox. One of our solar carbon experts will reach out shortly to discuss your monetization options.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-32 bg-earth/50 text-forest relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-fresh/10 rounded-full mix-blend-multiply filter blur-[100px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky/20 rounded-full mix-blend-multiply filter blur-[80px] -translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <motion.h2 
              className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-sm cursor-default"
            >
              Ready to accelerate your transition?
            </motion.h2>
            <p className="text-forest/90 font-medium text-lg mb-12 max-w-md drop-shadow-sm">
              Request a free preliminary carbon analysis to see how Axial can optimize your operations.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                >
                  <Globe size={20} className="text-fresh" />
                </motion.div>
                <div>
                  <h4 className="font-bold text-lg">Global Reach</h4>
                  <p className="text-forest/80 font-medium text-sm">Supporting operations across 40+ countries.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                >
                  <BarChart3 size={20} className="text-fresh" />
                </motion.div>
                <div>
                  <h4 className="font-bold text-lg">Data-Driven</h4>
                  <p className="text-forest/80 font-medium text-sm">Decisions backed by rigorous analytics.</p>
                </div>
              </div>
            </div>
          </div>
          
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel p-8 md:p-10 rounded-3xl"
            >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-forest/80">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/50 border border-forest/10 rounded-xl px-4 py-3 text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-fresh/50 transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-forest/80">Company</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/50 border border-forest/10 rounded-xl px-4 py-3 text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-fresh/50 transition-all"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest/80">Work Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white/50 border border-forest/10 rounded-xl px-4 py-3 text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-fresh/50 transition-all"
                  placeholder="jane@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest/80">Primary Requirement</label>
                <select className="w-full bg-white/50 border border-forest/10 rounded-xl px-4 py-3 text-forest focus:outline-none focus:ring-2 focus:ring-fresh/50 transition-all appearance-none">
                  <option value="" className="text-forest">Select an option...</option>
                  <option value="footprint" className="text-forest">Carbon Footprint Analysis</option>
                  <option value="solar" className="text-forest">Solar Feasibility</option>
                  <option value="esg" className="text-forest">ESG Reporting</option>
                  <option value="other" className="text-forest">Other</option>
                </select>
              </div>
              <button className="w-full py-4 rounded-xl bg-forest text-white font-bold hover:bg-forest/90 transition-colors mt-4 flex items-center justify-center gap-2 shadow-lg shadow-forest/20 hover:-translate-y-0.5">
                Request Analysis <ChevronRight size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-sm cursor-default"
          >
            Get in <span className="text-gradient">Touch</span>
          </motion.h2>
          <p className="text-forest/90 font-medium text-lg drop-shadow-sm max-w-2xl mx-auto">
            Ready to unlock the hidden value of your solar plant? Contact us today to start your carbon credit monetization journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-10 rounded-[2rem] space-y-8 flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-forest mb-2">Contact Information</h3>
            
            <div className="flex items-start gap-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-full bg-fresh/20 flex items-center justify-center text-forest shrink-0 cursor-pointer"
              >
                <MapPin size={24} />
              </motion.div>
              <div>
                <h4 className="font-bold text-forest text-lg mb-1">Office Address</h4>
                <p className="text-forest/80 font-medium leading-relaxed">
                  Axial Carbon Pvt Ltd,<br />
                  Empirical Coworking Business centre Sixth floor,<br />
                  Navale Icon, Office No 603, near Navale Bridge,<br />
                  Narhe, Pune, Maharashtra 411041
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-12 h-12 rounded-full bg-fresh/20 flex items-center justify-center text-forest shrink-0 cursor-pointer"
              >
                <Phone size={24} />
              </motion.div>
              <div>
                <h4 className="font-bold text-forest text-lg mb-1">Phone Number</h4>
                <a href="tel:+918073086464" className="text-forest/80 font-medium hover:text-fresh transition-colors">
                  +91 8073086464
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-full bg-fresh/20 flex items-center justify-center text-forest shrink-0 cursor-pointer"
              >
                <Mail size={24} />
              </motion.div>
              <div>
                <h4 className="font-bold text-forest text-lg mb-1">Email Address</h4>
                <a href="mailto:sales@axialcarbon.com" className="text-forest/80 font-medium hover:text-fresh transition-colors">
                  sales@axialcarbon.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full min-h-[400px] rounded-[2rem] overflow-hidden shadow-xl shadow-forest/10 border border-forest/10"
          >
            <iframe 
              src="https://maps.google.com/maps?q=Navale%20Icon,%20near%20Navale%20Bridge,%20Narhe,%20Pune,%20Maharashtra%20411041&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '400px' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Axial Carbon Office Location"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-earth text-forest/60 py-12 border-t border-forest/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-forest cursor-pointer"
        >
          <Leaf size={20} className="text-fresh" />
          <span className="text-xl font-bold tracking-tight">Axial Carbon</span>
        </motion.div>
        <div className="flex gap-8 text-sm">
          <a href="#" className="hover:text-forest transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-forest transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-forest transition-colors">LinkedIn</a>
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} Axial Carbon. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, y: -5 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-forest text-white shadow-xl shadow-forest/20 hover:bg-forest/90 transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-fresh/30 relative">
      {/* Fixed Nature Background */}
      <div className="fixed inset-0 z-[-50] bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center will-change-transform" />
      {/* Soft overlay to maintain readability while keeping nature visible */}
      <div className="fixed inset-0 z-[-40] bg-earth/75" />
      
      {/* Floating Particles */}
      <Particles />

      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Process />
        <Impact />
        <About />
        <Testimonial />
        <CarbonAssessment />
        <CTASection />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
