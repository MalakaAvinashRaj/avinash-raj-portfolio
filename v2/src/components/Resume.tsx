import { portfolioData } from '../data/portfolio';
import { Mail, Phone, Github, Linkedin, Globe, Printer } from 'lucide-react';

const Resume = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-white text-black p-8 md:p-16 print:p-0">
            <div className="max-w-4xl mx-auto bg-white print:max-w-full">
                {/* Header */}
                <header className="border-b-2 border-gray-800 pb-6 mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">{portfolioData.personal.name}</h1>
                        <p className="text-lg text-gray-600">{portfolioData.personal.location}</p>
                    </div>
                    <button
                        onClick={handlePrint}
                        className="print:hidden flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                    >
                        <Printer size={18} />
                        Print / Save PDF
                    </button>
                </header>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 mb-8 text-sm">
                    <a href={`mailto:${portfolioData.personal.social.email}`} className="flex items-center gap-1 hover:underline">
                        <Mail size={14} /> {portfolioData.personal.social.email}
                    </a>
                    <span className="flex items-center gap-1">
                        <Phone size={14} /> {portfolioData.personal.social.phone}
                    </span>
                    <a href={portfolioData.personal.social.github} className="flex items-center gap-1 hover:underline">
                        <Github size={14} /> GitHub
                    </a>
                    <a href={portfolioData.personal.social.linkedin} className="flex items-center gap-1 hover:underline">
                        <Linkedin size={14} /> LinkedIn
                    </a>
                    <a href="https://avinashrajmalaka.in" className="flex items-center gap-1 hover:underline">
                        <Globe size={14} /> avinashrajmalaka.in
                    </a>
                </div>

                {/* Summary */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">About</h2>
                    <p className="text-gray-700 leading-relaxed">
                        {portfolioData.resume.summary}
                    </p>
                </section>

                {/* Skills */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Technical Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                        <p><span className="font-semibold">Languages:</span> {portfolioData.resume.skills.languages.join(", ")}</p>
                        <p><span className="font-semibold">Frameworks:</span> {portfolioData.resume.skills.frameworks.join(", ")}</p>
                        <p><span className="font-semibold">AI & ML Tools:</span> {portfolioData.resume.skills.ai_ml.join(", ")}</p>
                        <p><span className="font-semibold">Databases:</span> {portfolioData.resume.skills.databases.join(", ")}</p>
                        <p><span className="font-semibold">Cloud:</span> {portfolioData.resume.skills.cloud.join(", ")}</p>
                    </div>
                </section>

                {/* Experience */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Work Experience</h2>
                    <div className="space-y-6">
                        {portfolioData.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">{exp.role}</h3>
                                    <span className="text-sm text-gray-600">{exp.period}</span>
                                </div>
                                <p className="text-gray-800 font-medium mb-2">{exp.company}</p>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Projects</h2>
                    <div className="space-y-4">
                        {portfolioData.projects.slice(0, 4).map((project, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold">{project.title}</h3>
                                    <span className="text-xs text-gray-500">{project.tech.join(" • ")}</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                                <ul className="list-disc list-inside text-xs text-gray-600">
                                    {project.features.slice(0, 2).map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
                    <div className="space-y-2">
                        {portfolioData.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-bold">{edu.school}</h3>
                                    <p className="text-sm text-gray-700">{edu.degree}</p>
                                </div>
                                <span className="text-sm text-gray-600">{edu.period}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certifications (Hardcoded for now based on input) */}
                <section>
                    <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Certifications</h2>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        <li>Solana Developer Bootcamp (2023)</li>
                        <li>Python for Data Science - NPTEL, IIT Madras (2019)</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Resume;
