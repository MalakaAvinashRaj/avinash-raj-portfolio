import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { Github, Plus, Trash2, X } from 'lucide-react';
import Editable from './Editable';

const Projects = () => {
    const { data, updateField } = usePortfolio();
    const { isLoggedIn } = useAuth();

    const addProject = async () => {
        const newProject = {
            title: "New Project",
            description: "Project description goes here...",
            features: ["Feature 1", "Feature 2"],
            tech: ["React"],
            github: "https://github.com/MalakaAvinashRaj"
        };
        const updatedProjects = [...data.projects, newProject];
        await updateField('projects', updatedProjects);
    };

    const removeProject = async (index: number) => {
        if (!window.confirm('Are you sure you want to remove this project?')) return;
        const updatedProjects = data.projects.filter((_, i) => i !== index);
        await updateField('projects', updatedProjects);
    };

    return (
        <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-bold flex-1 text-center"
                >
                    Featured Projects
                </motion.h2>
                {isLoggedIn && (
                    <button
                        onClick={addProject}
                        className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all shadow-lg flex items-center gap-2 px-4 ml-4"
                    >
                        <Plus size={20} />
                        <span className="text-sm font-medium hidden md:inline">Add Project</span>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col relative"
                    >
                        {isLoggedIn && (
                            <button
                                onClick={() => removeProject(index)}
                                className="absolute top-2 right-2 p-1.5 bg-destructive/10 text-destructive rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground z-10"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors flex-grow">
                                <Editable
                                    path={`projects.${index}.title`}
                                    value={project.title}
                                    className="text-xl font-semibold"
                                />
                            </h3>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors ml-2"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>

                        <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow">
                            <Editable
                                path={`projects.${index}.description`}
                                value={project.description}
                                type="textarea"
                                className="text-sm"
                            />
                        </p>

                        <div className="mb-6 text-left">
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <div key={i} className="group/tech relative">
                                        <span className="text-xs font-medium bg-secondary/50 px-2 py-1 rounded inline-block">
                                            {t}
                                        </span>
                                        {isLoggedIn && (
                                            <button
                                                onClick={() => {
                                                    const newTech = [...project.tech];
                                                    newTech.splice(i, 1);
                                                    updateField(`projects.${index}.tech`, newTech);
                                                }}
                                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover/tech:opacity-100 transition-opacity z-20"
                                            >
                                                <X size={10} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {isLoggedIn && (
                                    <button
                                        onClick={() => {
                                            const newTech = prompt("Enter new technology:");
                                            if (newTech) {
                                                updateField(`projects.${index}.tech`, [...project.tech, newTech]);
                                            }
                                        }}
                                        className="text-xs font-medium border border-dashed border-primary/30 px-2 py-1 rounded hover:bg-primary/5 transition-all flex items-center gap-1"
                                    >
                                        <Plus size={12} /> Add
                                    </button>
                                )}
                            </div>
                        </div>

                        <ul className="space-y-2">
                            {project.features.map((feature, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-start group/feature relative">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 shrink-0 mt-1" />
                                    <div className="flex-grow">
                                        <Editable
                                            path={`projects.${index}.features.${i}`}
                                            value={feature}
                                            className="text-xs"
                                        />
                                    </div>
                                    {isLoggedIn && (
                                        <button
                                            onClick={() => {
                                                const newFeatures = [...project.features];
                                                newFeatures.splice(i, 1);
                                                updateField(`projects.${index}.features`, newFeatures);
                                            }}
                                            className="ml-2 text-destructive opacity-0 group-hover/feature:opacity-100 transition-opacity"
                                        >
                                            <X size={10} />
                                        </button>
                                    )}
                                </li>
                            ))}
                            {isLoggedIn && (
                                <button
                                    onClick={() => {
                                        updateField(`projects.${index}.features`, [...project.features, "New feature..."]);
                                    }}
                                    className="text-xs text-primary hover:underline flex items-center gap-1 mt-2"
                                >
                                    <Plus size={12} /> Add Feature
                                </button>
                            )}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
