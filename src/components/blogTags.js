import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import * as styles from '../styles/tag.module.css';

const Tag = ({ tag }) => (
  <li>
    <Link to={`/tags/${kebabCase(tag)}/`}>
      {tag}
    </Link>
  </li>
);

const Tags = ({ tags }) => (
  <ul className={styles.tags}>
    {(tags || []).map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </ul>
);

export default Tags;