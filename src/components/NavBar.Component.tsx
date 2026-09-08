import { useLocation } from "react-router-dom";


const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/store": "Store",
};

export function Navbar() {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] ?? "Dashboard";

  return (
    <header className="flex h-20 w-full shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#5b4a9a]/90 px-6 backdrop-blur-md shadow-sm">
      <h1 className="hidden text-lg font-semibold text-white md:block">
        {pageTitle}
</h1>
    </header>
  );
}