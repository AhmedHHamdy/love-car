import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  const { t } = useTranslation()

  return (
    <>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
            {t("Services")}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-30 menu p-2 shadow bg-primary rounded-box w-52"
        >
          <li className='hover:bg-secondary rounded-xl' onClick={handleClick}>
            <Link>Dropdown Item 1</Link>
          </li>
          <li className='hover:bg-secondary rounded-xl' onClick={handleClick}>
            <Link>Dropdown Item 2</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dropdown;