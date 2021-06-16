import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

// import Link from 'next/link'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

 export default function Home() {
  return(
    <main className={styles.container}>
      <div className={styles.posts}>
        <a>
        <strong>Como utilizar Hooks</strong>
        <p>Pensando em sincronização ao invés de ciclos de vida.</p>
        <time>15 Mar 2021 <span> Danilo Vieira</span></time>

        </a>

        <a>
        <strong>Como utilizar Hooks</strong>
        <p>Pensando em sincronização ao invés de ciclos de vida.</p>
        <time>15 Mar 2021 <span> Danilo Vieira</span></time>

        </a>

        <a>
        <strong>Como utilizar Hooks</strong>
        <p>Pensando em sincronização ao invés de ciclos de vida.</p>
        <time>15 Mar 2021 <span> Danilo Vieira</span></time>

        </a>

      </div>

      <p className={styles.loadMore}>Carregar mais posts</p>
    </main>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
