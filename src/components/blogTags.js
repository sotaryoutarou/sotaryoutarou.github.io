import React from 'react';
import { Link } from 'gatsby';

import * as styles from '../styles/tag.module.css';

const Tag = ({ tag }) => (
  <li>
    <Link to={`/tags/${tag}/`}>
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