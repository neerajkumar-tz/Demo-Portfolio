'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const TRIPS_DATA = [
  {
    id: 1,
    name: 'Washington D.C. History Trip',
    meta: '55 students · Mar 14–18',
    status: 'Registering',
    statusClass: 'registering',
    payment: '$38,500',
    travelers: 55
  },
  {
    id: 2,
    name: 'New York Performing Arts Tour',
    meta: '48 students · Apr 2–4',
    status: 'Active',
    statusClass: 'active',
    payment: '$58,200',
    travelers: 48
  },
  {
    id: 3,
    name: 'Gettysburg Battlefield Experience',
    meta: '60 students · May 9–10',
    status: 'Launching',
    statusClass: 'launching',
    payment: '$24,000',
    travelers: 60
  },
  {
    id: 4,
    name: 'Philadelphia Colonial Heritage',
    meta: '72 students · Jun 6',
    status: 'Draft',
    statusClass: 'draft',
    payment: '$0',
    travelers: 72
  }
];

export default function InteractiveHero() {
  const [activeTrip, setActiveTrip] = useState(TRIPS_DATA[0]);
  const [paymentCount, setPaymentCount] = useState(250);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Animate payments collected stats counting up
    const interval = setInterval(() => {
      setPaymentCount((prev) => {
        if (prev >= 284) {
          clearInterval(interval);
          return 284;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="voyita-section" style={{ background: 'linear-gradient(180deg, var(--voyita-navy-dark) 0%, var(--voyita-navy) 100%)', borderBottom: '1px solid var(--voyita-border)', paddingTop: '100px' }}>
      <div className="voyita-container">
        <div className="voyita-hero-grid">
          
          {/* Hero Typography column */}
          <div className="voyita-hero-text">
            <span className="voyita-badge voyita-badge-blue" style={{ marginBottom: '20px' }}>
              Purpose-built for SYTA operators
            </span>
            <h1 className="voyita-h1">
              Group travel management <br />
              software <span>without the chaos</span>
            </h1>
            <p className="voyita-lead" style={{ marginTop: '20px' }}>
              Voyita provides group tour operators one place to manage the full trip workflow. Handle everything from setup and quotations to traveler registration, payments, and on-trip operations.
            </p>

            <div className="voyita-hero-ctas">
              <Link href="/#contact" className="voyita-btn-orange">
                Book a Demo
              </Link>
              <Link href="/#services" className="voyita-btn-secondary">
                See All Features
              </Link>
            </div>

            <div className="voyita-hero-trust">
              <div className="voyita-hero-trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>No OTA commissions</span>
              </div>
              <div className="voyita-hero-trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Onboarding support included</span>
              </div>
            </div>
          </div>

          {/* Interactive Visual Dashboard Mockup Column */}
          <div className="voyita-hero-visual">
            <div className="voyita-dashboard-mockup">
              
              <div className="voyita-dashboard-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="voyita-logo-icon" style={{ width: '18px', height: '18px', fontSize: '10px', borderRadius: '4px' }}>V</div>
                  <span className="voyita-dashboard-title">Voyita — Trip Dashboard</span>
                </div>
                <div className="voyita-dashboard-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              {/* Stats Counters */}
              <div className="voyita-dashboard-stats">
                <div className="voyita-stat-pill">
                  <div className="voyita-stat-pill-label">Active Trips</div>
                  <div className="voyita-stat-pill-val">8</div>
                  <div className="voyita-stat-pill-sub">this season</div>
                </div>

                <div className="voyita-stat-pill" style={{ borderColor: 'rgba(81, 96, 238, 0.4)' }}>
                  <div className="voyita-stat-pill-label">Payments</div>
                  <div className="voyita-stat-pill-val">
                    ${mounted ? paymentCount : '250'}k
                  </div>
                  <div className="voyita-stat-pill-sub">collected</div>
                </div>

                <div className="voyita-stat-pill">
                  <div className="voyita-stat-pill-label">Travelers</div>
                  <div className="voyita-stat-pill-val">412</div>
                  <div className="voyita-stat-pill-sub">registered</div>
                </div>
              </div>

              {/* Sparkline mini metric */}
              <div style={{ background: 'var(--voyita-card)', border: '1px solid var(--voyita-border)', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="voyita-stat-pill-label" style={{ fontSize: '10px' }}>Selected Trip Metrics</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--voyita-text-dark)', marginTop: '4px' }}>
                    {activeTrip.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--voyita-text-muted)', marginTop: '2px' }}>
                    Payments: {activeTrip.payment} collected · {activeTrip.travelers} travelers
                  </div>
                </div>
                <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                  <path d="M 0,25 C 10,25 15,10 25,12 C 35,14 45,2 60,5" stroke="var(--voyita-blue)" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M 0,25 C 10,25 15,10 25,12 C 35,14 45,2 60,5 L 60,30 L 0,30 Z" fill="rgba(81, 96, 238, 0.05)"/>
                </svg>
              </div>

              {/* Trip Table */}
              <div style={{ overflowX: 'auto' }}>
                <table className="voyita-trip-table">
                  <thead>
                    <tr>
                      <th>Trip Details</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRIPS_DATA.map((trip) => (
                      <tr 
                        key={trip.id} 
                        onClick={() => setActiveTrip(trip)}
                        style={{ 
                          cursor: 'pointer',
                          backgroundColor: activeTrip.id === trip.id ? 'rgba(81, 96, 238, 0.08)' : 'transparent',
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <td>
                          <div className="voyita-trip-name">{trip.name}</div>
                          <div className="voyita-trip-meta">{trip.meta}</div>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>
                          <span className={`voyita-status-badge voyita-status-${trip.statusClass}`}>
                            {trip.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
