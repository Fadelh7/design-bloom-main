import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import book from "@/assets/book.JPG";
import castro from "@/assets/castro.JPG";
import mobileapp from "@/assets/mobileapp.JPG";
import soaps from "@/assets/soaps.JPG";

const portfolioItems = [
  {
    title: "Book Design",
    category: "Editorial & Layout",
    image: book,
  },
  {
    title: "Castro Branding",
    category: "Brand Identity",
    image: castro,
  },
  {
    title: "Mobile App UI",
    category: "App Design & UX",
    image: mobileapp,
  },
  {
    title: "Soap Packaging",
    category: "Product Design",
    image: soaps,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

export const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A glimpse of recent projects that showcase creativity and precision
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {portfolioItems.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                <ExternalLink className="w-10 h-10 text-background mb-4" />
                <h3 className="text-2xl font-bold font-display text-background mb-2">
                  {item.title}
                </h3>
                <p className="text-background/80">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
