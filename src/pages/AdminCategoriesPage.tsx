import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Layers,
  Plus,
  Trash2,
  BookOpen,
  Search,
  Tag,
  Sparkles,
  Edit2,
  CheckCircle,
  BarChart2
} from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, addCategory, deleteCategory, courses, showToast } = useLms();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('BookOpen');

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      showToast('Category name is required.', 'error');
      return;
    }
    addCategory(newCatName.trim(), newCatDesc.trim() || 'Comprehensive academic discipline', selectedIcon);
    setNewCatName('');
    setNewCatDesc('');
    setIsAdding(false);
  };

  const getCourseCount = (catName: string) => {
    return courses.filter((c) => c.category.toLowerCase() === catName.toLowerCase()).length;
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-[#006B47]" /> Category & Taxonomy Management
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Organize curricula into academic departments, specialized tracks, and discoverable course tags.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#006B47] hover:bg-[#005034] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> {isAdding ? 'Cancel' : 'Add New Discipline'}
        </button>
      </div>

      {/* Add Category Form */}
      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="bg-white border border-[#BDCAC0]/80 rounded-2xl p-6 shadow-md space-y-4 animate-in fade-in"
        >
          <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#006B47]" /> Create New Academic Discipline
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Discipline Name
              </label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Distributed Cloud Computing & DevOps"
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Icon Representation
              </label>
              <select
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] font-semibold focus:outline-none"
              >
                <option value="BookOpen">Book & Curriculum (Default)</option>
                <option value="Layers">Layers & Architecture</option>
                <option value="Sparkles">AI & Innovations</option>
                <option value="BarChart2">Data Science & Analytics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
              Discipline Description & Syllabus Scope
            </label>
            <textarea
              rows={3}
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              placeholder="Outline what subjects belong in this specialization..."
              className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-[#F7F9FB] text-xs font-bold text-[#404943] rounded-xl hover:bg-[#e7e8eb]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#006B47] hover:bg-[#005034] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" /> Save Category
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border border-[#BDCAC0] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => {
          const count = getCourseCount(cat.name);
          return (
            <div
              key={cat.id}
              className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#006B47] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#8af5be]/40 text-[#006B47] flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="bg-[#F7F9FB] border border-[#BDCAC0]/60 text-[#006B47] text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {count} Active Courses
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#191c1e] font-display pt-1">{cat.name}</h3>
                <p className="text-xs text-[#707972] leading-relaxed line-clamp-2">{cat.description}</p>
              </div>

              <div className="pt-4 border-t border-[#BDCAC0]/40 flex items-center justify-between">
                <span className="text-[10px] text-[#707972] uppercase font-bold tracking-wider">
                  Taxonomy ID: {cat.id.slice(0, 8)}
                </span>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="p-1.5 text-[#BA1A1A] hover:bg-[#ffdad6]/40 rounded-lg transition-colors cursor-pointer"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
