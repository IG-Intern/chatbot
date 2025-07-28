import React from 'react';
import { Link } from 'react-router';

function BlogPost({ post, isPreview = true }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getGradientClass = (index, tag) => {
    const gradients = [
      'from-pink-500 to-violet-600',
      'from-blue-500 to-cyan-600', 
      'from-green-500 to-emerald-600',
      'from-yellow-500 to-orange-600',
      'from-purple-500 to-pink-600',
      'from-indigo-500 to-blue-600'
    ];
    return gradients[tag?.charCodeAt(0) % gradients.length] || gradients[0];
  };

  if (!isPreview) {
    // Full post view
    const renderContent = (content) => {
      return content
        .split('\n')
        .map((line, index) => {
          // Headers
          if (line.startsWith('### ')) {
            return `<h3 key="${index}" class="text-2xl font-bold mt-10 mb-6 text-white text-shadow">${line.slice(4)}</h3>`;
          }
          if (line.startsWith('## ')) {
            return `<h2 key="${index}" class="text-3xl font-bold mt-12 mb-6 text-white text-shadow">${line.slice(3)}</h2>`;
          }
          if (line.startsWith('# ')) {
            return `<h1 key="${index}" class="text-4xl font-bold mt-8 mb-8 text-white text-shadow">${line.slice(2)}</h1>`;
          }
          
          // Blockquotes
          if (line.startsWith('> ')) {
            return `<blockquote key="${index}" class="border-l-4 border-white/30 pl-6 my-6 italic text-white/90 bg-white/5 p-4 rounded-r-lg backdrop-blur-sm">${line.slice(2)}</blockquote>`;
          }
          
          // Lists
          if (line.startsWith('- ')) {
            return `<li key="${index}" class="ml-6 mb-3 text-white/90 pl-2">${line.slice(2)}</li>`;
          }
          if (line.match(/^\d+\. /)) {
            return `<li key="${index}" class="ml-6 mb-3 text-white/90 pl-2">${line.replace(/^\d+\. /, '')}</li>`;
          }
          
          // Code blocks
          if (line.includes('```')) {
            return line === '```' ? '' : `<pre key="${index}" class="bg-black/40 p-6 rounded-xl overflow-x-auto my-6 border border-white/10 backdrop-blur-sm"><code class="text-green-300">${line.replace(/```\w*/, '')}</code></pre>`;
          }
          
          // Inline code
          if (line.includes('`')) {
            const codeFormatted = line.replace(/`([^`]+)`/g, '<code class="bg-black/30 px-3 py-1 rounded-lg text-green-300 border border-white/10">$1</code>');
            return line.trim() === '' ? '<br key="' + index + '" />' : `<p key="${index}" class="mb-6 text-white/90 leading-relaxed text-lg">${codeFormatted}</p>`;
          }
          
          // Regular paragraphs
          return line.trim() === '' ? '<br key="' + index + '" />' : `<p key="${index}" class="mb-6 text-white/90 leading-relaxed text-lg">${line}</p>`;
        })
        .join('');
    };

    return (
      <article className="max-w-none">
        <header className="mb-12 text-center border-b border-white/20 pb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight neon-text">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 mb-8 text-lg">
            <span className="flex items-center gap-3 glassmorphism px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author}
            </span>
            <span className="flex items-center gap-3 glassmorphism px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-3 glassmorphism px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {post.tags.map((tag, index) => (
              <span 
                key={tag} 
                className={`px-4 py-2 bg-gradient-to-r ${getGradientClass(index, tag)} text-white rounded-full text-sm font-medium hover-scale`}
              >
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>
        </header>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />
      </article>
    );
  }

  // Preview view for homepage
  return (
    <article className="glassmorphism rounded-2xl overflow-hidden hover-scale transition-all duration-500 border border-white/20">
      <div className="p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-6 text-sm text-white/70 mb-6">
          <span className="flex items-center gap-2 glassmorphism-dark px-3 py-1 rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {post.author}
          </span>
          <span className="glassmorphism-dark px-3 py-1 rounded-full">{formatDate(post.date)}</span>
          <span className="glassmorphism-dark px-3 py-1 rounded-full">{post.readTime}</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight hover:text-white/90 transition-colors">
          <Link to={`/post/${post.slug}`} className="text-decoration-none">
            {post.title}
          </Link>
        </h2>
        
        <p className="text-white/80 mb-8 leading-relaxed text-lg">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={tag} 
                className={`px-3 py-1 bg-gradient-to-r ${getGradientClass(index, tag)} text-white rounded-full text-xs font-medium`}
              >
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>
          
          <Link 
            to={`/post/${post.slug}`}
            className="text-white font-semibold hover:text-white/80 transition-all duration-300 flex items-center gap-2 text-lg glassmorphism-dark px-4 py-2 rounded-full hover-glow"
          >
            Read more
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

window.BlogPost = BlogPost;