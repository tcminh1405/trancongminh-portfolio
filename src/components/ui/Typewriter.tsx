"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
  className?: string;
}

export default function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  delayBetweenWords = 2000,
  className = "",
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[wordIndex % words.length];

    if (!isDeleting && text === currentWord) {
      // Khi gõ xong từ hoàn chỉnh -> dừng delay (2s) rồi mới bắt đầu xóa
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
    } else {
      // Tiến hành gõ thêm hoặc xóa ký tự trong setTimeout callback
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(() => {
        if (isDeleting) {
          if (text.length > 1) {
            setText(currentWord.slice(0, text.length - 1));
          } else {
            // Khi xóa xong ký tự cuối cùng -> chuyển sang từ tiếp theo ngay trong callback
            setText("");
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        } else {
          setText(currentWord.slice(0, text.length + 1));
        }
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className={`inline ${className}`} style={{ whiteSpace: "nowrap" }}>
      {text}
      <span className="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  );
}
