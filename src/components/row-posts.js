import React from 'react'
import PostStyles from '../styles/post.module.css'
import Image from "gatsby-image";
import { Link } from "gatsby"

// 画像ファイルパスをプロパティに取るようなコンポーネントを定義
export default ({ posts }) => (
  posts.map(( post, index ) => {
    let columnContainerStyle;
    if (index === 0) {
      columnContainerStyle = PostStyles.column__l__container
      console.log("lllllllll");
    } else {
      console.log("rrrrrrrrrrr");
      columnContainerStyle = PostStyles.column__r__container
    }


    return (
        <div className={columnContainerStyle}>
          <article key={post.fields.slug}>
            <div className="posts__image_container">
              <Link to={post.fields.slug}>
                <Image
                  className="posts__image"
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
            </div>
            <div className={PostStyles.text__container}>
              <small className="posts__date">{post.frontmatter.date}</small>
              <header>
                <h3 className={PostStyles.title__content}>
                  <Link
                    className="posts__title__a"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                </h3>
              </header>
              <section>
                <p
                  className="posts__desc"
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                />
                <div className={PostStyles.more__text__content}>
                  <Link to={post.fields.slug}>
                    続きを読む
                  </Link>
                </div>
              </section>
            </div>
          </article>
        </div>
    );
  })
)
