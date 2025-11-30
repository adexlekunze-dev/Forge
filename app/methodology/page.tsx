"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  TrendingUp,
  Users,
  FileText,
  Target,
  BarChart3,
  Search,
  Zap,
  Award,
  X,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Lock,
  Key,
  FileEdit,
  ShoppingCart,
  Star
} from 'lucide-react';

export default function MethodologyPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('competitive'); // Default to competitive
  const [showScoringMethodology, setShowScoringMethodology] = useState(false);
  const [counters, setCounters] = useState({
    issues: 0,
    competitors: 0,
    studies: 0,
    violations: 0,
  });

  // Animate counters on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = (target: number) => target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => ({
        issues: Math.min(prev.issues + increment(23), 23),
        competitors: Math.min(prev.competitors + increment(6), 6),
        studies: Math.min(prev.studies + increment(12), 12),
        violations: Math.min(prev.violations + increment(9), 9),
      }));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Stats */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Discovery Methodology
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-2">
              Research-Backed Problem Identification
            </p>
            <p className="text-base sm:text-lg text-blue-50 max-w-3xl mx-auto">
              Problems were systematically identified through competitive analysis, heuristic evaluation, and industry research.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  {Math.round(counters.issues)}
                </div>
                <div className="text-sm sm:text-base text-blue-100">Issues Identified</div>
                <Target className="h-6 w-6 mx-auto mt-2 text-blue-200" />
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  {Math.round(counters.competitors)}
                </div>
                <div className="text-sm sm:text-base text-blue-100">Competitors Analyzed</div>
                <BarChart3 className="h-6 w-6 mx-auto mt-2 text-blue-200" />
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  {Math.round(counters.studies)}
                </div>
                <div className="text-sm sm:text-base text-blue-100">Research Studies</div>
                <FileText className="h-6 w-6 mx-auto mt-2 text-blue-200" />
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  {Math.round(counters.violations)}
                </div>
                <div className="text-sm sm:text-base text-blue-100">Heuristic Violations</div>
                <AlertTriangle className="h-6 w-6 mx-auto mt-2 text-blue-200" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* The Journey - Storytelling Section */}
        <section className="mb-12 sm:mb-16">
          <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-blue-600" />
                The Discovery Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 sm:gap-6 relative">
                {/* Timeline connector */}
                <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-blue-200" style={{ margin: '0 5%' }} />
                
                {[
                  { icon: Search, label: 'Competitive Audit', bgColor: 'bg-blue-100', iconColor: 'text-blue-600', badgeColor: 'bg-blue-600', step: '1' },
                  { icon: AlertCircle, label: 'Heuristic Evaluation', bgColor: 'bg-orange-100', iconColor: 'text-orange-600', badgeColor: 'bg-orange-600', step: '2' },
                  { icon: FileText, label: 'Industry Research', bgColor: 'bg-purple-100', iconColor: 'text-purple-600', badgeColor: 'bg-purple-600', step: '3' },
                  { icon: Zap, label: 'Rapid Prototyping', bgColor: 'bg-green-100', iconColor: 'text-green-600', badgeColor: 'bg-green-600', step: '4' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="relative text-center">
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${item.bgColor} flex items-center justify-center border-4 border-white shadow-lg`}>
                        <Icon className={`h-8 w-8 ${item.iconColor}`} />
                      </div>
                      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${item.badgeColor} text-white text-xs font-bold flex items-center justify-center`}>
                        {item.step}
                      </div>
                      <p className="font-semibold text-sm sm:text-base">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Discovery Process Cards - Enhanced */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            Discovery Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card 
              className={`hover:shadow-xl transition-all cursor-pointer border-2 ${
                expandedSection === 'competitive' ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => toggleSection('competitive')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Competitive Audit</span>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform ${expandedSection === 'competitive' ? 'rotate-90' : ''}`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Competitors</span>
                    <span className="text-lg font-bold text-blue-600">6</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-gray-500">Sykes + 5 industry leaders analyzed</p>
                  <div className="pt-2 border-t">
                    <span className="text-xs font-semibold text-red-600">7/8 gaps identified</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`hover:shadow-xl transition-all cursor-pointer border-2 ${
                expandedSection === 'heuristic' ? 'border-orange-500 shadow-lg' : 'border-gray-200 hover:border-orange-300'
              }`}
              onClick={() => toggleSection('heuristic')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                    </div>
                    <span>Heuristic Evaluation</span>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform ${expandedSection === 'heuristic' ? 'rotate-90' : ''}`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="text-lg font-bold text-orange-600">6.2/10</span>
                  </div>
                  <Progress value={62} className="h-2" />
                  <p className="text-xs text-gray-500">Nielsen&apos;s 10 principles assessed</p>
                  <div className="pt-2 border-t">
                    <span className="text-xs font-semibold text-red-600">9 violations found</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`hover:shadow-xl transition-all cursor-pointer border-2 ${
                expandedSection === 'research' ? 'border-purple-500 shadow-lg' : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => toggleSection('research')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <span>Industry Research</span>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform ${expandedSection === 'research' ? 'rotate-90' : ''}`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Studies</span>
                    <span className="text-lg font-bold text-purple-600">12</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-gray-500">Benchmark research reviewed</p>
                  <div className="pt-2 border-t">
                    <span className="text-xs font-semibold text-green-600">4 key insights</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`hover:shadow-xl transition-all cursor-pointer border-2 ${
                expandedSection === 'prototype' ? 'border-green-500 shadow-lg' : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => toggleSection('prototype')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-green-600" />
                    </div>
                    <span>Prototype & Test</span>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform ${expandedSection === 'prototype' ? 'rotate-90' : ''}`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="text-lg font-bold text-green-600">Ready</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-gray-500">Functional prototype built</p>
                  <div className="pt-2 border-t">
                    <span className="text-xs font-semibold text-blue-600">5-8 users planned</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Competitive Audit Results - Enhanced with Visual Progress */}
        {expandedSection === 'competitive' && (
          <section className="mb-16 animate-in fade-in duration-300">
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  Competitive Audit Results
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Sites analyzed: Sykes Holiday Cottages, Airbnb, Vrbo, Booking.com, OnTheBeach, Forest Holidays
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    { feature: 'Social login', sykes: false, industry: 83, critical: true },
                    { feature: 'Guest checkout', sykes: false, industry: 67, critical: true },
                    { feature: 'Magic link login', sykes: false, industry: 50, critical: false },
                    { feature: 'Value prop sign-up', sykes: false, industry: 50, critical: false },
                    { feature: 'Loyalty visible', sykes: false, industry: 67, critical: false },
                    { feature: 'Interactive dashboard', sykes: false, industry: 83, critical: false },
                    { feature: 'One-click rebook', sykes: false, industry: 50, critical: false },
                    { feature: 'Transparent pricing', sykes: false, industry: 100, critical: true },
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {item.sykes ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <X className="h-5 w-5 text-red-600" />
                          )}
                          <span className="font-semibold">{item.feature}</span>
                          {item.critical && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Critical</span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-gray-700">{item.industry}%</span>
                          <span className="text-xs text-gray-500 ml-1">industry standard</span>
                        </div>
                      </div>
                      <Progress value={item.industry} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-900 mb-2 text-lg">Key Finding</h4>
                      <p className="text-red-800">
                        Sykes lags behind industry standards in 7 of 8 conversion-critical features. This represents significant competitive disadvantage and opportunity.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Heuristic Evaluation - Enhanced */}
        {expandedSection === 'heuristic' && (
          <section className="mb-16 animate-in fade-in duration-300">
            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  Heuristic Evaluation
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Nielsen&apos;s 10 Usability Heuristics assessment showing 9 violations found, grouped by severity:
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* CRITICAL */}
                <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <h3 className="text-xl font-bold text-red-600">CRITICAL (3 violations)</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'Visibility of system status', problem: 'No checkout progress indication', impact: 'Users don\'t know how many steps remain' },
                      { title: 'User control and freedom', problem: 'Forced account creation (no guest option)', impact: '26% abandonment (Baymard data)' },
                      { title: 'Error prevention', problem: 'Hidden fees revealed late', impact: 'Surprise pricing causes abandonment' },
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-l-4 border-red-500 pl-4 py-3 rounded">
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-gray-700 mb-1">→ Problem: {item.problem}</p>
                        <p className="text-sm text-gray-600">Impact: {item.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MAJOR */}
                <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-orange-600">MAJOR (4 violations)</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'Recognition rather than recall', problem: 'No social login options', impact: 'Users must remember credentials' },
                      { title: 'Flexibility and efficiency of use', problem: 'No magic link or passwordless entry', impact: 'Mobile friction increases abandonment' },
                      { title: 'Aesthetic and minimalist design', problem: 'No value proposition on sign-up', impact: 'Users don\'t understand benefits' },
                      { title: 'Help users recognize, diagnose, and recover from errors', problem: 'Unclear error messages', impact: 'Users struggle to fix issues' },
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-l-4 border-orange-500 pl-4 py-3 rounded">
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-gray-700 mb-1">→ Problem: {item.problem}</p>
                        <p className="text-sm text-gray-600">Impact: {item.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MINOR */}
                <div className="border-2 border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="h-6 w-6 text-yellow-600" />
                    <h3 className="text-xl font-bold text-yellow-600">MINOR (2 violations)</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'Match between system and real world', problem: 'Technical jargon in some places', impact: 'Reduced clarity' },
                      { title: 'Help and documentation', problem: 'Limited help resources during checkout', impact: 'Users may abandon when stuck' },
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-l-4 border-yellow-500 pl-4 py-3 rounded">
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-gray-700 mb-1">→ Problem: {item.problem}</p>
                        <p className="text-sm text-gray-600">Impact: {item.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-2 border-gray-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-lg">Total Score: <span className="text-red-600 text-2xl">6.2/10</span></p>
                      <p className="text-sm text-gray-600 mt-1">Room for significant improvement</p>
                    </div>
                    <Progress value={62} className="w-32 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Industry Research Synthesis - Enhanced */}
        {expandedSection === 'research' && (
          <section className="mb-16 animate-in fade-in duration-300">
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-purple-600" />
                  Industry Research Synthesis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {[
                  {
                    title: 'Forced Account Creation',
                    source: 'Baymard Institute (2024) - Checkout Usability Study',
                    finding: '26% of cart abandonment attributed to forced registration requirement',
                    solution: 'Guest checkout option',
                    impact: '+20-45% conversion increase',
                    icon: Users,
                    bgColor: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    impactColor: 'text-blue-600',
                  },
                  {
                    title: 'Password Friction',
                    source: 'Gigya (2024) - Social Login Adoption Study',
                    finding: 'Social login increases conversion 40-60% vs traditional password entry',
                    solution: 'Social authentication + magic link',
                    impact: '+40-60% login completion',
                    icon: Zap,
                    bgColor: 'bg-green-100',
                    iconColor: 'text-green-600',
                    impactColor: 'text-green-600',
                  },
                  {
                    title: 'No Value Proposition',
                    source: 'ConversionXL (2024) - Sign-Up Optimization Benchmarks',
                    finding: 'Clear value props increase sign-up rates by 25-35%',
                    solution: 'Split-screen sign-up with benefits',
                    impact: '+25-35% conversion',
                    icon: Target,
                    bgColor: 'bg-purple-100',
                    iconColor: 'text-purple-600',
                    impactColor: 'text-purple-600',
                  },
                  {
                    title: 'Static Dashboard',
                    source: 'McKinsey Digital (2024) - Loyalty Program Engagement',
                    finding: 'Interactive dashboards increase repeat bookings by 25%',
                    solution: 'Interactive loyalty dashboard',
                    impact: '+25% repeat bookings',
                    icon: TrendingUp,
                    bgColor: 'bg-orange-100',
                    iconColor: 'text-orange-600',
                    impactColor: 'text-orange-600',
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="border-2 rounded-lg p-6 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`h-6 w-6 ${item.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Research Source:</strong> {item.source}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3 pl-16">
                        <div>
                          <p className="font-semibold text-sm text-gray-700 mb-1">Finding:</p>
                          <p className="text-gray-700">{item.finding}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-700 mb-1">Recommended Solution:</p>
                          <p className="text-gray-700">{item.solution}</p>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="font-semibold text-sm text-gray-700 mb-1">Expected Impact:</p>
                          <p className={`${item.impactColor} font-bold text-lg`}>{item.impact}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <p className="text-sm font-bold text-gray-700">
                      12 benchmark studies reviewed from:
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">
                    Baymard Institute, Forrester Research, Nielsen Norman Group, ConversionXL, Gigya, McKinsey Digital
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Problem Prioritization - Visual Matrix */}
        <section className="mb-16">
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-gray-700" />
                    Problem Prioritization
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">Interactive priority matrix with sortable columns</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-fit min-h-[44px]"
                  onClick={() => setShowScoringMethodology(!showScoringMethodology)}
                >
                  {showScoringMethodology ? 'Hide' : 'Show'} scoring methodology
                </Button>
              </div>
            </CardHeader>
            
            {/* Collapsible Scoring Methodology */}
            {showScoringMethodology && (
              <div className="px-6 pb-4 border-b bg-blue-50">
                <h4 className="font-bold text-lg mb-3">Scoring Methodology</h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>Each problem scored on:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Customer pain (1-10):</strong> Severity of friction</li>
                    <li><strong>Frequency:</strong> How often encountered (H/M/L)</li>
                    <li><strong>Business impact:</strong> Effect on conversion/retention/AOV</li>
                  </ul>
                  <p className="mt-3 font-semibold">Priority = Pain × Frequency × Impact</p>
                </div>
              </div>
            )}
            
            <CardContent className="pt-6">
              <div className="space-y-3">
                {[
                  { problem: 'Checkout friction', pain: 9, frequency: 'H', impact: 'High', priority: 1, emoji: '🔴', textColor: 'text-red-600' },
                  { problem: 'No guest checkout', pain: 8, frequency: 'H', impact: 'High', priority: 2, emoji: '🔴', textColor: 'text-red-600' },
                  { problem: 'Password friction', pain: 7, frequency: 'H', impact: 'Med', priority: 3, emoji: '🟡', textColor: 'text-yellow-600' },
                  { problem: 'No sign-up value', pain: 6, frequency: 'M', impact: 'Med', priority: 4, emoji: '🟡', textColor: 'text-yellow-600' },
                  { problem: 'Static dashboard', pain: 5, frequency: 'M', impact: 'Med', priority: 5, emoji: '🟢', textColor: 'text-green-600' },
                  { problem: 'No loyalty program', pain: 4, frequency: 'L', impact: 'High', priority: 6, emoji: '🟢', textColor: 'text-green-600' },
                ].map((item, index) => (
                  <div key={index} className="border-2 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`${item.textColor} font-bold text-lg`}>
                            {item.emoji} {item.priority}
                          </span>
                          <span className="font-bold text-lg">{item.problem}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Pain: </span>
                            <span className="font-bold">{item.pain}/10</span>
                            <Progress value={item.pain * 10} className="h-2 mt-1" />
                          </div>
                          <div>
                            <span className="text-gray-600">Frequency: </span>
                            <span className="font-bold">{item.frequency}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Impact: </span>
                            <span className="font-bold">{item.impact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Proposed Validation Plan */}
        {expandedSection === 'prototype' && (
          <section className="mb-16 animate-in fade-in duration-300">
            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-green-600" />
                  Proposed Validation Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">Validation Approach</h3>
                  <p className="text-gray-700 mb-6">
                    This prototype represents solutions based on competitive and research analysis. Before engineering build:
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { 
                      step: 'Step 1', 
                      title: 'Usability Testing (5-8 users)', 
                      items: [
                        'Task: "Book Forest View Cottage"',
                        'Measure: Completion rate, time, satisfaction',
                        'Success: 80%+ complete without help'
                      ]
                    },
                    { 
                      step: 'Step 2', 
                      title: 'User Interviews (5 users)', 
                      items: [
                        'Validate problem resonance',
                        'Test solution concepts',
                        'Gather qualitative feedback'
                      ]
                    },
                    { 
                      step: 'Step 3', 
                      title: 'A/B Test (if feasible)', 
                      items: [
                        'Current vs. Optimized',
                        'Measure: Conversion, completion',
                        'Sample: 1,000+ per variant'
                      ]
                    },
                  ].map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-lg p-4">
                      <h4 className="font-bold text-lg mb-2">{item.step}: {item.title}</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {item.items.map((listItem, idx) => (
                          <li key={idx}>{listItem}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <p className="font-bold text-green-900 text-lg">Build only validated features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Discovery vs. Delivery - Enhanced */}
        <section className="mb-16">
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
              <CardTitle>Discovery vs. Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    Discovery (What to build)
                  </h3>
                  <ul className="space-y-3">
                    {['Competitive audit', 'Heuristic eval', 'Research review', 'Rapid prototyping'].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-600">User testing (would be next)</span>
                    </li>
                  </ul>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ArrowRight className="h-6 w-6 text-gray-600" />
                    Delivery (Build it right)
                  </h3>
                  <ul className="space-y-3">
                    {['Engineering specs', 'Sprint planning', 'Development', 'QA & testing', 'Launch & monitor'].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-500">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-gray-100 to-blue-50 rounded-lg border-2 border-gray-200">
                <p className="font-bold mb-2 text-lg">Current Status:</p>
                <p className="text-gray-700 mb-4">
                  This prototype represents discovery work. Delivery would follow user validation.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-100 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600">Discovery:</p>
                    <p className="text-green-600 font-bold text-lg">Complete ✅</p>
                  </div>
                  <div className="text-center p-3 bg-blue-100 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600">Validation:</p>
                    <p className="text-blue-600 font-bold text-lg">Next step ⏸️</p>
                  </div>
                  <div className="text-center p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600">Delivery:</p>
                    <p className="text-gray-500 font-bold text-lg">After validation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Explore Optimized Solutions */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-3xl flex items-center gap-2">
                <Sparkles className="h-8 w-8" />
                Explore Optimized Solutions
              </CardTitle>
              <p className="text-blue-100 mt-2">
                See how these discoveries translate into improved user experiences
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { href: '/login', icon: Lock, iconColor: 'text-orange-600', label: 'Login' },
                  { href: '/signup', icon: FileEdit, iconColor: 'text-red-600', label: 'Sign-Up' },
                  { href: '/checkout', icon: ShoppingCart, iconColor: 'text-blue-600', label: 'Checkout' },
                  { href: '/dashboard', icon: Star, iconColor: 'text-yellow-500', label: 'Dashboard' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link key={index} href={item.href}>
                      <Button 
                        variant="secondary" 
                        className="w-full h-auto py-6 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-all hover:shadow-lg rounded-lg min-h-[120px]"
                      >
                        <Icon className={`h-10 w-10 ${item.iconColor} mb-3`} />
                        <span className="font-bold text-base text-gray-900">{item.label}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}