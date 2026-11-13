const footerLinks = [
  { href: '#home', text: 'Главная' },
  { href: '#philosophy', text: 'Философия' },
  { href: '#services', text: 'Услуги' },
  { href: '#before-after', text: 'До / После' },
  { href: '#process', text: 'Процесс' },
  { href: '#configurator', text: 'Конфигуратор' },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-container">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <a className="brand" href="#home" aria-label="NOIR AUTO — вернуться к началу" lang="en">NOIR<span>AUTO</span><span className="brand__mark" aria-hidden="true" /></a>
            <p>Концепция студии автомобильного детейлинга.<br />Уход, восстановление и защита автомобиля.</p>
          </div>
          <nav className="site-footer__nav" aria-label="Навигация в футере">
            {footerLinks.map((link) => <a href={link.href} key={link.href}>{link.text}</a>)}
          </nav>
        </div>
        <p className="site-footer__disclaimer">NOIR AUTO — демонстрационный проект. Не является действующим коммерческим предложением.</p>
      </div>
    </footer>
  )
}
