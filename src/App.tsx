import {
  Lightbulb,
  Globe,
  TrendingUp,
  RefreshCw,
  Pickaxe,
  Wallet,
  Droplets,
  MessageCircleHeart,
  Film,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import Giscus from '@giscus/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'ko', name: '한국어' },
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'km', name: 'ភាសាខ្មែរ' },
  { code: 'th', name: 'ไทย' }
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-neutral-900/80 hover:bg-neutral-800 text-white px-4 py-2 rounded-full border border-neutral-700/50 backdrop-blur-sm transition-all"
        >
          <Globe size={16} className="text-yellow-500" />
          <span className="text-sm font-medium">{currentLang.name}</span>
          <ChevronDown size={14} className={`text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl overflow-hidden backdrop-blur-md">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-neutral-800 ${
                  i18n.language === lang.code ? 'text-yellow-500 font-bold bg-neutral-800/50' : 'text-neutral-300'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();

  const openApp = (packageName: string) => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
      alert(t('alert-mobile-only'));
      return;
    }

    const start = Date.now();
    window.location.href = `intent://#Intent;scheme=https;package=${packageName};end`;
    
    setTimeout(() => {
      if (Date.now() - start < 2000) {
        alert(t('alert-app-not-found'));
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-yellow-500 selection:text-black">
      <LanguageSwitcher />
      {/* Header / Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-red-950 via-neutral-900 to-neutral-950 text-white py-24 md:py-32 px-4 shadow-inner">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="inline-flex items-center justify-center p-2 bg-yellow-500/10 rounded-2xl mb-8 backdrop-blur-sm border border-yellow-500/20 shadow-xl">
               <img src="/satoshi-icon.png" alt="logo" className="h-10 w-10 object-contain drop-shadow-md rounded-xl" onError={(e) => e.currentTarget.style.display = 'none'} />
               <span className="text-xl font-bold ml-3 mr-4 tracking-wider text-yellow-500">SATOSHI</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md leading-tight text-white">
              {t('hero-title-1')}<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">{t('hero-title-2')}</span><br/>{t('hero-title-3')}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-neutral-400 font-medium max-w-xl mx-auto md:mx-0 drop-shadow-sm leading-relaxed">
              {t('hero-desc-1')}<br/>{t('hero-desc-2')}
            </p>
            <a
              href="#ecosystem"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-yellow-500 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black/20"></span>
              <span className="relative flex items-center gap-2">
                {t('hero-btn-apps')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </a>
          </div>
          {/* Hero Image */}
          <div className="flex-1 w-full max-w-md md:max-w-lg lg:max-w-xl relative">
             <div className="absolute inset-0 bg-yellow-500 rounded-full blur-[100px] opacity-20 mix-blend-screen"></div>
             <img src="/SD_SATOSHI.png" alt="Satoshi Hero" className="relative z-10 w-full h-auto drop-shadow-2xl transform transition-transform duration-700 hover:scale-105 rounded-3xl" />
          </div>
        </div>
      </header>

      {/* Mission Section */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-gradient-to-l from-red-950/30 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-yellow-500 tracking-wide uppercase mb-3">{t('philosophy-label')}</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">{t('philosophy-title-1')}<br/>{t('philosophy-title-2')}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl shadow-lg border border-neutral-800 hover:border-yellow-500/50 transition-colors group">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">{t('phil-1-title')}</h3>
            <p className="text-neutral-400 leading-relaxed">
              {t('phil-1-desc')}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl shadow-lg border border-neutral-800 hover:border-yellow-500/50 transition-colors group">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
              <Globe size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">{t('phil-2-title')}</h3>
            <p className="text-neutral-400 leading-relaxed">
              {t('phil-2-desc')}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl shadow-lg border border-neutral-800 hover:border-yellow-500/50 transition-colors group">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">{t('phil-3-title')} <span className="text-sm font-normal text-neutral-500">(Buy-back)</span></h3>
            <p className="text-neutral-400 leading-relaxed">
              {t('phil-3-desc')}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl shadow-lg border border-neutral-800 hover:border-yellow-500/50 transition-colors group">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
              <RefreshCw size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">{t('phil-4-title')}</h3>
            <p className="text-neutral-400 leading-relaxed">
              {t('phil-4-desc')}
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Ecosystem (Apps) Section */}
      <section id="ecosystem" className="bg-neutral-900/30 py-24 px-4 sm:px-6 lg:px-8 border-y border-neutral-800 scroll-mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-yellow-500 tracking-wide uppercase mb-3">{t('app-label')}</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">{t('app-title')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* App 1 */}
            <div className="bg-neutral-900 rounded-2xl border-t-4 border-t-yellow-500 shadow-md hover:shadow-[0_4px_20px_rgba(234,179,8,0.15)] transition-shadow overflow-hidden flex flex-col">
              <div className="w-full aspect-video bg-neutral-950 relative group overflow-hidden border-b border-neutral-800">
                <video src="/mining_satoshi.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"></video>
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0 pointer-events-none"></div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-neutral-800 rounded-lg text-neutral-300">
                    <Pickaxe size={24} />
                  </div>
                  <h3 className="font-bold text-2xl text-white">Mining Satoshi</h3>
                </div>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  {t('app-mining-desc')}
                </p>
                <div className="mt-auto">
                  <a href="https://www.miningsatoshi.com" target="_blank" rel="noopener noreferrer" className="block w-full text-center px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">
                    {t('btn-visit-site')}
                  </a>
                </div>
              </div>
            </div>

            {/* App 2 */}
            <div className="bg-neutral-900 rounded-2xl border-t-4 border-t-yellow-500 shadow-md hover:shadow-[0_4px_20px_rgba(234,179,8,0.15)] transition-shadow overflow-hidden flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-neutral-800 rounded-lg text-neutral-300">
                    <Wallet size={24} />
                  </div>
                  <h3 className="font-bold text-2xl text-white">Satoshi Wallet</h3>
                </div>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  {t('app-wallet-desc')}
                </p>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                    <img src="/Satoshi_Wallet.png" alt="Satoshi Wallet" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" />
                  </div>
                  <button onClick={() => openApp('com.scp.wallet')} className="block w-full text-center px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">
                    {t('btn-run-app')}
                  </button>
                </div>
              </div>
            </div>

            {/* App 3 */}
            <div className="bg-neutral-900 rounded-2xl border-t-4 border-t-yellow-500 shadow-md hover:shadow-[0_4px_20px_rgba(234,179,8,0.15)] transition-shadow overflow-hidden flex flex-col">
              <div className="w-full aspect-video bg-neutral-950 relative group overflow-hidden border-b border-neutral-800">
                <video src="/satoshi_faucet.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"></video>
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0 pointer-events-none"></div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                    <Droplets size={24} />
                  </div>
                  <h3 className="font-bold text-2xl text-white">Faucet Satoshi</h3>
                </div>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  {t('app-faucet-desc')}
                </p>
                <div className="mt-auto">
                  <a href="https://faucet.miningsatoshi.com" target="_blank" rel="noopener noreferrer" className="block w-full text-center px-6 py-3 bg-neutral-800 text-neutral-400 font-bold rounded-xl hover:bg-neutral-700 transition-colors border border-neutral-700">
                    {t('btn-visit-preparing')}
                  </a>
                </div>
              </div>
            </div>

            {/* App 4 */}
            <div className="bg-neutral-900 rounded-2xl border-t-4 border-t-yellow-500 shadow-md hover:shadow-[0_4px_20px_rgba(234,179,8,0.15)] transition-shadow overflow-hidden flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-neutral-800 rounded-lg text-neutral-300">
                    <Film size={24} />
                  </div>
                  <h3 className="font-bold text-2xl text-white">Scrap Funny Movie</h3>
                </div>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  {t('app-funmovie-desc')}
                </p>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                    <img src="/scrap_movie.png" alt="Scrap Funny Movie" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" />
                  </div>
                  <button onClick={() => openApp('com.scp.funmovie')} className="block w-full text-center px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">
                    {t('btn-run-app')}
                  </button>
                </div>
              </div>
            </div>

            {/* App 5 */}
            <div className="bg-neutral-900 rounded-2xl border-t-4 border-t-yellow-500 shadow-md hover:shadow-[0_4px_20px_rgba(234,179,8,0.15)] transition-shadow overflow-hidden flex flex-col">
              <div className="w-full aspect-video bg-neutral-950 relative group overflow-hidden border-b border-neutral-800">
                <video src="/dating_satoshi.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"></video>
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0 pointer-events-none"></div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-neutral-800 rounded-lg text-neutral-300">
                    <MessageCircleHeart size={24} />
                  </div>
                  <h3 className="font-bold text-2xl text-white">Dating App</h3>
                </div>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  {t('app-dating-desc')}
                </p>
                <div className="mt-auto">
                  <button onClick={() => openApp('com.scp.dating')} className="block w-full text-center px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">
                    {t('btn-run-app')}
                  </button>
                </div>
              </div>
            </div>

            {/* App 6 (Idea) */}
            <div className="bg-neutral-900 rounded-2xl border-2 border-dashed border-yellow-500/50 shadow-sm hover:shadow-[0_4px_20px_rgba(234,179,8,0.2)] hover:border-yellow-500 transition-all overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-yellow-500 group-hover:opacity-10 transition-opacity">
                <Sparkles size={100} />
              </div>
              <div className="p-8 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
                    <Lightbulb size={24} />
                  </div>
                  <h3 className="font-bold text-2xl text-yellow-500">{t('app-idea-title')}</h3>
                </div>
                <p className="text-neutral-300 leading-relaxed font-medium">
                  {t('app-idea-desc-1')}<br/>
                  {t('app-idea-desc-2')}
                </p>
                <a href="#board" className="inline-block mt-4 text-yellow-500 font-bold hover:text-yellow-400 group-hover:translate-x-1 transition-transform">
                  {t('app-idea-btn')} &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral System Section */}
      <section className="bg-gradient-to-b from-neutral-950 to-neutral-900 py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-yellow-500 tracking-wide uppercase mb-3">{t('ref-label')}</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">{t('ref-title')}</h3>
            <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
              {t('ref-desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500 text-2xl font-bold border border-neutral-800">1</div>
              <h4 className="text-xl font-bold text-white mb-3">{t('ref-step1-title')}</h4>
              <p className="text-neutral-400 text-sm">
                {t('ref-step1-desc-1')} <span className="text-yellow-500 font-bold">{t('ref-step1-desc-2')}</span>{t('ref-step1-desc-3')}
              </p>
            </div>
            
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-400 text-2xl font-bold border border-neutral-800">2</div>
              <h4 className="text-xl font-bold text-white mb-3">{t('ref-step2-title')}</h4>
              <p className="text-neutral-400 text-sm">
                {t('ref-step2-desc-1')} <span className="text-yellow-400 font-bold">{t('ref-step2-desc-2')}</span>{t('ref-step2-desc-3')}
              </p>
            </div>
            
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-300 text-2xl font-bold border border-neutral-800">3</div>
              <h4 className="text-xl font-bold text-white mb-3">{t('ref-step3-title')}</h4>
              <p className="text-neutral-400 text-sm">
                {t('ref-step3-desc-1')} <span className="text-yellow-300 font-bold">{t('ref-step3-desc-2')}</span>{t('ref-step3-desc-3')}
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-white mb-4">{t('ref-benefit-title')}</h4>
              <p className="text-neutral-400 leading-relaxed mb-4">
                <strong>{t('ref-benefit-desc-1')}</strong> {t('ref-benefit-desc-2')} <strong>{t('ref-benefit-desc-3')}</strong>{t('ref-benefit-desc-4')}
              </p>
              <ul className="text-neutral-300 space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> {t('ref-benefit-list-1')}</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> {t('ref-benefit-list-2')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Board Section (Giscus 적용 위치) */}
      <section id="board" className="max-w-4xl mx-auto py-24 px-4 sm:px-6 scroll-mt-10">
        <div className="bg-neutral-900 p-8 md:p-12 rounded-3xl shadow-xl border border-neutral-800">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 rounded-full text-yellow-500 mb-4">
              <MessageCircleHeart size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-4">{t('board-title')}</h2>
            <p className="text-neutral-400 text-lg">
              {t('board-desc-1')}<br/>
              {t('board-desc-2')}
            </p>
          </div>
          
          <div className="bg-neutral-950 rounded-xl p-6 border border-neutral-800 min-h-[300px] relative overflow-hidden">
             <Giscus
                id="comments"
                repo="gallantsystem/scp"
                repoId="R_kgDOSTN6fg"
                category="Ideas"
                categoryId="DIC_kwDOSTN6fs4C8Qpx"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme="purple_dark"
                lang="ko"
              />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 text-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 tracking-widest">SATOSHI</h2>
          <p className="text-neutral-500 mb-6">Community Project</p>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-neutral-600">&copy; {new Date().getFullYear()} Satoshi Community Project. All rights reserved.</p>
          <p className="text-neutral-700 text-sm mt-2">Powered by Satoshimemes.com Community</p>
        </div>
      </footer>
    </div>
  );
}
