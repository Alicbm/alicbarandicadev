import { Analytics } from "@vercel/analytics/react"
import { LanguageProvider } from './context/LanguageContext'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CopyToast from './components/CopyToast'

function App() {
  return (
    <LanguageProvider>
      <Analytics/>
      <CopyToast />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  )
}

export default App
