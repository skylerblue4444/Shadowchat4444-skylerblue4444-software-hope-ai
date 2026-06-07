import React from 'react';
import { MasterCommandCenter } from '../components/MasterCommandCenter';
import { LegalFooter } from '../components/LegalFooter';

export default function StartupLaunchPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold text-gold-500 tracking-tight">SKYCOIN4444 STARTUP LAUNCH</h1>
          <p className="mt-4 text-xl text-zinc-400">Powered by Spillers Innovative IT Resolutions LLC</p>
        </header>
        
        <main>
          <MasterCommandCenter />
        </main>
        
        <LegalFooter />
      </div>
    </div>
  );
}
