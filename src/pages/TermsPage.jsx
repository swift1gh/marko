const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Terms of Service
      </h1>

      <div className="prose prose-purple max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600 mb-4">
            By accessing and using Marko, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use
            our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. User Accounts
          </h2>
          <p className="text-gray-600 mb-4">
            To use certain features of our platform, you must register for an
            account. You are responsible for maintaining the confidentiality of
            your account information and for all activities that occur under
            your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. Student Verification
          </h2>
          <p className="text-gray-600 mb-4">
            Marko is exclusively for students. By creating an account, you
            confirm that you are currently enrolled in an accredited educational
            institution. We reserve the right to verify your student status and
            may require additional documentation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Buying and Selling
          </h2>
          <p className="text-gray-600 mb-4">
            As a buyer, you agree to pay the full price for items you purchase,
            including any applicable taxes and shipping fees. As a seller, you
            agree to accurately describe your items and fulfill orders as
            described.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Payment and Refunds
          </h2>
          <p className="text-gray-600 mb-4">
            We accept various payment methods as indicated on our platform.
            Refunds are subject to our refund policy and may require approval
            from the seller.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Prohibited Activities
          </h2>
          <p className="text-gray-600 mb-4">
            Users may not engage in any of the following activities:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Posting false or misleading information</li>
            <li>Attempting to circumvent our payment system</li>
            <li>Harassing or abusing other users</li>
            <li>Violating any applicable laws or regulations</li>
            <li>Using automated systems to access our platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Intellectual Property
          </h2>
          <p className="text-gray-600 mb-4">
            All content on Marko, including text, graphics, logos, and software,
            is the property of Marko or its licensors and is protected by
            intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-600 mb-4">
            Marko is not liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of or
            inability to use our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            9. Changes to Terms
          </h2>
          <p className="text-gray-600 mb-4">
            We reserve the right to modify these terms at any time. We will
            notify users of any material changes via email or through our
            platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            10. Contact Information
          </h2>
          <p className="text-gray-600">
            If you have any questions about these Terms of Service, please
            contact us at support@marko.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
