import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, X } from 'lucide-react';
import Editable from './Editable';

const Experience = () => {
    const { data, updateField } = usePortfolio();
    const { isLoggedIn } = useAuth();

    const addExperience = async () => {
        const newExp = {
            company: "New Company",
            role: "Software Engineer",
            period: "2024 – Present",
            description: "Built and optimized applications...",
            achievements: ["Achievement 1", "Achievement 2"]
        };
        const updatedExp = [...data.experience, newExp];
        await updateField('experience', updatedExp);
    };

    const removeExperience = async (index: number) => {
        if (!window.confirm('Are you sure you want to remove this experience entry?')) return;
        const updatedExp = data.experience.filter((_, i) => i !== index);
        await updateField('experience', updatedExp);
    };

    return (
        <section id="experience" className="py-20 px-4 max-w-4xl mx-auto bg-secondary/30 rounded-3xl my-20">
            <div className="flex justify-between items-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-bold flex-1 text-center"
                >
                    Experience
                </motion.h2>
                {isLoggedIn && (
                    <button
                        onClick={addExperience}
                        className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all shadow-lg flex items-center gap-2 px-4 ml-4"
                    >
                        <Plus size={20} />
                        <span className="text-sm font-medium hidden md:inline">Add Experience</span>
                    </button>
                )}
            </div>

            <div className="space-y-12">
                {data.experience.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative pl-8 border-l-2 border-border group"
                    >
                        {isLoggedIn && (
                            <button
                                onClick={() => removeExperience(index)}
                                className="absolute top-0 right-0 p-1.5 bg-destructive/10 text-destructive rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground z-10"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-background border-2 border-primary rounded-full" />

                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="text-xl font-semibold">
                                <Editable
                                    path={`experience.${index}.role`}
                                    value={exp.role}
                                    className="text-xl font-semibold"
                                />
                            </h3>
                            <span className="text-sm text-muted-foreground font-medium bg-secondary px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                                <Editable
                                    path={`experience.${index}.period`}
                                    value={exp.period}
                                    className="text-sm"
                                />
                            </span>
                        </div>

                        <h4 className="text-lg text-primary mb-4">
                            <Editable
                                path={`experience.${index}.company`}
                                value={exp.company}
                                className="text-lg"
                            />
                        </h4>

                        <p className="text-muted-foreground mb-4">
                            <Editable
                                path={`experience.${index}.description`}
                                value={exp.description}
                                type="textarea"
                                className="text-muted-foreground"
                            />
                        </p>

                        <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start group/achievement relative">
                                    <span className="mr-2 mt-1.5 w-1 h-1 bg-foreground rounded-full shrink-0" />
                                    <div className="flex-grow">
                                        <Editable
                                            path={`experience.${index}.achievements.${i}`}
                                            value={achievement}
                                            className="text-sm"
                                        />
                                    </div>
                                    {isLoggedIn && (
                                        <button
                                            onClick={() => {
                                                const newAchievements = [...exp.achievements];
                                                newAchievements.splice(i, 1);
                                                updateField(`experience.${index}.achievements`, newAchievements);
                                            }}
                                            className="ml-2 text-destructive opacity-0 group-hover/achievement:opacity-100 transition-opacity"
                                        >
                                            <X size={10} />
                                        </button>
                                    )}
                                </li>
                            ))}
                            {isLoggedIn && (
                                <button
                                    onClick={() => {
                                        updateField(`experience.${index}.achievements`, [...exp.achievements, "New achievement..."]);
                                    }}
                                    className="text-xs text-primary hover:underline flex items-center gap-1 mt-2"
                                >
                                    <Plus size={12} /> Add Achievement
                                </button>
                            )}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
