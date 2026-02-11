import React, { useState, useEffect } from 'react';
import { Terminal, Star, GitFork, AlertCircle, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from './Button';

interface GithubEmbedProps {
  url?: string;
  className?: string;
  stats?: {
    stars: number;
    forks: number;
    issues: number;
  };
  variant?: 'glass' | 'terminal';
}

export const GithubEmbed: React.FC<GithubEmbedProps> = ({ url, className = '', stats, variant = 'glass' }) => {
  const [readme, setReadme] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchReadme = async () => {
      setIsLoading(true);
      try {
        const rawUrl = url
          .replace('github.com', 'raw.githubusercontent.com')
          .concat('/main/README.md');

        const response = await fetch(rawUrl);
        if (!response.ok) {
          const altUrl = rawUrl.replace('/main/', '/master/');
          const altResponse = await fetch(altUrl);
          if (!altResponse.ok) throw new Error('README not found');
          const data = await altResponse.text();
          setReadme(data);
        } else {
          const data = await response.text();
          setReadme(data);
        }
        setError(false);
      } catch (e) {
        console.error('Mirror error:', e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadme();
  }, [url]);

  if (!url) return null;

  const containerStyles = variant === 'terminal'
    ? "border border-emerald-900/30 bg-black/80 rounded-lg font-mono"
    : "border border-white/10 liquid-glass rounded-xl";

  const headerStyles = variant === 'terminal'
    ? "bg-emerald-950/20 border-b border-emerald-900/30 text-emerald-500"
    : "bg-white/[0.02] border-b border-white/5 text-slate-500";

  return (
    <div className={`relative w-full h-full min-h-[500px] overflow-hidden group flex flex-col ${containerStyles} ${className}`}>

      {/* Dynamic Stats Header (Minimal) */}
      <div className={`px-6 py-3 flex justify-between items-center ${headerStyles}`}>
        <div className="flex gap-6">
          {stats && (
            <>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <Star size={12} className="text-accent" /> {stats.stars}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <GitFork size={12} className="text-slate-600" /> {stats.forks}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <AlertCircle size={12} className="text-slate-600" /> {stats.issues}
              </div>
            </>
          )}
        </div>
        <a href={url} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-accent hover:underline flex items-center gap-1 uppercase tracking-widest">
          Repository <ExternalLink size={10} />
        </a>
      </div>

      {/* Terminal Content Window */}
      <div className="flex-1 overflow-y-auto p-8 font-sans custom-markdown no-scrollbar relative">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/20 backdrop-blur-sm">
            <div className="w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-mono text-accent uppercase tracking-[0.5em] animate-pulse">Decrypting_Data_Stream...</p>
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-12">
            <Terminal size={48} className={variant === 'terminal' ? "text-emerald-500/20" : "text-red-500/20"} />
            <h4 className={`font-bold uppercase tracking-widest ${variant === 'terminal' ? 'text-emerald-500' : 'text-white'}`}>Mirror_Handshake_Failed</h4>
            <p className="text-slate-500 text-xs font-mono max-w-xs">
              Direct registry framing restricted. Initialize manual source exploration via the Source_Explorer protocol.
            </p>
            <a href={url} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm">Manual_Override</Button>
            </a>
          </div>
        ) : (
          <div className="max-w-none animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4 uppercase tracking-tighter" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-accent mt-12 mb-4 uppercase tracking-tight flex items-center gap-2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-white mt-8 mb-4" {...props} />,
                p: ({ node, ...props }) => <p className="text-slate-400 leading-relaxed mb-6 font-light" {...props} />,
                code: ({ node, inline, ...props }: any) =>
                  inline ?
                    <code className="bg-white/10 px-1.5 py-0.5 rounded text-accent font-mono text-xs" {...props} /> :
                    <div className="bg-black/60 p-6 rounded-lg border border-white/5 my-8 font-mono text-xs text-slate-300 overflow-x-auto" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-3 mb-8 text-slate-400 font-light" {...props} />,
                li: ({ node, ...props }) => <li className="marker:text-accent" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-accent/30 pl-6 italic text-slate-500 my-8" {...props} />
              }}
            >
              {readme}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};