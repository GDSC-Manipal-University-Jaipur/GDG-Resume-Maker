'use client';

import React from 'react';
import { type ResumeData } from '@/lib/initialData';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-[6pt]">
    <h2 className="text-[12pt] font-bold border-b border-black pb-[2pt] mb-[4pt]">{title}</h2>
    {children}
  </section>
);

export const HarvardTemplate = ({ data }: { data: ResumeData }) => {
  const { name, contact, education, experience, projects, research, skills, certifications, positions, headings } = data;

  return (
    <div className="resume-page">
      <div className="p-[0.5in] font-[Times] text-[10pt] leading-[1.3]">
          <header className={`text-center mb-[8pt]`}>
            <h1 className="text-[18pt] font-bold mb-[2pt]">{name}</h1>
            <div className="flex justify-center items-center flex-wrap gap-x-[6pt] text-[9pt]">
              {[
                contact.phone && <a key="phone" href={`tel:${contact.phone}`} className="text-blue-700 hover:underline">{contact.phone}</a>,
                contact.email && <a key="email" href={`mailto:${contact.email}`} className="text-blue-700 hover:underline">{contact.email}</a>,
                contact.linkedin && <a key="linkedin" href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>,
                contact.github && <a key="github" href={contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">GitHub</a>,
                contact.website && <a key="website" href={contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Website</a>,
              ].filter(Boolean).map((el, idx, arr) => (
                <React.Fragment key={idx}>
                  {el}
                  {idx < arr.length - 1 && <span>|</span>}
                </React.Fragment>
              ))}
            </div>
          </header>

        {education && education.length > 0 && (
        <Section title={headings.education}>
          <div className="flex justify-between items-start">
            {/* Render first item prominently */}
            <h3 className="font-bold">{education[0].degree}</h3>
            <p>{education[0].university}</p>
          </div>
          <p className="mt-[2pt]">{education[0].details}</p>
          {education.slice(1).map((edu, i) => (
            <div key={i} className="mt-[6pt]">
              <div className="flex justify-between items-start">
                <h3 className="font-bold">{edu.degree}</h3>
                <p>{edu.university}</p>
              </div>
              <p className="mt-[2pt]">{edu.details}</p>
            </div>
          ))}
        </Section>
        )}

        {experience && experience.length > 0 && (
          <Section title={headings.experience}>
            {experience.map((exp, i) => (
              <div key={i} className={`mb-[6pt] last:mb-0`}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.title}</h3>
                  <p className="font-bold">{exp.company}</p>
                </div>
                <div className="flex justify-between items-baseline italic my-[2pt]">
                  <p>{exp.duration}</p>
                  <p>{exp.location}</p>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-[2pt]">
                  {exp.points.map((point, j) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {projects && projects.length > 0 && (
          <Section title={headings.projects}>
            {projects.map((proj, i) => (
              <div key={i} className={`mb-[6pt] last:mb-0`}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{proj.title}</h3>
                  {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[9pt] text-blue-700 hover:underline font-medium">GitHub</a>}
                </div>
                {proj.stack && <p className="italic my-[2pt]">{proj.stack}</p>}
                <ul className="list-disc list-outside ml-4 space-y-[2pt]">
                  {proj.points.map((point, j) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {research && research.length > 0 && (
          <Section title={headings.research}>
            {research.map((res, i) => (
              <div key={i} className="mb-[6pt] last:mb-0">
                <h3 className="font-bold">{res.title}</h3>
                <p className="italic my-[2pt]">{res.subtitle}</p>
                <p className="mb-[2pt]">{res.journal}</p>
                <ul className={`list-disc list-outside ml-4 space-y-[2pt]`}>
                  {(res.points || []).map((point, j) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {skills && skills.length > 0 && (
        <Section title={headings.skills}>
          <div className={`space-y-[2pt]`}>
            {skills.map((skill, i) => (
              <div key={i}>
                <span className="font-bold">{skill.category}: </span>
                <span>{skill.list}</span>
              </div>
            ))}
          </div>
        </Section>
        )}

        {certifications && certifications.length > 0 && (
          <Section title={headings.certifications}>
            <p>{certifications.join('; ')}</p>
          </Section>
        )}

        {positions && positions.length > 0 && (
          <Section title={headings.positions}>
            <ul className={`list-disc list-outside ml-4 space-y-[2pt]`}>
              {positions.map((pos, i) => <li key={i}>{pos}</li>)}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
};


