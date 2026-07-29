import Hero from './(home)/hero'
import About from './(home)/About'
import CoreStrengths from './(home)/Corestrengths'
import TechniciansSection from './(home)/TechniciansSection'

function page() {
  return (
    <>
       <Hero/>
      <About/>
      <CoreStrengths />
    <TechniciansSection/>
    
    </>
  )
}

export default page