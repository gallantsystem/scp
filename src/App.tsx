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
  ChevronDown,
  ExternalLink,
  Trash2,
  Lock,
  Unlock,
  MessageCircle,
  Send,
  Youtube
} from 'lucide-react';
import Giscus from '@giscus/react';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';

import { auth, db } from './firebase';
import { collection, addDoc, getDocs, onSnapshot, query, orderBy, serverTimestamp, doc, getDocFromServer, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {},
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

// At the top of the file, define the types for comments
interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string | null;
}

function AnonymousBoard({ isAdmin }: { isAdmin: boolean }) {
  const { t } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'ideas', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `ideas/${id}`);
      alert('삭제 권한이 없거나 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    // Validate connection to Firestore on boot
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    // Set up realtime listener
    const q = query(collection(db, 'ideas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          author: data.author,
          content: data.content,
          createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
        } as Comment;
      });
      setComments(fetchedComments);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'ideas');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'ideas'), {
        author: newAuthor,
        content: newContent,
        createdAt: serverTimestamp()
      });
      setNewAuthor('');
      setNewContent('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'ideas');
      alert('Failed to post idea. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col gap-4 shadow-lg">
        <input
          type="text"
          placeholder={t('board-author-placeholder') || 'Nickname'}
          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-lg px-4 py-3 placeholder:text-neutral-500 focus:outline-none focus:border-yellow-500 transition-colors"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          maxLength={20}
          required
        />
        <textarea
          placeholder={t('board-content-placeholder') || 'Leave your brilliant idea here!'}
          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-lg px-4 py-3 min-h-[120px] placeholder:text-neutral-500 focus:outline-none focus:border-yellow-500 transition-colors resize-y"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          required
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isLoading || !newAuthor.trim() || !newContent.trim()}
            className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? '...' : (t('board-submit') || 'Post Idea')}
          </button>
        </div>
      </form>

      <div className="w-full max-w-3xl flex flex-col gap-6">
        {comments.map((comment) => (
          <div key={comment.id} className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-3 pr-8">
              <span className="font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full text-sm">
                @{comment.author}
              </span>
              {isAdmin && (
                <button 
                  onClick={() => handleDelete(comment.id)} 
                  className="absolute top-4 right-4 text-neutral-500 hover:text-red-500 transition-colors p-2"
                  title="삭제"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <span className="text-xs text-neutral-500 font-medium">
                {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Just now'}
              </span>
            </div>
            <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            {t('board-empty') || 'No ideas yet. Be the first to share!'}
          </div>
        )}
      </div>
    </div>
  );
}

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
  const [adminUser, setAdminUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'gallantsystem99@gmail.com') {
        setAdminUser(user);
      } else {
        setAdminUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAdminLogin = async () => {
    if (adminUser) {
      await signOut(auth);
    } else {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error("Admin login failed", error);
      }
    }
  };

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
               <span className="text-xl font-bold ml-3 mr-4 tracking-wider text-yellow-500">SATOSHIMEME</span>
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
                  <button onClick={() => openApp('com.scp.wallet')} className="block w-full text-center px-6 py-3 bg-neutral-800 text-neutral-400 font-bold rounded-xl hover:bg-neutral-700 transition-colors border border-neutral-700">
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
                  <h3 className="font-bold text-2xl text-white">Faucet SATOSHIMEME</h3>
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
                  <button onClick={() => openApp('com.scp.funmovie')} className="block w-full text-center px-6 py-3 bg-neutral-800 text-neutral-400 font-bold rounded-xl hover:bg-neutral-700 transition-colors border border-neutral-700">
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
                  <button onClick={() => openApp('com.scp.dating')} className="block w-full text-center px-6 py-3 bg-neutral-800 text-neutral-400 font-bold rounded-xl hover:bg-neutral-700 transition-colors border border-neutral-700">
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
            <h3 className="text-[30px] font-extrabold text-white">{t('ref-title')}</h3>
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

      {/* Partners & Communities Links Section */}
      <section className="bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* MicroBitcoin */}
            <a href="https://www.microbitcoin.org" target="_blank" rel="noopener noreferrer" className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all group shadow-sm hover:shadow-[0_4px_20px_rgba(234,179,8,0.1)] flex flex-col sm:flex-row">
              <div className="sm:w-48 aspect-video sm:aspect-auto bg-neutral-950 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-neutral-800 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                <img src="/microbitcoin.png" alt="MicroBitcoin" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center relative bg-gradient-to-br from-neutral-900 to-neutral-950">
                <ExternalLink size={20} className="absolute top-6 right-6 text-neutral-600 group-hover:text-yellow-500 transition-colors" />
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">MicroBitcoin</h4>
                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">A peer-to-peer payment platform that allows everyone to make fast and secure transactions.</p>
                <div className="text-yellow-500/80 text-sm font-medium mt-auto group-hover:underline break-all">www.microbitcoin.org</div>
              </div>
            </a>

            {/* Satoshi Memes */}
            <a href="https://www.satoshimemes.com" target="_blank" rel="noopener noreferrer" className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all group shadow-sm hover:shadow-[0_4px_20px_rgba(234,179,8,0.1)] flex flex-col sm:flex-row">
              <div className="sm:w-48 aspect-video sm:aspect-auto bg-neutral-950 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-neutral-800 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                <img src="/satoshimemes.png" alt="Satoshi Memes" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center relative bg-gradient-to-br from-neutral-900 to-neutral-950">
                <ExternalLink size={20} className="absolute top-6 right-6 text-neutral-600 group-hover:text-yellow-500 transition-colors" />
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Satoshi Memes</h4>
                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">The official community platform for Satoshi Meme token holders. Join the discussion and ecosystem.</p>
                <div className="text-yellow-500/80 text-sm font-medium mt-auto group-hover:underline break-all">www.satoshimemes.com</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-24 bg-neutral-950 relative overflow-hidden border-t border-neutral-900 text-center">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-12">
            <h2 className="text-sm font-bold text-yellow-500 tracking-wide uppercase mb-3">Our Community</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 break-keep">{t('community-title')}</h3>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">{t('community-desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a href="https://open.kakao.com/o/gslkLiKb" target="_blank" rel="noreferrer" className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center gap-4 hover:border-yellow-500/50 transition-all group shadow-sm bg-gradient-to-br from-neutral-900 to-neutral-950">
              <div className="bg-[#FAE100] p-3 rounded-xl text-black group-hover:scale-110 transition-transform">
                <MessageCircle size={28} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-lg text-white">{t('community-kakao-1-title')}</h4>
                <p className="text-sm text-neutral-400">{t('community-kakao-1-desc')}</p>
              </div>
            </a>
            
            <a href="https://open.kakao.com/o/gI75m9pe" target="_blank" rel="noreferrer" className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center gap-4 hover:border-yellow-500/50 transition-all group shadow-sm bg-gradient-to-br from-neutral-900 to-neutral-950">
              <div className="bg-[#FAE100] p-3 rounded-xl text-black group-hover:scale-110 transition-transform">
                <MessageCircle size={28} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-lg text-white">{t('community-kakao-2-title')}</h4>
                <p className="text-sm text-neutral-400">{t('community-kakao-2-desc')}</p>
              </div>
            </a>

            <a href="https://open.kakao.com/o/gCLfIjCh" target="_blank" rel="noreferrer" className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center gap-4 hover:border-yellow-500/50 transition-all group shadow-sm bg-gradient-to-br from-neutral-900 to-neutral-950">
              <div className="bg-[#FAE100] p-3 rounded-xl text-black group-hover:scale-110 transition-transform">
                <MessageCircle size={28} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-lg text-white">{t('community-kakao-3-title')}</h4>
                <p className="text-sm text-neutral-400">{t('community-kakao-3-desc')}</p>
              </div>
            </a>

            <a href="https://t.me/+887Sr-VpLy4yNmZl" target="_blank" rel="noreferrer" className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center gap-4 hover:border-yellow-500/50 transition-all group shadow-sm bg-gradient-to-br from-neutral-900 to-neutral-950">
              <div className="bg-[#24A1DE] p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                <Send size={28} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-lg text-white">{t('community-telegram-title')}</h4>
                <p className="text-sm text-neutral-400">{t('community-telegram-desc')}</p>
              </div>
            </a>

            <a href="https://www.youtube.com/@MicroBitcoin" target="_blank" rel="noreferrer" className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center gap-4 hover:border-yellow-500/50 transition-all group shadow-sm bg-gradient-to-br from-neutral-900 to-neutral-950">
              <div className="bg-[#FF0000] p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                <Youtube size={28} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-lg text-white">{t('community-youtube-title')}</h4>
                <p className="text-sm text-neutral-400">{t('community-youtube-desc')}</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Community Board Section (Giscus 적용 위치) */}
      <section id="board" className="max-w-4xl mx-auto py-24 px-4 sm:px-6 scroll-mt-10">
        <div className="bg-neutral-900 px-4 py-8 sm:p-12 rounded-3xl shadow-xl border border-neutral-800">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 rounded-full text-yellow-500 mb-4">
              <MessageCircleHeart size={32} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">{t('board-title')}</h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              {t('board-desc-1')}<br/>
              {t('board-desc-2')}
            </p>
          </div>
          
          <div className="min-h-[300px] relative">
             <AnonymousBoard isAdmin={!!adminUser} />
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
          <p className="text-neutral-700 text-sm mt-2 flex justify-center items-center gap-2">
            Powered by Satoshimemes.com Community
            <button 
              onClick={handleAdminLogin} 
              className="text-neutral-800 hover:text-neutral-500 transition-colors hidden sm:inline-block ml-2"
              title={adminUser ? "관리자 로그아웃" : "관리자 로그인"}
            >
              {adminUser ? <Unlock size={14} /> : <Lock size={14} />}
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}
