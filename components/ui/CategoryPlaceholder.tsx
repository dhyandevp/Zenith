import { FileText, GitBranch, Film, Book, MessageCircle, Image as ImageIcon, Gamepad2, Laptop, Music, Archive } from "lucide-react";
import { ArtifactType } from "@/components/cards/ArtifactCard";

function getCategoryIcon(type: ArtifactType) {
  switch (type) {
    case "ARTICLE": return <FileText size={48} className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-500" />;
    case "GITHUB": return <GitBranch size={48} className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-500" />;
    case "MOVIE": return <Film size={48} className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-500" />;
    case "BOOK": return <Book size={48} className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-500" />;
    case "TWEET": return <MessageCircle size={48} className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-500" />;
    case "IMAGE": return <ImageIcon size={48} className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-500" />;
    case "GAME": return <Gamepad2 size={48} className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-500" />;
    case "SOFTWARE": return <Laptop size={48} className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-500" />;
    case "MUSIC": return <Music size={48} className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-500" />;
    default: return <Archive size={48} className="text-aquamarine/60 group-hover:text-aquamarine transition-colors duration-500" />;
  }
}

export function CategoryPlaceholder({ type }: { type: ArtifactType }) {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-pine to-black flex items-center justify-center overflow-hidden">
      {/* Abstract blurred blobs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-aquamarine/20 rounded-full blur-3xl group-hover:bg-aquamarine/30 transition-colors duration-700" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-mayan-jade/20 rounded-full blur-3xl group-hover:bg-mayan-jade/30 transition-colors duration-700" />
      
      {/* Icon Container */}
      <div className="relative z-10 w-24 h-24 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-out">
        {getCategoryIcon(type)}
      </div>

      {/* Dark overlay for text readability at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />
    </div>
  );
}
