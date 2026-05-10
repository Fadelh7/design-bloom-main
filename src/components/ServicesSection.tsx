import { motion } from "framer-motion";
import { Palette, Smartphone, FileImage, Sparkles, Package, Target } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Logo design, brand guidelines, and visual identity systems that make your brand memorable",
  },
  {
    icon: Smartphone,
    title: "Social Media Graphics",
    description: "Eye-catching posts, stories, and covers optimized for all major platforms",
  },
  {
    icon: FileImage,
    title: "Marketing Materials",
    description: "Brochures, flyers, posters, and print designs that get your message across",
  },
  {
    icon: Sparkles,
    title: "Digital Design",
    description: "Web graphics, banners, infographics, and presentations that engage",
  },
  {
    icon: Package,
    title: "Packaging Design",
    description: "Product packaging and label designs that stand out on the shelf",
  },
  {
    icon: Target,
    title: "Custom Projects",
    description: "Have something unique in mind? Let's discuss your custom design needs",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            What I Offer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive design solutions tailored to your needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group p-8 rounded-2xl bg-card shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
