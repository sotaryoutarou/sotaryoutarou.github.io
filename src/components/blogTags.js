import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import * as styles from '../styles/tag.module.css';

const Tag = ({ tag }) => (
  <Link to={`/tags/${kebabCase(tag)}/`}>
    <li>{tag}</li>
  </Link>
);

const Tags = ({ tags }) => (
  <ul className={styles.tags}>
    {(tags || []).map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </ul>
);

export default Tags;