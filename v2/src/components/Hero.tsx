import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { ArrowDown, FileText, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Editable from './Editable';

const Hero = () => {
    const { data, updateField } = usePortfolio();
    const { isLoggedIn } = useAuth();

    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative pt-24 md:pt-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                    <Editable
                        path="personal.name"
                        value={data.personal.name}
                        className="text-4xl md:text-6xl font-bold"
                    />
                </h1>
                <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
                    <Editable
                        path="personal.role"
                        value={data.personal.role}
                        className="text-xl md:text-2xl"
                    />
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-12">
                    <Editable
                        path="personal.bio"
                        value={data.personal.bio}
                        type="textarea"
                        className="text-lg md:text-xl"
                    />
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {data.personal.skills.map((skill, index) => (
                        <div key={index} className="group relative">
                            <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium inline-block">
                                {skill}
                            </span>
                            {isLoggedIn && (
                                <button
                                    onClick={() => {
                                        const newSkills = [...data.personal.skills];
                                        newSkills.splice(index, 1);
                                        updateField('personal.skills', newSkills);
                                    }}
                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>
                    ))}
                    {isLoggedIn && (
                        <button
                            onClick={() => {
                                const newSkill = prompt("Enter new skill:");
                                if (newSkill) {
                                    updateField('personal.skills', [...data.personal.skills, newSkill]);
                                }
                            }}
                            className="px-4 py-2 border-2 border-dashed border-muted-foreground/30 text-muted-foreground rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all flex items-center gap-1"
                        >
                            <Plus size={16} /> Add Skill
                        </button>
                    )}
                </div>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/resume"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                    >
                        <FileText size={20} />
                        View Resume
                    </Link>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
            >
                <ArrowDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
        </section>
    );
};

export default Hero;
