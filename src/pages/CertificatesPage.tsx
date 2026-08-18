import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { Certificate } from '../types';
import {
  Award,
  Download,
  Printer,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  X
} from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const { certificates, showToast } = useLms();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
          Verified Credentials & Certificates
        </h2>
        <p className="text-sm text-[#404943] mt-1">
          Cryptographically verifiable certificates issued upon completion of StudyEcart curricula.
        </p>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white border border-[#BDCAC0]/70 rounded-xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#006B47]/10 flex items-center justify-center text-[#006B47]">
                  <Award className="w-6 h-6" />
                </div>
                <span className="bg-[#8af5be]/40 text-[#00714b] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verifiable
                </span>
              </div>

              <h3 className="font-bold text-lg text-[#191c1e] font-display mb-1">
                {cert.courseTitle}
              </h3>
              <p className="text-xs text-[#707972] mb-3">Issued to: <strong className="text-[#191c1e]">{cert.studentName}</strong></p>

              <div className="text-xs text-[#707972] space-y-1 font-mono bg-[#F7F9FB] p-2.5 rounded-lg border border-[#BDCAC0]/40">
                <p>Cert ID: {cert.certificateNumber}</p>
                <p>Issued: {cert.issueDate}</p>
                <p>Grade: {cert.grade}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#BDCAC0]/40 flex gap-2">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex-1 bg-[#006B47] text-white hover:bg-[#005034] text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formal Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border-8 border-[#005034] rounded-3xl w-full max-w-2xl p-8 md:p-12 shadow-2xl relative text-center space-y-6">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-[#707972] hover:text-[#191c1e] p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Certificate Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-[#006B47]">
                <div className="w-8 h-8 rounded-lg bg-[#006B47] text-white flex items-center justify-center font-bold text-base font-display">
                  S
                </div>
                <span className="font-bold text-xl tracking-tight font-display">StudyEcart LMS</span>
              </div>
              <p className="text-[11px] font-bold text-[#707972] uppercase tracking-widest">
                Certificate of Academic Excellence
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-[#404943] italic">This certifies that</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#191c1e] font-display underline decoration-[#8DF7C1] decoration-4 underline-offset-8">
                {selectedCert.studentName}
              </h2>
              <p className="text-xs text-[#404943] max-w-lg mx-auto pt-2 leading-relaxed">
                has successfully fulfilled all course prerequisites, laboratory assessments, and theoretical examinations with a distinction grade of <strong>{selectedCert.grade}</strong> in
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-[#006B47] font-display">
                {selectedCert.courseTitle}
              </h3>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-8 grid grid-cols-2 gap-8 border-t border-[#BDCAC0]/50 items-end">
              <div className="text-center space-y-1">
                <p className="font-serif italic text-lg text-[#005034]">Dr. Aris Thorne</p>
                <div className="w-32 h-px bg-[#404943] mx-auto"></div>
                <p className="text-[10px] font-bold text-[#707972] uppercase">Lead Instructor & Chair</p>
              </div>

              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-[#EF9F13]/20 border-2 border-[#EF9F13] mx-auto flex items-center justify-center text-[#EF9F13] font-bold text-xs">
                  SE-VERIFIED
                </div>
                <p className="text-[10px] font-mono text-[#707972]">ID: {selectedCert.certificateNumber}</p>
                <p className="text-[10px] font-bold text-[#707972] uppercase">Issue Date: {selectedCert.issueDate}</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handlePrint}
                className="bg-[#006B47] text-white hover:bg-[#005034] text-xs font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
