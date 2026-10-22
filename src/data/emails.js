export const mockPhishingEmail = {
  id: 'email-phish-001',
  senderName: 'MarketSphere IT Notifications',
  senderAddress: 'it-notifications@marketsphere-ops-portal.internal',
  spoofedDisplay: 'MarketSphere IT Operations <security-alert@marketsphere-ops-portal.internal>',
  recipientName: 'Melaku Girmachew',
  recipientEmail: 'melakugir12@gmail.com',
  date: 'Thursday, October 22, 2026 at 09:14 AM',
  subject: 'Action Required — Administrator Session Verification',
  isFlagged: true,
  bodyText: `Hello Melaku,

Our simulated security system has flagged your administrator session for verification. Please review the notification using the link below to avoid service interruption to your Marketplace Operations portal.

Review Administrator Session

MarketSphere IT Operations
Addis Ababa Regional Operations Hub`,
  analysis: {
    convincingFactors: [
      'Targets an actual administrative role and uses the employee’s known name and contact point.',
      'References a legitimate internal portal context ("Marketplace Operations").',
      'Mimics standard corporate IT automated alerts with clean formatting and branding.',
    ],
    redFlags: [
      'Sender domain mismatch: uses "marketsphere-ops-portal.internal" instead of official verified internal mail servers.',
      'Artificial urgency: "Action Required" and threat of access suspension coerce immediate reaction.',
      'Generic verification link that bypasses normal single-sign-on (SSO) browser bookmarks.',
      'Sent to a display Gmail address rather than a dedicated corporate SSO identity provider.',
    ],
    presenterNotes: 'This demonstrates a "Spear Phishing" attack. Attackers do not send random mass emails; they personalize the pretext based on OSINT research gathered on LinkedIn, tech conference programs, or social media.',
  },
};
