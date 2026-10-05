import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  startIndex: number;
  totalChars: number;
}

const Word: React.FC<WordProps> = ({ word, progress, startIndex, totalChars }) => {
  const characters = word.split('');

  return (
    <span className="inline-block whitespace-nowrap">
      {characters.map((char, i) => {
        const charIndex = startIndex + i;
        const start = charIndex / totalChars;
        const end = (charIndex + 1) / totalChars;
        return (
          <Character
            key={i}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;

  let currentStartIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mx-auto flex flex-wrap justify-center gap-x-[0.3em] ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {words.map((word, wordIdx) => {
        const startIndex = currentStartIndex;
        currentStartIndex += word.length + 1; // account for space
        return (
          <Word
            key={wordIdx}
            word={word}
            progress={scrollYProgress}
            startIndex={startIndex}
            totalChars={totalChars}
          />
        );
      })}
    </p>
  );
};
