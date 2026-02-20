import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Wallet, PieChart, Upload, Bot, BarChart3, ChevronRight, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#171717] font-sans selection:bg-[#E5E5E5] selection:text-[#171717]">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-white pointer-events-none" />

      {/* Header */}
      <header className="relative z-50 flex h-16 items-center px-6 md:px-12 bg-white/80 backdrop-blur-md border-b border-black/[0.04]">
        <Link className="flex items-center gap-2.5 group" href="#">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Finfox</span>
        </Link>
        <nav className="ml-auto flex gap-6 items-center">
          <Link className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors" href="/login">
            Log in
          </Link>
          <Button asChild size="sm" className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-full px-5 font-medium h-9 shadow-sm">
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 relative z-10 flex flex-col">
        <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col items-center justify-center relative overflow-hidden">
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
              
              <div className="inline-flex items-center rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-xs font-semibold text-blue-600 shadow-sm transition-colors cursor-pointer cursor-default mb-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                <span>Introducing Finfox Intelligence</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 text-neutral-400" />
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl font-heading font-bold tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.05]">
                  Financial clarity <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                    without the complexity.
                  </span>
                </h1>
                <p className="mx-auto max-w-[650px] text-lg text-neutral-500 md:text-xl leading-relaxed font-medium tracking-tight">
                  Connect your accounts, drag-and-drop statements, and let our intelligent engine securely organize your financial life.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
                <Button asChild className="h-12 px-8 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 font-medium text-base shadow-lg shadow-neutral-900/10 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
                  <Link href="/register">
                    Start for free <ArrowRight className="w-4 h-4 ml-2 opacity-80" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 px-8 rounded-full border-black/10 bg-white hover:bg-neutral-50 text-neutral-900 font-medium text-base shadow-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto">
                  <Link href="/login">
                    Book a demo
                  </Link>
                </Button>
              </div>
              
              <div className="pt-8 flex items-center gap-6 text-sm font-medium text-neutral-400">
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Bank-grade security</div>
                <div className="flex items-center gap-2"><Zap className="w-4 h-4" /> Setup in minutes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Product UI Preview / App Window Mockup */}
        <section className="w-full pb-24 relative z-20 px-4 md:px-8 max-w-6xl mx-auto">
           <div className="rounded-2xl border border-black/[0.04] bg-white shadow-2xl shadow-black/[0.04] overflow-hidden">
             <div className="bg-neutral-50 border-b border-black/[0.04] px-4 py-3 flex items-center gap-2">
               <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
               </div>
             </div>
             <div className="h-[400px] w-full bg-neutral-50/50 flex flex-col items-center justify-center p-8 text-center border-t border-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                  {/* Mock UI Cards */}
                  <div className="bg-white p-6 rounded-xl border border-black/[0.04] shadow-sm flex flex-col items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                      <Wallet className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-sm font-medium text-neutral-500 mb-1">Total Balance</div>
                    <div className="text-2xl font-bold text-neutral-900">$24,500.00</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-black/[0.04] shadow-sm flex flex-col items-start">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                      <PieChart className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-sm font-medium text-neutral-500 mb-1">Monthly Trend</div>
                    <div className="text-2xl font-bold text-emerald-600">+12.5%</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-black/[0.04] shadow-sm flex flex-col items-start md:col-span-1 col-span-1 hidden md:flex text-left">
                     <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                      <Bot className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-sm font-medium text-neutral-900 mb-1">AI Insight</div>
                    <div className="text-sm text-neutral-500">You spent 20% less on dining this month. Great job!</div>
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* Feature Grid */}
        <section className="w-full py-24 bg-white border-t border-black/[0.04] relative z-20">
          <div className="container px-4 md:px-8 mx-auto max-w-6xl">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-heading font-bold tracking-tight text-neutral-900 sm:text-4xl">Everything you need to manage your wealth.</h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Upload, title: "Universal Parser", desc: "Drag and drop any bank statement (PDF or CSV). Our engine handles the rest." },
                { icon: Wallet, title: "Automated Rules", desc: "Set up powerful auto-categorization. Transactions are organized automatically." },
                { icon: PieChart, title: "Precision Analytics", desc: "Gain highly detailed views into your cash flow with interactive charts." },
                { icon: Bot, title: "AI Integration", desc: "Query your data using natural language to get immediate answers." },
                { icon: ShieldCheck, title: "Secure by Design", desc: "Your data is encrypted and securely stored. We never sell your information." },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-start p-8 bg-neutral-50 rounded-2xl border border-black/[0.04] transition-all hover:bg-white hover:shadow-lg hover:shadow-black/[0.02] hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-white border border-black/[0.04] shadow-sm flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-neutral-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-500 text-base leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col md:flex-row py-8 w-full items-center justify-between px-6 md:px-12 border-t border-black/[0.04] bg-white">
        <p className="text-sm font-medium text-neutral-500">© 2024 Finfox Inc. All rights reserved.</p>
        <nav className="flex gap-6 mt-4 md:mt-0 font-medium text-sm">
          <Link className="text-neutral-500 hover:text-neutral-900 transition-colors" href="#">
            Terms
          </Link>
          <Link className="text-neutral-500 hover:text-neutral-900 transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
