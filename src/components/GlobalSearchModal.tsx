import React, { useState, useEffect, useRef } from 'react';
import { useLms } from '../context/LmsContext';
import { Search, X, BookOpen, Video, HelpCircle, FileCheck, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, courses, doubts, assignments, liveClasses, navigate } = useLms();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const lowerQuery = query.toLowerCase().trim();

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(lowerQuery) ||
      c.category.toLowerCase().includes(lowerQuery) ||
      c.batch?.toLowerCase().includes(lowerQuery)
  );

  const filteredDoubts = doubts.filter(
    (d) =>
      d.title.toLowerCase().includes(lowerQuery) ||
      d.studentName.toLowerCase().includes(lowerQuery) ||
      d.courseTitle.toLowerCase().includes(lowerQuery)
  );

  const filteredAssignments = assignments.filter(
    (a) =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.studentName.toLowerCase().includes(lowerQuery) ||
      a.courseTitle.toLowerCase().includes(lowerQuery)
  );

  const filteredLive = liveClasses.filter(
    (l) =>
      l.topic.toLowerCase().includes(lowerQuery) ||
      l.courseTitle.toLowerCase().includes(lowerQuery)
  );

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#BDCAC0] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="p-4 border-b border-[#BDCAC0]/60 flex items-center gap-3 bg-[#F7F9FB]">
          <Search className="w-5 h-5 text-[#006B47]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, lessons, doubts, students, or live studios..."
            className="w-full bg-transparent text-sm md:text-base text-[#191c1e] placeholder-[#707972] focus:outline-hidden"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#707972] hover:text-[#191c1e] rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-[#707972] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#006B47]" /> Courses ({filteredCourses.length})
              </div>
              <div className="space-y-1">
                {filteredCourses.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect(`/courses/${c.id}`)}
                    className="p-2.5 hover:bg-[#71DBA6]/15 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#191c1e] group-hover:text-[#006B47]">
                        {c.title}
                      </p>
                      <p className="text-xs text-[#707972]">
                        {c.category} • {c.batch || 'Batch B2'} • {c.level}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#707972] group-hover:text-[#006B47] transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doubts */}
          {filteredDoubts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-[#707972] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#EF9F13]" /> Doubts ({filteredDoubts.length})
              </div>
              <div className="space-y-1">
                {filteredDoubts.slice(0, 2).map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleSelect('/instructor/doubts')}
                    className="p-2.5 hover:bg-[#71DBA6]/15 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#191c1e]">{d.title}</p>
                      <p className="text-xs text-[#707972]">
                        By {d.studentName} in {d.courseTitle}
                      </p>
                    </div>
                    <span className="text-[10px] bg-[#EF9F13]/20 text-[#EF9F13] font-bold px-2 py-0.5 rounded">
                      {d.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Classes */}
          {filteredLive.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-[#707972] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#006B47]" /> Live Sessions ({filteredLive.length})
              </div>
              <div className="space-y-1">
                {filteredLive.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => handleSelect('/instructor/live')}
                    className="p-2.5 hover:bg-[#71DBA6]/15 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#005034]">{l.courseTitle}</p>
                      <p className="text-xs text-[#707972]">{l.topic} • {l.startTime}</p>
                    </div>
                    <span className="text-[10px] bg-[#006B47] text-white font-bold px-2.5 py-1 rounded-md">
                      Join
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredCourses.length === 0 &&
            filteredDoubts.length === 0 &&
            filteredAssignments.length === 0 &&
            filteredLive.length === 0 && (
              <div className="p-8 text-center text-sm text-[#707972]">
                No matching results found for "{query}"
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#F7F9FB] border-t border-[#BDCAC0]/60 flex items-center justify-between text-xs text-[#707972]">
          <span>Press ESC to close</span>
          <span className="font-mono">StudyEcart Quick Navigator</span>
        </div>
      </div>
    </div>
  );
};
