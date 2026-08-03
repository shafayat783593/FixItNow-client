import Hero from './(home)/hero'
import About from './(home)/About'
import CoreStrengths from './(home)/Corestrengths'
import TechniciansSection from './(home)/TechniciansSection'
import Services from './(home)/services'
import Footer from './(home)/Footer'

function page() {
  return (
    <>
       <Hero/>
      <About/>
      <CoreStrengths />
      <TechniciansSection />
      <Services />
      <Footer/>
    
    </>
  )
}

export default page