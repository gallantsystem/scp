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
  Sparkles
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-yellow-500 selection:text-black">
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
              Satoshi<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Community</span><br/>Project
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-neutral-400 font-medium max-w-xl mx-auto md:mx-0 drop-shadow-sm leading-relaxed">
              사토시밈 토큰 보유자들과 함께하는<br/>커뮤니티 주도형 생태계 확장 프로젝트
            </p>
            <a
              href="#ecosystem"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-yellow-500 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black/20"></span>
              <span className="relative flex items-center gap-2">
                생태계 앱 보기
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
          <h2 className="text-sm font-bold text-yellow-500 tracking-wide uppercase mb-3">Our Core Philosophy</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">우리의 아이디어가 모여<br/>SATOSHI의 가치를 만듭니다</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl shadow-lg border border-neutral-800 hover:border-yellow-500/50 transition-colors group">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">집단 지성</h3>
            <p className="text-neutral-400 leading-relaxed">
              커뮤니티 구성원들의 다양한 아이디어와 지혜를 모아 SATOSHI 토큰의 성공을 이끌어갑니다.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl shadow-lg border border-neutral-800 hover:border-yellow-500/50 transition-colors group">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
              <Globe size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">생태계 확장</h3>
            <p className="text-neutral-400 leading-relaxed">
              다양한 DApp과 서비스를 개발 및 지원하여 SATOSHI의 부가가치를 창출하고 커뮤니티를 확장합니다.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl shadow-lg border border-neutral-800 hover:border-yellow-500/50 transition-colors group">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">가치 상승 <span className="text-sm font-normal text-neutral-500">(Buy-back)</span></h3>
            <p className="text-neutral-400 leading-relaxed">
              앱 운영 수익의 상당 부분은 SATOSHI 토큰 매입에 사용되어 가치 상승에 직접적으로 기여합니다.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl shadow-lg border border-neutral-800 hover:border-yellow-500/50 transition-colors group">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
              <RefreshCw size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">보상의 선순환</h3>
            <p className="text-neutral-400 leading-relaxed">
              매입된 토큰은 신규 유저 유치와 앱 이용 보상으로 지급되어 생태계를 더욱 견고하게 만듭니다.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Ecosystem (Apps) Section */}
      <section id="ecosystem" className="bg-neutral-900/30 py-24 px-4 sm:px-6 lg:px-8 border-y border-neutral-800 scroll-mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-yellow-500 tracking-wide uppercase mb-3">The Ecosystem</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">현재 기획된 SATOSHI 앱</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* App 1 */}
            <div className="bg-neutral-900 rounded-2xl border-t-4 border-t-yellow-500 shadow-md hover:shadow-[0_4px_20px_rgba(234,179,8,0.15)] transition-shadow overflow-hidden flex flex-col">
              <div className="w-full aspect-video bg-neutral-950 relative group overflow-hidden border-b border-neutral-800">
                <video src="/mining_satoshi.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"></video>
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0 pointer-events-none"></div>
              </div>
              <div className="p-8 flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-neutral-800 rounded-lg text-neutral-300">
                    <Pickaxe size={24} />
                  </div>
                  <h3 className="font-bold text-2xl text-white">Mining Satoshi</h3>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  일상의 참여가 채굴이 됩니다. 다양한 미션과 활동을 통해 SATOSHI를 리워드로 받을 수 있는 앱.
                </p>
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
                  가장 빠르고 안전하게. 생태계 내 모든 자산을 직관적으로 관리할 수 있는 SATOSHI 모바일 전용 지갑.
                </p>
                <div className="mt-auto rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                  <img src="/Satoshi_Wallet.png" alt="Satoshi Wallet" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* App 3 */}
            <div className="bg-neutral-900 rounded-2xl border-t-4 border-t-yellow-500 shadow-md hover:shadow-[0_4px_20px_rgba(234,179,8,0.15)] transition-shadow overflow-hidden flex flex-col">
              <div className="w-full aspect-video bg-neutral-950 relative group overflow-hidden border-b border-neutral-800">
                <video src="/satoshi_faucet.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"></video>
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0 pointer-events-none"></div>
              </div>
              <div className="p-8 flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                    <Droplets size={24} />
                  </div>
                  <h3 className="font-bold text-2xl text-white">Faucet Satoshi</h3>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  누구나 쉽게 시작하세요. 크립토 초보자와 신규 유저 생태계 진입을 위한 무상 SATOSHI 배급소.
                </p>
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
                  웃음도 공유하고 토큰도 얻고! 유튜브, 릴스 등의 꿀잼 영상을 공유하고 평가하는 탈중앙화 커뮤니티 앱.
                </p>
                <div className="mt-auto rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                  <img src="/scrap_movie.png" alt="Scrap Funny Movie" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* App 5 */}
            <div className="bg-neutral-900 rounded-2xl border-t-4 border-t-yellow-500 shadow-md hover:shadow-[0_4px_20px_rgba(234,179,8,0.15)] transition-shadow overflow-hidden flex flex-col">
              <div className="w-full aspect-video bg-neutral-950 relative group overflow-hidden border-b border-neutral-800">
                <video src="/dating_satoshi.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"></video>
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0 pointer-events-none"></div>
              </div>
              <div className="p-8 flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-neutral-800 rounded-lg text-neutral-300">
                    <MessageCircleHeart size={24} />
                  </div>
                  <h3 className="font-bold text-2xl text-white">Dating App <span className="text-sm font-medium text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-md ml-2 border border-yellow-500/20">on MBC</span></h3>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  MBC 네트워크 기반의 안전하고 즐거운 데이팅 채팅 앱. 토큰 이코노미를 결합하여 프리미엄 기능 제공.
                </p>
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
                  <h3 className="font-bold text-2xl text-yellow-500">And Your Idea!</h3>
                </div>
                <p className="text-neutral-300 leading-relaxed font-medium">
                  6번째 앱의 주인공은 여러분입니다.<br/>
                  커뮤니티 게시판에 여러분의 반짝이는 아이디어를 남겨주세요!
                </p>
                <a href="#board" className="inline-block mt-4 text-yellow-500 font-bold hover:text-yellow-400 group-hover:translate-x-1 transition-transform">
                  아이디어 제안하러 가기 &rarr;
                </a>
              </div>
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
            <h2 className="text-3xl font-extrabold text-white mb-4">Satoshi Idea Board</h2>
            <p className="text-neutral-400 text-lg">
              여러분의 혁신적인 아이디어가 다음 SATOSHI 생태계의 주인공이 됩니다.<br/>
              GitHub 계정으로 로그인하여 자유롭게 의견을 나눠보세요!
            </p>
          </div>
          
          <div className="bg-neutral-950 rounded-xl p-6 border border-neutral-800 min-h-[300px] flex items-center justify-center relative overflow-hidden">
             {/* Note to User: Giscus Script goes directly in HTML or injected via React useEffect,
                 but since we're providing the React component, it's best to inform them. */}
            <div className="text-center z-10 p-6 bg-neutral-900 rounded-lg shadow-sm w-full max-w-lg border border-neutral-800">
                <h4 className="font-bold text-white mb-2">Giscus 게시판 연동 가이드</h4>
                <p className="text-sm text-neutral-400 mb-4">
                   GitHub Repository의 Discussions 기능을 활성화하고,<br/>
                   <a href="https://giscus.app/ko" target="_blank" rel="noreferrer" className="text-yellow-500 hover:text-yellow-400 hover:underline">Giscus 공식 홈페이지</a>에서 발급받은 스크립트를 적용하세요.
                </p>
                <code className="block bg-neutral-950 border border-neutral-800 text-green-400 text-xs p-4 rounded text-left overflow-x-auto whitespace-pre">
{`<script src="https://giscus.app/client.js"
        data-repo="[YOUR_GITHUB_ACOUNT]/[YOUR_REPO]"
        data-repo-id="[YOUR_REPO_ID]"
        data-category="Ideas"
        ...
        data-theme="dark"
        crossorigin="anonymous"
        async>
</script>`}
                </code>
            </div>
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
