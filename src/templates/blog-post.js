import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags from "../components/blogTags"
import { rhythm } from "../utils/typography"
import * as BloglStyle from '../styles/blog.module.css'
import headerImagePC from '../images/post-header.png'
import HeaderImageSP from '../images/header-sota-noho-SP.png'
import Image from "gatsby-image"
import MediaQuery from "react-responsive";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = pageContext
  const headerBackgroundImageSP = {
    backgroundImage: `url(${HeaderImageSP})`,
    backgroundSize:  `contain`,
  }
  const headerBackgroundImagePC = {
    backgroundImage: `url(${headerImagePC})`,
    backgroundSize:  `contain`,
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={post.frontmatter.hero.publicURL}
        path={location.pathname}
        type='article'
      />
      <article itemScope itemType="http://schema.org/Article">
      <MediaQuery query="(max-width: 480px)">
        <header className={BloglStyle.header__image__SP} style={headerBackgroundImageSP}>
            <div>
              <div className={BloglStyle.blog__title__container}>
                <Link to='/' className={BloglStyle.blog__title__text}><span>ソタのほほん地下貯蔵庫</span></Link>
              </div>
              <h1
                itemProp="headline"
                className={BloglStyle.header__title}
              >
                {post.frontmatter.title}
              </h1>
              <p className={BloglStyle.header__title}>{post.frontmatter.date}</p>
              <Tags
                tags={post.frontmatter.tags}
              />
            </div>
          </header>
        </MediaQuery>
        <MediaQuery query="(min-width: 481px)">
          <header className={BloglStyle.header__image__PC} style={headerBackgroundImagePC}>
            <div>
              <div className={BloglStyle.blog__title__container}>
                <Link to='/' className={BloglStyle.blog__title__text}><span>ソタのほほん地下貯蔵庫</span></Link>
              </div>
              <h1
                itemProp="headline"
                className={BloglStyle.header__title}
              >
                {post.frontmatter.title}
              </h1>
              <p className={BloglStyle.header__title}>{post.frontmatter.date}</p>
              <Tags
                tags={post.frontmatter.tags}
              />
            </div>
          </header>
        </MediaQuery>
        <div className={BloglStyle.posts__image__container}>
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
          <li className={BloglStyle.link}>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className={BloglStyle.link}>
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
        tags
      }
    }
  }
`
