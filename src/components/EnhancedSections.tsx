// Enhanced Landing Section Component
// Demonstrates glassmorphism + dark green theme + improved UX flow

import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard, GlassButton, GlassSection, GlassGrid, GlassFeatureCard, GlassInput } from './ui/GlassUI';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function EnhancedHeroSection() {
  return (
    <GlassSection variant="default" className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-green-400" />
          <span className="text-sm font-semibold text-green-300">AI-Powered Balcony Gardening</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Grow Your Perfect{' '}
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Balcony Garden
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Use AI to analyze your balcony space, get personalized plant recommendations, and track your garden with smart reminders.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GlassButton variant="primary" size="lg" className="flex items-center gap-2">
            Start Growing <ArrowRight className="w-5 h-5" />
          </GlassButton>
          <GlassButton variant="secondary" size="lg">
            Watch Demo
          </GlassButton>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-white">10,000+</div>
            <p className="text-sm text-gray-400">Active Gardeners</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-white">98%</div>
            <p className="text-sm text-gray-400">Success Rate</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-white">24/7</div>
            <p className="text-sm text-gray-400">AI Support</p>
          </div>
        </motion.div>
      </div>
    </GlassSection>
  );
}

export function EnhancedFeaturesSection() {
  const features = [
    {
      icon: '🎯',
      title: 'AI Space Analysis',
      description: 'Take a photo of your balcony and our AI analyzes sunlight, space, and conditions',
      badge: 'Smart',
    },
    {
      icon: '🌿',
      title: 'Plant Recommendations',
      description: 'Get personalized suggestions based on your balcony climate and available space',
      badge: 'Curated',
    },
    {
      icon: '💧',
      title: 'Smart Care Reminders',
      description: 'Automated notifications for watering, fertilizing, and pruning your plants',
      badge: 'Automated',
    },
    {
      icon: '📊',
      title: 'Growth Tracking',
      description: 'Document your plants\' progress with photos and track health metrics',
      badge: 'Analytics',
    },
    {
      icon: '🤝',
      title: 'Community Network',
      description: 'Connect with thousands of balcony gardeners and share experiences',
      badge: 'Social',
    },
    {
      icon: '🏆',
      title: 'Gamified Progress',
      description: 'Earn badges and level up as you achieve gardening milestones',
      badge: 'Rewards',
    },
  ];

  return (
    <GlassSection
      title="Powerful Features for Your Garden"
      subtitle="Everything you need to grow thriving plants on your balcony"
      variant="accent"
    >
      <GlassGrid cols={3} gap="gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GlassFeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badge={feature.badge}
            />
          </motion.div>
        ))}
      </GlassGrid>
    </GlassSection>
  );
}

export function EnhancedOnboardingFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    {
      number: 1,
      title: 'Create Account',
      description: 'Sign up with your email to get started',
      icon: '📧',
    },
    {
      number: 2,
      title: 'Scan Your Balcony',
      description: 'Take a photo and let AI analyze your space',
      icon: '📸',
    },
    {
      number: 3,
      title: 'Get Recommendations',
      description: 'Receive personalized plant suggestions',
      icon: '🌱',
    },
    {
      number: 4,
      title: 'Start Growing',
      description: 'Begin your gardening journey today',
      icon: '🌻',
    },
  ];

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setStep(step + 1);
        setSubmitted(false);
      }, 1500);
    }
  };

  return (
    <GlassSection className="py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Steps Timeline */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-12">Get Started in 4 Simple Steps</h2>
          <div className="space-y-8">
            {steps.map((s, idx) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`flex gap-6 cursor-pointer transition-all ${
                  step === s.number ? 'scale-105' : ''
                }`}
                onClick={() => setStep(s.number)}
              >
                {/* Step Number */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 transition-all
                    ${
                      step >= s.number
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                        : 'bg-white/10 text-gray-400 border border-white/20'
                    }
                  `}
                >
                  {s.number}
                </div>

                {/* Step Info */}
                <div className="flex-1">
                  <h3 className={`font-bold mb-1 transition ${step === s.number ? 'text-green-400' : 'text-white'}`}>
                    {s.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{s.description}</p>
                  {step === s.number && (
                    <div className="mt-3 text-lg">{s.icon}</div>
                  )}
                </div>

                {/* Checkmark for Completed Steps */}
                {step > s.number && (
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Card */}
        <GlassCard variant="green" className="p-8 h-96 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{steps[step - 1].title}</h3>
            <p className="text-gray-400 mb-6">{steps[step - 1].description}</p>
            <div className="text-6xl mb-8">{steps[step - 1].icon}</div>
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <GlassInput
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <GlassButton
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleSubmit}
                loading={submitted}
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </GlassButton>
            </div>
          ) : (
            <div className="flex gap-3">
              <GlassButton variant="secondary" size="md" className="flex-1" onClick={() => setStep(Math.max(1, step - 1))}>
                Back
              </GlassButton>
              <GlassButton
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => setStep(Math.min(steps.length, step + 1))}
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </GlassButton>
            </div>
          )}
        </GlassCard>
      </div>
    </GlassSection>
  );
}

export function EnhancedTestimonialSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Urban Gardener',
      text: 'Bloomify completely transformed my balcony garden! The AI recommendations were spot-on for my space.',
      avatar: '👩',
    },
    {
      name: 'Marcus Johnson',
      role: 'Balcony Farmer',
      text: 'The smart reminders helped me stay consistent. My plants have never been healthier!',
      avatar: '👨',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Plant Enthusiast',
      text: 'Love the community aspect. Getting tips from other gardeners has been invaluable.',
      avatar: '👩',
    },
  ];

  return (
    <GlassSection className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Loved by 10,000+ Gardeners</h2>
        <p className="text-gray-400">See what our community is saying</p>
      </div>

      <GlassGrid cols={3} gap="gap-6">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <GlassCard variant="standard">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-xs text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">"{testimonial.text}"</p>
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">
                    ⭐
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </GlassGrid>
    </GlassSection>
  );
}

export function EnhancedCTASection() {
  return (
    <GlassSection variant="accent" className="py-20">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Balcony?</h2>
          <p className="text-lg text-gray-400 mb-8">
            Join thousands of gardeners growing beautiful plants with AI-powered guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlassButton variant="primary" size="lg" className="flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </GlassButton>
            <GlassButton variant="secondary" size="lg">
              View Pricing
            </GlassButton>
          </div>
        </motion.div>
      </div>
    </GlassSection>
  );
}
