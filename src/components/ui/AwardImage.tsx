"use client";

// AwardImage — ảnh chứng chỉ với fallback text khi ảnh lỗi
// Styled theo thiết kế gốc: bo góc, border mờ

import Image from "next/image";
import { useState } from "react";

interface AwardImageProps {
  src: string;
  alt: string;
}

export default function AwardImage({ src, alt }: AwardImageProps) {
  const [hasError, setHasError] = useState(false);

  // Fallback khi ảnh không tải được — hiển thị text thay vì ảnh vỡ
  if (hasError) {
    return (
      <div className="w-full aspect-4/3 flex items-center justify-center bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.1)]">
        <span className="text-[#a1a1aa] text-sm font-medium text-center px-4">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)]">
      <Image
        src={src}
        alt={alt}
        fill
        // sizes giúp trình duyệt tải đúng kích thước ảnh theo breakpoint
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover hover:scale-105 transition-transform duration-500"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
