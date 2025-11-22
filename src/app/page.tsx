'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { Icons } from "@/components/ui/icons";

export default function Landing() {
  const { token } = useAuthStore();
  
  return (
    <div className="bg-gradient-to-b from-secondary/20 to-background">
      <main className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Icons.zap className="h-4 w-4" />
              <span className="text-xs md:text-md">Track your nutrition with ease</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Take Control of Your <span className="text-primary">Health Journey</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
              Track your meals, monitor calories, and achieve your health goals with our intuitive calorie counter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              {token ? (
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="cursor-pointer w-full text-base sm:text-lg px-8 py-4 sm:py-6">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button size="lg" className="cursor-pointer w-full text-base sm:text-lg px-8 py-4 sm:py-6">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link href="/login" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="cursor-pointer w-full text-base sm:text-lg px-8 py-4 sm:py-6">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 md:mt-24">
            {[
              {
                icon: <Icons.trendingUp className="h-8 w-8 text-primary" />,
                title: "Track Progress",
                description: "Monitor your daily calorie intake and nutritional information."
              },
              {
                icon: <Icons.utensils className="h-8 w-8 text-primary" />,
                title: "Meal Logging",
                description: "Easily log your meals and snacks throughout the day."
              },
              {
                icon: <Icons.logo className="h-8 w-8 text-primary" />,
                title: "Detailed Insights",
                description: "Get detailed reports and insights about your eating habits."
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-card p-6 rounded-xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-card/80 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="bg-primary/10 rounded-full p-2 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};