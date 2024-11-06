import React from 'react';
import { Link } from 'react-router-dom';

interface ICrumb {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  crumbs: ICrumb[];
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ crumbs }) => {
  return (
    <ul className="breadcrumbs" style={{ listStyleType: 'none', display: 'flex', padding: 0 }}>
      <li>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Главная</Link>
      </li>
      {!!crumbs.length &&
        crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <li className="slash" style={{ margin: '0 8px' }}>/</li>
            {index === crumbs.length - 1 ? (
              <li>{crumb.label}</li>
            ) : (
              <li>
                <Link
                  to={crumb.path || '#'}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {crumb.label}
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
    </ul>
  );
};
