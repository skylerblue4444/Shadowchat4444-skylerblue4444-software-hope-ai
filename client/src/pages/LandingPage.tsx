/**
 * FinTrack Landing Page
 * ─────────────────────────────────────────────────────────────────────────────
 * Professional marketing and onboarding page
 */

import React from "react";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, TrendingUp, Users, Rocket, BarChart3, Lock } from "lucide-react";
=======
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Rocket,
  BarChart3,
  Lock,
} from "lucide-react";
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">FinTrack</div>
          <div className="space-x-4">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Features
            </Button>
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Pricing
            </Button>
<<<<<<< HEAD
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
=======
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
<<<<<<< HEAD
        <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-600/50">🚀 Quantum Intelligence Powered</Badge>
=======
        <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-600/50">
          🚀 Quantum Intelligence Powered
        </Badge>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          The Future of Crypto Trading & Wealth Management
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
<<<<<<< HEAD
          FinTrack combines AI-powered trading, whale tracking, and enterprise-grade security into one unified platform.
          Trade smarter, earn more, stay secure.
=======
          FinTrack combines AI-powered trading, whale tracking, and
          enterprise-grade security into one unified platform. Trade smarter,
          earn more, stay secure.
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
            Start Free Trial <ArrowRight className="ml-2" />
          </Button>
<<<<<<< HEAD
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg">
=======
          <Button
            variant="outline"
            className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg"
          >
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            Watch Demo
          </Button>
        </div>

        {/* Hero Image */}
        <div className="bg-gradient-to-b from-blue-600/20 to-transparent rounded-lg border border-slate-700 p-8 mb-20">
          <div className="bg-slate-800 rounded-lg h-96 flex items-center justify-center">
            <div className="text-slate-400">Dashboard Preview</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
<<<<<<< HEAD
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Powerful Features</h2>
=======
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Powerful Features
        </h2>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="bg-slate-800 border-slate-700 hover:border-blue-600 transition">
            <CardHeader>
              <Zap className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">AI Trading Bot</CardTitle>
<<<<<<< HEAD
              <CardDescription>Automated signals with 62.5% win rate</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-400">
              5 strategies, 4 risk levels, and real-time portfolio optimization for all 7 coins.
=======
              <CardDescription>
                Automated signals with 62.5% win rate
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-400">
              5 strategies, 4 risk levels, and real-time portfolio optimization
              for all 7 coins.
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-slate-800 border-slate-700 hover:border-purple-600 transition">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Whale Tracker</CardTitle>
              <CardDescription>Real-time market intelligence</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-400">
<<<<<<< HEAD
              Monitor whale movements, detect anomalies, and get market sentiment analysis instantly.
=======
              Monitor whale movements, detect anomalies, and get market
              sentiment analysis instantly.
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-slate-800 border-slate-700 hover:border-green-600 transition">
            <CardHeader>
              <Shield className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">Security Shield</CardTitle>
              <CardDescription>Enterprise-grade protection</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-400">
<<<<<<< HEAD
              Fraud detection, Proof of Reserve, and full compliance reporting with audit trails.
=======
              Fraud detection, Proof of Reserve, and full compliance reporting
              with audit trails.
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="bg-slate-800 border-slate-700 hover:border-yellow-600 transition">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">Multi-Coin Wallet</CardTitle>
              <CardDescription>7 coins, unified management</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-400">
<<<<<<< HEAD
              SKYCOIN4444, SHADOW, TRUMP, DOGE, BTC, MONERO, and USDT all in one place.
=======
              SKYCOIN4444, SHADOW, TRUMP, DOGE, BTC, MONERO, and USDT all in one
              place.
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="bg-slate-800 border-slate-700 hover:border-pink-600 transition">
            <CardHeader>
              <Users className="w-8 h-8 text-pink-400 mb-2" />
              <CardTitle className="text-white">Social & Gaming</CardTitle>
              <CardDescription>Earn while you engage</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-400">
<<<<<<< HEAD
              Casino, social feed, dating, YouTube Watch-to-Earn, and puzzle challenges.
