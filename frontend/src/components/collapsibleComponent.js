import { useState, useId } from 'react';

const Collapsible = ({ title, children, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const collapsibleId = useId();

  const handleToggle = () => {
    // First, toggle the collapsible
    setIsOpen((prevState) => !prevState);
    
    // Then, trigger the onClick prop to navigate to the section
    if (onClick) {
      onClick(); // Call the provided onClick handler if it exists
    }
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={collapsibleId}
      >
        {title}
      </button>
      {isOpen && (
        <div id={collapsibleId} role="region" aria-labelledby={collapsibleId}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
