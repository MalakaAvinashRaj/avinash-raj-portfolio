import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { ArrowDown, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative pt-24 md:pt-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                    {portfolioData.personal.name}
                </h1>
                <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
                    {portfolioData.personal.role}
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-12">
                    {portfolioData.personal.bio}
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {portfolioData.personal.skills.slice(0, 8).map((skill, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                        >
                            {skill}
                        </span>
                    ))}
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
