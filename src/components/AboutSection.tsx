import { motion } from "framer-motion";
import { Check } from "lucide-react";
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

const features = [
  "Professional Quality",
  "Fast Turnaround",
  "Unlimited Revisions",
  "Client-Focused Approach",
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Hi, I'm <span className="text-gradient">Hala</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              A passionate graphic designer dedicated to creating visual solutions
              that make an impact. With expertise in brand identity, digital design,
              and marketing materials, I help businesses and individuals bring their
              creative visions to life.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Every project is an opportunity to craft something unique and
              meaningful. I believe great design is not just about aesthetics—it's
              about solving problems and telling stories that resonate with your
              audience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
       
            {/* Creative design showcase grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="aspect-square rounded-2xl bg-gradient-primary p-6 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={portfolioItems[0].image}
                  alt={portfolioItems[0].title}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl"
                />
              </motion.div>
              <motion.div 
                className="aspect-square rounded-2xl bg-secondary/20 border border-border p-6 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={portfolioItems[1].image}
                  alt={portfolioItems[1].title}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl"
                />
              </motion.div>
              <motion.div 
                className="aspect-square rounded-2xl bg-accent/20 border border-border p-6 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={portfolioItems[2].image}
                  alt={portfolioItems[2].title}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl"
                />
              </motion.div>
              <motion.div 
                className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border p-6 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={portfolioItems[3].image}
                  alt={portfolioItems[3].title}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl"
                />
              </motion.div>
            </div>
           
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-primary/30 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-secondary/30 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
