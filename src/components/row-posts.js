import React from 'react'
import * as PostStyles from '../styles/post.module.css'
import Image from "gatsby-image";
import { Link } from "gatsby"
import Tags from './TopPageTags.js'

const rowPosts = ({ posts }) => (
  posts.map(( post, index ) => {
    let columnContainerStyle;
    if (index === 0) {
      columnContainerStyle = PostStyles.column__l__container
    } else {
      columnContainerStyle = PostStyles.column__r__container
    }

    return (
        <div className={columnContainerStyle}>
          <article key={post.fields.slug}>
            <Link to={post.fields.slug}>
              <Image
                fluid={post.frontmatter.hero.childImageSharp.fluid}
                imgStyle={{
                  elevation:4,
                  shadowOffset: { width: 5, height: 5 },
                  shadowColor: "grey",
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                }}
              />
            </Link>
            <div className={PostStyles.text__container}>
              <small>{post.frontmatter.date}</small>
              <section>
                <Link to={post.fields.slug} className={PostStyles.post__link}>
                  <p>{post.excerpt}</p>
                </Link>
                <div className={PostStyles.tags__container}>
                  <Tags tags={post.frontmatter.tags}/>
                </div>
              </section>
            </div>
          </article>
        </div>
    );
  })
)

export default rowPosts
