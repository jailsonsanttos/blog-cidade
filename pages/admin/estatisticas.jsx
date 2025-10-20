import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Estatisticas() {
  const [stats, setStats] = useState({
    adViews: 0,
    adClicks: 0,
    revenue: 0,
    clicksByType: {},
    viewsByDate: []
  })

  useEffect(() => {
    const adViews = parseInt(localStorage.getItem('adViews') || '0')
    const adClicks = parseInt(localStorage.getItem('adClicks') || '0')
    const clicksByType = JSON.parse(localStorage.getItem('clicksByType') || '{}')
    
    // Cálculo de receita
    const revenue = (adClicks * 0.25) + (adViews * 0.01)
    
    setStats({
      adViews,
      adClicks,
      revenue,
      clicksByType,
      ctr: adViews > 0 ? ((adClicks / adViews) * 100).toFixed(2) : 0
    })
  }, [])

  return (
    <>
      <Head>
        <title>💰 Estatísticas de Monetização</title>
      </Head>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">🏙️ Portal da Cidade</Link>
            <nav>
              <ul className="nav-menu">
                <li><Link href="/">🏠 Início</Link></li>
                <li><Link href="/admin">📝 Admin</Link></li>
                <li><Link href="/admin/estatisticas">💰 Estatísticas</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="admin-panel">
          <h1 style={{textAlign: 'center', color: '#1e3a5f', marginBottom: '2rem'}}>
            💰 Painel de Monetização
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Card Visualizações */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>👀</div>
              <h3 style={{marginBottom: '0.5rem'}}>Visualizações</h3>
              <div style={{fontSize: '2.5rem', fontWeight: 'bold'}}>
                {stats.adViews.toLocaleString()}
              </div>
              <small style={{opacity: 0.8}}>Total de pageviews</small>
            </div>

            {/* Card Cliques */}
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>🖱️</div>
              <h3 style={{marginBottom: '0.5rem'}}>Cliques em Anúncios</h3>
              <div style={{fontSize: '2.5rem', fontWeight: 'bold'}}>
                {stats.adClicks.toLocaleString()}
              </div>
              <small style={{opacity: 0.8}}>Total de clicks</small>
            </div>

            {/* Card CTR */}
            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>📊</div>
              <h3 style={{marginBottom: '0.5rem'}}>CTR (Taxa de Cliques)</h3>
              <div style={{fontSize: '2.5rem', fontWeight: 'bold'}}>
                {stats.ctr}%
              </div>
              <small style={{opacity: 0.8}}>Click-through rate</small>
            </div>

            {/* Card Receita */}
            <div style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>💵</div>
              <h3 style={{marginBottom: '0.5rem'}}>Receita Estimada</h3>
              <div style={{fontSize: '2.5rem', fontWeight: 'bold'}}>
                R$ {stats.revenue.toFixed(2)}
              </div>
              <small style={{opacity: 0.8}}>Ganhos totais</small>
            </div>
          </div>

          {/* Breakdown por tipo de anúncio */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{color: '#1e3a5f', marginBottom: '1.5rem'}}>
              📈 Desempenho por Tipo de Anúncio
            </h2>

            <div style={{display: 'grid', gap: '1rem'}}>
              {Object.entries(stats.clicksByType).map(([type, clicks]) => (
                <div key={type} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <div>
                    <strong style={{color: '#1e3a5f'}}>{type}</strong>
                  </div>
                  <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
                    <span>🖱️ {clicks} cliques</span>
                    <span style={{
                      background: '#4CAF50',
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.9rem'
                    }}>
                      R$ {(clicks * 0.25).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dicas de Otimização */}
          <div style={{
            background: 'linear-gradient(135deg, #4CAF50, #45a049)',
            color: 'white',
            padding: '2rem',
            borderRadius: '12px',
            marginTop: '2rem'
          }}>
            <h2 style={{marginBottom: '1rem'}}>💡 Dicas para Aumentar seus Ganhos</h2>
            <ul style={{lineHeight: '2', fontSize: '1.1rem'}}>
              <li>✅ Publique pelo menos 3 notícias por dia</li>
              <li>✅ Use imagens atrativas em todas as notícias</li>
              <li>✅ Compartilhe nas redes sociais</li>
              <li>✅ Otimize títulos para SEO</li>
              <li>✅ Adicione vídeos e conteúdo multimídia</li>
              <li>✅ Mantenha o site atualizado diariamente</li>
            </ul>
          </div>

          {/* Projeções */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            marginTop: '2rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{color: '#1e3a5f', marginBottom: '1.5rem'}}>
              🎯 Projeções de Receita
            </h2>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
              <div style={{textAlign: 'center', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px'}}>
                <h3 style={{color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem'}}>SEMANAL</h3>
                <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#4CAF50'}}>
                  R$ {(stats.revenue * 7).toFixed(2)}
                </div>
              </div>

              <div style={{textAlign: 'center', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px'}}>
                <h3 style={{color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem'}}>MENSAL</h3>
                <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#4CAF50'}}>
                  R$ {(stats.revenue * 30).toFixed(2)}
                </div>
              </div>

              <div style={{textAlign: 'center', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px'}}>
                <h3 style={{color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem'}}>ANUAL</h3>
                <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#4CAF50'}}>
                  R$ {(stats.revenue * 365).toFixed(2)}
                </div>
              </div>
            </div>

            <p style={{marginTop: '1.5rem', color: '#666', textAlign: 'center', fontSize: '0.9rem'}}>
              * Projeções baseadas no desempenho atual. Resultados podem variar.
            </p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>💰 Painel de Monetização - Portal da Cidade</p>
        </div>
      </footer>
    </>
  )
}