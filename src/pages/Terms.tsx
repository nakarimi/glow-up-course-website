
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">Last updated: May 19, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>These Terms and Conditions ("Terms") govern your access to and use of CourseHub's website and services. By accessing or using our services, you agree to be bound by these Terms.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Account Registration</h2>
            <p>To access certain features of our services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Course Bookings</h2>
            <p>When you book a course through our platform, you agree to the following:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>You are responsible for ensuring that the course details (date, location, number of attendees) are correct before confirming your booking.</li>
              <li>Payment is required at the time of booking unless otherwise specified.</li>
              <li>Cancellations and refunds are subject to our Cancellation Policy.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cancellation Policy</h2>
            <p>Our standard cancellation policy is as follows:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cancellations made more than 14 days before the course start date: Full refund</li>
              <li>Cancellations made 7-14 days before the course start date: 50% refund</li>
              <li>Cancellations made less than 7 days before the course start date: No refund</li>
              <li>You may transfer your booking to another person at no additional cost.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
            <p>All content on our website, including text, graphics, logos, images, and course materials, is the property of CourseHub or our licensors and is protected by intellectual property laws.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>CourseHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, our services.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on this page.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at legal@coursehub.com.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
