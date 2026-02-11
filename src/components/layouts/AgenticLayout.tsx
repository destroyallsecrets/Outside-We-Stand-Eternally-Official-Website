import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { ProjectShell } from './ProjectShell';
import { Terminal, Cpu, Network, Activity, Zap, Shield, Database, LayoutGrid } from 'lucide-react';
import { GithubEmbed } from '../ui/GithubEmbed';

// Specialized components for this layout
const SystemStatus = () => {
    const [metrics, setMetrics] = useState({ cpu: 0, ram: 0, net: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics({
                cpu: Math.floor(Math.random() * 30) + 10,
                ram: Math.floor(Math.random() * 40) + 20,
                net: Math.floor(Math.random() * 100) + 50
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-6 font-mono text-[9px] text-emerald-500/70 border border-emerald-900/30 bg-black/40 p-2 rounded items-center">
            <div className="flex items-center gap-2">
                <Cpu size={10} />
                <span>CORE::{metrics.cpu}%</span>
            </div>
            <div className="flex items-center gap-2">
                <Database size={10} />
                <span>MEM::{metrics.ram}%</span>
            </div>
            <div className="flex items-center gap-2">
                <Activity size={10} />
                <span>NET::{metrics.net}MB/s</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-2" />
            <span className="font-bold">SYSTEM_ONLINE</span>
        </div>
    );
};

export const AgenticLayout: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <ProjectShell project={project}>
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-32 font-mono selection:bg-emerald-900 selection:text-emerald-50">

                {/* Terminal Header */}
                <div className="border border-emerald-900/30 bg-black/60 backdrop-blur-md rounded-lg overflow-hidden mb-12">
                    <div className="bg-emerald-950/30 border-b border-emerald-900/30 p-2 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                        </div>
                        <div className="text-[10px] text-emerald-700 tracking-widest font-bold">AGNT_PROTOCOL_V2.1</div>
                    </div>

                    <div className="p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                            <Network size={200} className="text-emerald-500" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10"
                        >
                            <SystemStatus />

                            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mt-8 mb-6">
                                <span className="text-emerald-500 mr-4">{">_"}</span>
                                {project.title.toUpperCase()}
                            </h1>

                            <p className="text-emerald-400 text-lg md:text-xl max-w-2xl leading-relaxed opacity-90">
                                {project.description}
                            </p>

                            <div className="mt-12 flex flex-wrap gap-4">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative px-8 py-4 bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-500/50 hover:border-emerald-500 text-emerald-400 font-bold uppercase tracking-widest transition-all overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-3 group-hover:gap-6 transition-all">
                                            <Zap size={18} className="animate-pulse" />
                                            Initialize Uplink
                                        </span>
                                        <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </a>
                                )}

                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-4 border border-white/10 hover:border-white/30 text-slate-400 hover:text-white transition-all uppercase tracking-widest text-xs font-bold"
                                    >
                                        <Terminal size={14} />
                                        Source_Code
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-slate-300">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        <section>
                            <div className="flex items-center gap-2 text-emerald-500 mb-6 pb-2 border-b border-emerald-900/30">
                                <LayoutGrid size={16} />
                                <h3 className="text-sm font-bold uppercase tracking-widest">Architectural Overview</h3>
                            </div>
                            <p className="text-lg leading-relaxed font-sans text-slate-400">
                                {project.fullDescription || project.description}
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-lg">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest mb-4">
                                    <Shield size={14} /> Challenges
                                </h4>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    {project.challenges || "No telemetry data available regarding development friction."}
                                </p>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-lg">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-widest mb-4">
                                    <Zap size={14} /> Solution
                                </h4>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    {project.solution || "System resolved all constraints autonomously."}
                                </p>
                            </div>
                        </div>

                        {project.githubUrl && (
                            <GithubEmbed url={project.githubUrl} stats={project.stats} className="bg-transparent border border-emerald-900/30" variant="terminal" />
                        )}
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-emerald-950/20 border border-emerald-900/30 p-6 rounded-lg">
                            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6">Technical Stack</h3>
                            <div className="flex flex-col gap-3">
                                {project.extendedTechStack ? (
                                    project.extendedTechStack.map(tech => (
                                        <div key={tech.name} className="group relative bg-black/40 p-3 border border-emerald-900/20 hover:border-emerald-500/30 transition-colors">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs text-emerald-400 font-bold uppercase">{tech.name}</span>
                                                <div className="flex gap-0.5 opacity-50">
                                                    {[...Array(3)].map((_, i) => (
                                                        <div key={i} className="w-0.5 h-2 bg-emerald-500/40" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-emerald-300/60 leading-relaxed font-sans group-hover:text-emerald-300/90 transition-colors">
                                                {tech.description}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    project.techStack?.map(tech => (
                                        <div key={tech} className="flex justify-between items-center bg-black/20 p-2 border border-emerald-900/20">
                                            <span className="text-xs text-emerald-400/80 uppercase">{tech}</span>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-1 h-3 ${Math.random() > 0.5 ? 'bg-emerald-500/40' : 'bg-emerald-900/20'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="p-6 border-l border-emerald-900/30">
                            <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-2">Role</div>
                            <div className="text-xl font-bold text-white">{project.role}</div>
                        </div>

                        <div className="p-6 border-l border-emerald-900/30">
                            <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-2">Year</div>
                            <div className="text-xl font-bold text-white">{project.year}</div>
                        </div>
                    </div>
                </div>

            </main>
        </ProjectShell>
    );
};
