import Head from "next/head";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPostsForHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  Typography,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#eeeeee",
      light: "white",
      dark: "#bcbcbc",
      contrastText: "#616161",
    },
    secondary: {
      main: "#616161",
      light: "#8e8e8e",
      dark: "#373737",
      contrastText: "#eeeeee",
    },
  },
});

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <ThemeProvider theme={theme}>
              <Card style={{ backgroundColor: theme.palette.primary.main }}>
                <CardContent>
                  <Typography color="secundary">
                    <HeroPost
                      title={heroPost.title}
                      coverImage={heroPost.featuredImage?.node}
                      date={heroPost.date}
                      author={heroPost.author?.node}
                      slug={heroPost.slug}
                      excerpt={heroPost.excerpt}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </ThemeProvider>
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
  };
}
