'use client';
import { useState } from 'react';

export default function FaqSection({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section style={{ marginTop: '80px', paddingTop: '56px', borderTop: '1px dashed var(--border-strong)', position: 'relative' }}>


      <span className="label" style={{ marginBottom: '16px' }}>FAQ Guide</span>
      <h2 style={{ fontSize: '32px', marginBottom: '32px', fontFamily: 'var(--font-display)', fontWeight: '500' }}>
        Frequently Asked Questions
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index} 
              style={{
                background: '#ffffff',
                border: isOpen ? '1px solid var(--accent-secondary)' : '1px dashed var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                cursor: 'pointer',
                transition: 'var(--transition)',
                boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.02)' : 'none'
              }}
              onClick={() => toggleFaq(index)}
            >
              {/* Question Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <h4 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: isOpen ? 'var(--accent-secondary)' : 'var(--text-primary)',
                  transition: 'var(--transition-fast)'
                }}>
                  {faq.question}
                </h4>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '300',
                  color: isOpen ? 'var(--accent-secondary)' : 'var(--text-muted)',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  display: 'inline-block'
                }}>
                  +
                </span>
              </div>

              {/* Answer Content */}
              <div style={{
                maxHeight: isOpen ? '500px' : '0px',
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                marginTop: isOpen ? '16px' : '0px'
              }}>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.75',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
