import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe, Brain, Map, BarChart3, AlertTriangle, Leaf, Cloud, ArrowRight, CheckCircle, Users, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-earth-500 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">Rahbar</span>
            </div>
            <div className="flex items-center gap-4">
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
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              </div>
            </motion.div>

            {/* Hero Image/Demo */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-earth-100 to-sky-100 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-32 h-32 text-earth-500 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-600 text-lg">Interactive Climate Dashboard</p>
                  </div>
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
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-8 h-8 text-earth-400" />
                <span className="text-xl font-bold">Rahbar</span>
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
