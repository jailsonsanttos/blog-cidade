import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function NewsDetail() {
  const router = useRouter()
  const { id } = router.query
  const [article, setArticle] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      try {
        const savedNews = localStorage.getItem('cityNews')
        if (savedNews) {
          const news = JSON.parse(savedNews)
          const foundArticle = news.find(item => item.id === parseInt(id))
          
          if (foundArticle) {
            setArticle(foundArticle)
            // Buscar notícias relacionadas da mesma categoria
            const related = news
              .filter(item => item.id !== parseInt(id) && item.category === foundArticle.category)
              .slice(0, 3)
            setRelatedNews(related)
          }
        }
      } catch (error) {
        console.error('Erro ao carregar notícia:', error)
      } finally {
        setLoading(false)
      }
    }
  }, [id])

  // Função para renderizar arquivo baseado no tipo
  const renderFile = (file) => {
    if (file.type.startsWith('image/')) {
      return (
        <div key={file.id} style={{marginBottom: '2rem'}}>
          <img 
            src={file.data} 
            alt={file.name}
            style={{
              width: '100%',
              maxHeight: '600px',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              background: '#f8f9fa'
            }}
          />
          <p style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '0.9rem',
            marginTop: '0.5rem',
            fontStyle: 'italic'
          }}>
            📷 {file.name}
          </p>
        </div>
      )
    }
    
    if (file.type.startsWith('video/')) {
      return (
        <div key={file.id} style={{marginBottom: '2rem'}}>
          <video 
            controls
            style={{
              width: '100%',
              maxHeight: '500px',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}
          >
            <source src={file.data} type={file.type} />
            Seu navegador não suporta vídeos.
          </video>
          <p style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '0.9rem',
            marginTop: '0.5rem',
            fontStyle: 'italic'
          }}>
            🎬 {file.name}
          </p>
        </div>
      )
    }
    
    if (file.type.startsWith('audio/')) {
      return (
        <div key={file.id} style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: '#f8f9fa',
          borderRadius: '12px',
          border: '2px solid #4CAF50'
        }}>
          <div style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span style={{fontSize: '2rem'}}>🎵</span>
            <strong style={{color: '#1e3a5f'}}>{file.name}</strong>
          </div>
          <audio 
            controls
            style={{width: '100%'}}
          >
            <source src={file.data} type={file.type} />
            Seu navegador não suporta áudios.
          </audio>
        </div>
      )
    }
    
    if (file.type === 'application/pdf') {
      return (
        <div key={file.id} style={{marginBottom: '2rem'}}>
          <div style={{
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '2px solid #dc3545',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📄</div>
            <h3 style={{color: '#1e3a5f', marginBottom: '1rem'}}>{file.name}</h3>
            <a 
              href={file.data} 
              download={file.name}
              style={{
                display: 'inline-block',
                background: '#dc3545',
                color: 'white',
                padding: '0.8rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              📥 Baixar PDF
            </a>
          </div>
          <iframe 
            src={file.data}
            style={{
              width: '100%',
              height: '600px',
              border: 'none',
              borderRadius: '12px',
              marginTop: '1rem',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      )
    }
    
    // Outros tipos de arquivo (documentos, etc)
    return (
      <div key={file.id} style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        background: '#f8f9fa',
        borderRadius: '12px',
        border: '2px solid #4CAF50'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div style={{fontSize: '3rem'}}>
            {file.type.includes('document') || file.type.includes('word') ? '📝' :
             file.type.includes('spreadsheet') || file.type.includes('excel') ? '📊' :
             file.type.includes('presentation') || file.type.includes('powerpoint') ? '📽️' : '📎'}
          </div>
          <div style={{flex: 1}}>
            <h3 style={{color: '#1e3a5f', marginBottom: '0.5rem'}}>{file.name}</h3>
            <p style={{color: '#666', fontSize: '0.9rem'}}>
              Tamanho: {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <a 
            href={file.data} 
            download={file.name}
            style={{
              background: '#4CAF50',
              color: 'white',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            📥 Baixar
          </a>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <>
        <Head><title>Carregando... - Portal de Notícias</title></Head>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          fontSize: '1.5rem',
          color: '#666'
        }}>
          ⏳ Carregando notícia...
        </div>
      </>
    )
  }

  if (!article) {
    return (
      <>
        <Head>
          <title>Notícia não encontrada - Portal de Notícias</title>
        </Head>
        
        <header className="header">
          <div className="container">
            <div className="header-content">
              <Link href="/" className="logo">🏙️ Portal da Cidade</Link>
              <nav>
                <ul className="nav-menu">
                  <li><Link href="/">🏠 Início</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="container">
          <div className="empty-state">
            <h1>📰 Notícia não encontrada</h1>
            <p>A notícia que você está procurando não existe ou foi removida.</p>
            <Link href="/">
              <button className="btn btn-primary">🏠 Voltar ao Início</button>
            </Link>
          </div>
        </main>
      </>
    )
  }

  // Separar imagens e outros arquivos
  const images = article.files?.filter(f => f.type.startsWith('image/')) || []
  const videos = article.files?.filter(f => f.type.startsWith('video/')) || []
  const audios = article.files?.filter(f => f.type.startsWith('audio/')) || []
  const documents = article.files?.filter(f => 
    !f.type.startsWith('image/') && 
    !f.type.startsWith('video/') && 
    !f.type.startsWith('audio/')
  ) || []

  return (
    <>
      <Head>
        <title>{article.title} - Portal de Notícias</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image || (images[0]?.data)} />
        <meta property="og:type" content="article" />
      </Head>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">🏙️ Portal da Cidade</Link>
            <nav>
              <ul className="nav-menu">
                <li><Link href="/">🏠 Início</Link></li>
                <li><Link href="/admin">📝 Admin</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container">
        <article style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '3rem',
          margin: '2rem 0',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{marginBottom: '2rem'}}>
            <span className="news-category">{article.category}</span>
          </div>
          
          <h1 style={{
            color: '#1e3a5f',
            marginBottom: '1.5rem',
            fontSize: '2.5rem',
            lineHeight: '1.2',
            fontWeight: 700
          }}>
            {article.title}
          </h1>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            padding: '1rem 0',
            borderTop: '1px solid #f0f0f0',
            borderBottom: '1px solid #f0f0f0',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <span style={{color: '#4CAF50', fontWeight: 'bold'}}>
              ✍️ {article.author}
            </span>
            <span style={{color: '#666'}}>
              📅 {article.date}
            </span>
            <span style={{color: '#666'}}>
              🏷️ {article.category}
            </span>
          </div>

          {/* IMAGEM DE CAPA (se tiver URL) */}
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title}
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '2rem',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
              }}
            />
          )}

          {/* PRIMEIRO PARÁGRAFO */}
          <div style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: '#444',
            marginBottom: '2rem',
            fontWeight: 500,
            borderLeft: '4px solid #4CAF50',
            paddingLeft: '1.5rem',
            fontStyle: 'italic'
          }}>
            {article.excerpt}
          </div>

          {/* PRIMEIRA IMAGEM ANEXADA (se não tiver imagem de capa) */}
          {!article.image && images.length > 0 && renderFile(images[0])}

          {/* CONTEÚDO DA NOTÍCIA */}
          <div style={{fontSize: '1.1rem', lineHeight: '1.8', color: '#333'}}>
            {article.content.split('\n').filter(p => p.trim()).map((paragraph, index) => (
              <p key={index} style={{marginBottom: '1.5rem'}}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* GALERIA DE IMAGENS (restantes) */}
          {images.length > (article.image ? 0 : 1) && (
            <div style={{marginTop: '3rem'}}>
              <h2 style={{
                color: '#1e3a5f',
                marginBottom: '1.5rem',
                fontSize: '1.8rem',
                borderBottom: '3px solid #4CAF50',
                paddingBottom: '0.5rem'
              }}>
                📸 Galeria de Fotos
              </h2>
              {images.slice(article.image ? 0 : 1).map(file => renderFile(file))}
            </div>
          )}

          {/* VÍDEOS */}
          {videos.length > 0 && (
            <div style={{marginTop: '3rem'}}>
              <h2 style={{
                color: '#1e3a5f',
                marginBottom: '1.5rem',
                fontSize: '1.8rem',
                borderBottom: '3px solid #4CAF50',
                paddingBottom: '0.5rem'
              }}>
                🎬 Vídeos
              </h2>
              {videos.map(file => renderFile(file))}
            </div>
          )}

          {/* ÁUDIOS */}
          {audios.length > 0 && (
            <div style={{marginTop: '3rem'}}>
              <h2 style={{
                color: '#1e3a5f',
                marginBottom: '1.5rem',
                fontSize: '1.8rem',
                borderBottom: '3px solid #4CAF50',
                paddingBottom: '0.5rem'
              }}>
                🎵 Áudios
              </h2>
              {audios.map(file => renderFile(file))}
            </div>
          )}

          {/* DOCUMENTOS */}
          {documents.length > 0 && (
            <div style={{marginTop: '3rem'}}>
              <h2 style={{
                color: '#1e3a5f',
                marginBottom: '1.5rem',
                fontSize: '1.8rem',
                borderBottom: '3px solid #4CAF50',
                paddingBottom: '0.5rem'
              }}>
                📎 Documentos Anexados
              </h2>
              {documents.map(file => renderFile(file))}
            </div>
          )}

          <div style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '2px solid #f0f0f0',
            textAlign: 'center'
          }}>
            <p style={{color: '#666', marginBottom: '1.5rem', fontSize: '1.1rem'}}>
              📢 Gostou desta notícia? Compartilhe com seus amigos!
            </p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <Link href="/">
                <button className="btn btn-primary">📰 Ver Mais Notícias</button>
              </Link>
              <button 
                className="btn btn-secondary"
                onClick={() => window.print()}
              >
                🖨️ Imprimir Notícia
              </button>
            </div>
          </div>
        </article>

        {relatedNews.length > 0 && (
          <section style={{margin: '3rem 0'}}>
            <h2 style={{
              color: '#1e3a5f',
              marginBottom: '2rem',
              fontSize: '2rem',
              textAlign: 'center'
            }}>
              📎 Notícias Relacionadas
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {relatedNews.map(related => {
                const relatedImages = related.files?.filter(f => f.type.startsWith('image/')) || []
                const relatedImage = related.image || relatedImages[0]?.data || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=150&fit=crop"
                
                return (
                  <article key={related.id} className="news-card">
                    <img 
                      src={relatedImage} 
                      alt={related.title}
                      className="news-image"
                    />
                    <div className="news-content">
                      <span className="news-category">{related.category}</span>
                      <h3 className="news-title">
                        <Link href={`/noticia/${related.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          {related.title}
                        </Link>
                      </h3>
                      <p className="news-excerpt">{related.excerpt}</p>
                      <div className="news-meta">
                        <span className="news-author">📝 {related.author}</span>
                        <span>📅 {related.date}</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Portal da Cidade. Todos os direitos reservados. ❤️</p>
        </div>
      </footer>
    </>
  )
}