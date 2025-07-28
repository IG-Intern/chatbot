import React, { useState, useEffect } from 'react';

function Home() {
  const BlogPost = window.BlogPost;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/data/posts.json');
        const data = await response.json();
        setPosts(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      const particlesContainer = document.querySelector('.particles');
      if (particlesContainer) {
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
          particle.remove();
        }, 25000);
      }
    };

    const particleInterval = setInterval(createParticle, 200);

    return () => clearInterval(particleInterval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center relative overflow-hidden">
        <div className="particles"></div>
        <div className="text-center z-10">
          <div className="pulse-glow glassmorphism rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg font-medium">Loading the magic...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      <div className="particles"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-20 floating blur-xl"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full opacity-20 floating-delayed blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full opacity-20 floating-delayed-2 blur-xl"></div>

      {/* Header */}
      <header className="relative z-10 pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="glassmorphism rounded-2xl p-6 pulse-glow">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7zm1-11h-2v6h2V8zm0-2h-2v2h2V6z"/>
                </svg>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 slide-up">
              <span className="neon-text">Cool</span>Blog
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed slide-up-delayed font-light">
              Where ideas come alive with style, creativity, and cutting-edge insights ✨
            </p>
            
            {/* Animated stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 slide-up-delayed-2">
              <div className="glassmorphism rounded-xl px-6 py-4 hover-glow">
                <div className="text-2xl font-bold text-white">{posts.length}+</div>
                <div className="text-white/80 text-sm">Articles</div>
              </div>
              <div className="glassmorphism rounded-xl px-6 py-4 hover-glow">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-white/80 text-sm">Readers</div>
              </div>
              <div className="glassmorphism rounded-xl px-6 py-4 hover-glow">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-white/80 text-sm">Creativity</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="glassmorphism rounded-2xl p-12 mx-auto max-w-md hover-scale">
              <svg className="w-16 h-16 text-white mx-auto mb-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-4">No posts yet</h2>
              <p className="text-white/80">The next amazing article is coming soon! ⚡</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:gap-12">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className="zoom-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogPost post={post} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="glassmorphism rounded-2xl p-8">
            <div className="text-center">
              <p className="text-white/90 text-lg mb-6 font-medium">
                Made with ❤️ and a lot of ☕
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-white/80">
                <a href="#" className="hover:text-white transition-colors hover-scale flex items-center gap-2">
                  <span>About</span>
                </a>
                <a href="#" className="hover:text-white transition-colors hover-scale flex items-center gap-2">
                  <span>Contact</span>
                </a>
                <a href="#" className="hover:text-white transition-colors hover-scale flex items-center gap-2">
                  <span>RSS Feed</span>
                </a>
                <a href="#" className="hover:text-white transition-colors hover-scale flex items-center gap-2">
                  <span>Newsletter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

window.Home = Home;