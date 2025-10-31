import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { 
  Menu, X, CheckCircle, Send, 
  Building2, Users, TrendingUp, Shield, Sparkles,
  Mail, Phone, MessageSquare, Linkedin, Twitter,
  Instagram, Youtube, ArrowRight, Target, Zap, Globe
} from 'lucide-react';
import './App.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showChatbot, setShowChatbot] = useState(false);
  const [contactForm, setContactForm] = useState({
    institution_name: '',
    contact_person: '',
    email: '',
    phone: '',
    message: ''
  });
  const [collaborationForm, setCollaborationForm] = useState({
    institution_name: '',
    contact_person: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [collabStatus, setCollabStatus] = useState({ type: '', message: '' });

  // Scroll handler for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'why', 'how-it-works', 'institutions', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: 'loading', message: 'Submitting...' });
    
    try {
      const response = await axios.post(`${API_URL}/api/contact`, contactForm);
      setSubmitStatus({ type: 'success', message: response.data.message });
      setContactForm({
        institution_name: '',
        contact_person: '',
        email: '',
        phone: '',
        message: ''
      });
      setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.detail || 'Failed to submit. Please try again.' 
      });
    }
  };

  const handleCollaborationSubmit = async (e) => {
    e.preventDefault();
    setCollabStatus({ type: 'loading', message: 'Submitting...' });
    
    try {
      const response = await axios.post(`${API_URL}/api/collaboration`, collaborationForm);
      setCollabStatus({ type: 'success', message: response.data.message });
      setCollaborationForm({
        institution_name: '',
        contact_person: '',
        email: '',
        phone: '',
        message: ''
      });
      setTimeout(() => setCollabStatus({ type: '', message: '' }), 5000);
    } catch (error) {
      setCollabStatus({ 
        type: 'error', 
        message: error.response?.data?.detail || 'Failed to submit. Please try again.' 
      });
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
          <div className="section-container">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">BulandiPe</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => scrollToSection('home')}
                  className={`text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                  data-testid="nav-home"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('why')}
                  className={`text-sm font-medium transition-colors ${activeSection === 'why' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                  data-testid="nav-why"
                >
                  Why BulandiPe
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className={`text-sm font-medium transition-colors ${activeSection === 'how-it-works' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                  data-testid="nav-how-it-works"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('institutions')}
                  className={`text-sm font-medium transition-colors ${activeSection === 'institutions' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                  data-testid="nav-institutions"
                >
                  For Institutions
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary"
                  data-testid="nav-contact-cta"
                >
                  Contact Us
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                data-testid="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 space-y-2 border-t border-gray-100" data-testid="mobile-menu">
                <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Home</button>
                <button onClick={() => scrollToSection('why')} className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Why BulandiPe</button>
                <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">How It Works</button>
                <button onClick={() => scrollToSection('institutions')} className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">For Institutions</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-primary font-medium hover:bg-blue-50 rounded-lg">Contact Us</button>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden" data-testid="hero-section">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 opacity-60"></div>
          <div className="section-container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div className="space-y-8 fade-in">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" data-testid="hero-heading">
                  Empowering{' '}
                  <span className="gradient-text">Institutions</span>
                  <br />
                  Through Innovation
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl" data-testid="hero-description">
                  Next-generation funding and support platform connecting institutions, supporters, and students for transformative impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => scrollToSection('why')}
                    className="btn-primary flex items-center justify-center space-x-2"
                    data-testid="hero-cta-explore"
                  >
                    <span>Explore BulandiPe</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scrollToSection('institutions')}
                    className="btn-secondary"
                    data-testid="hero-cta-collaborate"
                  >
                    Request Collaboration
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                  <div data-testid="stat-institutions">
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-sm text-gray-600 mt-1">Institutions</div>
                  </div>
                  <div data-testid="stat-supporters">
                    <div className="text-3xl font-bold text-primary">10K+</div>
                    <div className="text-sm text-gray-600 mt-1">Supporters</div>
                  </div>
                  <div data-testid="stat-impact">
                    <div className="text-3xl font-bold text-primary">₹50Cr+</div>
                    <div className="text-sm text-gray-600 mt-1">Impact Created</div>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative slide-up">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl hover-lift">
                  <img 
                    src="https://images.unsplash.com/photo-1662736619557-5557b6a3ae12?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGlsbHVzdHJhdGlvbnxlbnwwfHx8Ymx1ZXwxNzYxOTIwNjY2fDA&ixlib=rb-4.1.0&q=85"
                    alt="BulandiPe Platform"
                    className="w-full h-full object-cover"
                    data-testid="hero-image"
                  />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-20 animate-float"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why BulandiPe Section */}
        <section id="why" className="py-20 md:py-32 bg-gray-50" data-testid="why-section">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="why-heading">
                Why <span className="gradient-text">BulandiPe</span>?
              </h2>
              <p className="text-xl text-gray-600" data-testid="why-description">
                We're revolutionizing institutional funding by creating a transparent, efficient, and impactful ecosystem that benefits everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="glass-card p-8 rounded-2xl hover-lift" data-testid="feature-transparency">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Complete Transparency</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every transaction, every impact metric, fully visible. Build trust through radical transparency in all operations.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card p-8 rounded-2xl hover-lift" data-testid="feature-efficiency">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Maximum Efficiency</h3>
                <p className="text-gray-600 leading-relaxed">
                  Streamlined processes eliminate bureaucracy. Funds reach where they're needed faster than ever before.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card p-8 rounded-2xl hover-lift" data-testid="feature-impact">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Measurable Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track real outcomes with data-driven insights. See exactly how your contributions create lasting change.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-card p-8 rounded-2xl hover-lift" data-testid="feature-network">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Global Network</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with institutions, alumni, and supporters worldwide. Create opportunities beyond borders.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass-card p-8 rounded-2xl hover-lift" data-testid="feature-technology">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Technology</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered matching connects the right supporters with the right causes for optimal outcomes.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass-card p-8 rounded-2xl hover-lift" data-testid="feature-community">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Thriving Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join a passionate community committed to educational excellence and institutional growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-32" data-testid="how-it-works-section">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="how-heading">
                How <span className="gradient-text">It Works</span>
              </h2>
              <p className="text-xl text-gray-600" data-testid="how-description">
                A simple, seamless process that connects institutions with the support they need.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-6" data-testid="step-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Institution Registration</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Institutions create verified profiles highlighting their mission, needs, and impact goals. Our team ensures authenticity and transparency.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6" data-testid="step-2">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Smart Matching</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our AI-powered platform connects institutions with relevant supporters, alumni, and funding opportunities based on alignment and impact potential.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6" data-testid="step-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Secure Funding</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Supporters contribute directly through our secure platform. Every transaction is tracked, transparent, and reaches the institution efficiently.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-6" data-testid="step-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Track Impact</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Real-time dashboards show how funds are utilized and the tangible impact created. Supporters see exactly where their contributions make a difference.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative slide-up">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl hover-lift">
                  <img 
                    src="https://images.pexels.com/photos/34337249/pexels-photo-34337249.jpeg"
                    alt="How BulandiPe Works"
                    className="w-full h-full object-cover"
                    data-testid="how-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Institutions Section */}
        <section id="institutions" className="py-20 md:py-32 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden" data-testid="institutions-section">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1662736618901-80636f2891a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGlsbHVzdHJhdGlvbnxlbnwwfHx8Ymx1ZXwxNzYxOTIwNjY2fDA&ixlib=rb-4.1.0&q=85"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="section-container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="institutions-heading">
                  Partner With Us
                </h2>
                <p className="text-xl text-blue-100" data-testid="institutions-description">
                  Join leading institutions leveraging BulandiPe to unlock new funding opportunities and amplify their impact.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl" data-testid="benefit-visibility">
                  <Building2 className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Enhanced Visibility</h3>
                  <p className="text-blue-100">
                    Showcase your institution to a global network of potential supporters and partners.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl" data-testid="benefit-funding">
                  <TrendingUp className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Diversified Funding</h3>
                  <p className="text-blue-100">
                    Access multiple funding streams from alumni, corporates, and philanthropists.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl" data-testid="benefit-engagement">
                  <Users className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Alumni Engagement</h3>
                  <p className="text-blue-100">
                    Strengthen bonds with alumni through meaningful contribution opportunities.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl" data-testid="benefit-analytics">
                  <Target className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Data & Analytics</h3>
                  <p className="text-blue-100">
                    Gain insights into donor behavior and optimize your fundraising strategies.
                  </p>
                </div>
              </div>

              {/* Collaboration Request Form */}
              <div className="bg-white text-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl" data-testid="collaboration-form">
                <h3 className="text-2xl font-bold mb-6 text-center">Request Collaboration</h3>
                
                {collabStatus.message && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    collabStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                    collabStatus.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
                    'bg-blue-50 text-blue-800 border border-blue-200'
                  }`} data-testid="collab-status-message">
                    {collabStatus.type === 'success' && <CheckCircle className="w-5 h-5 inline mr-2" />}
                    {collabStatus.message}
                  </div>
                )}

                <form onSubmit={handleCollaborationSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="collab-institution">
                      Institution Name *
                    </label>
                    <input
                      id="collab-institution"
                      type="text"
                      required
                      value={collaborationForm.institution_name}
                      onChange={(e) => setCollaborationForm({...collaborationForm, institution_name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Your Institution Name"
                      data-testid="collab-input-institution"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="collab-person">
                      Contact Person *
                    </label>
                    <input
                      id="collab-person"
                      type="text"
                      required
                      value={collaborationForm.contact_person}
                      onChange={(e) => setCollaborationForm({...collaborationForm, contact_person: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Your Full Name"
                      data-testid="collab-input-person"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="collab-email">
                        Email *
                      </label>
                      <input
                        id="collab-email"
                        type="email"
                        required
                        value={collaborationForm.email}
                        onChange={(e) => setCollaborationForm({...collaborationForm, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="your@email.com"
                        data-testid="collab-input-email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="collab-phone">
                        Phone
                      </label>
                      <input
                        id="collab-phone"
                        type="tel"
                        value={collaborationForm.phone}
                        onChange={(e) => setCollaborationForm({...collaborationForm, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="+91 XXXXX XXXXX"
                        data-testid="collab-input-phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="collab-message">
                      Message (Optional)
                    </label>
                    <textarea
                      id="collab-message"
                      rows="4"
                      value={collaborationForm.message}
                      onChange={(e) => setCollaborationForm({...collaborationForm, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your institution and collaboration interests..."
                      data-testid="collab-input-message"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                    disabled={collabStatus.type === 'loading'}
                    data-testid="collab-submit-button"
                  >
                    <span>{collabStatus.type === 'loading' ? 'Submitting...' : 'Request Collaboration'}</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 bg-gray-50" data-testid="contact-section">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="contact-heading">
                  Get In <span className="gradient-text">Touch</span>
                </h2>
                <p className="text-xl text-gray-600" data-testid="contact-description">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 bg-white rounded-xl" data-testid="contact-info-email">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-600 text-sm">support@bulandipe.com</p>
                </div>

                <div className="text-center p-6 bg-white rounded-xl" data-testid="contact-info-phone">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm">+91 XXXXX XXXXX</p>
                </div>

                <div className="text-center p-6 bg-white rounded-xl" data-testid="contact-info-support">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Support</h3>
                  <p className="text-gray-600 text-sm">24/7 Available</p>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg" data-testid="contact-form">
                {submitStatus.message && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                    submitStatus.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
                    'bg-blue-50 text-blue-800 border border-blue-200'
                  }`} data-testid="contact-status-message">
                    {submitStatus.type === 'success' && <CheckCircle className="w-5 h-5 inline mr-2" />}
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="contact-institution">
                      Institution Name *
                    </label>
                    <input
                      id="contact-institution"
                      type="text"
                      required
                      value={contactForm.institution_name}
                      onChange={(e) => setContactForm({...contactForm, institution_name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Your Institution Name"
                      data-testid="contact-input-institution"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="contact-person">
                      Contact Person *
                    </label>
                    <input
                      id="contact-person"
                      type="text"
                      required
                      value={contactForm.contact_person}
                      onChange={(e) => setContactForm({...contactForm, contact_person: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Your Full Name"
                      data-testid="contact-input-person"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="contact-email">
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="your@email.com"
                        data-testid="contact-input-email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="contact-phone">
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="+91 XXXXX XXXXX"
                        data-testid="contact-input-phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="contact-message">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows="5"
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                      data-testid="contact-input-message"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                    disabled={submitStatus.type === 'loading'}
                    data-testid="contact-submit-button"
                  >
                    <span>{submitStatus.type === 'loading' ? 'Sending...' : 'Send Message'}</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12" data-testid="footer">
          <div className="section-container">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">BulandiPe</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Next-generation institutional funding and support platform.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-white transition-colors">Home</button></li>
                  <li><button onClick={() => scrollToSection('why')} className="text-gray-400 hover:text-white transition-colors">Why BulandiPe</button></li>
                  <li><button onClick={() => scrollToSection('how-it-works')} className="text-gray-400 hover:text-white transition-colors">How It Works</button></li>
                  <li><button onClick={() => scrollToSection('institutions')} className="text-gray-400 hover:text-white transition-colors">For Institutions</button></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-privacy">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-terms">Terms of Use</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Disclaimer</a></li>
                </ul>
              </div>

              {/* Contact & Social */}
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="space-y-3 text-sm mb-4">
                  <a href="mailto:support@bulandipe.com" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>support@bulandipe.com</span>
                  </a>
                </div>
                <div className="flex space-x-4" data-testid="social-links">
                  <a href="https://linkedin.com/company/bulandipe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" data-testid="social-linkedin">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://x.com/bulandipe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" data-testid="social-twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" data-testid="social-instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" data-testid="social-youtube">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} BulandiPe. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Chatbot Popup (Placeholder) */}
        <div className="fixed bottom-6 right-6 z-50" data-testid="chatbot-container">
          {showChatbot && (
            <div className="bg-white rounded-2xl shadow-2xl w-80 mb-4 p-6 fade-in" data-testid="chatbot-popup">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">BulandiPe Assistant</h3>
                <button onClick={() => setShowChatbot(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Hi! I'm here to help. This feature is coming soon. For now, please use the contact form above.
              </p>
              <div className="text-xs text-gray-400 text-center">
                Chatbot functionality - Coming Soon
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowChatbot(!showChatbot)}
            className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
            data-testid="chatbot-toggle-button"
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
