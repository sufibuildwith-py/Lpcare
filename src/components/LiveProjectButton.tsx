import React from 'react';
import { motion } from 'framer-motion';

interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = 'Live Project',
  href,
  onClick,
  className = '',
}) => {
  const content = (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(215, 226, 234, 0.12)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base cursor-pointer select-none transition-colors whitespace-nowrap ${className}`}
    >
      {label}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block text-decoration-none">
        {content}
      </a>
    );
  }

  return content;
};
