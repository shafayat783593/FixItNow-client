import Hero from './(home)/hero'
import About from './(home)/About'
import CoreStrengths from './(home)/Corestrengths'
import TechniciansSection from './(home)/TechniciansSection'
import Services from './(home)/services'
import Footer from './(home)/Footer'
import CategoriesShowcase from './(home)/CategoriesShowcase'
import StatsBar from './(home)/Statsbar'
import TestimonialsSection from './(home)/Testimonialssection'
import FAQSection from './(home)/Faqsection'
import CTASection from './(home)/Ctasection'
import BlogHighlights from './(home)/Bloghighlights'

function page() {
  return (
    <>
      <Hero/>
      <About/>
      <CoreStrengths />
      <CategoriesShowcase />
      <Services />
      <TechniciansSection />
      <StatsBar />
      <TestimonialsSection />
      <BlogHighlights />
      <FAQSection />
      <CTASection />
      <Footer/>

    </>
  )
}

export default page