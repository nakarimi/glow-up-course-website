
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <div className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
          <div className="container mx-auto px-4 pt-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
              <p className="text-muted-foreground text-lg">
                Learn more about our mission to provide excellent training opportunities
              </p>
            </div>
          </div>
        </div>
        
        {/* About content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At CourseHub, we believe in the power of education to transform careers and lives. 
                  Since 1993, we've been committed to providing high-quality, industry-relevant training 
                  courses that help professionals achieve their career goals.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our comprehensive range of courses is designed by industry experts and delivered by 
                  experienced instructors who are passionate about sharing their knowledge and expertise.
                </p>
                <p className="text-muted-foreground">
                  Whether you're looking to upskill, reskill, or stay current with industry trends, 
                  we have courses that cater to your professional development needs.
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do at CourseHub
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in all aspects of our training delivery, from course content to instructor quality.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Inclusivity</h3>
                <p className="text-muted-foreground">
                  We believe education should be accessible to all and design our courses with diverse learning needs in mind.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our courses and delivery methods to stay ahead of industry trends and technological advancements.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-lg p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Join Our Training Community</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Ready to take the next step in your professional development journey?
                Explore our courses or get in touch with our team to discuss your training needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">Explore Courses</Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white hover:text-blue-700">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
