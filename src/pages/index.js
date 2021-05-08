import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostStyles from '../styles/post.module.css'
import RowPosts from "../components/row-posts"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title
  var posts = []

  data.allMarkdownRemark.nodes.map(( node, index ) => {
    if (index%2 === 0){posts[Math.floor(index/2)]=[]}
    return posts[Math.floor(index/2)].push(node)
  })

  return (
    <div>
      <Layout location={location} title={siteTitle}>
        <SEO title={siteTitle} image={data.fileName.publicURL} path={location.pathname} type='website' />
        {posts.map(( nodes ) => {
          return (
            <div className={PostStyles.posts__container}>
              <RowPosts posts={nodes}/>
            </div>
          )
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
    fileName: file(relativePath: {eq: "header-sota-noho-v2.png"}) {
      publicURL
    }
  }
`
