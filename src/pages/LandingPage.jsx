import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe, Brain, Map, BarChart3, AlertTriangle, Leaf, Cloud, ArrowRight, CheckCircle, Users, Shield, Zap, LayoutDashboard } from 'lucide-react';
import RahbarLogo from '../components/RahbarLogo';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced climate intelligence using Google Gemini AI for real-time insights'
    },
    {
      icon: Map,
      title: 'Interactive Maps',
      description: 'Visualize flood risks, urban growth, and environmental changes on interactive maps'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Data',
      description: 'Access live weather data, elevation maps, and geospatial information'
    },
    {
      icon: AlertTriangle,
      title: 'Disaster Management',
      description: 'Get actionable insights for flood prediction and disaster preparedness'
    },
    {
      icon: Leaf,
      title: 'Green Space Tracking',
      description: 'Monitor vegetation coverage and ecosystem health across regions'
    },
    {
      icon: Cloud,
      title: 'Climate Analytics',
      description: 'Comprehensive climate analysis with NASA/MODIS satellite data'
    }
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Active Users' },
    { icon: Globe, value: '50+', label: 'Cities Covered' },
    { icon: BarChart3, value: '1M+', label: 'Analyses Done' },
    { icon: Shield, value: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-sky-50 to-earth-100">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
              {/* Logo Image - Fixed size */}
              <div className="w-12 h-12 flex-shrink-0">
                <RahbarLogo 
                  size="default" 
                  showText={false} 
                  textStyle="solid"
                />
              </div>
              {/* Text Content - Matches logo height */}
              <div className="h-12 flex flex-col justify-center">
                <span className="text-2xl font-orbitron font-black tracking-wider text-gray-800 uppercase leading-none">
                  RAHBAR
                </span>
                <span className="text-xs font-orbitron font-medium tracking-wider text-gray-600">
                  CLIMATE AI
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {currentUser ? (
                // Logged in - show Dashboard button
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 bg-earth-500 hover:bg-earth-600 text-white rounded-lg font-medium transition-colors shadow-lg flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Go to Dashboard
                </motion.button>
              ) : (
                // Not logged in - show Sign In and Get Started
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-gray-700 hover:text-earth-500 transition-colors"
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/signup')}
                    className="px-6 py-2 bg-earth-500 hover:bg-earth-600 text-white rounded-lg font-medium transition-colors shadow-lg"
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-earth-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-40 right-20 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 left-1/4 w-80 h-80 bg-green-300/20 rounded-full blur-3xl"
          />
          
          {/* Floating Icons */}
          {[
            { Icon: Cloud, delay: 0, x: '10%', y: '20%' },
            { Icon: Leaf, delay: 2, x: '80%', y: '30%' },
            { Icon: AlertTriangle, delay: 1, x: '20%', y: '70%' },
            { Icon: Map, delay: 3, x: '70%', y: '60%' },
            { Icon: BarChart3, delay: 1.5, x: '90%', y: '80%' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                y: [0, -30, 0],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
              className="absolute"
              style={{ left: item.x, top: item.y }}
            >
              <item.Icon className="w-16 h-16 text-earth-400/30" />
            </motion.div>
          ))}
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Climate Intelligence
                <br />
                <span className="bg-gradient-to-r from-earth-500 to-sky-500 bg-clip-text text-transparent">
                  Powered by AI
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Make informed decisions with real-time climate data, disaster risk analysis, and AI-powered insights. Your guide to environmental intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {currentUser ? (
                  // Logged in - show Dashboard button
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-4 bg-earth-500 hover:bg-earth-600 text-white rounded-lg font-semibold text-lg shadow-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Open Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                ) : (
                  // Not logged in - show Sign Up and Sign In
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/signup')}
                      className="px-8 py-4 bg-earth-500 hover:bg-earth-600 text-white rounded-lg font-semibold text-lg shadow-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      Start Free Trial
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/login')}
                      className="px-8 py-4 border-2 border-earth-500 text-earth-500 hover:bg-earth-50 rounded-lg font-semibold text-lg transition-colors"
                    >
                      Sign In
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Hero Image/Demo - Interactive Map Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 max-w-5xl mx-auto border border-white/20">
                {/* Dashboard Preview */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg h-[500px] flex relative overflow-hidden">
                  {/* World Map SVG Background */}
                  <svg 
                    viewBox="0 0 1000 500" 
                    className="absolute inset-0 w-full h-full opacity-30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Continents as simplified paths */}
                    {/* Asia */}
                    <motion.path
                      d="M 600 150 Q 650 120, 700 140 Q 750 160, 780 180 Q 800 220, 760 260 Q 720 280, 680 250 Q 650 230, 620 200 Z"
                      fill="currentColor"
                      className="text-earth-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                    />
                    {/* Europe */}
                    <motion.path
                      d="M 450 120 Q 480 100, 520 110 Q 540 140, 520 160 Q 480 180, 450 160 Z"
                      fill="currentColor"
                      className="text-sky-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    />
                    {/* Africa */}
                    <motion.path
                      d="M 480 200 Q 520 190, 550 210 Q 560 260, 540 310 Q 500 350, 460 320 Q 450 260, 480 200 Z"
                      fill="currentColor"
                      className="text-green-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    />
                    {/* North America */}
                    <motion.path
                      d="M 150 100 Q 200 80, 250 100 Q 280 140, 260 180 Q 220 220, 180 200 Q 140 160, 150 100 Z"
                      fill="currentColor"
                      className="text-purple-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                    />
                    {/* South America */}
                    <motion.path
                      d="M 220 240 Q 260 230, 280 260 Q 290 310, 270 360 Q 240 400, 210 370 Q 200 310, 220 240 Z"
                      fill="currentColor"
                      className="text-yellow-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                    />
                    {/* Australia */}
                    <motion.path
                      d="M 750 340 Q 800 330, 840 350 Q 850 380, 820 400 Q 770 410, 740 380 Z"
                      fill="currentColor"
                      className="text-orange-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
                    />
                  </svg>
                  
                  {/* Pulsing Location Markers */}
                  {[
                    { x: '65%', y: '35%', label: 'Lahore', risk: 'High', color: 'bg-red-500' },
                    { x: '50%', y: '25%', label: 'London', risk: 'Low', color: 'bg-green-500' },
                    { x: '20%', y: '30%', label: 'New York', risk: 'Medium', color: 'bg-yellow-500' },
                    { x: '82%', y: '65%', label: 'Sydney', risk: 'Low', color: 'bg-green-500' },
                    { x: '52%', y: '50%', label: 'Cairo', risk: 'Medium', color: 'bg-yellow-500' },
                  ].map((location, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 + index * 0.3, duration: 0.5 }}
                      className="absolute"
                      style={{ left: location.x, top: location.y }}
                    >
                      {/* Pulsing Ring */}
                      <motion.div
                        animate={{ 
                          scale: [1, 2, 1],
                          opacity: [0.8, 0, 0.8]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.5 
                        }}
                        className={`absolute w-8 h-8 ${location.color} rounded-full -translate-x-1/2 -translate-y-1/2`}
                      />
                      {/* Marker Pin */}
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="relative"
                      >
                        <div className={`w-4 h-4 ${location.color} rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2`} />
                      </motion.div>
                      {/* Location Label */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + index * 0.3 }}
                        className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg whitespace-nowrap"
                      >
                        <p className="text-xs font-semibold text-gray-800">{location.label}</p>
                        <p className={`text-xs ${
                          location.risk === 'High' ? 'text-red-600' :
                          location.risk === 'Medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {location.risk} Risk
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                  
                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {[
                      { x1: '65%', y1: '35%', x2: '50%', y2: '25%' },
                      { x1: '50%', y1: '25%', x2: '20%', y2: '30%' },
                      { x1: '65%', y1: '35%', x2: '52%', y2: '50%' },
                    ].map((line, index) => (
                      <motion.line
                        key={index}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-earth-400/30"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ duration: 2, delay: 2 + index * 0.3 }}
                      />
                    ))}
                  </svg>
                  
                  {/* Dashboard UI Elements */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                      className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg"
                    >
                      <p className="text-xs text-gray-500">Live Analysis</p>
                      <p className="text-sm font-semibold text-gray-800">Climate Dashboard</p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                      className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-xs font-medium text-gray-800">Live Data</p>
                    </motion.div>
                  </div>
                  
                  {/* Stats Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: 'Flood Risk', value: '23%', color: 'text-red-500' },
                        { label: 'Green Cover', value: '45%', color: 'text-green-500' },
                        { label: 'Urban Growth', value: '12%', color: 'text-blue-500' },
                        { label: 'Air Quality', value: 'Good', color: 'text-purple-500' }
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.7 + i * 0.1 }}
                          className="text-center"
                        >
                          <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                          <p className="text-xs text-gray-600">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Climate Action
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to make data-driven environmental decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-earth-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-earth-100"
              >
                <div className="w-12 h-12 bg-earth-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-earth-500 to-sky-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-earth-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Climate Professionals
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by researchers, policymakers, and environmental organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-earth-50 to-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Disaster Management</h3>
              <ul className="space-y-3">
                {['Flood risk assessment', 'Early warning systems', 'Evacuation planning', 'Resource allocation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-earth-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-sky-50 to-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Urban Planning</h3>
              <ul className="space-y-3">
                {['Urban expansion tracking', 'Green space monitoring', 'Infrastructure planning', 'Policy recommendations'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-earth-500 to-sky-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-earth-100 mb-8">
              Join thousands of professionals using Rahbar for climate intelligence
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white text-earth-500 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Zap className="w-5 h-5" />
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <RahbarLogo size="default" showText={true} textStyle="solid" />
              </div>
              <p className="text-gray-400">
                Climate Intelligence Platform powered by AI
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © 2024 Rahbar Climate Intelligence Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
