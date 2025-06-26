import { ReactNode } from 'react';

interface AccessibleLandmarkProps {
  children: ReactNode;
  role?: 'main' | 'navigation' | 'banner' | 'contentinfo' | 'complementary' | 'search' | 'region';
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  className?: string;
}

export default function AccessibleLandmark({
  children,
  role = 'region',
  ariaLabel,
  ariaLabelledBy,
  id,
  className = ''
}: AccessibleLandmarkProps) {
  const Tag = role === 'main' ? 'main' : 
             role === 'navigation' ? 'nav' : 
             role === 'banner' ? 'header' : 
             role === 'contentinfo' ? 'footer' : 
             'section';

  return (
    <Tag
      role={role === 'main' || role === 'navigation' || role === 'banner' || role === 'contentinfo' ? undefined : role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      id={id}
      className={className}
      tabIndex={role === 'main' ? 0 : undefined}
    >
      {children}
    </Tag>
  );
}