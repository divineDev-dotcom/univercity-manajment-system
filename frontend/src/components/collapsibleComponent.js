import { useState, useId } from 'react';

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

   const collapsibleId = useId();

  return (
    <div>
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={collapsibleId}
      >
        {title} {/* Using heading tag for better semantics */}
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
