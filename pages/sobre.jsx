import Head from 'next/head'
import Link from 'next/link'

export default function Sobre() {
  return (
    <>
      <Head>
        <title>ℹ️ Sobre - Portal de Notícias</title>
        <meta name="description" content="Conheça a história e missão do Portal da Cidade" />
      </Head>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">🏙️ Portal da Cidade</Link>
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

      <main className="container">
        <article style={{backgroundColor: 'white', borderRadius: '12px', padding: '3rem', margin: '2rem 0', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
          <h1 style={{color: '#1e3a5f', marginBottom: '2rem', fontSize: '2.5rem', textAlign: 'center'}}>
            ℹ️ Sobre o Portal da Cidade
          </h1>
          
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🏙️</div>
              <p style={{fontSize: '1.2rem', color: '#666', fontStyle: 'italic'}}>
                "Conectando nossa comunidade através da informação"
              </p>
            </div>

            <h2 style={{color: '#4CAF50', marginTop: '2.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              🎯 Nossa Missão
            </h2>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem'}}>
              O Portal da Cidade é o principal veículo de informação local, comprometido em trazer as notícias mais 
              relevantes e atuais da nossa comunidade. Acreditamos que uma população bem informada é fundamental 
              para o desenvolvimento e crescimento da nossa cidade.
            </p>
            
            <h2 style={{color: '#4CAF50', marginTop: '2.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              👁️ Nossa Visão
            </h2>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem'}}>
              Ser reconhecido como a fonte mais confiável e completa de informações locais, mantendo os cidadãos 
              sempre atualizados sobre os acontecimentos que impactam diretamente suas vidas, desde questões de 
              infraestrutura e saúde pública até eventos culturais e esportivos.
            </p>
            
            <h2 style={{color: '#4CAF50', marginTop: '2.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              ⭐ Nossos Valores
            </h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
              <div style={{padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '2px solid #4CAF50'}}>
                <h3 style={{color: '#1e3a5f', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  ✅ Transparência
                </h3>
                <p>Informações claras, precisas e imparciais para toda a comunidade.</p>
              </div>
              <div style={{padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '2px solid #2c5aa0'}}>
                <h3 style={{color: '#1e3a5f', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  🤝 Compromisso
                </h3>
                <p>Dedicação total em servir nossa comunidade com excelência.</p>
              </div>
              <div style={{padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '2px solid #1e3a5f'}}>
                <h3 style={{color: '#1e3a5f', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  ⚡ Agilidade
                </h3>
                <p>Rapidez na divulgação das informações mais importantes.</p>
              </div>
            </div>
            
            <h2 style={{color: '#4CAF50', marginTop: '2.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              👥 Nossa Equipe
            </h2>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem'}}>
              Contamos com uma equipe dedicada de jornalistas, colaboradores e correspondentes locais que trabalham 
              incansavelmente para trazer informações precisas e relevantes para nossa comunidade. Cada membro da 
              nossa equipe compartilha o amor pela nossa cidade e o compromisso com o jornalismo de qualidade.
            </p>

            <div style={{background: 'linear-gradient(135deg, #4CAF50, #45a049)', padding: '2rem', borderRadius: '12px', color: 'white', textAlign: 'center', margin: '2rem 0'}}>
              <h3 style={{marginBottom: '1rem', fontSize: '1.5rem'}}>📊 Nosso Alcance</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginTop: '1.5rem'}}>
                <div>
                  <div style={{fontSize: '2rem', fontWeight: 'bold'}}>1000+</div>
                  <div>Leitores Mensais</div>
                </div>
                <div>
                  <div style={{fontSize: '2rem', fontWeight: 'bold'}}>500+</div>
                  <div>Notícias Publicadas</div>
                </div>
                <div>
                  <div style={{fontSize: '2rem', fontWeight: 'bold'}}>24h</div>
                  <div>Atualização Contínua</div>
                </div>
              </div>
            </div>
            
            <h2 style={{color: '#4CAF50', marginTop: '2.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              📞 Entre em Contato
            </h2>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem'}}>
              Tem uma sugestão de pauta, quer enviar uma notícia ou tem alguma dúvida? Nossa equipe está sempre 
              pronta para ouvir a comunidade e melhorar nossos serviços.
            </p>
            
            <div style={{textAlign: 'center', marginTop: '3rem'}}>
              <Link href="/contato">
                <button className="btn btn-primary" style={{fontSize: '1.1rem', padding: '1rem 2rem'}}>
                  📧 Fale Conosco
                </button>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🏙️ Portal da Cidade</h3>
              <p>Conectando nossa comunidade através da informação de qualidade.</p>
            </div>
            <div className="footer-section">
              <h3>📞 Contato</h3>
              <p>📧 Jailsonbennington@gmail.com</p>
              <p>📱 (88) 98122-8898</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Portal da Cidade. Todos os direitos reservados. ❤️</p>
          </div>
        </div>
      </footer>
    </>
  )
}