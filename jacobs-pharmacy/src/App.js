import React, { useState, useEffect } from 'react';
import { Pill, Shield, Zap, MapPin, Phone, Mail, ShoppingCart } from 'lucide-react';

const ParticleBackground = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
        }));
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => prev.map(p => ({
                ...p,
                x: (p.x + p.speedX + 100) % 100,
                y: (p.y + p.speedY + 100) % 100,
            })));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <svg className="w-full h-full">
            <defs>
            <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
            </feMerge>
            </filter>
            </defs>
            {particles.map((p, i) => (
                    <g key={p.id}>
                    <circle
                cx={`${p.x}%`}
                cy={`${p.y}%`}
                r={p.size}
                fill="#a855f7"
                opacity="0.6"
                filter="url(#glow)"
                    />
                    {i < particles.length - 1 && Math.random() > 0.7 && (
                            <line
                        x1={`${p.x}%`}
                        y1={`${p.y}%`}
                        x2={`${particles[i + 1].x}%`}
                        y2={`${particles[i + 1].y}%`}
                        stroke="#7c3aed"
                        strokeWidth="0.5"
                        opacity="0.3"
                            />
                    )}
                </g>
            ))}
        </svg>
            </div>
    );
};

const Navigation = ({ currentPage, setCurrentPage }) => {
    return (
            <nav className="relative z-10 bg-black/40 backdrop-blur-md border-b border-purple-500/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Jacob's Pharmacy
            </span>
          </div>
          <div className="flex gap-6">
            {['Home', 'Products', 'About'].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page.toLowerCase())}
                className={`text-sm font-medium transition-all ${
                  currentPage === page.toLowerCase()
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-purple-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 animate-pulse">
          Welcome to Jacob's Pharmacy, where medication meets recreation.
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            OUR trusted source of medications in the digital meadows
        </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
                { icon: Zap, title: 'Fast Delivery', desc: 'Quantum speed shipping' },
                { icon: Shield, title: 'Secure', desc: 'End-to-end encryption' },
                { icon: Pill, title: 'Certified', desc: 'FDA compliant products' },
            ].map((feature, i) => (
                    <div
                key={i}
                className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                    >
                    <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                    </div>
            ))}
        </div>

            <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-lg">
            <button
        onClick={() => setCurrentPage('products')}
        className="bg-black px-8 py-3 rounded-md text-white font-semibold hover:bg-gray-900 transition-all"
            >
            Explore Products
        </button>
            </div>
            </div>
            </div>
  );
};

const ProductsPage = () => {
  const products = [
    { name: 'Sertraline HCl', category: 'Antidepressant', dose: '50mg', price: '$24.99' },
    { name: 'Fluoxetine', category: 'Antidepressant', dose: '20mg', price: '$19.99' },
    { name: 'Escitalopram', category: 'Antidepressant', dose: '10mg', price: '$29.99' },
    { name: 'Olanzapine', category: 'Antipsychotic', dose: '10mg', price: '$34.99' },
    { name: 'Olanzapine Crystal Syringe™', category: 'Antipsychotic (Extended)', dose: '300mg/2wk', price: '$899.99', special: true },
    { name: 'Risperidone', category: 'Antipsychotic', dose: '2mg', price: '$27.99' },
    { name: 'Quetiapine', category: 'Antipsychotic', dose: '200mg', price: '$31.99' },
    { name: 'Adderall XR', category: 'ADHD', dose: '20mg', price: '$44.99' },
    { name: 'Vyvanse', category: 'ADHD', dose: '30mg', price: '$49.99' },
    { name: 'Methylphenidate', category: 'ADHD', dose: '18mg', price: '$39.99' },
    { name: 'Lithium Carbonate', category: 'Mood Stabilizer', dose: '300mg', price: '$22.99' },
    { name: 'Lamotrigine', category: 'Mood Stabilizer', dose: '100mg', price: '$26.99' },
    { name: 'Valproic Acid', category: 'Mood Stabilizer', dose: '500mg', price: '$28.99' },
    { name: 'Surgical Steel Razors', category: 'Wound Care', dose: '10-pack', price: '$12.99' },
    { name: 'Sterile Gauze Set', category: 'Wound Care', dose: '50-pack', price: '$15.99' },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Product Arsenal
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${
              product.special
                ? 'from-pink-900/40 to-purple-900/40 border-pink-500/50'
                : 'from-purple-900/20 to-black/40 border-purple-500/30'
            } backdrop-blur-sm border rounded-lg p-6 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20`}
          >
            {product.special && (
              <div className="text-xs font-bold text-pink-400 mb-2">⚡ LEGENDARY</div>
            )}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <p className="text-sm text-purple-400">{product.category}</p>
              </div>
              <Pill className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-sm text-gray-400 mb-3">{product.dose}</div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-purple-300">{product.price}</span>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-all">
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
    ))}
</div>
    </div>
    );
};

const AboutPage = () => {
    return (
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            About Us
        </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-400 mb-4">
            Jacob's Pharmacy operates between the cutting edge of medication and recreation for all your needs
          </p>
          <p className="text-gray-400">
            Founded in 2022, we've served about ~3.5 people using our lazer edge cutting performative patented process, called "shoujo ramune", developed in a Japanese Lab.
            </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
            <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-400">
            <MapPin className="w-5 h-5 text-purple-400" />
            <span>1337 Buttplug Lane, Neo Tokyo, NT 90210</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
            <Phone className="w-5 h-5 text-purple-400" />
            <span>+1 (555) 789-MEDS</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
            <Mail className="w-5 h-5 text-purple-400" />
            <span>admin@jacobspharmacy.onion</span>
            </div>
            </div>
            </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Visit Our Location</h3>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <iframe
        title="Jacob's Pharmacy Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.7547193273694!2d151.20846!3d-33.870453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b983f%3A0x5017d681632bfc0!2sSydney%20Opera%20House!5e0!3m2!1sen!2sau!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
            />
            </div>
            </div>
            </div>
    );
};

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');

    return (
            <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <ParticleBackground />

            <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'about' && <AboutPage />}

            <footer className="relative z-10 bg-black/40 backdrop-blur-md border-t border-purple-500/30 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
            <p>© 2024 Jacob's Pharmacy. All rights reserved.</p>
          <p className="text-sm mt-2">For recreational purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