=======
              Casino, social feed, dating, YouTube Watch-to-Earn, and puzzle
              challenges.
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card className="bg-slate-800 border-slate-700 hover:border-orange-600 transition">
            <CardHeader>
              <Rocket className="w-8 h-8 text-orange-400 mb-2" />
              <CardTitle className="text-white">ICO & Investment</CardTitle>
              <CardDescription>Early access to opportunities</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-400">
<<<<<<< HEAD
              Participate in SKY4444 and SHADOW ICOs with bonus tiers and vesting schedules.
=======
              Participate in SKY4444 and SHADOW ICOs with bonus tiers and
              vesting schedules.
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">62.5%</div>
            <p className="text-slate-400">Trading Win Rate</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400 mb-2">62.4%</div>
            <p className="text-slate-400">Annualized Return</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">7</div>
            <p className="text-slate-400">Supported Coins</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">92</div>
            <p className="text-slate-400">Security Score</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
<<<<<<< HEAD
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Simple Pricing</h2>
=======
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Simple Pricing
        </h2>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Starter</CardTitle>
              <CardDescription>For beginners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-white">Free</div>
              <ul className="space-y-2 text-slate-400">
                <li>✓ Basic wallet</li>
                <li>✓ Portfolio tracking</li>
                <li>✓ Social feed</li>
                <li>✗ AI Trading Bot</li>
                <li>✗ Whale Tracker</li>
              </ul>
<<<<<<< HEAD
              <Button className="w-full bg-slate-700 hover:bg-slate-600">Get Started</Button>
=======
              <Button className="w-full bg-slate-700 hover:bg-slate-600">
                Get Started
              </Button>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="bg-slate-800 border-blue-600 ring-2 ring-blue-600/50">
            <CardHeader>
              <Badge className="w-fit bg-blue-600 mb-2">POPULAR</Badge>
              <CardTitle className="text-white">Pro</CardTitle>
              <CardDescription>For active traders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
<<<<<<< HEAD
              <div className="text-3xl font-bold text-white">$29<span className="text-lg text-slate-400">/mo</span></div>
=======
              <div className="text-3xl font-bold text-white">
                $29<span className="text-lg text-slate-400">/mo</span>
              </div>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
              <ul className="space-y-2 text-slate-400">
                <li>✓ Everything in Starter</li>
                <li>✓ AI Trading Bot</li>
                <li>✓ Whale Tracker</li>
                <li>✓ Security Shield</li>
                <li>✓ Priority support</li>
              </ul>
<<<<<<< HEAD
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Free Trial</Button>
=======
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            </CardContent>
          </Card>

          {/* Enterprise */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Enterprise</CardTitle>
              <CardDescription>For institutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-white">Custom</div>
              <ul className="space-y-2 text-slate-400">
                <li>✓ Everything in Pro</li>
                <li>✓ Custom integrations</li>
                <li>✓ Dedicated support</li>
                <li>✓ API access</li>
                <li>✓ SLA guarantee</li>
              </ul>
<<<<<<< HEAD
              <Button className="w-full bg-slate-700 hover:bg-slate-600">Contact Sales</Button>
=======
              <Button className="w-full bg-slate-700 hover:bg-slate-600">
                Contact Sales
              </Button>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
<<<<<<< HEAD
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Trading?</h2>
        <p className="text-xl text-slate-400 mb-8">Join thousands of traders using FinTrack's Quantum Intelligence.</p>
=======
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Trading?
        </h2>
        <p className="text-xl text-slate-400 mb-8">
          Join thousands of traders using FinTrack's Quantum Intelligence.
        </p>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
          Start Your Free Trial <ArrowRight className="ml-2" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">FinTrack</h3>
<<<<<<< HEAD
              <p className="text-slate-400">Quantum Intelligence for Crypto Trading</p>
=======
              <p className="text-slate-400">
                Quantum Intelligence for Crypto Trading
              </p>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
<<<<<<< HEAD
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
=======
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
<<<<<<< HEAD
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
=======
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
<<<<<<< HEAD
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
=======
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Compliance
                  </a>
                </li>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
<<<<<<< HEAD
            <p>&copy; 2026 FinTrack. All rights reserved. Powered by Quantum Intelligence.</p>
=======
            <p>
              &copy; 2026 FinTrack. All rights reserved. Powered by Quantum
              Intelligence.
            </p>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
