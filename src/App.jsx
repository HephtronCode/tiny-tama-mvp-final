import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Utensils, Gamepad2, BedDouble, AlertCircle, Sparkles, Heart, Moon } from "lucide-react";
import confetti from 'canvas-confetti';
import { initDB, saveVitals, loadVitals } from './db';

const App = () => {
  const [vitals, setVitals] = useState({ hunger: 50, happiness: 50, energy: 50 });
  const [status, setStatus] = useState('normal'); // 'normal' | 'sick'
  const [lifeStage, setLifeStage] = useState('egg'); // 'egg' | 'creature'
  const [actionCount, setActionCount] = useState(0);
  const [isEvolving, setIsEvolving] = useState(false);
  const [isDbReady, setIsDbReady] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [isDreaming, setIsDreaming] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [timeMultiplier, setTimeMultiplier] = useState(1);
  
  const lastActionTime = useRef(Date.now());
  const actionHistory = useRef([]); // To track "Heart Shower" trigger (3 unique actions in 5s)

  const vitalsRef = useRef(vitals);
  const statusRef = useRef(status);
  const lifeStageRef = useRef(lifeStage);
  const actionCountRef = useRef(actionCount);

  useEffect(() => { vitalsRef.current = vitals; }, [vitals]);
  useEffect(() => { statusRef.current = status; }, [status]);
  useEffect(() => { lifeStageRef.current = lifeStage; }, [lifeStage]);
  useEffect(() => { actionCountRef.current = actionCount; }, [actionCount]);

  const TICK_RATES = { 
    hunger: 3000 / timeMultiplier, 
    happiness: 7000 / timeMultiplier, 
    energy: 10000 / timeMultiplier 
  };

  useEffect(() => {
    const startDB = async () => {
      await initDB();
      const saved = loadVitals();
      if (saved) {
        setVitals({ hunger: saved.hunger, happiness: saved.happiness, energy: saved.energy });
        setStatus(saved.status || 'normal');
        setLifeStage(saved.life_stage || 'egg');
        setActionCount(saved.action_count || 0);
      }
      setIsDbReady(true);
    };
    startDB();
  }, []);

  useEffect(() => {
    const hungerTimer = setInterval(() => setVitals(prev => ({ ...prev, hunger: Math.max(0, prev.hunger - 1) })), TICK_RATES.hunger);
    const happinessTimer = setInterval(() => setVitals(prev => ({ ...prev, happiness: Math.max(0, prev.happiness - 1) })), TICK_RATES.happiness);
    const energyTimer = setInterval(() => setVitals(prev => ({ ...prev, energy: Math.max(0, prev.energy - 1) })), TICK_RATES.energy);
    const saveTimer = setInterval(() => saveVitals(vitalsRef.current, statusRef.current, lifeStageRef.current, actionCountRef.current), 10000);

    return () => {
      clearInterval(hungerTimer); clearInterval(happinessTimer); clearInterval(energyTimer); clearInterval(saveTimer);
    };
  }, [timeMultiplier]); // Re-run when multiplier changes

  // Idle / Dreamer State (60s idle + all vitals > 80)
  useEffect(() => {
    const idleCheck = setInterval(() => {
      const now = Date.now();
      const isActuallyIdle = (now - lastActionTime.current) > (60000 / timeMultiplier);
      const areVitalsHigh = vitals.hunger > 80 && vitals.happiness > 80 && vitals.energy > 80;
      
      if (isActuallyIdle && areVitalsHigh && status === 'normal' && !isDreaming) {
        setIsDreaming(true);
      }
    }, 1000);
    return () => clearInterval(idleCheck);
  }, [vitals, status, isDreaming, timeMultiplier]);

  useEffect(() => {
    if (status === 'normal' && (vitals.hunger === 0 || vitals.happiness === 0 || vitals.energy === 0)) {
      setStatus('sick');
      setIsDreaming(false);
    }
  }, [vitals, status]);

  useEffect(() => {
    if (lifeStage === 'egg' && actionCount >= 10 && status === 'normal' && !isEvolving) {
      triggerEvolution();
    }
  }, [actionCount, status, lifeStage, isEvolving]);

  const triggerEvolution = () => {
    setIsEvolving(true);
    setTimeout(() => {
      setLifeStage('creature');
      setIsEvolving(false);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D']
      });
    }, 2000);
  };

  const handleAction = (type) => {
    if (isCooldown || isEvolving) return;
    if (status === 'sick' && type !== 'energy') return;

    lastActionTime.current = Date.now();
    setIsDreaming(false);

    // Track for Heart Shower
    const now = Date.now();
    actionHistory.current = [...actionHistory.current.filter(a => now - a.time < 5000), { type, time: now }];
    const uniqueActions = new Set(actionHistory.current.map(a => a.type));
    if (uniqueActions.size === 3) {
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 2000);
      actionHistory.current = [];
    }

    setVitals(prev => ({ ...prev, [type]: Math.min(100, prev[type] + 10) }));
    setActionCount(prev => prev + 1);

    if (status === 'sick' && type === 'energy') setStatus('normal');

    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), 500);
    saveVitals(vitalsRef.current, statusRef.current, lifeStageRef.current, actionCountRef.current);
  };

  const isSick = status === 'sick';
  const isHangry = vitals.hunger < 10 && vitals.hunger > 0;

  // Debug Helpers
  const debugFastForward = () => setTimeMultiplier(prev => prev === 1 ? 10 : 1);
  const debugSetStats = (val) => setVitals({ hunger: val, happiness: val, energy: val });
  const debugTriggerEvolution = () => {
    setLifeStage('egg');
    setActionCount(10);
  };
  const debugReset = () => {
    setVitals({ hunger: 50, happiness: 50, energy: 50 });
    setStatus('normal');
    setLifeStage('egg');
    setActionCount(0);
    saveVitals({ hunger: 50, happiness: 50, energy: 50 }, 'normal', 'egg', 0);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex flex-col items-center justify-center p-4 sm:p-6 antialiased selection:bg-blue-100 overflow-x-hidden">
      {showDebug && (
        <Card className="fixed top-2 right-2 left-2 sm:left-auto sm:top-4 sm:right-4 sm:w-64 border-2 border-yellow-400 bg-yellow-50 z-50 shadow-2xl">
          <CardHeader className="py-2 sm:py-3">
            <CardTitle className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-yellow-700">Debug Console</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 sm:space-y-2 pb-3 sm:pb-4">
            <Button variant="outline" className="w-full text-[9px] sm:text-[10px] h-7 sm:h-8 font-bold border-yellow-200 bg-white" onClick={debugFastForward}>
              Time Warp: {timeMultiplier}x
            </Button>
            <div className="grid grid-cols-2 gap-1.5">
              <Button variant="outline" className="text-[9px] sm:text-[10px] h-7 sm:h-8 font-bold border-yellow-200 bg-white" onClick={() => debugSetStats(5)}>
                Drain (5%)
              </Button>
              <Button variant="outline" className="text-[9px] sm:text-[10px] h-7 sm:h-8 font-bold border-yellow-200 bg-white" onClick={() => debugSetStats(100)}>
                Fill (100%)
              </Button>
            </div>
            <Button variant="outline" className="w-full text-[9px] sm:text-[10px] h-7 sm:h-8 font-bold border-yellow-200 bg-white" onClick={debugTriggerEvolution}>
              Trigger Hatch
            </Button>
            <Button variant="outline" className="w-full text-[9px] sm:text-[10px] h-7 sm:h-8 font-bold border-red-200 bg-white text-red-500" onClick={debugReset}>
              Full Reset
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className={`w-full max-w-[95vw] sm:max-w-md border-2 transition-all duration-700 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden ${isSick ? 'border-red-200 shadow-lg shadow-red-50' : isEvolving ? 'border-yellow-300 shadow-xl scale-[1.02] sm:scale-105' : 'border-[#E6E4D9] shadow-sm'}`}>
        <CardHeader className="relative pt-6 sm:pt-8">
          <CardTitle className="text-center text-2xl sm:text-3xl font-black text-[#4A4840] tracking-tight uppercase italic italic-none">
            Tiny <span className="text-[#FF6B6B]">Tama</span>
          </CardTitle>
          {isSick && (
            <div className="flex items-center justify-center gap-2 text-red-500 font-bold animate-pulse mt-0.5 sm:mt-1">
              <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em]">Medical Emergency</span>
            </div>
          )}
          {isDreaming && (
            <div className="flex items-center justify-center gap-2 text-blue-400 font-bold mt-0.5 sm:mt-1">
              <Moon className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-blue-400" />
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] animate-pulse">Dreaming...</span>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6 sm:space-y-8 px-6 sm:px-8 pb-8 sm:pb-10">
          {/* Pet Visual Container */}
          <div className={`h-40 sm:h-56 bg-white/50 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center border-4 border-[#F0EFE7] transition-all duration-500 relative overflow-hidden group shadow-inner ${isSick ? 'bg-red-50/30' : isEvolving ? 'bg-yellow-50/30' : isDreaming ? 'bg-blue-50/20' : ''}`}>
            {/* Heart Shower Layer */}
            {showHearts && (
              <div className="absolute inset-0 pointer-events-none z-10">
                {[...Array(6)].map((_, i) => (
                  <Heart 
                    key={i} 
                    className="absolute text-red-400 fill-red-400 animate-[heart-pop_2s_ease-out_forwards]"
                    style={{ 
                      left: `${20 + Math.random() * 60}%`, 
                      top: `${20 + Math.random() * 60}%`,
                      transform: `scale(${0.5 + Math.random()}) rotate(${Math.random() * 360}deg)`
                    }} 
                  />
                ))}
              </div>
            )}

            {/* Zzz Layer */}
            {isDreaming && (
              <div className="absolute top-10 right-16 pointer-events-none flex flex-col gap-1">
                <span className="text-blue-400 font-black text-xs animate-[zzz_3s_infinite] opacity-0" style={{ animationDelay: '0s' }}>Z</span>
                <span className="text-blue-400 font-black text-lg animate-[zzz_3s_infinite] opacity-0" style={{ animationDelay: '1s' }}>z</span>
                <span className="text-blue-400 font-black text-2xl animate-[zzz_3s_infinite] opacity-0" style={{ animationDelay: '2s' }}>z</span>
              </div>
            )}

            <div className={`text-8xl transition-all duration-500 select-none
              ${isSick ? 'animate-bounce opacity-60 grayscale rotate-12' : 'animate-bounce'} 
              ${isHangry ? 'animate-[ping_0.8s_infinite] scale-110' : ''}
              ${isEvolving ? 'animate-[shake_0.4s_infinite] scale-150' : ''}
              ${isDreaming ? 'opacity-40 -translate-y-2 scale-90' : ''}
            `}>
              {isSick ? '😵' : isDreaming ? (lifeStage === 'egg' ? '🥚' : '🦖') : isEvolving ? '🥚' : lifeStage === 'egg' ? '🥚' : '🦖'}
            </div>
            
            {isEvolving && (
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                <div className="bg-yellow-400 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg animate-bounce">
                  Hatching!
                </div>
              </div>
            )}
          </div>

          {/* Vitals Progress Bars */}
          <div className="space-y-6">
            {[
              { label: 'Hunger', key: 'hunger', icon: Utensils, color: 'bg-[#FF9F43]', subColor: 'bg-[#FF9F43]/10' },
              { label: 'Happiness', key: 'happiness', icon: Gamepad2, color: 'bg-[#FF6B6B]', subColor: 'bg-[#FF6B6B]/10' },
              { label: 'Energy', key: 'energy', icon: BedDouble, color: 'bg-[#4D96FF]', subColor: 'bg-[#4D96FF]/10' },
            ].map((stat) => (
              <div key={stat.key} className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#A8A69C]">
                    <stat.icon className={`w-4 h-4 ${vitals[stat.key] <= 10 ? 'text-red-500' : 'text-[#D1CFBF]'}`} /> 
                    {stat.label}
                  </span>
                  <span className={`text-[10px] font-black ${vitals[stat.key] <= 10 ? 'text-red-500 animate-pulse' : 'text-[#A8A69C]'}`}>
                    {vitals[stat.key]}%
                  </span>
                </div>
                <div className={`h-3 w-full rounded-full overflow-hidden ${stat.subColor} p-0.5 border border-[#F0EFE7]`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${vitals[stat.key] <= 10 ? 'bg-red-400' : stat.color} shadow-[0_0_10px_rgba(0,0,0,0.05)]`} 
                    style={{ width: `${vitals[stat.key]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { label: 'Feed', type: 'hunger', icon: Utensils, color: 'text-[#FF9F43]', border: 'hover:border-[#FF9F43]/30', bg: 'hover:bg-[#FF9F43]/5' },
              { label: 'Play', type: 'happiness', icon: Gamepad2, color: 'text-[#FF6B6B]', border: 'hover:border-[#FF6B6B]/30', bg: 'hover:bg-[#FF6B6B]/5' },
              { label: 'Rest', type: 'energy', icon: BedDouble, color: 'text-[#4D96FF]', border: 'hover:border-[#4D96FF]/30', bg: 'hover:bg-[#4D96FF]/5' },
            ].map((action) => (
              <Button 
                key={action.type}
                variant="outline" 
                disabled={isCooldown || isEvolving || (isSick && action.type !== 'energy')}
                className={`flex flex-col h-28 gap-3 rounded-[1.5rem] border-2 border-[#F0EFE7] transition-all active:scale-95 disabled:opacity-20 bg-white
                  ${action.border} ${action.bg} 
                  ${isSick && action.type === 'energy' ? 'border-[#4D96FF] bg-blue-50/50 ring-4 ring-blue-100' : 'shadow-sm'}
                `}
                onClick={() => handleAction(action.type)}
              >
                <action.icon className={`w-8 h-8 ${action.color} ${isSick && action.type === 'energy' ? 'animate-pulse' : ''}`} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#A8A69C]">
                  {isSick && action.type === 'energy' ? 'Cure' : action.label}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-full border border-[#F0EFE7] shadow-sm">
             <div className={`w-2.5 h-2.5 rounded-full ${isDbReady ? 'bg-[#6BCB77] shadow-[0_0_8px_#6BCB77]' : 'bg-[#FF6B6B]'}`}></div>
             <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A69C] font-black">SQLite OPFS</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-full border border-[#F0EFE7] shadow-sm">
             <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A69C] font-black">Growth: {actionCount}/10</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#D1CFBF] text-[10px] font-black uppercase tracking-[0.5em] mt-2">Tiny Tama MVP • 7-Day Challenge Complete</p>
          <button 
            onClick={() => setShowDebug(!showDebug)} 
            className="text-[8px] text-[#E6E4D9] hover:text-[#A8A69C] uppercase tracking-widest transition-colors font-black"
          >
            {showDebug ? '[Hide Debug]' : '[Dev Console]'}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: rotate(0deg) scale(1.5); }
          25% { transform: rotate(-8deg) scale(1.6); }
          75% { transform: rotate(8deg) scale(1.6); }
        }
        @keyframes heart-pop {
          0% { transform: scale(0) translateY(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: scale(1.5) translateY(-100px); opacity: 0; }
        }
        @keyframes zzz {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(30px, -50px); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default App;
