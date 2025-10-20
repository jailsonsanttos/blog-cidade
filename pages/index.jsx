import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [adClicks, setAdClicks] = useState(0)
  const [adViews, setAdViews] = useState(0)

  useEffect(() => {
    const loadNews = () => {
      try {
        const savedNews = localStorage.getItem('cityNews')
        if (savedNews) {
          const parsedNews = JSON.parse(savedNews)
          setNews(parsedNews)
        } else {
          // Notícias exemplo com imagens e arquivos
          const exampleNews = [
            {
              id: 1,
              title: "Nova praça será inaugurada no centro da cidade",
              excerpt: "A prefeitura anuncia a inauguração de uma nova praça com equipamentos modernos, área verde ampliada e espaços de lazer para toda a família.",
              content: `A nova praça localizada no centro da cidade será inaugurada no próximo sábado, trazendo mais qualidade de vida para os moradores. O projeto conta com playground moderno, academia ao ar livre, pista de caminhada de 800 metros e uma ampla área verde com mais de 50 árvores nativas.

O investimento de R$ 2,5 milhões foi viabilizado através de uma parceria entre a prefeitura e o governo estadual. A praça também contará com iluminação LED, sistema de segurança com câmeras e um quiosque para alimentação.

"Esta obra representa um marco para nossa cidade, oferecendo um espaço de qualidade para o lazer e convivência da população", destacou o prefeito durante a vistoria das obras.

A inauguração acontecerá às 9h, com a presença de autoridades locais e apresentações culturais. A comunidade está convidada para participar deste importante momento para o município.`,
              category: "Infraestrutura",
              author: "Redação Portal",
              date: new Date().toLocaleDateString('pt-BR'),
              image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
              files: []
            },
            {
              id: 2,
              title: "Campanha de vacinação contra a gripe inicia segunda-feira",
              excerpt: "Secretaria Municipal de Saúde prepara campanha ampliada de vacinação. Todos os postos estarão funcionando em horário estendido para atender a população.",
              content: `A Secretaria Municipal de Saúde inicia na próxima segunda-feira (15) a campanha anual de vacinação contra a influenza. Este ano, a meta é imunizar 85% da população prioritária, incluindo idosos, crianças, gestantes e profissionais da saúde.

Serão disponibilizadas 15.000 doses da vacina trivalente, que protege contra os três subtipos do vírus da gripe mais prevalentes. A campanha se estende até o final de maio, com possibilidade de prorrogação caso necessário.

Todos os 12 postos de saúde do município funcionarão em horário estendido, das 7h às 19h, para facilitar o acesso da população. Além disso, haverá dois pontos de drive-thru nos fins de semana, no Centro de Convenções e na praça central.

"A vacinação é a forma mais eficaz de prevenir a gripe e suas complicações", enfatiza a secretária de saúde, destacando a importância da imunização coletiva.

Para se vacinar, é necessário apresentar documento de identidade e cartão de vacinação. Menores de 18 anos devem estar acompanhados dos pais ou responsáveis.`,
              category: "Saúde",
              author: "Maria Silva",
              date: new Date(Date.now() - 86400000).toLocaleDateString('pt-BR'),
              image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
              files: []
            },
            {
              id: 3,
              title: "Festival de Cultura Popular movimenta fim de semana",
              excerpt: "Evento gratuito celebra as tradições locais com música, dança, artesanato e culinária típica. Programação inclui apresentações de grupos folclóricos regionais.",
              content: `O 15º Festival de Cultura Popular da cidade acontece neste fim de semana na praça central, reunindo o melhor das tradições culturais da região. O evento, totalmente gratuito, espera receber mais de 5 mil visitantes.

A programação inclui apresentações de maracatu, quadrilha junina, banda de pífanos e grupos de dança folclórica. Artesãos locais expondrão seus trabalhos em cerâmica, bordado e madeira, além de uma feira gastronômica com pratos típicos.

O destaque vai para a apresentação do Mestre João Evangelista, reconhecido nacionalmente por seu trabalho de preservação da cultura popular nordestina. Ele se apresentará no sábado às 20h com seu grupo de cantadores.

"Este festival é uma oportunidade única de valorizar nossas raízes e apresentar nossa cultura para visitantes de outras cidades", comenta a coordenadora do evento.

A programação infantil conta com oficinas de confecção de brinquedos tradicionais e contação de histórias. O evento acontece das 16h às 22h no sábado e das 14h às 20h no domingo.`,
              category: "Cultura",
              author: "João Santos",
              date: new Date(Date.now() - 172800000).toLocaleDateString('pt-BR'),
              image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
              files: []
            }
          ]
          setNews(exampleNews)
          localStorage.setItem('cityNews', JSON.stringify(exampleNews))
        }
      } catch (error) {
        console.error('Erro ao carregar notícias:', error)
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    loadNews()

    // Contar visualizações de anúncios
    const savedAdViews = localStorage.getItem('adViews') || '0'
    const savedAdClicks = localStorage.getItem('adClicks') || '0'
    setAdViews(parseInt(savedAdViews))
    setAdClicks(parseInt(savedAdClicks))

    // Incrementar visualizações da página
    const newViews = parseInt(savedAdViews) + 1
    localStorage.setItem('adViews', newViews.toString())
    setAdViews(newViews)
  }, [])

  // Função para registrar clique em anúncio
  const handleAdClick = (adType) => {
    const newClicks = adClicks + 1
    setAdClicks(newClicks)
    localStorage.setItem('adClicks', newClicks.toString())
    
    // Aqui você pode integrar com Google AdSense, Facebook Ads, etc.
    console.log(`Clique no anúncio: ${adType}`)
    
    // Simular redirecionamento para anúncio
    // window.open('https://exemplo-anuncio.com', '_blank')
  }

  // Componente de Banner Publicitário
  const AdBanner = ({ size, position, content, link, type = 'banner' }) => (
    <div 
      onClick={() => handleAdClick(`${type}-${position}`)}
      style={{
        background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '2px solid #ff6b6b',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.02)'
        e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)'
        e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '5px',
        right: '10px',
        fontSize: '0.7rem',
        opacity: 0.7
      }}>
        💰 PUBLICIDADE
      </div>
      
      <div style={{fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
        {content}
      </div>
      
      <div style={{fontSize: '0.8rem', opacity: 0.9}}>
        Clique aqui para saber mais →
      </div>
      
      {size === 'large' && (
        <div style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '20px',
          fontSize: '0.8rem'
        }}>
          🎯 Oferta Especial - Não Perca!
        </div>
      )}
    </div>
  )

  // Componente de Anúncio Nativo (integrado com notícias)
  const NativeAd = ({ title, description, image, sponsor }) => (
    <div 
      className="news-card" 
      onClick={() => handleAdClick('native-content')}
      style={{border: '2px solid #ff6b6b', position: 'relative'}}
    >
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: '#ff6b6b',
        color: 'white',
        padding: '0.2rem 0.6rem',
        borderRadius: '12px',
        fontSize: '0.7rem',
        fontWeight: 'bold'
      }}>
        PUBLICIDADE
      </div>
      
      <img 
        src={image}
        alt={title}
        className="news-image"
        style={{filter: 'brightness(0.9)'}}
      />
      
      <div className="news-content">
        <span style={{
          background: '#ff6b6b',
          color: 'white',
          padding: '0.3rem 0.8rem',
          borderRadius: '15px',
          fontSize: '0.7rem',
          fontWeight: '600'
        }}>
          💼 {sponsor}
        </span>
        
        <h2 className="news-title" style={{color: '#ff6b6b'}}>
          {title}
        </h2>
        
        <p className="news-excerpt">{description}</p>
        
        <div style={{
          background: '#ff6b6b',
          color: 'white',
          padding: '0.8rem',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '1rem',
          fontWeight: 'bold'
        }}>
          🎯 Clique para Conhecer Nossa Oferta!
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <>
        <Head>
          <title>Portal de Notícias - Sua Cidade</title>
        </Head>
        <div className="loading">
          <div className="spinner"></div>
          <span>Carregando notícias...</span>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Portal de Notícias - Sua Cidade</title>
        <meta name="description" content="As principais notícias da nossa cidade em primeira mão" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Portal de Notícias - Sua Cidade" />
        <meta property="og:description" content="As principais notícias da nossa cidade em primeira mão" />
        <meta property="og:type" content="website" />
        
        {/* Meta tags para monetização */}
        <meta name="monetization" content="$ilp.uphold.com/your-payment-pointer" />
        
        {/* Google AdSense - Substitua pelo seu código */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX" crossOrigin="anonymous"></script>
        
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">
              🏙️ Portal da Cidade
            </Link>
  <nav>
  <ul className="nav-menu">
    <li><Link href="/">Início</Link></li>
    <li><Link href="/vagas">Vagas</Link></li>
    <li><Link href="/salitre">Salitre</Link></li>
    <li><Link href="/admin">Admin</Link></li>
    <li><Link href="/sobre">Sobre</Link></li>
    <li><Link href="/contato">Contato</Link></li>
  </ul>
</nav>
          </div>
        </div>
      </header>

      {/* Banner Publicitário Superior */}
      <div className="container" style={{marginTop: '1rem'}}>
        <AdBanner 
          size="large"
          position="header"
          content="🚗 Concessionária São João - Carros 0km com 0% de Juros!"
          link="https://exemplo.com"
          type="header-banner"
        />
      </div>

      <main className="container">
        <div className="main-content">
          <section className="news-grid">
            {news.length === 0 ? (
              <div className="empty-state">
                <h2>📰 Bem-vindo ao Portal da Cidade!</h2>
                <p>Ainda não há notícias publicadas. Que tal começar adicionando a primeira?</p>
                <Link href="/admin">
                  <button className="btn btn-primary">✏️ Adicionar Primeira Notícia</button>
                </Link>
              </div>
            ) : (
              <>
                {/* Notícia em destaque */}
                {news.length > 0 && (
                  <article className="news-card" style={{
                    background: 'linear-gradient(135deg, #1e3a5f, #2c5aa0)',
                    color: 'white',
                    border: '3px solid #4CAF50'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: '#4CAF50',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      zIndex: 10
                    }}>
                      🔥 DESTAQUE
                    </div>
                    
                    <img 
                      src={news[0].image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=300&fit=crop"} 
                      alt={news[0].title}
                      className="news-image"
                      style={{height: '300px', filter: 'brightness(0.8)'}}
                    />
                    
                    <div className="news-content">
                      <span style={{
                        background: '#4CAF50',
                        color: 'white',
                        padding: '0.4rem 1rem',
                        borderRadius: '25px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginBottom: '1rem'
                      }}>
                        {news[0].category}
                      </span>
                      
                      <h2 style={{fontSize: '1.8rem', color: 'white', marginBottom: '1rem', lineHeight: '1.3'}}>
                        <Link href={`/noticia/${news[0].id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                          {news[0].title}
                        </Link>
                      </h2>
                      
                      <p style={{fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.9}}>
                        {news[0].excerpt}
                      </p>
                      
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{color: '#4CAF50', fontWeight: 'bold'}}>📝 {news[0].author}</span>
                        <span style={{opacity: 0.8}}>📅 {news[0].date}</span>
                      </div>
                      
                      {/* Mostrar arquivos se existirem */}
                      {news[0].files && news[0].files.length > 0 && (
                        <div style={{
                          marginTop: '1rem',
                          padding: '1rem',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '8px'
                        }}>
                          <div style={{fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9}}>
                            📎 Arquivos anexados ({news[0].files.length}):
                          </div>
                          <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                            {news[0].files.slice(0, 5).map(file => (
                              <div key={file.id} style={{
                                background: 'rgba(255,255,255,0.2)',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '15px',
                                fontSize: '0.8rem'
                              }}>
                                {file.type.startsWith('image/') ? '🖼️' : 
                                 file.type.startsWith('video/') ? '🎬' :
                                 file.type === 'application/pdf' ? '📄' : '📎'} 
                                {file.name.substring(0, 15)}...
                              </div>
                            ))}
                            {news[0].files.length > 5 && (
                              <div style={{
                                background: 'rgba(255,255,255,0.2)',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '15px',
                                fontSize: '0.8rem'
                              }}>
                                +{news[0].files.length - 5} mais
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                )}

                {/* Anúncio Nativo após primeira notícia */}
                <NativeAd 
                  title="Transforme Seu Negócio com Marketing Digital"
                  description="Aumente suas vendas em até 300% com nossas estratégias comprovadas. Consulta gratuita disponível!"
                  image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop"
                  sponsor="AGÊNCIA DIGITAL PRO"
                />

                {/* Outras notícias */}
                {news.slice(1).map((article, index) => (
                  <div key={article.id}>
                    <article className="news-card">
                      <img 
                        src={article.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop"} 
                        alt={article.title}
                        className="news-image"
                      />
                      <div className="news-content">
                        <span className="news-category">{article.category}</span>
                        <h2 className="news-title">
                          <Link href={`/noticia/${article.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                            {article.title}
                          </Link>
                        </h2>
                        <p className="news-excerpt">{article.excerpt}</p>
                        
                        {/* Mostrar arquivos anexados */}
                        {article.files && article.files.length > 0 && (
                          <div style={{
                            background: '#f8f9fa',
                            padding: '0.8rem',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            border: '1px solid #e9ecef'
                          }}>
                            <div style={{fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem'}}>
                              📎 Arquivos anexados ({article.files.length}):
                            </div>
                            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                              {article.files.slice(0, 3).map(file => (
                                <div key={file.id} style={{
                                  background: '#4CAF50',
                                  color: 'white',
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '12px',
                                  fontSize: '0.7rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.3rem'
                                }}>
                                  {file.type.startsWith('image/') ? '🖼️' : 
                                   file.type.startsWith('video/') ? '🎬' :
                                   file.type === 'application/pdf' ? '📄' : '📎'}
                                  <span>{file.name.substring(0, 10)}...</span>
                                </div>
                              ))}
                              {article.files.length > 3 && (
                                <div style={{
                                  background: '#6c757d',
                                  color: 'white',
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '12px',
                                  fontSize: '0.7rem'
                                }}>
                                  +{article.files.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="news-meta">
                          <span className="news-author">📝 {article.author}</span>
                          <span>📅 {article.date}</span>
                        </div>
                      </div>
                    </article>

                    {/* Inserir anúncio a cada 2 notícias */}
                    {(index + 2) % 3 === 0 && (
                      <AdBanner 
                        size="medium"
                        position={`content-${index}`}
                        content="🏠 Imobiliária Central - Casas e Apartamentos com as Melhores Condições!"
                        link="https://exemplo-imoveis.com"
                        type="content-banner"
                      />
                    )}
                  </div>
                ))}
              </>
            )}
          </section>

          <aside className="sidebar">
            {/* Banner lateral */}
            <AdBanner 
              size="medium"
              position="sidebar-top"
              content="💊 Farmácia São Paulo - Medicamentos com 20% OFF!"
              link="https://exemplo-farmacia.com"
              type="sidebar-banner"
            />

            <div style={{marginTop: '2rem'}}>
              <h3>📊 Últimas Notícias</h3>
              <div>
                {news.slice(0, 5).map(article => (
                  <div key={`sidebar-${article.id}`} style={{
                    marginBottom: '1rem', 
                    paddingBottom: '1rem', 
                    borderBottom: '1px solid #eee',
                    transition: 'transform 0.3s ease'
                  }}>
                    <h4 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                      <Link href={`/noticia/${article.id}`} style={{color: '#1e3a5f', textDecoration: 'none'}}>
                        {article.title}
                      </Link>
                    </h4>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <small style={{color: '#666'}}>📅 {article.date}</small>
                      {article.files && article.files.length > 0 && (
                        <small style={{
                          background: '#4CAF50',
                          color: 'white',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '8px',
                          fontSize: '0.6rem'
                        }}>
                          📎 {article.files.length}
                        </small>
                      )}
                    </div>
                  </div>
                ))}
                {news.length === 0 && (
                  <p style={{color: '#666', fontStyle: 'italic'}}>
                    Nenhuma notícia disponível ainda.
                  </p>
                )}
              </div>
            </div>

            {/* Anúncio lateral inferior */}
            <div style={{marginTop: '2rem'}}>
              <AdBanner 
                size="small"
                position="sidebar-bottom"
                content="🍕 Pizzaria Italiana - Delivery Grátis!"
                link="https://exemplo-pizzaria.com"
                type="sidebar-banner"
              />
            </div>

            <div style={{marginTop: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px'}}>
              <h3 style={{color: '#1e3a5f', marginBottom: '1rem', fontSize: '1rem'}}>
                📢 Quer publicar uma notícia?
              </h3>
              <p style={{fontSize: '0.9rem', marginBottom: '1rem', color: '#666'}}>
                Envie sua sugestão de pauta ou notícia para nossa redação.
              </p>
              <Link href="/contato">
                <button className="btn btn-primary" style={{fontSize: '0.85rem', padding: '0.6rem 1.2rem', width: '100%'}}>
                  📧 Entrar em Contato
                </button>
              </Link>
            </div>

            {/* Estatísticas de Monetização (apenas para você ver) */}
            <div style={{
              marginTop: '2rem', 
              padding: '1rem', 
              background: 'linear-gradient(45deg, #4CAF50, #45a049)', 
              color: 'white',
              borderRadius: '8px',
              fontSize: '0.8rem'
            }}>
              <h4 style={{marginBottom: '0.5rem'}}>💰 Estatísticas</h4>
              <div>👀 Visualizações: {adViews.toLocaleString()}</div>
              <div>🖱️ Cliques em Anúncios: {adClicks.toLocaleString()}</div>
              <div>💵 Receita Estimada: R$ {(adClicks * 0.25 + adViews * 0.01).toFixed(2)}</div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem'}}>
            <div>
              <h3>🏙️ Portal da Cidade</h3>
              <p>Seu portal de notícias local, comprometido em trazer informações relevantes e atualizadas sobre nossa comunidade.</p>
            </div>
            <div>
              <h3>📞 Contato</h3>
              <p>📧 contato@portaldacidade.com.br</p>
              <p>📱 (85) 99999-9999</p>
              <p>📍 Centro - Sua Cidade/CE</p>
            </div>
            <div>
              <h3>🔗 Links Úteis</h3>
              <p><Link href="/sobre">Sobre Nós</Link></p>
              <p><Link href="/contato">Contato</Link></p>
              <p><Link href="/admin">Área Administrativa</Link></p>
            </div>
          </div>
          
          {/* Banner publicitário no rodapé */}
          <div style={{marginBottom: '2rem'}}>
            <AdBanner 
              size="large"
              position="footer"
              content="🏪 Supermercado Popular - Ofertas Imperdíveis Toda Semana!"
              link="https://exemplo-supermercado.com"
              type="footer-banner"
            />
          </div>
          
          <div style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', textAlign: 'center', color: '#ccc'}}>
            <p>&copy; 2024 Portal da Cidade. Todos os direitos reservados. ❤️ Feito com carinho para nossa comunidade.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

// Adicione isso no arquivo pages/index.js

// Componente de Link Afiliado
const AffiliateLink = ({ title, description, image, link, commission }) => (
  <div 
    onClick={() => {
      handleAdClick('affiliate');
      window.open(link, '_blank');
    }}
    style={{
      background: 'white',
      border: '2px solid #4CAF50',
      borderRadius: '12px',
      padding: '1.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '1rem'
    }}
  >
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: '#4CAF50',
      color: 'white',
      padding: '0.2rem 0.6rem',
      borderRadius: '12px',
      fontSize: '0.7rem'
    }}>
      💰 PARCEIRO
    </div>
    
    {image && (
      <img 
        src={image} 
        alt={title}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}
      />
    )}
    
    <h3 style={{color: '#1e3a5f', marginBottom: '0.5rem'}}>{title}</h3>
    <p style={{color: '#666', marginBottom: '1rem', fontSize: '0.9rem'}}>{description}</p>
    
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <button style={{
        background: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        fontWeight: 'bold'
      }}>
        🛒 Ver Oferta
      </button>
      <small style={{color: '#4CAF50', fontWeight: 'bold'}}>
        Ganhe até R$ {commission.toFixed(2)}
      </small>
    </div>
  </div>
);

// Usar na sidebar:
<AffiliateLink 
  title="Notebook Dell Inspiron"
  description="Core i5, 8GB RAM, SSD 256GB - Super oferta!"
  image="https://exemplo.com/notebook.jpg"
  link="https://seulink.afiliado.com.br/produto"
  commission={45.00}
/>

// Componente AdSense Real
const GoogleAdSense = ({ slot, format = "auto" }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins 
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-SEU-CODIGO-AQUI"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
};

// Usar assim:
<GoogleAdSense slot="1234567890" format="horizontal" />