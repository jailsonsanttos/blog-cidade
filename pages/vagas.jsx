import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Vagas() {
  const [vagas, setVagas] = useState([])
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [busca, setBusca] = useState('')
  const [vagaSelecionada, setVagaSelecionada] = useState(null)

  useEffect(() => {
    const savedVagas = localStorage.getItem('vagasEmprego')
    if (savedVagas) {
      try {
        setVagas(JSON.parse(savedVagas))
      } catch (error) {
        console.error('Erro ao carregar vagas:', error)
        const exemplos = getVagasExemplo()
        setVagas(exemplos)
        localStorage.setItem('vagasEmprego', JSON.stringify(exemplos))
      }
    } else {
      const exemplos = getVagasExemplo()
      setVagas(exemplos)
      localStorage.setItem('vagasEmprego', JSON.stringify(exemplos))
    }
  }, [])

  const getVagasExemplo = () => [
    {
      id: 1,
      titulo: 'Desenvolvedor Web Full Stack',
      empresa: 'Tech Solutions Salitre',
      localizacao: 'Salitre - CE',
      tipo: 'CLT',
      categoria: 'Tecnologia',
      salario: 'R$ 4.000 - R$ 6.000',
      descricao: 'Buscamos desenvolvedor full stack com experiência em React, Node.js e MongoDB. Trabalho remoto disponível.',
      requisitos: ['React.js', 'Node.js', 'MongoDB', 'Git', 'Experiência de 2 anos'],
      beneficios: ['Vale alimentação', 'Plano de saúde', 'Home office', 'Gympass'],
      dataPublicacao: '2024-10-01',
      dataExpiracao: '2024-11-30',
      email: 'jailsonbennington@gmail.com',
      telefone: '(88) 8122-8898',
      status: 'ativa'
    },
    {
      id: 2,
      titulo: 'Vendedor(a) de Loja',
      empresa: 'Magazine Center',
      localizacao: 'Centro - Salitre',
      tipo: 'CLT',
      categoria: 'Comercio',
      salario: 'R$ 1.500 + comissões',
      descricao: 'Vaga para vendedor(a) com experiência em atendimento ao cliente. Necessário ensino médio completo.',
      requisitos: ['Ensino médio completo', 'Experiência em vendas', 'Boa comunicação', 'Proatividade'],
      beneficios: ['Vale transporte', 'Vale alimentação', 'Comissões', 'Plano de saúde'],
      dataPublicacao: '2024-10-05',
      dataExpiracao: '2024-11-15',
      email: 'jailsonbennington@gmail.com',
      telefone: '(88) 8122-8898',
      status: 'ativa'
    },
    {
      id: 3,
      titulo: 'Auxiliar Administrativo',
      empresa: 'Prefeitura Municipal',
      localizacao: 'Centro Administrativo',
      tipo: 'Concurso',
      categoria: 'Administrativo',
      salario: 'R$ 2.500',
      descricao: 'Concurso público para auxiliar administrativo. Edital disponível no site da prefeitura.',
      requisitos: ['Ensino médio completo', 'Conhecimentos em informática', 'Experiência desejável'],
      beneficios: ['Estabilidade', 'Plano de saúde', 'Vale alimentação', '13º salário'],
      dataPublicacao: '2024-09-28',
      dataExpiracao: '2024-12-31',
      email: 'jailsonbennington@gmail.com',
      telefone: '(88) 8122-8898',
      status: 'ativa'
    }
  ]

  const vagasFiltradas = vagas.filter(vaga => {
    const matchCategoria = filtroCategoria === 'todas' || vaga.categoria === filtroCategoria
    const matchTipo = filtroTipo === 'todos' || vaga.tipo === filtroTipo
    const matchBusca = vaga.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       vaga.empresa.toLowerCase().includes(busca.toLowerCase()) ||
                       vaga.descricao.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchTipo && matchBusca && vaga.status === 'ativa'
  })

  const categorias = [...new Set(vagas.map(v => v.categoria))]
  const tipos = [...new Set(vagas.map(v => v.tipo))]

  return (
    <>
      <Head>
        <title>Vagas de Emprego - Salitre</title>
        <meta name="description" content="Encontre as melhores oportunidades de emprego em Salitre e região." />
      </Head>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">Portal da Cidade</Link>
            <nav>
              <ul className="nav-menu">
                <li><Link href="/">Início</Link></li>
                <li><Link href="/vagas">Vagas</Link></li>
                <li><Link href="/salitre">Salitre</Link></li>
                <li><Link href="/admin">Admin</Link></li>
                <li><Link href="/contato">Contato</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container">
        <div style={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
          color: 'white',
          padding: '4rem 2rem',
          borderRadius: '12px',
          textAlign: 'center',
          margin: '2rem 0',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }}>
          <h1 style={{fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold'}}>
            Vagas de Emprego
          </h1>
          <p style={{fontSize: '1.3rem', opacity: 0.95, marginBottom: '2rem'}}>
            Encontre a oportunidade perfeita para sua carreira em Salitre
          </p>
          <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <div style={{background: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '8px'}}>
              <div style={{fontSize: '2rem', fontWeight: 'bold'}}>{vagas.filter(v => v.status === 'ativa').length}</div>
              <div style={{fontSize: '0.9rem'}}>Vagas Ativas</div>
            </div>
            <div style={{background: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '8px'}}>
              <div style={{fontSize: '2rem', fontWeight: 'bold'}}>{categorias.length}</div>
              <div style={{fontSize: '0.9rem'}}>Categorias</div>
            </div>
            <div style={{background: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '8px'}}>
              <div style={{fontSize: '2rem', fontWeight: 'bold'}}>100%</div>
              <div style={{fontSize: '0.9rem'}}>Gratuito</div>
            </div>
          </div>
        </div>

        <section style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          margin: '2rem 0',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{color: '#1e3a5f', marginBottom: '1.5rem', fontSize: '1.5rem'}}>
            Filtrar Vagas
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#1e3a5f'}}>
                Buscar:
              </label>
              <input
                type="text"
                placeholder="Digite cargo, empresa ou palavra-chave..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #e1e5e9',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#1e3a5f'}}>
                Categoria:
              </label>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #e1e5e9',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                <option value="todas">Todas as categorias</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#1e3a5f'}}>
                Tipo de Contrato:
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #e1e5e9',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                <option value="todos">Todos os tipos</option>
                {tipos.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{color: '#666'}}>
              {vagasFiltradas.length} vaga{vagasFiltradas.length !== 1 ? 's' : ''} encontrada{vagasFiltradas.length !== 1 ? 's' : ''}
            </div>
            <button
              onClick={() => {
                setBusca('')
                setFiltroCategoria('todas')
                setFiltroTipo('todos')
              }}
              style={{
                background: '#2c5aa0',
                color: 'white',
                border: 'none',
                padding: '0.6rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Limpar Filtros
            </button>
          </div>
        </section>

        <section>
          {vagasFiltradas.length === 0 ? (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '4rem 2rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{color: '#1e3a5f', marginBottom: '1rem'}}>Nenhuma vaga encontrada</h2>
              <p style={{color: '#666', marginBottom: '2rem'}}>
                Tente ajustar os filtros ou buscar por outras palavras-chave
              </p>
              <button
                onClick={() => {
                  setBusca('')
                  setFiltroCategoria('todas')
                  setFiltroTipo('todos')
                }}
                className="btn btn-primary"
              >
                Ver Todas as Vagas
              </button>
            </div>
          ) : (
            <div style={{display: 'grid', gap: '1.5rem'}}>
              {vagasFiltradas.map(vaga => (
                <div
                  key={vaga.id}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'
                    e.currentTarget.style.borderColor = '#4CAF50'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'
                    e.currentTarget.style.borderColor = 'transparent'
                  }}
                  onClick={() => setVagaSelecionada(vaga)}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem'}}>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap'}}>
                        <span style={{
                          background: '#4CAF50',
                          color: 'white',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {vaga.tipo}
                        </span>
                        <span style={{
                          background: '#2c5aa0',
                          color: 'white',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {vaga.categoria}
                        </span>
                      </div>

                      <h3 style={{
                        color: '#1e3a5f',
                        fontSize: '1.5rem',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold'
                      }}>
                        {vaga.titulo}
                      </h3>

                      <div style={{display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap', color: '#666'}}>
                        <span>{vaga.empresa}</span>
                        <span>{vaga.localizacao}</span>
                        <span>{vaga.salario}</span>
                      </div>

                      <p style={{color: '#666', lineHeight: '1.6', marginBottom: '1rem'}}>
                        {vaga.descricao}
                      </p>

                      <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                        {vaga.requisitos.slice(0, 3).map((req, index) => (
                          <span
                            key={index}
                            style={{
                              background: '#f8f9fa',
                              padding: '0.3rem 0.8rem',
                              borderRadius: '12px',
                              fontSize: '0.85rem',
                              border: '1px solid #e9ecef'
                            }}
                          >
                            {req}
                          </span>
                        ))}
                        {vaga.requisitos.length > 3 && (
                          <span style={{
                            background: '#f8f9fa',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            border: '1px solid #e9ecef'
                          }}>
                            +{vaga.requisitos.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        setVagaSelecionada(vaga)
                      }}
                      style={{
                        padding: '0.8rem 2rem',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Ver Detalhes
                    </button>
                  </div>

                  <div style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #f0f0f0',
                    fontSize: '0.85rem',
                    color: '#999'
                  }}>
                    Publicado em {new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')} • 
                    Válido até {new Date(vaga.dataExpiracao).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {vagaSelecionada && (
          <div
            onClick={() => setVagaSelecionada(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem',
              overflowY: 'auto'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: '12px',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setVagaSelecionada(null)}
                style={{
                  position: 'sticky',
                  top: '1rem',
                  right: '1rem',
                  float: 'right',
                  background: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                ✕
              </button>

              <div style={{padding: '2rem'}}>
                <div style={{marginBottom: '1.5rem'}}>
                  <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap'}}>
                    <span style={{
                      background: '#4CAF50',
                      color: 'white',
                      padding: '0.4rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {vagaSelecionada.tipo}
                    </span>
                    <span style={{
                      background: '#2c5aa0',
                      color: 'white',
                      padding: '0.4rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {vagaSelecionada.categoria}
                    </span>
                  </div>

                  <h2 style={{color: '#1e3a5f', fontSize: '2rem', marginBottom: '1rem'}}>
                    {vagaSelecionada.titulo}
                  </h2>

                  <div style={{display: 'grid', gap: '0.5rem', color: '#666', marginBottom: '1.5rem'}}>
                    <div><strong>Empresa:</strong> {vagaSelecionada.empresa}</div>
                    <div><strong>Localização:</strong> {vagaSelecionada.localizacao}</div>
                    <div><strong>Salário:</strong> {vagaSelecionada.salario}</div>
                    <div><strong>Publicado em:</strong> {new Date(vagaSelecionada.dataPublicacao).toLocaleDateString('pt-BR')}</div>
                    <div><strong>Válido até:</strong> {new Date(vagaSelecionada.dataExpiracao).toLocaleDateString('pt-BR')}</div>
                  </div>
                </div>

                <div style={{marginBottom: '2rem'}}>
                  <h3 style={{color: '#1e3a5f', marginBottom: '1rem', fontSize: '1.3rem'}}>
                    Descrição da Vaga
                  </h3>
                  <p style={{color: '#666', lineHeight: '1.8'}}>
                    {vagaSelecionada.descricao}
                  </p>
                </div>

                <div style={{marginBottom: '2rem'}}>
                  <h3 style={{color: '#1e3a5f', marginBottom: '1rem', fontSize: '1.3rem'}}>
                    Requisitos
                  </h3>
                  <ul style={{paddingLeft: '1.5rem', color: '#666', lineHeight: '2'}}>
                    {vagaSelecionada.requisitos.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div style={{marginBottom: '2rem'}}>
                  <h3 style={{color: '#1e3a5f', marginBottom: '1rem', fontSize: '1.3rem'}}>
                    Benefícios
                  </h3>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                    {vagaSelecionada.beneficios.map((ben, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#4CAF50',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem'
                        }}
                      >
                        {ben}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  background: '#f8f9fa',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{color: '#1e3a5f', marginBottom: '1rem', fontSize: '1.3rem'}}>
                    Como Se Candidatar
                  </h3>
                  <div style={{color: '#666', marginBottom: '1rem'}}>
                    <div style={{marginBottom: '0.5rem'}}>
                      <strong>E-mail:</strong> {vagaSelecionada.email}
                    </div>
                    <div>
                      <strong>Telefone:</strong> {vagaSelecionada.telefone}
                    </div>
                  </div>
                  <p style={{color: '#666', fontSize: '0.9rem'}}>
                    Envie seu currículo mencionando a vaga de interesse no assunto do e-mail.
                  </p>
                </div>

                <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                  <Link 
                    href={`mailto:${vagaSelecionada.email}?subject=Candidatura para ${vagaSelecionada.titulo}`}
                    className="btn btn-primary"
                    style={{textDecoration: 'none'}}
                  >
                    Candidatar por E-mail
                  </Link>
                  <Link
                    href={`https://wa.me/5588981228898?text=Olá! Tenho interesse na vaga de ${vagaSelecionada.titulo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{textDecoration: 'none'}}
                  >
                    Contatar via WhatsApp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>Portal da Cidade - Salitre/CE</p>
        </div>
      </footer>
    </>
  )
}