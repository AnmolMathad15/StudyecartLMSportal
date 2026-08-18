import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white w-full py-6 mt-auto border-t border-[#BDCAC0]/60 z-30 transition-all">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 md:px-8 max-w-7xl mx-auto gap-4 text-xs text-[#404943]">
        <div>
          © 2026 <strong className="text-[#006B47]">StudyEcart LMS</strong>. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[#006B47] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#006B47] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#006B47] transition-colors">Academic Honor Code</a>
          <a href="#" className="hover:text-[#006B47] transition-colors font-medium">Support Desk</a>
        </div>
      </div>
    </footer>
  );
};
