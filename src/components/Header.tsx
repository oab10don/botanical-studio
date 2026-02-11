import Link from "next/link";

/**
 * サイトヘッダー
 */
export default function Header() {
  return (
    <header className="absolute top-0 left-0 z-30 w-full">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-light tracking-widest text-[#3d5a35]">
          BOTANICAL STUDIO
        </Link>
        <div className="flex gap-6 text-sm text-[#5a7a50]">
          <Link href="/plants" className="transition-colors hover:text-[#3d5a35]">
            Plants
          </Link>
        </div>
      </nav>
    </header>
  );
}
