import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Github } from 'lucide-react';

const Projects = () => {
    return (
        <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-12 text-center"
            >
                Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioData.projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>

                        <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow">
                            {project.description}
                        </p>

                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-xs font-medium bg-secondary/50 px-2 py-1 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <ul className="space-y-2">
                            {project.features.slice(0, 2).map((feature, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-center">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
