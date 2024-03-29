import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as PostStyles from '../styles/post.module.css'
import RowPosts from "../components/row-posts"

const TagPostTemplate = ({ data, pageContext, location }) => {

  const { tag } = pageContext
  const siteTitle = 'ソタのほほん地下貯蔵庫 | #' + tag
  var posts = []

  data.allMarkdownRemark.nodes.map(( node, index ) => {
    if (index%2 === 0){posts[Math.floor(index/2)]=[]}
    return posts[Math.floor(index/2)].push(node)
  })

  return (
    <div>
      <Layout location={location} title={siteTitle}>
        <Seo title={siteTitle} type='website' />
        <div className={PostStyles.tag__title__container}>
          <h1 className={PostStyles.tag__title}>{tag}</h1>
        </div>
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

export default TagPostTemplate

export const pageQuery = graphql`
  query TagTemplate($tag: String!) {
        allMarkdownRemark(
          filter: { frontmatter: { tags: { in: [$tag] } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
            nodes {
                excerpt(truncate: true)
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
                  tags
                }
            }
        }
    }
`
