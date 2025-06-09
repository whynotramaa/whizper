import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  verifyCode: string;
  companyName?: string;
  supportEmail?: string;
  unsubscribeUrl?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> =  ({
  username,
  verifyCode,
  companyName = "Whizper",
  supportEmail = "ramaa.framer.site",
  unsubscribeUrl = "#"
}) => (
  <div style={{
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333333',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff'
  }}>
    {/* Header */}
    <div style={{
      backgroundColor: '#4f46e5',
      padding: '40px 30px',
      textAlign: 'center' as const
    }}>
      <h1 style={{
        color: '#ffffff',
        fontSize: '28px',
        fontWeight: 'bold',
        margin: '0',
        letterSpacing: '-0.5px'
      }}>
        Welcome to {companyName}!
      </h1>
    </div>

    {/* Main Content */}
    <div style={{
      padding: '40px 30px'
    }}>
      <h2 style={{
        color: '#1f2937',
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
        marginTop: '0'
      }}>
        Hello {username}! 👋
      </h2>

      <p style={{
        fontSize: '16px',
        marginBottom: '20px',
        color: '#4b5563'
      }}>
        We are thrilled to have you join our community! Your account has been successfully created and you are all set to get started.
      </p>

      <p style={{
        fontSize: '16px',
        marginBottom: '30px',
        color: '#4b5563'
      }}>
        Here is what you can do next:
      </p>

      {/* Action Items */}
      <div style={{
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '25px',
        marginBottom: '30px'
      }}>
        <ul style={{
          margin: '0',
          paddingLeft: '20px',
          color: '#4b5563'
        }}>
          <li style={{ marginBottom: '10px' }}>
            Complete your profile to personalize your experience
          </li>
          <li style={{ marginBottom: '10px' }}>
            Explore our features and discover what is possible
          </li>
          <li style={{ marginBottom: '10px' }}>
            Connect with our community and start collaborating
          </li>
        </ul>
      </div>

      {/* CTA Button */}
      <div style={{
        textAlign: 'center' as const,
        marginBottom: '30px'
      }}>
        <a
          href="#"
          style={{
            display: 'inline-block',
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '14px 28px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'background-color 0.2s'
          }}
        >
          Get Started Now
        </a>
      </div>

      <p style={{
        fontSize: '16px',
        marginBottom: '20px',
        color: '#4b5563'
      }}>
        Need help getting started? Our support team is here to assist you every step of the way.
      </p>

      {/* Support Section */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px'
      }}>
        <h3 style={{
          color: '#1e40af',
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 10px 0'
        }}>
          Need Support?
        </h3>
        <p style={{
          margin: '0',
          color: '#1e40af',
          fontSize: '14px'
        }}>
          Have questions? Reach out to us at{' '}
          <a
            href={`mailto:${supportEmail}`}
            style={{
              color: '#1e40af',
              textDecoration: 'underline'
            }}
          >
            {supportEmail}
          </a>
        </p>
      </div>

      <p style={{
        fontSize: '16px',
        color: '#4b5563',
        marginBottom: '0'
      }}>
        Welcome aboard!<br />
        The {companyName} Team
      </p>
    </div>

    {/* Footer */}
    <div style={{
      backgroundColor: '#f9fafb',
      padding: '30px',
      borderTop: '1px solid #e5e7eb',
      textAlign: 'center' as const
    }}>
      <p style={{
        fontSize: '14px',
        color: '#6b7280',
        margin: '0 0 15px 0'
      }}>
        © 2025 {companyName}. All rights reserved.
      </p>
      
      <div style={{
        fontSize: '12px',
        color: '#9ca3af'
      }}>
        <a
          href={unsubscribeUrl}
          style={{
            color: '#9ca3af',
            textDecoration: 'underline',
            marginRight: '15px'
          }}
        >
          Unsubscribe
        </a>
        <a
          href="#"
          style={{
            color: '#9ca3af',
            textDecoration: 'underline',
            marginRight: '15px'
          }}
        >
          Privacy Policy
        </a>
        <a
          href="#"
          style={{
            color: '#9ca3af',
            textDecoration: 'underline'
          }}
        >
          Terms of Service <div className='hidden'>{verifyCode}</div>
        </a>
      </div>
    </div>
  </div>
);