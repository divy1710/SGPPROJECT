import { Button } from "@/components/ui/button";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "./Navbar";

export default function Home() {
  const handleGetStarted = () => {
    console.log("Get Started Clicked");
  };

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]); // Adjusted for mobile screens
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <>
      {/* Hero Section with Scroll Effect */}
      <Navbar/>
      <motion.section 
        style={{ y, opacity }} 
        className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center"
      >
        <div className="text-center space-y-6 max-w-3xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Connect Students with Faculty
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Askera is your platform for seamless communication between students and faculty members. 
            Get instant answers to your questions and enhance your learning experience.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
