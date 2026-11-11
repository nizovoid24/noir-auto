import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import Services from './sections/Services'
import BeforeAfter from './sections/BeforeAfter'
import Process from './sections/Process'
import DetailingConfigurator from './sections/DetailingConfigurator'
import FinalCta from './sections/FinalCta'
import SiteFooter from './components/SiteFooter'
import './styles/sections.css'
import './styles/completion.css'

export default function App() {
  return (
    <>
      <main><Hero /><Philosophy /><Services /><BeforeAfter /><Process /><DetailingConfigurator /><FinalCta /></main>
      <SiteFooter />
    </>
  )
}
