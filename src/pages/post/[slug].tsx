import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';
import {ptBR} from 'date-fns/locale'
import {format} from 'date-fns'
import { FiCalendar, FiUser, FiClock} from 'react-icons/fi'
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client'
import { useRouter } from 'next/router';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

 export default function Post({post}:PostProps):JSX.Element {

  const router = useRouter();

  if (router.isFallback){
    return <h1>Carregando...</h1>
  }

  const totalWords = post.data.content.reduce((total, contentItem) => {
    total += contentItem.heading.split(' ').length;

    const words = contentItem.body.map(item => item.text.split(' ').length);
    words.map(word => (total += word));
    return total;
  }, 0);
  const readTime = Math.ceil(totalWords / 200);

 const formattedDate = format(
   new Date(post.first_publication_date),
   'dd MMM yyyy',
   {
     locale: ptBR,
   }
 );
   return (
     <>
    <img src={post.data.banner.url} alt="banner" className={styles.banner}/>
    <main className={commonStyles.container}>
       <div className={styles.post}>
           <div className={styles.postInfo}>
           <h1>{post.data.title}</h1>
            <ul>
              <li>
                <FiCalendar />
                {formattedDate}
              </li>
              <li>
                <FiUser />
                {post.data.author}
              </li>
              <li>
                <FiClock />
                {`${readTime} min`}
              </li>
            </ul>
        </div>

         {post.data.content.map(content =>{
           return(
             <article key={content.heading}>
             <h2>{content.heading}</h2>
             <div
             className={styles.postContent}
             dangerouslySetInnerHTML={{__html: RichText.asHtml(content.body)}}/>
            </article>
           )
         })}
       </div>
     </main>
     </>
   );
}

 export const getStaticPaths:GetStaticPaths = async () => {
   const prismic = getPrismicClient();
   const posts = await prismic.query([
     Prismic.predicates.at('document.type','publication')
   ]);

   const paths = posts.results.map(post => {
     return{
      params:{
        slug: post.uid,
      }
     }
   });
      return{
        paths,
        fallback:true
      };
 };

 export const getStaticProps:GetStaticProps = async context => {

  const prismic = getPrismicClient();
  const {slug } = context.params
  const response = await prismic.getByUID('publication',String(slug),{});

  const post ={
    uid : response.uid,
    first_publication_date:response.first_publication_date,
    data:{
      title:response.data.title,
      subtitle: response.data.subtitle,
      author:response.data.author,
       banner: {
         url: response.data.banner.url,
      },
       content: response.data.content.map(content =>{
         return{
            heading:content.heading,
            body:[...content.body]
         }
       })
     }
  }
  return{
    props:{
     post
    }
  }
}

