
import React from 'react';
import { fileContents } from '@/data/fileContents';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WebsiteViewProps {
  filePath: string | null;
  fileContent: string;
}

const WebsiteView: React.FC<WebsiteViewProps> = ({ filePath, fileContent }) => {
  // Extract about content
  const aboutContent = fileContents['home/about.txt'] || '';
  
  // Extract projects
  const projects = Object.keys(fileContents)
    .filter(key => key.startsWith('home/projects/'))
    .map(key => {
      const content = fileContents[key];
      const title = content.split('\n')[0].replace(/\*\*/g, '');
      const description = content.split('\n')
        .filter(line => line.startsWith('- '))
        .map(line => line.substring(2))
        .join(' ');
      
      let githubLink = '';
      content.split('\n').forEach(line => {
        if (line.startsWith('GitHub Repository: ')) {
          githubLink = line.substring('GitHub Repository: '.length);
        }
      });
      
      return { title, description, githubLink, key };
    });

  // Extract contact information
  const contactContent = fileContents['home/contact.sh'] || '';
  const contactInfo = contactContent.split('\n')
    .filter(line => line.includes(':'))
    .map(line => {
      const parts = line.split(': ');
      if (parts.length >= 2) {
        return {
          label: parts[0].replace(/^echo "/, '').replace(/"$/, ''),
          value: parts[1].replace(/^"/, '').replace(/"$/, '')
        };
      }
      return null;
    })
    .filter(Boolean);

  // Extract experience
  const experienceContent = fileContents['home/experience/intellect-design-arena.md'] || '';
  
  // Determine what content to show when a specific file is selected
  const renderSelectedContent = () => {
    if (!filePath) return null;
    
    return (
      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>{filePath.split('/').pop()}</CardTitle>
          <CardDescription>File contents</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none">
          {fileContent.split('\n').map((line, index) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return <h3 key={index} className="font-bold text-xl mb-2">{line.substring(2, line.length - 2)}</h3>;
            } else if (line.startsWith('- ')) {
              return <li key={index} className="ml-6">{line.substring(2)}</li>;
            } else if (line.startsWith('GitHub Repository: ')) {
              const url = line.substring('GitHub Repository: '.length);
              return (
                <p key={index} className="my-2">
                  GitHub Repository: <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{url}</a>
                </p>
              );
            } else if (line.startsWith('http')) {
              return (
                <p key={index} className="my-2">
                  <a href={line} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{line}</a>
                </p>
              );
            } else if (line === '') {
              return <br key={index} />;
            } else {
              return <p key={index} className="my-2">{line}</p>;
            }
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="h-full overflow-auto bg-gray-50 text-gray-900">
      {filePath && renderSelectedContent()}
      
      <div className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Avinash Raj Malaka
          </h1>
          <p className="text-xl mb-6">Full-Stack Developer & Blockchain Specialist</p>
          <div className="flex justify-center gap-4">
            {contactInfo.map((info, index) => {
              if (info && info.label === "GitHub" || info?.label === "LinkedIn") {
                return (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="border-blue-500 text-blue-500 hover:bg-blue-50"
                    asChild
                  >
                    <a href={info.value} target="_blank" rel="noopener noreferrer">
                      {info.label}
                    </a>
                  </Button>
                );
              }
              return null;
            })}
          </div>
        </section>
        
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-6">About Me</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {aboutContent.split('\n').map((line, index) => (
                <p key={index} className={`mb-4 ${index === 0 ? 'font-medium text-lg' : ''}`}>
                  {line}
                </p>
              ))}
            </div>
            <div className="md:col-span-1 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                AR
              </div>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>{project.description.length > 120 ? `${project.description.substring(0, 120)}...` : project.description}</p>
                </CardContent>
                <CardFooter>
                  {project.githubLink && (
                    <Button asChild variant="outline" size="sm">
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-6">Experience</h2>
          <Card>
            <CardHeader>
              <CardTitle>JavaScript Developer — Intellect Design Arena</CardTitle>
              <CardDescription>Aug 2022 – Sep 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {experienceContent.split('\n')
                  .filter(line => line.startsWith('- '))
                  .map((line, index) => (
                    <li key={index}>{line.substring(2)}</li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </section>
        
        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-6">Contact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Get In Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {contactInfo.map((info, index) => {
                    if (!info) return null;
                    
                    let value = info.value;
                    if (info.label === "Email" || info.label === "LinkedIn" || info.label === "GitHub") {
                      value = (
                        <a href={info.label === "Email" ? `mailto:${info.value}` : info.value} 
                           className="text-blue-500 hover:underline"
                           target="_blank" rel="noopener noreferrer">
                          {info.value}
                        </a>
                      );
                    }
                    
                    return (
                      <li key={index} className="flex items-center">
                        <span className="font-semibold mr-2">{info.label}:</span> {value}
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-semibold">Master's in Computer Science</h3>
                  <p>Saint Francis College, New York (2024–2026)</p>
                </div>
                <div>
                  <h3 className="font-semibold">B.Tech in Computer Science</h3>
                  <p>Krishna University, India</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WebsiteView;
