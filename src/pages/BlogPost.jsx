import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '@/components/portfolio/blogData';
import PageHero from '@/components/portfolio/PageHero';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <>
        <PageHero title="Post Not Found" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Blog', path: '/blog' }, { label: 'Not Found' }]} />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-graphite font-light mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-vapor text-white rounded-xl text-sm font-medium hover:bg-vapor/90 transition"><ArrowLeft size={16} /> Back to Blog</Link>
        </div>
      </>
    );
  }

  const related = blogPosts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero title={post.title} breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Blog', path: '/blog' }, { label: post.title }]} />
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="px-2.5 py-1 rounded-lg bg-vapor/15 text-vapor text-[10px] font-mono uppercase tracking-wider">{post.category}</span>
            <span className="text-graphite text-xs font-mono">{post.date} · {post.readTime}</span>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/8 mb-10">
            <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
          </div>
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown className="text-graphite text-base leading-relaxed font-light [&>p]:mb-5">{post.content}</ReactMarkdown>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5">
            <Link to="/blog" className="inline-flex items-center gap-2 text-vapor text-sm font-medium hover:gap-3 transition-all"><ArrowLeft size={16} /> Back to All Posts</Link>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="py-16 pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading text-2xl font-light text-alabaster mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link key={rp.slug} to={`/blog/${rp.slug}`} className="block glass rounded-2xl overflow-hidden group hover:border-vapor/20 transition-all duration-500">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-alabaster font-medium text-sm flex items-start gap-2 group-hover:text-vapor transition">{rp.title}<ArrowUpRight size={12} className="text-vapor mt-1" /></h3>
                    <p className="text-graphite text-xs font-mono mt-2">{rp.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}