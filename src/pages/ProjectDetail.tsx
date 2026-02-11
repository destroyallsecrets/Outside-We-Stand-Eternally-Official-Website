import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { projects as staticProjects } from '../data/projects';
import { Button } from '../components/ui/Button';
import { setActiveProject } from '../hooks/useActiveProject';

// Layout Imports
import { ClassicLayout } from '../components/layouts/ClassicLayout';
import { ImmersiveLayout } from '../components/layouts/ImmersiveLayout';
import { TechnicalLayout } from '../components/layouts/TechnicalLayout';
import { ModernLayout } from '../components/layouts/ModernLayout';
import { AgenticLayout } from '../components/layouts/AgenticLayout';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();

  const project = React.useMemo(() => {
    if (location.state?.project) return location.state.project;
    return staticProjects.find(p => p.id === projectId);
  }, [projectId, location.state]);

  React.useEffect(() => {
    if (project) {
      setActiveProject(project);
    }
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-primary">
        <h1 className="text-4xl font-bold mb-4 text-white uppercase tracking-tighter">Signal Lost</h1>
        <p className="text-slate-500 mb-8 font-mono text-xs uppercase tracking-widest">The requested project coordinates do not exist in the current void.</p>
        <Link to="/">
          <Button variant="neo">Return to Nexus</Button>
        </Link>
      </div>
    );
  }

  // The Dynamic Shell Logic: Fill the shell with the chosen layout liquid
  const renderLayout = () => {
    switch (project.layoutType) {
      case 'immersive':
        return <ImmersiveLayout project={project} />;
      case 'technical':
        return <TechnicalLayout project={project} />;
      case 'modern':
        return <ModernLayout project={project} />;
      case 'agentic':
        return <AgenticLayout project={project} />;
      default:
        return <ClassicLayout project={project} />;
    }
  };

  return renderLayout();
};

export default ProjectDetail;