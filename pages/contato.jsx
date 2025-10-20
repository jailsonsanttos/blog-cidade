import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.nome || !formData.email || !formData.assunto || !formData.mensagem) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Simular envio da mensagem
    console.log('Mensagem enviada:', formData)
    
    setShowSuccess(true)
    setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
    
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>📞 Contato - Portal de Notícias</title>
        <meta name="description" content="Entre em contato com nossa equipe. Envie sugestões, notícias ou tire suas dúvidas." />
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
        <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '3rem', margin: '2rem 0', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
          <h1 style={{color: '#1e3a5f', marginBottom: '1rem', fontSize: '2.5rem', textAlign: 'center'}}>
            📞 Entre em Contato
          </h1>
          <p style={{textAlign: 'center', color: '#666', fontSize: '1.1rem', marginBottom: '3rem'}}>
            Nossa equipe está sempre pronta para ouvir você. Envie sugestões, notícias ou esclareça suas dúvidas.
          </p>
          
          {showSuccess && (
            <div className="success-message" style={{marginBottom: '2rem'}}>
              ✅ Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.
            </div>
          )}
          
          <div className="contact-grid">
            <div>
              <h2 style={{color: '#1e3a5f', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                ✉️ Envie sua Mensagem
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nome">👤 Nome Completo *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">📧 E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="assunto">🏷️ Assunto *</label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione o assunto</option>
                    <option value="Sugestão de Pauta">📰 Sugestão de Pauta</option>
                    <option value="Envio de Notícia">📝 Envio de Notícia</option>
                    <option value="Denúncia">⚠️ Denúncia</option>
                    <option value="Elogio">👏 Elogio</option>
                    <option value="Reclamação">😠 Reclamação</option>
                    <option value="Dúvida Técnica">🛠️ Dúvida Técnica</option>
                    <option value="Parceria">🤝 Parceria</option>
                    <option value="Outros">💬 Outros</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensagem">💭 Mensagem *</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows="6"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    placeholder="Escreva sua mensagem aqui... Seja detalhado para que possamos te ajudar melhor."
                  />
                  <div className="form-help">Descreva sua solicitação com o máximo de detalhes possível.</div>
                </div>

                <button type="submit" className="btn btn-primary" style={{width: '100%', fontSize: '1.1rem'}}>
                  🚀 Enviar Mensagem
                </button>
              </form>
            </div>

            <div className="contact-info">
              <h2 style={{color: '#1e3a5f', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                📋 Informações de Contato
              </h2>
              
              <div className="contact-item">
                <h3>📧 E-mail Principal</h3>
                <p><strong>contato@portaldacidade.com.br</strong></p>
                <p style={{fontSize: '0.9rem', color: '#666'}}>Resposta em até 24 horas</p>
              </div>

              <div className="contact-item">
                <h3>📱 WhatsApp</h3>
                <p><strong>(85) 98122-8898</strong></p>
                <p style={{fontSize: '0.9rem', color: '#666'}}>Segunda a Sexta: 8h às 18h</p>
              </div>

              <div className="contact-item">
                <h3>📍 Endereço</h3>
                <p>Rua 17 de dezembro, 00<br />
                Centro - Salitre/CE<br />
                <strong>CEP: 63155-000</strong></p>
              </div>

              <div className="contact-item">
                <h3>🕒 Horário de Atendimento</h3>
                <p><strong>Segunda a Sexta:</strong> 8h às 18h<br />
                <strong>Sábado:</strong> 8h às 12h<br />
                <strong>Domingo:</strong> Plantão Online</p>
              </div>

              <div className="contact-item">
                <h3>📢 Redes Sociais</h3>
                <p>📘 Facebook: @portaldacidade<br />
                📷 Instagram: @portaldacidade<br />
                🐦 Twitter: @portaldacidade</p>
              </div>

              <div style={{background: 'linear-gradient(135deg, #4CAF50, #45a049)', padding: '1.5rem', borderRadius: '12px', color: 'white', textAlign: 'center', marginTop: '2rem'}}>
                <h3 style={{marginBottom: '1rem'}}>⚡ Atendimento Emergencial</h3>
                <p style={{marginBottom: '1rem'}}>Para situações urgentes que precisam de cobertura imediata:</p>
                <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>📞 (85) 98888-8888</p>
                <p style={{fontSize: '0.9rem'}}>Disponível 24h por dia</p>
              </div>
            </div>
          </div>

          <div style={{marginTop: '3rem', padding: '2rem', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center'}}>
            <h3 style={{color: '#1e3a5f', marginBottom: '1rem'}}>💡 Dicas para um Bom Atendimento</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'left'}}>
              <div>
                <strong>📝 Seja Específico:</strong> Detalhe bem sua solicitação
              </div>
              <div>
                <strong>📸 Anexe Fotos:</strong> Se aplicável, envie imagens
              </div>
              <div>
                <strong>📍 Informe Local:</strong> Mencione endereços e referências
              </div>
              <div>
                <strong>⏰ Seja Paciente:</strong> Respondemos em até 24h
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🏙️ Portal da Cidade</h3>
              <p>Sua fonte confiável de informações locais.</p>
            </div>
            <div className="footer-section">
              <h3>📞 Fale Conosco</h3>
              <p>📧 contato@portaldacidade.com.br</p>
              <p>📱 (88) 98122-8898</p>
              <p>📍 Centro - Salitre/CE</p>
            </div>
            <div className="footer-section">
              <h3>🔗 Links Úteis</h3>
              <p><Link href="/sobre">Sobre Nós</Link></p>
              <p><Link href="/admin">Área Administrativa</Link></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Portal da Cidade. Todos os direitos reservados. ❤️ Feito com carinho para nossa comunidade.</p>
          </div>
        </div>
      </footer>
    </>
  )
}