import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';

function PostPage() {
  const BlogPost = window.BlogPost;
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('/data/posts.json');
        const posts = await response.json();
        const foundPost = posts.find(p => p.slug === slug);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Error loading post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 3 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 8 + 12) + 's';
      
      const particlesContainer = document.querySelector('.particles');
      if (particlesContainer) {
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
          particle.remove();
        }, 25000);
      }
    };

    const particleInterval = setInterval(createParticle, 300);

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
          <p className="text-white text-lg font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center relative overflow-hidden">
        <div className="particles"></div>
        <div className="text-center z-10">
          <div className="glassmorphism rounded-2xl p-12 max-w-md mx-auto hover-scale">
            <svg className="w-16 h-16 text-white/80 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-white/80 mb-8 text-lg">This article seems to have vanished into the digital void! ✨</p>
            <Link 
              to="/"
              className="inline-flex items-center gap-3 px-6 py-3 glassmorphism-dark text-white rounded-xl hover-glow transition-all duration-300 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      <div className="particles"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-20 floating blur-xl"></div>
      <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full opacity-20 floating-delayed blur-xl"></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full opacity-20 floating-delayed-2 blur-xl"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/"
            className="inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors font-medium text-lg glassmorphism px-4 py-2 rounded-xl hover-glow"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glassmorphism rounded-3xl border border-white/20 p-8 md:p-16 zoom-in">
          <BlogPost post={post} isPreview={false} />
        </div>

        {/* Navigation suggestions */}
        <div className="mt-16 text-center">
          <div className="glassmorphism rounded-2xl p-8 hover-scale">
            <h3 className="text-2xl font-bold text-white mb-6">Love this article? ❤️</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 font-medium glassmorphism-dark px-6 py-3 rounded-xl hover-glow"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Read more posts
              </Link>
              <button className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 font-medium glassmorphism-dark px-6 py-3 rounded-xl hover-glow">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share this
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="glassmorphism rounded-2xl p-8 text-center">
            <p className="text-white/90 text-lg mb-4 font-medium">
              Thanks for reading! ✨
            </p>
            <p className="text-white/70">
              Made with passion and a touch of digital magic
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

window.PostPage = PostPage;