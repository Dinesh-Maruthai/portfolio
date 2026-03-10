import './App.css'
import Hero    from './components/Hero/Hero'
import About   from './components/About/About'
import Skills  from './components/Skills/Skills'
import Work    from './components/Work/Work'
import HireMe  from './components/HireMe/HireMe'
import Contact from './components/Contact/Contact'

function App() {
  return (
    <main className="app">
      <Hero />
      <About />
      <Skills />
      <Work />
      <HireMe />
      <Contact />
    </main>
  )
}

export default App
