import { HeroSection }        from '@/components/marketing/HeroSection'
import { FeaturesSection }     from '@/components/marketing/FeaturesSection'
import { ROISimulator }        from '@/components/marketing/ROISimulator'
import { ComparisonSection }   from '@/components/marketing/ComparisonSection'
import { PricingSection }      from '@/components/marketing/PricingSection'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { FAQSection }          from '@/components/marketing/FAQSection'
import { CTASection }          from '@/components/marketing/CTASection'
import { DevPopup }            from '@/components/marketing/DevPopup'

export default function HomePage() {
  return (
    <>
      <DevPopup />
      <HeroSection />
      <FeaturesSection />
      <ROISimulator />
      <ComparisonSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
