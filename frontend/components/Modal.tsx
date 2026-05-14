"use client";

import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Fecha o modal ao apertar Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop (Fundo escurecido) */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60" 
        onClick={onClose} 
      />
      
      {/* Conteúdo do Modal */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl transition-all dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="text-slate-600 dark:text-slate-400">
          {children}
        </div>
      </div>
    </div>
  );
}