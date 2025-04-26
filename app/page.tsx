import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, CreditCard, Lock, Shield, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Home() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur sticky top-0 z-50">
        <Link className="flex items-center justify-center hover:opacity-80 transition-opacity" href="/">
          <Image
            src="/logo.png" // Update with your actual logo path
            alt="PochiYangu Logo"
            width={48}
            height={48}
            className="rounded-lg"
          />
          <span className="ml-2 text-xl font-bold text-gray-800">PochiYangu</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#contact">
            Contact
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm" className="border-gray-300">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900">
                    Your Financial Future Starts Here
                  </h1>
                  <p className="text-lg text-gray-600 md:text-xl max-w-[600px]">
                    Take control of your finances with powerful tools for budgeting, saving, and investing.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="border-gray-300">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/hero-image.png" // Update with your actual image path
                  alt="Financial Dashboard Preview"
                  width={600}
                  height={600}
                  className="rounded-xl shadow-xl border"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Powerful Financial Tools
              </h2>
              <p className="text-gray-600 max-w-[800px] md:text-lg">
                Everything you need to manage your money effectively and reach your financial goals
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 rounded-xl bg-white border border-gray-100 hover:border-blue-100 transition-all shadow-sm hover:shadow-md">
                  <div className={cn(
                    "w-12 h-12 rounded-lg mb-4 flex items-center justify-center",
                    index % 2 === 0 ? "bg-blue-100" : "bg-purple-100"
                  )}>
                    <feature.icon className={cn(
                      "h-6 w-6",
                      index % 2 === 0 ? "text-blue-600" : "text-purple-600"
                    )} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50" id="about">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                    Why Choose PochiYangu?
                  </h2>
                  <p className="text-gray-600 md:text-lg">
                    We combine cutting-edge technology with financial expertise to help you achieve your goals
                  </p>
                </div>
                <ul className="grid gap-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/why-choose-us.jpg" // Update with your actual image path
                  alt="Why Choose Us"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-white font-semibold">PochiYangu</h3>
              <p className="text-sm">Empowering financial freedom through innovative technology</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Company</h4>
              <Link href="#about" className="block text-sm hover:text-white transition-colors">About Us</Link>
              <Link href="#contact" className="block text-sm hover:text-white transition-colors">Contact</Link>
              <Link href="#" className="block text-sm hover:text-white transition-colors">Careers</Link>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Legal</h4>
              <Link href="#" className="block text-sm hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="block text-sm hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="block text-sm hover:text-white transition-colors">Security</Link>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Connect</h4>
              <Link href="#" className="block text-sm hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="block text-sm hover:text-white transition-colors">Facebook</Link>
              <Link href="#" className="block text-sm hover:text-white transition-colors">LinkedIn</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {currentYear} PochiYangu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: CreditCard,
    title: "Smart Payments",
    description: "Instant transfers with industry-low fees"
  },
  {
    icon: BarChart3,
    title: "Wealth Tracking",
    description: "Real-time financial analytics and insights"
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Full banking capabilities in your pocket"
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Military-grade encryption and protection"
  },
  {
    icon: Lock,
    title: "Savings Automation",
    description: "Set it and forget it savings plans"
  },
  {
    icon: BarChart3,
    title: "Investments",
    description: "Grow your wealth with smart portfolios"
  }
]

const benefits = [
  "Bank-level security with 256-bit encryption",
  "Real-time transaction monitoring",
  "Automated savings and budgeting tools",
  "24/7 customer support",
  "FDIC insured deposits",
  "Multi-device synchronization"
]