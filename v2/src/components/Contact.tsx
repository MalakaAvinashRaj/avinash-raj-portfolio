import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import Editable from './Editable';

const Contact = () => {
    const { data } = usePortfolio();

    return (
        <section id="contact" className="py-20 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto"
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Get in Touch</h2>
                <p className="text-muted-foreground mb-12 text-lg">
                    I'm always open to new opportunities and interesting projects.
                </p>

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <a
                        href={data.personal.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                        title="GitHub"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a
                        href={data.personal.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                        title="LinkedIn"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                        href={data.personal.social.leetcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                        title="LeetCode"
                    >
                        <Code2 className="w-6 h-6" />
                    </a>
                    <a
                        href={`mailto:${data.personal.social.email}`}
                        className="p-4 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                        title="Email"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>

                <div className="text-sm text-muted-foreground">
                    <p>
                        <Editable
                            path="personal.social.email"
                            value={data.personal.social.email}
                            className="text-sm"
                        />
                    </p>
                    <p>
                        <Editable
                            path="personal.social.phone"
                            value={data.personal.social.phone}
                            className="text-sm"
                        />
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
