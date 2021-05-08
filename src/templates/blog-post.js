import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import BloglStyle from '../styles/blog.module.css'
import headerImage from '../images/post-header.png'
import Image from "gatsby-image"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = pageContext

  const headerBackgroundImage = {
    backgroundImage: `url(${headerImage})`, 
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={post.frontmatter.hero.publicURL}
        path={location.pathname}
        type='article'
      />
      <article itemScope itemType="http://schema.org/Article">
        <header className={BloglStyle.header__image} style={headerBackgroundImage}>
          <div className={BloglStyle.title__container}>
            <h1
              itemProp="headline"
              className={BloglStyle.header__title}
            >
              {post.frontmatter.title}
            </h1>
            <p className={BloglStyle.header__title}>{post.frontmatter.date}</p>
          </div>
        </header>
        <div className={BloglStyle.posts__image__container}>
          <Image
            fluid={post.frontmatter.hero.childImageSharp.fluid}
            imgStyle={{
              elevation:4,
              shadowOffset: { width: 5, height: 5 },
              shadowColor: "grey",
              shadowOpacity: 0.5,
              shadowRadius: 10,
              // width: '60%',
              // height: 'auto',
            }}
          />
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className={BloglStyle.post__content}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        hero {
          childImageSharp {
            fluid(maxWidth: 1280) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
      }
    }
  }
`
