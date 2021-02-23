import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image";
import PostStyles from '../styles/post.module.css'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  var posts = []

  data.allMarkdownRemark.nodes.map(( node, index ) => {
    if (index%2 === 0){posts[Math.floor(index/2)]=[]}
    return posts[Math.floor(index/2)].push(node)
  })

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).</p>
      </Layout>
    )
  }

  return (
    <div>
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />

        {posts.map(( node ) => {
          const title_l = node[0].frontmatter.title || node[0].fields.slug;
          const title_r = node[1].frontmatter.title || node[1].fields.slug;

          return (
            <div className={PostStyles.posts__container}>
              <div className={PostStyles.column__l__container}>
                <article key={node[0].fields.slug}>
                  <div className="posts__image_container">
                    <Link to={node[0].fields.slug}>
                      <Image
                        className="posts__image"
                        fluid={node[0].frontmatter.hero.childImageSharp.fluid}
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
                  <small className="posts__date">{node[0].frontmatter.date}</small>
                  <header>
                    <h3 className={PostStyles.title__content}>
                      <Link
                        className="posts__title__a"
                        to={node[0].fields.slug}
                      >
                        {title_l}
                      </Link>
                    </h3>
                  </header>
                    <section>
                    <p
                      className="posts__desc"
                      dangerouslySetInnerHTML={{
                        __html: node[0].frontmatter.description || node[0].excerpt,
                      }}
                    />
                    <div className="posts_more">
                      <Link className="posts__more__a" to={node[0].fields.slug}>
                        続きを読む
                      </Link>
                    </div>
                  </section>
                </article>
              </div>
              <div className={PostStyles.column__r__container}>
                <article key={node[1].fields.slug}>
                  <div className="posts__image_container">
                    <Link to={node[1].fields.slug}>
                      <Image
                        className="posts__image"
                        fluid={node[1].frontmatter.hero.childImageSharp.fluid}
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
                  <small className="posts__date">{node[1].frontmatter.date}</small>
                  <header>
                    <h3 className={PostStyles.title__content}>
                      <Link
                        className="posts__title__a"
                        to={node[1].fields.slug}
                      >
                        {title_r}
                      </Link>
                    </h3>
                  </header>
                    <section>
                    <p
                      className="posts__desc"
                      dangerouslySetInnerHTML={{
                        __html: node[1].frontmatter.description || node[1].excerpt,
                      }}
                    />
                    <div className="posts_more">
                      <Link className="posts__more__a" to={node[1].fields.slug}>
                        続きを読む
                      </Link>
                    </div>
                  </section>
                </article>
              </div>
            </div>
          );
        })}
      </Layout>
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
          hero {
            childImageSharp {
              fluid(maxWidth: 1280) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
