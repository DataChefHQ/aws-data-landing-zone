import * as React from 'react';
import { Moon, Sun, Search } from 'lucide-react';

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface NavbarProps {
  showNavLinks?: boolean;
}

export function Navbar({ showNavLinks = true }: NavbarProps) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem('starlight-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored ? stored === 'dark' : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('starlight-theme', next ? 'dark' : 'light');
  }

  return (
    <header className="dlz-navbar">
      <div className="dlz-navbar-inner">
        {/* Left: logo + nav */}
        <div className="dlz-navbar-left">
          <a href="/" className="dlz-logo-link" aria-label="Data Landing Zone home">
            {/* Light logo */}
            <svg className={cn('dlz-logo', isDark && 'hidden')} xmlns="http://www.w3.org/2000/svg" width="90" height="40" viewBox="0 0 90 40" fill="none" aria-label="DLZ">
              <g clipPath="url(#dlz-nl)">
                <path d="M80.9902 26.3561H89.8767V29.6956H76.4054V26.6391L85.2353 13.2809H76.4054V9.94141H89.8767V12.9979L80.9902 26.3561Z" fill="#121B2B"/>
                <path d="M67.9155 26.5542H74.4248V29.6956H63.9534V9.94141H67.9155V26.5542Z" fill="#121B2B"/>
                <path d="M50.5727 9.94141C52.6481 9.94141 54.4688 10.3471 56.0348 11.1584C57.6196 11.9697 58.8366 13.13 59.6856 14.6394C60.5535 16.1299 60.9875 17.8657 60.9875 19.8468C60.9875 21.8279 60.5535 23.5637 59.6856 25.0542C58.8366 26.5259 57.6196 27.6674 56.0348 28.4787C54.4688 29.29 52.6481 29.6956 50.5727 29.6956H43.6672V9.94141H50.5727ZM50.4311 26.3278C52.5066 26.3278 54.1103 25.7617 55.2423 24.6297C56.3744 23.4977 56.9404 21.9034 56.9404 19.8468C56.9404 17.7903 56.3744 16.1865 55.2423 15.0356C54.1103 13.8658 52.5066 13.2809 50.4311 13.2809H47.6293V26.3278H50.4311Z" fill="#121B2B"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M34.2126 10.0862V11.1632L26.5573 15.551V24.3741L34.2126 28.7618V29.8389L24.7546 35.2995L17.1063 30.9158L9.45788 35.2995L-6.10352e-05 29.8389V28.7618L7.65527 24.3741V15.551L-6.10352e-05 11.1632V10.0862L9.45816 4.62549L17.1063 9.00914L24.7543 4.62549L34.2126 10.0862ZM9.45096 15.5509V24.374L17.1063 28.7618L24.7616 24.374V15.5509L17.1063 11.1631L9.45096 15.5509Z" fill="#FC9934"/>
                <path d="M17.1063 39.7149L20.9812 37.4939L17.1063 35.2729L13.2314 37.4939L17.1063 39.7149Z" fill="#121B2B"/>
                <path d="M-6.10352e-05 15.5205L3.87486 17.7415V22.1835L-6.10352e-05 24.4045V15.5205Z" fill="#121B2B"/>
                <path d="M34.2126 15.5205V24.4045L30.3377 22.1835V17.7415L34.2126 15.5205Z" fill="#121B2B"/>
                <path d="M17.1063 4.65145L20.9812 2.43046L17.1063 0.209473L13.2314 2.43046L17.1063 4.65145Z" fill="#121B2B"/>
                <path d="M17.1063 15.5205L20.9812 17.7415V22.1835L17.1063 24.4045L13.2314 22.1835V17.7415L17.1063 15.5205Z" fill="#121B2B"/>
              </g>
              <defs><clipPath id="dlz-nl"><rect width="90" height="39.9248" fill="white"/></clipPath></defs>
            </svg>
            {/* Dark logo */}
            <svg className={cn('dlz-logo', !isDark && 'hidden')} xmlns="http://www.w3.org/2000/svg" width="90" height="40" viewBox="0 0 90 40" fill="none" aria-label="DLZ">
              <g clipPath="url(#dlz-nd)">
                <path d="M80.9901 26.4972H89.8766V29.8367H76.4053V26.7802L85.2352 13.4221H76.4053V10.0825H89.8766V13.139L80.9901 26.4972Z" fill="white"/>
                <path d="M67.9155 26.6953H74.4248V29.8367H63.9534V10.0825H67.9155V26.6953Z" fill="white"/>
                <path d="M50.5725 10.0825C52.6479 10.0825 54.4686 10.4882 56.0346 11.2995C57.6195 12.1108 58.8364 13.2711 59.6854 14.7805C60.5533 16.271 60.9873 18.0068 60.9873 19.9879C60.9873 21.969 60.5533 23.7048 59.6854 25.1953C58.8364 26.667 57.6195 27.8085 56.0346 28.6198C54.4686 29.4311 52.6479 29.8367 50.5725 29.8367H43.667V10.0825H50.5725ZM50.431 26.4689C52.5064 26.4689 54.1101 25.9029 55.2422 24.7708C56.3742 23.6388 56.9402 22.0445 56.9402 19.9879C56.9402 17.9314 56.3742 16.3276 55.2422 15.1767C54.1101 14.0069 52.5064 13.4221 50.431 13.4221H47.6292V26.4689H50.431Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M34.2127 10.0862V11.1632L26.5574 15.551V24.3741L34.2127 28.7618V29.8389L24.7547 35.2995L17.1063 30.9158L9.45794 35.2995L0 29.8389V28.7618L7.65533 24.3741V15.551L0 11.1632V10.0862L9.45822 4.62549L17.1063 9.00914L24.7544 4.62549L34.2127 10.0862ZM9.45102 15.5509V24.374L17.1063 28.7618L24.7617 24.374V15.5509L17.1063 11.1631L9.45102 15.5509Z" fill="#FFC840"/>
                <path d="M17.1064 39.7149L20.9813 37.4939L17.1064 35.2729L13.2314 37.4939L17.1064 39.7149Z" fill="white"/>
                <path d="M0 15.5205L3.87492 17.7415V22.1835L0 24.4045V15.5205Z" fill="white"/>
                <path d="M34.2126 15.5205V24.4045L30.3376 22.1835V17.7415L34.2126 15.5205Z" fill="white"/>
                <path d="M17.1064 4.65145L20.9813 2.43046L17.1064 0.209473L13.2314 2.43046L17.1064 4.65145Z" fill="white"/>
                <path d="M17.1064 15.5205L20.9813 17.7415V22.1835L17.1064 24.4045L13.2314 22.1835V17.7415L17.1064 15.5205Z" fill="white"/>
              </g>
              <defs><clipPath id="dlz-nd"><rect width="90" height="39.9248" fill="white"/></clipPath></defs>
            </svg>
          </a>

          {showNavLinks && (
            <nav className="dlz-nav-links">
              <a href="/introduction" className="dlz-nav-btn">Introduction</a>
              <a href="/components/account-management/accounts" className="dlz-nav-btn">Components</a>
            </nav>
          )}
        </div>

        {/* Right: search + github + theme */}
        <div className="dlz-navbar-right">
          <div className="dlz-search-bar" role="search" aria-label="Site search">
            <Search size={16} className="dlz-search-icon" aria-hidden="true" />
            <span className="dlz-search-placeholder">Search</span>
          </div>

          <a
            href="https://github.com/DataChefHQ/aws-data-landing-zone"
            target="_blank"
            rel="noopener"
            className="dlz-icon-btn"
            aria-label="GitHub repository"
          >
            <GithubIcon size={20} />
          </a>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="dlz-theme-btn gap-2"
          >
            {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
