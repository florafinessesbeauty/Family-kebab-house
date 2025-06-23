import { useEffect, useRef } from 'react';

interface ScreenReaderAnnouncementsProps {
  announcement: string;
  priority?: 'polite' | 'assertive';
}

export default function ScreenReaderAnnouncements({ 
  announcement, 
  priority = 'polite' 
}: ScreenReaderAnnouncementsProps) {
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (announcement && announcementRef.current) {
      // Clear and set new announcement
      announcementRef.current.textContent = '';
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = announcement;
        }
      }, 100);
    }
  }, [announcement]);

  return (
    <div
      ref={announcementRef}
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
    />
  );
}

// Hook for managing screen reader announcements
export function useScreenReaderAnnouncements() {
  const announcementRef = useRef<string>('');

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announcementRef.current = message;
    
    // Create temporary announcement element
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return { announce };
}