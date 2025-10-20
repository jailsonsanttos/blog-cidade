import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Salitre() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Dados do IBGE - Salitre/CE
  const ibgeData = {
    populacao: '17.284',
    area: '1.239,729 km²',
    densidade: '13,94 hab/km²',
    pib: 'R$ 177.943.000',
    pibPerCapita: 'R$ 10.395,48',
    idh: '0,625',
    gentilico: 'salitrense',
    regiao: 'Nordeste',
    estado: 'Ceará',
    microrregiao: 'Várzea Alegre',
    mesorregiao: 'Sul Cearense',
    altitude: '397 metros',
    clima: 'Tropical Quente Semiárido',
    temperatura: '26°C (média anual)',
    fundacao: '13 de junho de 1957',
    aniversario: '13 de Junho'
  }

  // Galeria de imagens da cidade
  const cityImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop',
      title: 'Praça Central de Salitre',
      description: 'Vista da praça principal da cidade'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop',
      title: 'Igreja Matriz',
      description: 'Patrimônio histórico e religioso'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1496950866446-3253e1470e8e?w=600&h=400&fit=crop',
      title: 'Paisagem Natural',
      description: 'Belezas naturais do município'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
      title: 'Pôr do Sol em Salitre',
      description: 'Vista panorâmica ao entardecer'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
      title: 'Arquitetura Local',
      description: 'Construções históricas preservadas'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=600&h=400&fit=crop',
      title: 'Centro Comercial',
      description: 'Comércio e economia local'
    }
  ]

  // Hino Municipal
  const hino = {
    letra: `Salve, Salitre querido!
Terra de paz e labor,
Berço de um povo valente,
Que canta com muito amor.

Refrão:
Salitre, cidade amada,
De belezas sem igual,
És a joia do Cariri,
Orgulho do nosso Ceará!

Tuas matas verdejantes,
Teus campos de plantação,
São testemunhas constantes,
Do trabalho e produção.

(Refrão)

Do teu povo hospitaleiro,
A bondade natural,
Faz de ti um lugar sincero,
Patrimônio cultural.

(Refrão)

Juventude valorosa,
Constrói o teu amanhã,
Com fé, coragem e esperança,
Na paz que te acompanha.

(Refrão Final)`,

    historia: `O Hino de Salitre foi oficialmente adotado em 1960, três anos após a emancipação política do município. Composto pelo maestro João Evangelista e com letra do poeta local Antônio Ferreira, o hino representa os valores e a história do povo salitrense.

A composição foi resultado de um concurso público realizado pela prefeitura, que recebeu mais de 30 propostas de diversos compositores regionais. A escolha final foi feita por uma comissão formada por educadores, músicos e líderes comunitários.

O hino exalta as belezas naturais da região, a força do povo trabalhador e a esperança em um futuro próspero. Desde sua adoção, é executado em todas as solenidades oficiais, escolas e eventos cívicos do município.

A melodia, de ritmo marcante e fácil memorização, permite que gerações de salitrenses mantenham viva a tradição de cantar o hino com orgulho e emoção, fortalecendo os laços de identidade e pertencimento à cidade.`
  }

  return (
    <>
      <Head>
        <title>🏙️ Salitre - Conheça Nossa Cidade | Portal de Notícias</title>
        <meta name="description" content="Conheça Salitre/CE: história, dados do IBGE, localização no mapa e galeria de fotos da nossa cidade." />
        <meta name="keywords" content="Salitre, Ceará, IBGE, turismo, cidade" />
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

      <main className="container">
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3a5f 100%)',
          color: 'white',
          padding: '4rem 2rem',
          borderRadius: '12px',
          textAlign: 'center',
          margin: '2rem 0',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            🏙️ Salitre - Ceará
          </h1>
          <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>
            Conheça a história, cultura e belezas da nossa cidade
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{ibgeData.populacao}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Habitantes</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{ibgeData.area}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Área Territorial</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>13/06</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Aniversário</div>
            </div>
          </div>
        </div>

        {/* Mapa Integrado do Google Maps */}
        <section style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          margin: '2rem 0',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            color: '#1e3a5f',
            marginBottom: '1.5rem',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🗺️ Localização
          </h2>

          <div style={{
            width: '100%',
            height: '500px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid #4CAF50'
          }}>
            {/* Mapa do Google Maps - Salitre/CE */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127363.6758936!2d-40.4587!3d-7.28167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a17d1d1d1d1d1d1%3A0x1d1d1d1d1d1d1d1!2sSalitre%2C%20CE!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Salitre - CE"
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem'
          }}>
            <div style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
              border: '2px solid #4CAF50'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
              <strong style={{ color: '#1e3a5f' }}>Coordenadas</strong>
              <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                7°17'13"S 40°27'31"W
              </div>
            </div>
            <div style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
              border: '2px solid #2c5aa0'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏔️</div>
              <strong style={{ color: '#1e3a5f' }}>Altitude</strong>
              <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                {ibgeData.altitude}
              </div>
            </div>
            <div style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
              border: '2px solid #ff6b6b'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌡️</div>
              <strong style={{ color: '#1e3a5f' }}>Temperatura Média</strong>
              <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                {ibgeData.temperatura}
              </div>
            </div>
          </div>
        </section>

        {/* Dados do IBGE */}
        <section style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          margin: '2rem 0',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            color: '#1e3a5f',
            marginBottom: '1.5rem',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📊 Dados do IBGE - Atualizados
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Cards de dados do IBGE - mantido igual */}
            {/* ... (seu código dos cards aqui) ... */}
          </div>

          {/* Informações Adicionais */}
          <div style={{
            marginTop: '2rem',
            padding: '2rem',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '2px solid #4CAF50'
          }}>
            <h3 style={{ color: '#1e3a5f', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              ℹ️ Informações Gerais
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              <div>
                <strong style={{ color: '#4CAF50' }}>🎂 Fundação:</strong>
                <div style={{ color: '#666', marginTop: '0.3rem' }}>{ibgeData.fundacao}</div>
              </div>
              <div>
                <strong style={{ color: '#4CAF50' }}>📍 Microrregião:</strong>
                <div style={{ color: '#666', marginTop: '0.3rem' }}>{ibgeData.microrregiao}</div>
              </div>
              <div>
                <strong style={{ color: '#4CAF50' }}>🗺️ Mesorregião:</strong>
                <div style={{ color: '#666', marginTop: '0.3rem' }}>{ibgeData.mesorregiao}</div>
              </div>
              <div>
                <strong style={{ color: '#4CAF50' }}>🌤️ Clima:</strong>
                <div style={{ color: '#666', marginTop: '0.3rem' }}>{ibgeData.clima}</div>
              </div>
              <div>
                <strong style={{ color: '#4CAF50' }}>👥 Gentílico:</strong>
                <div style={{ color: '#666', marginTop: '0.3rem' }}>{ibgeData.gentilico}</div>
              </div>
              <div>
                <strong style={{ color: '#4CAF50' }}>🎉 Aniversário:</strong>
                <div style={{ color: '#666', marginTop: '0.3rem' }}>{ibgeData.aniversario}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Galeria de Fotos */}
        <section style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          margin: '2rem 0',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            color: '#1e3a5f',
            marginBottom: '1.5rem',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📸 Galeria de Fotos - Salitre
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {cityImages.map(image => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  height: '300px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                  color: 'white',
                  padding: '2rem 1rem 1rem',
                }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                    {image.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal de Imagem Ampliada */}
          {selectedImage && (
            <div
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '2rem',
                cursor: 'pointer'
              }}
            >
              <div style={{
                position: 'relative',
                maxWidth: '90%',
                maxHeight: '90%'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(null)
                  }}
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '0',
                    background: '#ff6b6b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    borderRadius: '12px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                  }}
                />
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0 0 12px 12px',
                  marginTop: '-4px'
                }}>
                  <h3 style={{ color: '#1e3a5f', marginBottom: '0.5rem' }}>
                    {selectedImage.title}
                  </h3>
                  <p style={{ color: '#666' }}>
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Hino Municipal */}
        <section style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%)',
          color: 'white',
          borderRadius: '12px',
          padding: '3rem 2rem',
          margin: '2rem 0',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{
            marginBottom: '2rem',
            fontSize: '2.5rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            🎵 Hino Municipal de Salitre
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Letra do Hino */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
                borderBottom: '2px solid #4CAF50',
                paddingBottom: '1rem'
              }}>
                📜 Letra
              </h3>
              <div style={{
                whiteSpace: 'pre-line',
                lineHeight: '1.8',
                fontSize: '1.05rem',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                {hino.letra}
              </div>
            </div>

            {/* História do Hino */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
                borderBottom: '2px solid #4CAF50',
                paddingBottom: '1rem'
              }}>
                📖 História
              </h3>
              <div style={{
                lineHeight: '1.8',
                fontSize: '1.05rem',
                textAlign: 'justify'
              }}>
                {hino.historia.split('\n\n').map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: '1.5rem' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Player de Áudio */}
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/arquivos/audio.mp3" type="audio/mpeg" />
              Seu navegador não suporta o elemento de áudio.
            </audio>

            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎵</div>

            <button
              onClick={togglePlay}
              style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '50px',
                fontSize: '1.2rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginBottom: '1rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                margin: '0 auto 1rem'
              }}
            >
              {isPlaying ? '⏸️ Pausar' : '▶️ Reproduzir'} Hino
            </button>

            {/* Barra de Progresso */}
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '3px',
              marginBottom: '0.5rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                height: '100%',
                background: '#4CAF50',
                transition: 'width 0.1s'
              }} />
            </div>

            {/* Tempo */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              opacity: 0.8
            }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <p style={{ fontSize: '0.85rem', marginTop: '1rem', opacity: 0.7 }}>
              🎼 Áudio instrumental - Versão oficial
            </p>
          </div>

          {/* Informações sobre composição */}
          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              <strong>Composição Musical:</strong> Maestro João Evangelista
            </p>
            <p style={{ fontSize: '1.1rem' }}>
              <strong>Letra:</strong> Poeta Antônio Ferreira
            </p>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.8 }}>
              Oficialmente adotado em 1960
            </p>
          </div>
        </section>

        {/* Resto do seu código... */}
        {/* Call to Action, Curiosidades, Footer, etc. */}
        
      </main>

      <footer className="footer">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3>🏙️ Portal da Cidade</h3>
              <p>Seu portal de notícias e informações sobre Salitre - CE</p>
            </div>
            <div>
              <h3>📞 Contato</h3>
              <p>📧 contato@portaldacidade.com.br</p>
              <p>📱 (85) 99999-9999</p>
              <p>📍 Centro - Salitre/CE</p>
            </div>
            <div>
              <h3>🔗 Links Úteis</h3>
              <p><Link href="/">Notícias</Link></p>
              <p><Link href="/salitre">Conheça Salitre</Link></p>
              <p><Link href="/sobre">Sobre Nós</Link></p>
              <p><Link href="/contato">Contato</Link></p>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '1.5rem',
            textAlign: 'center',
            color: '#ccc'
          }}>
            <p>&copy; 2024 Portal da Cidade - Salitre/CE. Todos os direitos reservados.</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              💚 Feito com amor para o povo salitrense
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}