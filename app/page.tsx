import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { LocationSection } from "@/components/location-section";
import { TimelineSection } from "@/components/timeline-section";
import { SignupSection } from "@/components/signup-section";
import { Footer } from "@/components/footer";
import { AnalyticsTracker } from "@/components/analytics-tracker";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <AnalyticsTracker />
      <Navigation />
      <HeroSection />
      <LocationSection />
      <TimelineSection />
      <SignupSection />
      <Footer />
    </main>
  );
}
