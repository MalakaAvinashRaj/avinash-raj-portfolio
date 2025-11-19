import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const Experience = () => {
    return (
        <section id="experience" className="py-20 px-4 max-w-4xl mx-auto bg-secondary/30 rounded-3xl my-20">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-12 text-center"
            >
                Experience
            </motion.h2>

            <div className="space-y-12">
                {portfolioData.experience.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative pl-8 border-l-2 border-border"
                    >
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-background border-2 border-primary rounded-full" />

                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="text-xl font-semibold">{exp.role}</h3>
                            <span className="text-sm text-muted-foreground font-medium bg-secondary px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                                {exp.period}
                            </span>
                        </div>

                        <h4 className="text-lg text-primary mb-4">{exp.company}</h4>

                        <p className="text-muted-foreground mb-4">
                            {exp.description}
                        </p>

                        <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start">
                                    <span className="mr-2 mt-1.5 w-1 h-1 bg-foreground rounded-full shrink-0" />
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
