
import React, { useRef } from 'react';
import Scene3D from './3d/Scene3D';
import { motion } from 'framer-motion';
import { fileContents } from '@/data/fileContents';
import { Github, Mail, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import Navbar from './Navbar';

const SimpleView: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Parse and organize projects
  const projects = Object.keys(fileContents)
    .filter(key => key.startsWith('home/projects/'))
    .map(key => {
      const content = fileContents[key];
      const title = content.match(/\*\*(.*?)\*\*/)?.[1] || 'Project';
      const description = content.split('\n\n')[1] || '';
      const githubUrl = content.match(/GitHub Repository: (.*?)$/m)?.[1] || '#';
      
      return { title, description, githubUrl };
    });
  
  // Parse experience
  const experience = Object.keys(fileContents)
    .filter(key => key.startsWith('home/experience/'))
    .map(key => {
      const content = fileContents[key];
      const title = content.match(/\*\*(.*?)\*\*/)?.[1] || 'Experience';
      const rest = content.replace(/\*\*(.*?)\*\*/, '').trim();
      
      return { title, content: rest };
    });

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      
      {/* Navigation Menu */}
      <nav className="fixed top-16 left-0 right-0 bg-gray-900/80 backdrop-blur-sm z-40 py-2 px-4 md:px-8">
        <div className="container mx-auto flex justify-center items-center">
          <motion.div 
            className="flex space-x-2 sm:space-x-6 overflow-x-auto hide-scrollbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button 
              onClick={() => scrollToSection(aboutRef)}
              className="hover:text-blue-400 transition-colors whitespace-nowrap text-sm sm:text-base"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection(projectsRef)}
              className="hover:text-blue-400 transition-colors whitespace-nowrap text-sm sm:text-base"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection(experienceRef)}
              className="hover:text-blue-400 transition-colors whitespace-nowrap text-sm sm:text-base"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="hover:text-blue-400 transition-colors whitespace-nowrap text-sm sm:text-base"
            >
              Contact
            </button>
          </motion.div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="min-h-screen pt-28 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900/90 z-10"></div>
        
        <div className="absolute inset-0">
          <Scene3D />
        </div>
        
        <div className="container mx-auto z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Avinash Raj Malaka
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-300">
              Developer | Blockchain Enthusiast | Innovator
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => scrollToSection(projectsRef)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection(contactRef)}
              className="border-blue-400 text-blue-400 hover:bg-blue-400/10"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </header>
      
      {/* About Section */}
      <section 
        ref={aboutRef}
        className="py-16 md:py-20 bg-gray-950"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                About Me
              </span>
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-xl border border-gray-700"
            >
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                Hi, I'm Avinash Raj Malaka—a versatile developer with a strong 
                background in building scalable and efficient applications across various domains.
              </p>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                I'm currently pursuing my Master's in Computer Science at Saint Francis College, 
                New York (2024–2026), after earning my B.Tech in Computer Science from Krishna University, India.
              </p>
              <p className="text-gray-300 text-sm md:text-base">
                I specialize in developing decentralized applications, web solutions, and automation tools. 
                My skill set includes JavaScript, React, Python, Solidity, and Dart.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section 
        ref={projectsRef}
        className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Projects
              </span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-xl border border-gray-700 
                           hover:border-blue-500/50 transition-all duration-300 group"
              >
                <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-400 group-hover:text-blue-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                  {project.description.replace(/- /g, '').split('.')[0]}...
                </p>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center text-sm"
                >
                  <Github size={16} className="mr-2" />
                  <span>GitHub Repository</span>
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section 
        ref={experienceRef}
        className="py-16 md:py-20 bg-gray-950"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Experience
              </span>
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-8"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-xl border border-gray-700">
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-400">
                    {exp.title}
                  </h3>
                  <p className="text-gray-300 whitespace-pre-line text-sm md:text-base">
                    {exp.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section 
        ref={contactRef}
        className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Get In Touch
              </span>
            </h2>
          </motion.div>
          
          <div className="max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-xl border border-gray-700"
            >
              <div className="flex flex-col space-y-4">
                <a 
                  href="mailto:avinashrajmalaka@gmail.com" 
                  className="flex items-center p-3 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors"
                >
                  <Mail size={20} className="mr-3 text-blue-400" />
                  <span className="text-sm md:text-base truncate">avinashrajmalaka@gmail.com</span>
                </a>
                
                <a 
                  href="https://github.com/MalakaAvinashRaj" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors"
                >
                  <Github size={20} className="mr-3 text-blue-400" />
                  <span className="text-sm md:text-base truncate">github.com/MalakaAvinashRaj</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/avinashrajmalaka/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors"
                >
                  <Linkedin size={20} className="mr-3 text-blue-400" />
                  <span className="text-sm md:text-base truncate">linkedin.com/in/avinashrajmalaka</span>
                </a>
                
                <div className="flex items-center p-3 rounded-md bg-gray-700/50">
                  <span className="mr-3 text-blue-400 font-bold">Phone:</span>
                  <span className="text-sm md:text-base">(511)-200-8100</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Avinash Raj Malaka. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SimpleView;
