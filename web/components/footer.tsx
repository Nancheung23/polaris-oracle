import Link from "next/link";
import { Sparkles, GitCompareArrows, Mail, Rss } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold text-primary mb-2">
              <Sparkles className="h-5 w-5" />
              Polaris Oracle
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {/* TODO: 一句话产品简介 */}
              AI-powered Zi Wei Dou Shu readings, paid for on Solana.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Explore</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition">
                Home
              </Link>
              <Link
                href="/fate-definition"
                className="hover:text-primary transition"
              >
                Fate Definition
              </Link>
              <Link href="/about" className="hover:text-primary transition">
                About Us
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Connect</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="https://github.com/Nancheung23"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <GitCompareArrows className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://x.com/@doggod260412"
                target="_blank"
                rel="noopener
              noreferrer"
                className="flex items-center gap-2 hover:text-primary
              transition"
              >
                <Rss className="h-4 w-4" />
                Twitter / X
              </a>
              <a
                href="mailto:yannan.zhang@tuni.fi"
                className="flex items-center
              gap-2 hover:text-primary transition"
              >
                <Mail className="h-4 w-4" />
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Polaris Oracle. All readings are for
          entertainment purposes only.
        </div>
      </div>
    </footer>
  );
}
