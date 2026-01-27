import { Zap, Layout, Layers, RefreshCw, FileCode, Search, Image as ImageIcon, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const features = [
    {
        title: "Intelligent Design Controls",
        description: "Enhance your designs easily using AI-driven controls. Create complete screens using text and natural language, and fine-tune designed screens with precise controls.",
        icon: <Layout className="w-6 h-6 text-white" />,
        color: "bg-blue-600",
        imageAlt: "Intelligent Design Controls Example",
        cta: "Try it now",
        link: "/login"
    },
    {
        title: "Unlimited Design Variations",
        description: "Discover and modify interface elements instantly. Build trendy, adaptive interface options and experiment with diverse UI styles and structures.",
        icon: <RefreshCw className="w-6 h-6 text-white" />,
        color: "bg-pink-600",
        imageAlt: "Design Variations Example",
        cta: "Try it now",
        link: "/signup"
    },
];

function Features() {
    return (
        <section id="features" className="py-24 px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-2xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FF5200] to-orange-600 mb-6 pb-2">
                    AppyScreen's Unique Features
                </h2>
                <p className="text-black/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Explore the tools that empower your design process.
                </p>
            </div>

            <div className="flex flex-col gap-24">
                {features.map((feature, index) => (
                    <div key={index}
                        className={cn(
                            "flex flex-col gap-12 items-center",
                            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                        )}
                    >
                        {/* Visual Side */}
                        <div className="w-full lg:w-1/2 group">
                            <div className="bg-white border border-black/5 rounded-[40px] p-8 md:p-12 h-[300px] md:h-[400px] relative flex items-center justify-center overflow-hidden shadow-2xl shadow-black/5 group-hover:shadow-black/10 transition-shadow duration-500">
                                <div className={cn("absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500", feature.color)} />

                                {/* Placeholder Visual - Replace with actual images/components if available */}
                                <div className="text-center relative z-10">
                                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg", feature.color)}>
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-black/80 mb-2">
                                        {feature.title.split(' ')[0]} Visual
                                    </h4>
                                    <p className="text-sm text-black/40">Mockup for {feature.imageAlt}</p>

                                    {/* Abstract Shapes Decoration */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-transparent to-white/50 rounded-full blur-3xl pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6">
                            <h3 className="text-2xl md:text-4xl font-black text-black leading-tight">
                                {feature.title}
                            </h3>
                            <p className="text-lg text-black/60 leading-relaxed">
                                {feature.description}
                            </p>

                            <ul className="space-y-3 pl-4">
                                {feature.description.split('. ').slice(1).map((item, i) => (
                                    item && (
                                        <li key={i} className="flex items-start gap-3 text-black/70">
                                            <div className={cn("w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0", feature.color)} />
                                            <span>{item.endsWith('.') ? item : item + '.'}</span>
                                        </li>
                                    )
                                ))}
                            </ul>

                            <Link
                                href={feature.link}
                                className={cn(
                                    "inline-block px-6 py-2.5 text-base font-semibold rounded-full border-2 transition-all duration-300 mt-4",
                                    feature.color.replace('bg-', 'border-').replace('600', '700') + ' ' + feature.color.replace('bg-', 'text-').replace('600', '700') + ' hover:' + feature.color + ' hover:text-white'
                                )}
                            >
                                {feature.cta}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features
