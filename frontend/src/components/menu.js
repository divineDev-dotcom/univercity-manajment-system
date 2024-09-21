import { useState } from 'react';

const Menu = ({ title, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="menu-container">
      <div
        role="button"
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isExpanded}
        tabIndex={0}
        className="menu-toggle"
      >
        {title}
      </div>

      {/* Conditionally render the menu items when expanded */}
      {isExpanded && (
        <div role="menu" aria-label={`${title} Menu`}>
          {items.map((item, index) => (
            <div
              key={index}
              role="menuitem"
              tabIndex={0}  // Makes each item focusable
              aria-setsize={items.length}  // Total number of items
              aria-posinset={index + 1}  // Position of this item in the set
            >
              <a href={item.link}>
                {item.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
