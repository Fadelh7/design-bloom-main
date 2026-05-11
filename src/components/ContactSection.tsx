import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Instagram, Linkedin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
// Removed Formspree in favor of direct mailto submission

const services = [
  { value: "branding", label: "Brand Identity" },
  { value: "social", label: "Social Media Graphics" },
  { value: "marketing", label: "Marketing Materials" },
  { value: "digital", label: "Digital Design" },
  { value: "packaging", label: "Packaging Design" },
  { value: "custom", label: "Custom Project" },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const API_BASE =
    (import.meta as any).env?.VITE_API_BASE ?? (import.meta.env.DEV ? "http://localhost:5000" : "");

  // Submit via backend API to deliver to the target inbox
  const handleApiSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
        className: "bg-green-500 text-white border-green-600",
      });
      setFormData({ name: "", email: "", service: "", message: "" });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-24 h-20 rounded-xl bg-white shadow-glow flex items-center justify-center">
              <img src="/favicon.ico" alt="Design by Hala" className="w-24 h-24 rounded-md" />
            </div>
            
          </div>
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your project to life? Get in touch!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleApiSubmit}
            className="lg:col-span-3 space-y-6"
            aria-busy={submitting}
          >
            {/* Backend submission to /api/send-message */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={submitting}
                className="h-14 text-base bg-background border-border/50 focus:border-primary disabled:opacity-60"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={submitting}
                className="h-14 text-base bg-background border-border/50 focus:border-primary disabled:opacity-60"
              />
            </div>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
            >
              <SelectTrigger disabled={submitting} className="h-14 text-base bg-background border-border/50 focus:border-primary disabled:opacity-60">
                <SelectValue placeholder="Select a Service" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {services.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Tell me about your project"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              disabled={submitting}
              className="text-base bg-background border-border/50 focus:border-primary resize-none disabled:opacity-60"
            />
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full sm:w-auto bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <span className="inline-flex items-center">
                  Sending
                  <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                </span>
              ) : (
                <span className="inline-flex items-center">
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </span>
              )}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">Email</h3>
              <a
                href="mailto:hello@designbyhala.art"
                className="text-primary hover:underline"
              >
                hello@designbyhala.art
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
              <h3 className="text-lg font-bold font-display mb-4">Follow Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/designbyhalaa?igsh=ZTF6Nzk3YzhsbDM0&utm_source=qr"
                  className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://lb.linkedin.com/in/hala-maali-b6a0b0220"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.465 9.535L13.83 3.62c-.49-.335-1.19-.335-1.68 0L3.515 9.535c-.475.325-.515.945-.09 1.32.42.38 1.07.335 1.45-.1l.09-.08 7.02-4.52 7.02 4.52c.19.13.42.2.66.2.28 0 .55-.105.76-.3.42-.375.38-.995-.09-1.32l.13.08zm-.91 6.135L13.83 9.82c-.49-.335-1.19-.335-1.68 0L4.425 15.67c-.28.19-.425.51-.425.85v2.63c0 .58.47 1.05 1.05 1.05h13.9c.58 0 1.05-.47 1.05-1.05v-2.63c0-.34-.145-.66-.445-.85z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
