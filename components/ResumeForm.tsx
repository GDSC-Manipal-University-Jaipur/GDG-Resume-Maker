'use client';

import React from 'react';
import { type ResumeData, type Entry } from '@/lib/initialData';

// Reusable component for form sections
const FormSection = ({ title, titleNode, children }: { title?: string; titleNode?: React.ReactNode; children: React.ReactNode }) => (
  <section className="mb-6">
    {titleNode ? (
      <div className="mb-3">{titleNode}</div>
    ) : (
      title && <h3 className="text-base font-semibold text-gray-800 mb-3">{title}</h3>
    )}
    <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
      {children}
    </div>
  </section>
);

// Reusable component for a single input field
const Input = ({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="grid grid-cols-1 gap-1">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  </div>
);

//  Main Form Component 
export const ResumeForm = ({ data, setData }: { data: ResumeData, setData: React.Dispatch<React.SetStateAction<ResumeData>> }) => {

  // HANDLER FUNCTIONS 

  // Handles changes for simple, top-level text fields
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.') as [keyof ResumeData, string];
      setData(prevData => ({
        ...prevData,
        [outerKey]: {
          // @ts-ignore
          ...prevData[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  // Handles changes within an array of objects (like projects, experience)
  const handleArrayChange = (section: 'projects' | 'experience', index: number, field: keyof Entry, value: string) => {
    setData(prevData => {
      const newArray = [...prevData[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prevData, [section]: newArray };
    });
  };

  const addArrayItem = (section: 'projects' | 'experience') => {
    const newItem = { title: '', points: [''] };
    setData(prevData => ({ ...prevData, [section]: [...prevData[section], newItem] }));
  };

  const removeArrayItem = (section: 'projects' | 'experience', index: number) => {
    setData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };

  const handlePointChange = (section: 'projects' | 'experience', entryIndex: number, pointIndex: number, value: string) => {
    setData(prevData => {
      const newArray = [...prevData[section]];
      const newPoints = [...newArray[entryIndex].points];
      newPoints[pointIndex] = value;
      newArray[entryIndex] = { ...newArray[entryIndex], points: newPoints };
      return { ...prevData, [section]: newArray };
    });
  };
  
  const addPoint = (section: 'projects' | 'experience', entryIndex: number) => {
    setData(prevData => {
      const newArray = [...prevData[section]];
      const newPoints = [...newArray[entryIndex].points, '']; // Add a new empty point
      newArray[entryIndex] = { ...newArray[entryIndex], points: newPoints };
      return { ...prevData, [section]: newArray };
    });
  };

  const removePoint = (section: 'projects' | 'experience', entryIndex: number, pointIndex: number) => {
    setData(prevData => {
      const newArray = [...prevData[section]];
      const newPoints = newArray[entryIndex].points.filter((_, i) => i !== pointIndex);
      newArray[entryIndex] = { ...newArray[entryIndex], points: newPoints };
      return { ...prevData, [section]: newArray };
    });
  };

  const clearContactField = (field: keyof ResumeData['contact']) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: '',
      },
    }));
  };

  // Headings edit
  const handleHeadingChange = (key: keyof ResumeData['headings'], value: string) => {
    setData(prev => ({
      ...prev,
      headings: {
        ...prev.headings,
        [key]: value,
      },
    }));
  };

  // Education array handlers
  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', university: '', details: '' }],
    }));
  };
  const updateEducation = (index: number, field: 'degree' | 'university' | 'details', value: string) => {
    setData(prev => {
      const next = [...prev.education];
      next[index] = { ...next[index], [field]: value } as any;
      return { ...prev, education: next };
    });
  };
  const removeEducation = (index: number) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Research array handlers
  const addResearch = () => {
    setData(prev => ({
      ...prev,
      research: [...prev.research, { title: '', subtitle: '', journal: '', points: [''] }],
    }));
  };
  const updateResearch = (index: number, field: 'title' | 'subtitle' | 'journal', value: string) => {
    setData(prev => {
      const next = [...prev.research];
      next[index] = { ...next[index], [field]: value } as any;
      return { ...prev, research: next };
    });
  };
  const updateResearchPoint = (rIndex: number, pIndex: number, value: string) => {
    setData(prev => {
      const next = [...prev.research];
      const points = [...(next[rIndex].points || [])];
      points[pIndex] = value;
      next[rIndex] = { ...next[rIndex], points } as any;
      return { ...prev, research: next };
    });
  };
  const addResearchPoint = (rIndex: number) => {
    setData(prev => {
      const next = [...prev.research];
      const points = [...(next[rIndex].points || []), ''];
      next[rIndex] = { ...next[rIndex], points } as any;
      return { ...prev, research: next };
    });
  };
  const removeResearchPoint = (rIndex: number, pIndex: number) => {
    setData(prev => {
      const next = [...prev.research];
      const points = (next[rIndex].points || []).filter((_, i) => i !== pIndex);
      next[rIndex] = { ...next[rIndex], points } as any;
      return { ...prev, research: next };
    });
  };
  const removeResearch = (index: number) => {
    setData(prev => ({
      ...prev,
      research: prev.research.filter((_, i) => i !== index),
    }));
  };

  // Positions of Responsibility handlers (string[] with add/remove/edit)
  const addPosition = () => {
    setData(prev => ({
      ...prev,
      positions: [...prev.positions, ''],
    }));
  };
  const updatePosition = (index: number, value: string) => {
    setData(prev => {
      const next = [...prev.positions];
      next[index] = value;
      return { ...prev, positions: next };
    });
  };
  const removePosition = (index: number) => {
    setData(prev => ({
      ...prev,
      positions: prev.positions.filter((_, i) => i !== index),
    }));
  };


  // RENDER
  return (
    <div className="p-4 bg-gray-50 rounded-lg max-h-screen overflow-y-auto">
      <FormSection
        titleNode={(
          <div className="flex items-end gap-3">
            <div className="grid grid-cols-1 gap-1 flex-1">
              <label className="text-sm font-medium text-gray-700">Personal Section Heading</label>
              <input
                type="text"
                value={data.headings.personal}
                onChange={(e) => handleHeadingChange('personal', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {/* TODO: This heading isn't used in the current template header; wire it up in templates if needed. */}
            </div>
          </div>
        )}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Full Name" name="name" value={data.name} onChange={handleTextChange} />
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="contact.phone" className="text-sm font-medium text-gray-700">Phone</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="contact.phone"
                name="contact.phone"
                value={data.contact.phone}
                onChange={handleTextChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button type="button" onClick={() => clearContactField('phone')} className="mt-1 px-2 text-sm border rounded bg-gray-100 hover:bg-gray-200">Clear</button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="contact.email" className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="contact.email"
                name="contact.email"
                value={data.contact.email}
                onChange={handleTextChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button type="button" onClick={() => clearContactField('email')} className="mt-1 px-2 text-sm border rounded bg-gray-100 hover:bg-gray-200">Clear</button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="contact.linkedin" className="text-sm font-medium text-gray-700">LinkedIn</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="contact.linkedin"
                name="contact.linkedin"
                value={data.contact.linkedin}
                onChange={handleTextChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button type="button" onClick={() => clearContactField('linkedin')} className="mt-1 px-2 text-sm border rounded bg-gray-100 hover:bg-gray-200">Clear</button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="contact.github" className="text-sm font-medium text-gray-700">GitHub</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="contact.github"
                name="contact.github"
                value={data.contact.github}
                onChange={handleTextChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button type="button" onClick={() => clearContactField('github')} className="mt-1 px-2 text-sm border rounded bg-gray-100 hover:bg-gray-200">Clear</button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="contact.website" className="text-sm font-medium text-gray-700">Website</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="contact.website"
                name="contact.website"
                value={data.contact.website}
                onChange={handleTextChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button type="button" onClick={() => clearContactField('website')} className="mt-1 px-2 text-sm border rounded bg-gray-100 hover:bg-gray-200">Clear</button>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection
        titleNode={(
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm font-medium text-gray-700">{`Education Section Heading`}</label>
            <input
              type="text"
              value={data.headings.education}
              onChange={(e) => handleHeadingChange('education', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        )}
      >
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="bg-gray-50 border rounded-md p-3 relative">
              <button onClick={() => removeEducation(index)} aria-label="Remove education" className="absolute -top-3 -right-3 text-white bg-red-500 rounded-full h-7 w-7 flex items-center justify-center shadow">×</button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="grid grid-cols-1 gap-1">
                  <label className="text-sm font-medium text-gray-700">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div className="grid grid-cols-1 gap-1">
                  <label className="text-sm font-medium text-gray-700">University</label>
                  <input
                    type="text"
                    value={edu.university}
                    onChange={(e) => updateEducation(index, 'university', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Details (GPA, Year)</label>
                  <input
                    value={edu.details}
                    onChange={(e) => updateEducation(index, 'details', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addEducation} className="w-full mt-1 p-2 bg-black text-white rounded hover:bg-gray-800">+ Add Education</button>
        </div>
      </FormSection>
      
      <FormSection
        titleNode={(
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm font-medium text-gray-700">{`Experience Section Heading`}</label>
            <input
              type="text"
              value={data.headings.experience}
              onChange={(e) => handleHeadingChange('experience', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        )}
      >
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="bg-gray-50 border rounded-md p-3 relative">
              <button onClick={() => removeArrayItem('experience', index)} aria-label="Remove experience" className="absolute -top-3 -right-3 text-white bg-red-500 rounded-full h-7 w-7 flex items-center justify-center shadow">×</button>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input label="Job Title" name={`experience[${index}].title`} value={exp.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} />
                <Input label="Company" name={`experience[${index}].company`} value={exp.company || ''} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
                <Input label="Duration" name={`experience[${index}].duration`} value={exp.duration || ''} onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)} />
              </div>

              {/* Bullet points */}
              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">Accomplishments</label>
                <div className="space-y-2 mt-2">
                  {exp.points.map((point, pIndex) => (
                    <div key={pIndex} className="flex items-start gap-2">
                      <span className="mt-2 text-gray-500">•</span>
                      <textarea
                        value={point}
                        onChange={(e) => handlePointChange('experience', index, pIndex, e.target.value)}
                        rows={2}
                        className="flex-grow block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                      <button onClick={() => removePoint('experience', index, pIndex)} className="text-red-500 font-bold text-xl leading-none">－</button>
                    </div>
                  ))}
                  <button onClick={() => addPoint('experience', index)} className="text-sm text-gray-700 hover:text-black">+ Add point</button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('experience')} className="w-full mt-1 p-2 bg-black text-white rounded hover:bg-gray-800">+ Add Experience</button>
        </div>
      </FormSection>

      <FormSection
        titleNode={(
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm font-medium text-gray-700">{`Research Section Heading`}</label>
            <input
              type="text"
              value={data.headings.research}
              onChange={(e) => handleHeadingChange('research', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        )}
      >
        <div className="space-y-4">
          {data.research.map((res, rIndex) => (
            <div key={rIndex} className="bg-gray-50 border rounded-md p-3 relative">
              <button onClick={() => removeResearch(rIndex)} aria-label="Remove research" className="absolute -top-3 -right-3 text-white bg-red-500 rounded-full h-7 w-7 flex items-center justify-center shadow">×</button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Research Title" name={`research[${rIndex}].title`} value={res.title || ''} onChange={(e) => updateResearch(rIndex, 'title', e.target.value)} />
                <Input label="Subtitle" name={`research[${rIndex}].subtitle`} value={res.subtitle || ''} onChange={(e) => updateResearch(rIndex, 'subtitle', e.target.value)} />
                <Input label="Journal / Conference" name={`research[${rIndex}].journal`} value={res.journal || ''} onChange={(e) => updateResearch(rIndex, 'journal', e.target.value)} />
              </div>
              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">Research Points</label>
                <div className="space-y-2 mt-2">
                  {(res.points || []).map((point, pIndex) => (
                    <div key={pIndex} className="flex items-start gap-2">
                      <span className="mt-2 text-gray-500">•</span>
                      <textarea
                        value={point}
                        onChange={(e) => updateResearchPoint(rIndex, pIndex, e.target.value)}
                        rows={2}
                        className="flex-grow block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                      <button onClick={() => removeResearchPoint(rIndex, pIndex)} className="text-red-500 font-bold text-xl leading-none">－</button>
                    </div>
                  ))}
                  <button onClick={() => addResearchPoint(rIndex)} className="text-sm text-gray-700 hover:text-black">+ Add point</button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={addResearch} className="w-full mt-1 p-2 bg-black text-white rounded hover:bg-gray-800">+ Add Research</button>
        </div>
      </FormSection>

      <FormSection
        titleNode={(
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm font-medium text-gray-700">{`Projects Section Heading`}</label>
            <input
              type="text"
              value={data.headings.projects}
              onChange={(e) => handleHeadingChange('projects', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        )}
      >
        <div className="space-y-4">
          {data.projects.map((proj, index) => (
            <div key={index} className="bg-gray-50 border rounded-md p-3 relative">
              <button onClick={() => removeArrayItem('projects', index)} aria-label="Remove project" className="absolute -top-3 -right-3 text-white bg-red-500 rounded-full h-7 w-7 flex items-center justify-center shadow">×</button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Project Title" name={`projects[${index}].title`} value={proj.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} />
                <Input label="Tech Stack" name={`projects[${index}].stack`} value={proj.stack || ''} onChange={(e) => handleArrayChange('projects', index, 'stack', e.target.value)} />
              </div>

              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">Features / Description</label>
                <div className="space-y-2 mt-2">
                  {proj.points.map((point, pIndex) => (
                    <div key={pIndex} className="flex items-start gap-2">
                      <span className="mt-2 text-gray-500">•</span>
                      <textarea
                        value={point}
                        onChange={(e) => handlePointChange('projects', index, pIndex, e.target.value)}
                        rows={2}
                        className="flex-grow block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                      <button onClick={() => removePoint('projects', index, pIndex)} className="text-red-500 font-bold text-xl leading-none">－</button>
                    </div>
                  ))}
                  <button onClick={() => addPoint('projects', index)} className="text-sm text-gray-700 hover:text-black">+ Add point</button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('projects')} className="w-full mt-1 p-2 bg-black text-white rounded hover:bg-gray-800">+ Add Project</button>
        </div>
      </FormSection>

      {/* Positions of Responsibility */}
      <FormSection
        titleNode={(
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm font-medium text-gray-700">{`Positions of Responsibility Section Heading`}</label>
            <input
              type="text"
              value={data.headings.positions}
              onChange={(e) => handleHeadingChange('positions', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        )}
      >
        <div className="space-y-4">
          {data.positions.map((pos, index) => (
            <div key={index} className="bg-gray-50 border rounded-md p-3 relative">
              <button onClick={() => removePosition(index)} aria-label="Remove position" className="absolute -top-3 -right-3 text-white bg-red-500 rounded-full h-7 w-7 flex items-center justify-center shadow">×</button>
              <div className="grid grid-cols-1 gap-1">
                <label className="text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  value={pos}
                  onChange={(e) => updatePosition(index, e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </div>
          ))}
          <button onClick={addPosition} className="w-full mt-1 p-2 bg-black text-white rounded hover:bg-gray-800">+ Add Position</button>
        </div>
      </FormSection>
    </div>
  );
};