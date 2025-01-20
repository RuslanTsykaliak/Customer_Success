import Link from "next/link";
import NextThemeProvider from "./ThemeProvider";
import ThemeSwitch from "./ThemeSwitch";

function Header() {
  return (
    <header className="bg-gray-800 p-2 text-white text-sm dark:bg-gray-900 dark:text-gray-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-2 relative">
        <div className="w-full flex justify-center items-center">
          <Link href="/" className="text-lg font-bold hover:text-gray-300 transition duration-200 absolute center">
            Home
          </Link>
        </div>
        <div className="absolute right-4">
          <NextThemeProvider>
            <ThemeSwitch />
          </NextThemeProvider>
        </div>
      </div>
    </header>
  );
}

export default Header;
