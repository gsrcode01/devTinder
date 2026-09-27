import { Heart } from "lucide-react";
import BrandLogo from "../common/BrandLogo";

const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-[#070913] text-slate-400 border-t border-white/[0.05] mt-auto">
      <aside className="flex flex-col items-center gap-2">
        <BrandLogo size="sm" />
        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
          Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" /> for developers to connect, collaborate & code together.
        </p>
        <p className="text-[11px] text-slate-500">© {new Date().getFullYear()} DevTinder. All rights reserved.</p>
      </aside>
    </footer>
  );
};


export default Footer;

