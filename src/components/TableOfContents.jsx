'use client';
import { useState, useEffect, useRef } from 'react';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    // Find all H2 headings in the main article body container
    const articleBody = document.querySelector('.post-body');
    if (!articleBody) return;

    const h2Elements = Array.from(articleBody.querySelectorAll('h2'));
    
    // Slugify helper to generate valid CSS identifiers as anchor IDs
    const headingData = h2Elements.map((elem) => {
      if (!elem.id) {
        const slug = elem.textContent
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // remove special chars
          .replace(/\s+/g, '-')         // collapse spaces to dashes
          .replace(/-+/g, '-')          // collapse duplicate dashes
          .trim();
        elem.id = slug || `heading-${Math.random().toString(36).substr(2, 9)}`;
      }
      return {
        id: elem.id,
        text: elem.textContent,
      };
    });

    setHeadings(headingData);

    // Intersection observer to track which H2 is currently reading
    const handleIntersect = (entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort visible items by their top boundary relative to viewport top
        visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(visibleEntries[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px', // triggers when heading is in top-half of viewport
      threshold: 0.1,
    });

    h2Elements.forEach((elem) => {
      observerRef.current.observe(elem);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      // Offset for fixed top layouts / progress bar
      const offset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      setActiveId(id);
      // Close dropdown on mobile after selecting section
      setIsMobileCollapsed(true);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="sidebar-section toc-section">
      <div 
        className="sidebar-title toc-header-toggle"
        onClick={() => setIsMobileCollapsed(!isMobileCollapsed)}
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span>Table of Contents</span>
        <span 
          className="toc-arrow" 
          style={{ 
            display: 'inline-block',
            transform: isMobileCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s ease'
          }}
        >
          ▼
        </span>
      </div>

      <div className={`toc-list-wrapper ${isMobileCollapsed ? 'collapsed' : 'expanded'}`}>
        <ul className="toc-list">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li 
                key={heading.id} 
                className={`toc-item ${isActive ? 'active' : ''}`}
              >
                <a 
                  href={`#${heading.id}`}
                  onClick={(e) => handleLinkClick(e, heading.id)}
                  className="toc-link"
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        .toc-list-wrapper {
          transition: max-height 0.4s ease-out, opacity 0.3s ease;
          overflow: hidden;
        }
        @media (max-width: 991px) {
          .toc-list-wrapper.collapsed {
            max-height: 0;
            opacity: 0;
          }
          .toc-list-wrapper.expanded {
            max-height: 500px;
            opacity: 1;
            margin-top: 12px;
          }
        }
      `}</style>
    </div>
  );
}
