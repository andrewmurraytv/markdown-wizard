import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Converter
        </Button>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <p className="text-muted-foreground mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-foreground mb-3">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Visit Tracking:</strong> We store anonymous visitor IDs (randomly generated UUIDs) in your browser's local storage to track usage patterns and improve our service.</li>
              <li><strong>Usage Analytics:</strong> Basic usage statistics such as visit dates and conversion counts to understand how our tool is being used.</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Optional Email Signup</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Newsletter Subscription:</strong> If you choose to subscribe to our newsletter via the Kit.com form, your email address will be stored by Kit.com for sending updates and tips.</li>
              <li><strong>No Account Required:</strong> You can use our markdown conversion tool without creating any account or providing personal information.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Content</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Text Processing:</strong> All text conversion happens locally in your browser. We do not store, transmit, or have access to the content you convert.</li>
              <li><strong>No Content Retention:</strong> Your markdown conversions are not saved on our servers.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To provide and improve our markdown conversion service</li>
              <li>To understand usage patterns and optimize performance</li>
              <li>To send newsletters and updates if you've opted in via Kit.com</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your information. Our service uses:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
              <li>Secure HTTPS connections</li>
              <li>Industry-standard authentication through Supabase</li>
              <li>Row-level security policies on our database</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Access:</strong> You can request information about data we store about you</li>
              <li><strong>Deletion:</strong> You can request removal from our newsletter if you've subscribed</li>
              <li><strong>Local Data:</strong> You can clear visitor tracking data by clearing your browser's local storage</li>
              <li><strong>No Account Data:</strong> Since no account is required to use the tool, there's no account data to manage</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground">
              Our service uses the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
              <li><strong>Kit.com:</strong> For newsletter subscriptions (optional)</li>
              <li><strong>Visitor Tracking:</strong> For usage analytics</li>
              <li><strong>Microsoft Clarity:</strong> For website analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy or our data practices, please contact us through our support channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify users of any material changes by updating the "Last updated" date at the top of this policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;