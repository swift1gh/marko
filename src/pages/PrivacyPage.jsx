const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-purple max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Name and contact information</li>
            <li>Student verification details</li>
            <li>Payment information</li>
            <li>Account credentials</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Process your transactions</li>
            <li>Verify your student status</li>
            <li>Communicate with you about your account</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our platform and services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. Information Sharing
          </h2>
          <p className="text-gray-600 mb-4">
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Service providers who assist in our operations</li>
            <li>Payment processors to handle transactions</li>
            <li>Law enforcement when required by law</li>
            <li>Other users (only information you choose to share)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-600 mb-4">
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the internet is
            100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Your Rights
          </h2>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Cookies and Tracking
          </h2>
          <p className="text-gray-600 mb-4">
            We use cookies and similar tracking technologies to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Remember your preferences</li>
            <li>Analyze site usage</li>
            <li>Improve user experience</li>
            <li>Provide personalized content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Children's Privacy
          </h2>
          <p className="text-gray-600 mb-4">
            Our platform is intended for students aged 18 and older. We do not
            knowingly collect information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8. Changes to Privacy Policy
          </h2>
          <p className="text-gray-600 mb-4">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            9. Contact Us
          </h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact
            us at privacy@marko.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
