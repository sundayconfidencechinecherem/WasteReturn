import Link from "next/link";
import { 
  ArrowRightIcon, 
  RecycleIcon, 
  LeafIcon, 
  AwardIcon,
  TruckIcon,
  SmartphoneIcon,
  UsersIcon
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-[#1976D2] to-[#0D47A1] text-white">
        <div className="container mx-auto px-4 py-20">
          <nav className="flex justify-between items-center mb-16">
            <div className="text-2xl font-bold font-display">TrashEarn</div>
            <div className="space-x-4">
              <Link href="/auth/login" className="px-4 py-2 text-white hover:text-gray-200 transition">
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="px-6 py-2 bg-white text-[#1976D2] rounded-full font-medium hover:bg-gray-100 transition"
              >
                Sign Up
              </Link>
            </div>
          </nav>
          
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
              Every Waste Has Value
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Sort right, earn points, and get paid for your waste. 
              Join the revolution in waste management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/register" 
                className="px-8 py-4 bg-gold text-gray-900 rounded-full font-semibold text-lg hover:bg-[#FFC800] transition flex items-center justify-center gap-2"
              >
                Start Earning Today
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link 
                href="#how-it-works" 
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold text-lg hover:bg-white/30 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Waste Diverted", value: "5,000+", unit: "tons", icon: RecycleIcon },
              { label: "Active Users", value: "50,000+", unit: "households", icon: UsersIcon },
              { label: "Points Paid", value: "₦50M+", unit: "earned", icon: AwardIcon },
              { label: "CO2 Prevented", value: "10,000+", unit: "tons", icon: LeafIcon },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#1976D2]" />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Three simple steps to turn your waste into value
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sort Your Waste",
                description: "Separate your waste by category. Use our guide to sort perfectly and earn bonuses.",
                icon: RecycleIcon,
                color: "from-[#1976D2] to-[#0D47A1]"
              },
              {
                step: "02",
                title: "Schedule Pickup",
                description: "Book a pickup or visit a drop-off center. Track your driver in real-time.",
                icon: TruckIcon,
                color: "from-[#2E7D32] to-[#1B5E20]"
              },
              {
                step: "03",
                title: "Earn Points",
                description: "Get points based on weight and sorting quality. Cash out or redeem rewards.",
                icon: AwardIcon,
                color: "from-[#FFD700] to-[#FFA000]"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 relative">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${item.color} rounded-bl-2xl rounded-tr-2xl flex items-center justify-center text-white font-bold text-2xl`}>
                  {item.step}
                </div>
                <item.icon className="w-12 h-12 text-[#1976D2] mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waste Categories Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What You Can Recycle</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Every type of waste has value. Sort right and earn more points.
          </p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Plastics", icon: "🧴", points: "40 pts/kg", color: "bg-[#00796B]" },
              { name: "Aluminum", icon: "🥫", points: "100 pts/kg", color: "bg-[#F57C00]" },
              { name: "Paper", icon: "📄", points: "20 pts/kg", color: "bg-[#FF8F00]" },
              { name: "Glass", icon: "🥤", points: "10 pts/kg", color: "bg-[#00ACC1]" },
              { name: "Electronics", icon: "📱", points: "200 pts/kg", color: "bg-[#7B1FA2]" },
            ].map((category, index) => (
              <div key={index} className={`${category.color} rounded-xl p-6 text-white text-center`}>
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-bold mb-1">{category.name}</h3>
                <p className="text-sm opacity-90">{category.points}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/auth/register" 
              className="inline-flex items-center gap-2 text-[#1976D2] font-semibold hover:underline"
            >
              See all waste categories
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-[#1976D2] to-[#0D47A1] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of households already turning their waste into value.
          </p>
          <Link 
            href="/auth/register" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-gray-900 rounded-full font-semibold text-lg hover:bg-[#FFC800] transition"
          >
            Create Your Account
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TrashEarn</h3>
              <p className="text-gray-400 text-sm">
                Every waste has value. Sort right, earn more.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/categories" className="hover:text-white">Waste Categories</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Download App</h4>
              <div className="flex gap-2">
                <Link href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700">
                  <SmartphoneIcon className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 TrashEarn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}