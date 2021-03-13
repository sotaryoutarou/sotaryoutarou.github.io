import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image";
import PostStyles from '../styles/post.module.css'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title
  var posts = []

  data.allMarkdownRemark.nodes.map(( node, index ) => {
    if (index%2 === 0){posts[Math.floor(index/2)]=[]}
    return posts[Math.floor(index/2)].push(node)
  })

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={siteTitle} />
        <p>No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).</p>
      </Layout>
    )
  }

  return (
    <div>
      <Layout location={location} title={siteTitle}>
        <SEO title={siteTitle} />

        {posts.map(( nodes ) => {
          const title_l = nodes[0].frontmatter.title || nodes[0].fields.slug;
          const title_r = nodes[1].frontmatter.title || nodes[1].fields.slug;

          return nodes.map(( post, index ) => {
            let columnContainerStyle;
            if (index == 0) {
              columnContainerStyle = PostStyles.column__l__container
              console.log("lllllllll");
            } else {
              console.log("rrrrrrrrrrr");
              columnContainerStyle = PostStyles.column__r__container
            }

            return (
              <div className={PostStyles.posts__container}>
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
                            {nodes[0].frontmatter.title}
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
              </div>
            );
          })
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
