import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-gradient-dark py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a href="#home" className="text-2xl font-bold text-gradient font-display inline-block mb-4">
            Design by Hala
          </a>
          <p className="text-muted-foreground/80 mb-2">
            Crafting beautiful designs, one project at a time.
          </p>
          <p className="text-muted-foreground/60 text-sm">
            © {new Date().getFullYear()} Design by Hala. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
