type SiteHeaderProps = { onAbout: () => void }

export default function SiteHeader({ onAbout }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="NOIR AUTO — начало страницы" lang="en">
        NOIR<span>AUTO</span><span className="brand__mark" aria-hidden="true" />
      </a>
      <nav className="site-nav" aria-label="Главная навигация">
        <a className="site-nav__link" href="#philosophy">Философия</a>
        <a className="site-nav__link" href="#services">Услуги</a>
        <button className="site-nav__link site-nav__about" onClick={onAbout}>О проекте <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M7 6h11v11" /></svg></button>
      </nav>
    </header>
  )
}
