
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">Last updated: May 19, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>Welcome to CourseHub ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us when you:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Register for an account</li>
              <li>Book a course</li>
              <li>Contact our customer service</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain our services</li>
              <li>Process transactions</li>
              <li>Send you administrative information</li>
              <li>Send marketing communications</li>
              <li>Respond to your comments or inquiries</li>
              <li>Improve our website and services</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies and Similar Technologies</h2>
            <p>We use cookies and similar technologies to collect information about your browsing activities. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Websites</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of such websites.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Our Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@coursehub.com.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
