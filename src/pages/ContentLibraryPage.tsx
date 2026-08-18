import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  FolderKanban,
  FileText,
  Download,
  Search,
  Upload,
  Database,
  Code,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const ContentLibraryPage: React.FC = () => {
  const { showToast } = useLms();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const resources = [
    {
      id: 'res-1',
      title: 'Neural Networks & Deep Learning Slides (Module 1-4)',
      type: 'PDF',
      size: '24.5 MB',
      course: 'Data Science & AI Specialization',
      downloads: 412,
      updated: 'Aug 14, 2026'
    },
    {
      id: 'res-2',
      title: 'MNIST & CIFAR-10 Cleaned Preprocessing Dataset',
      type: 'DATASET',
      size: '182.0 MB',
      course: 'Data Science & AI Specialization',
      downloads: 678,
      updated: 'Aug 10, 2026'
    },
    {
      id: 'res-3',
      title: 'Backpropagation Vectorized NumPy Starter Kit',
      type: 'CODE',
      size: '1.2 MB',
      course: 'Data Science & AI Specialization',
      downloads: 529,
      updated: 'Aug 12, 2026'
    },
    {
      id: 'res-4',
      title: 'Calculus of Variations & Matrix Optimization Manual',
      type: 'PDF',
      size: '14.8 MB',
      course: 'Applied Mathematics & Calculus',
      downloads: 290,
      updated: 'Jul 28, 2026'
    },
    {
      id: 'res-5',
      title: 'Graph Traversal & Shortest Path Benchmark Suite',
      type: 'CODE',
      size: '3.4 MB',
      course: 'Data Structures & Algorithms',
      downloads: 380,
      updated: 'Aug 05, 2026'
    }
  ];

  const filtered = resources.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.course.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === 'ALL' || r.type === selectedType;
    return matchSearch && matchType;
  });

  const handleDownload = (title: string) => {
    showToast(`Downloading "${title}"...`, 'success');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display flex items-center gap-2">
            <FolderKanban className="w-7 h-7 text-[#006B47]" /> Academic Content Repository
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Download verified course slide decks, benchmark datasets, Jupyter notebook labs, and official handbooks.
          </p>
        </div>

        <button
          onClick={() => showToast('Artifact upload wizard opened.', 'info')}
          className="bg-[#006B47] hover:bg-[#005034] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" /> Upload Course Material
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-[#707972] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources by title, topic, or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg text-xs focus:outline-none focus:border-[#006B47]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setSelectedType('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedType === 'ALL' ? 'bg-[#006B47] text-white' : 'text-[#404943] hover:bg-[#F7F9FB]'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setSelectedType('PDF')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedType === 'PDF' ? 'bg-[#006B47] text-white' : 'text-[#404943] hover:bg-[#F7F9FB]'
            }`}
          >
            PDF Slides
          </button>
          <button
            onClick={() => setSelectedType('DATASET')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedType === 'DATASET' ? 'bg-[#006B47] text-white' : 'text-[#404943] hover:bg-[#F7F9FB]'
            }`}
          >
            Datasets
          </button>
          <button
            onClick={() => setSelectedType('CODE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedType === 'CODE' ? 'bg-[#006B47] text-white' : 'text-[#404943] hover:bg-[#F7F9FB]'
            }`}
          >
            Starter Code
          </button>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#BDCAC0]/70 rounded-xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#006B47]/10 flex items-center justify-center text-[#006B47]">
                  {item.type === 'PDF' && <FileText className="w-5 h-5" />}
                  {item.type === 'DATASET' && <Database className="w-5 h-5" />}
                  {item.type === 'CODE' && <Code className="w-5 h-5" />}
                </div>
                <span className="bg-[#F7F9FB] border border-[#BDCAC0]/60 text-[#707972] text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                  {item.size}
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#191c1e] font-display mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-[#006B47] font-semibold mb-2">{item.course}</p>
              <p className="text-[11px] text-[#707972]">Updated: {item.updated} • {item.downloads} downloads</p>
            </div>

            <button
              onClick={() => handleDownload(item.title)}
              className="mt-4 w-full bg-[#F7F9FB] hover:bg-[#006B47] hover:text-white text-[#191c1e] text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download Artifact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
