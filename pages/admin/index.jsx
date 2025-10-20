import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Admin() {
  const [news, setNews] = useState([])
  const [editingNews, setEditingNews] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    image: '',
    files: []
  })

  useEffect(() => {
    const savedNews = localStorage.getItem('cityNews')
    if (savedNews) {
      try {
        setNews(JSON.parse(savedNews))
      } catch (error) {
        console.error('Erro ao carregar notícias:', error)
        setNews([])
      }
    }
  }, [])

  const saveToStorage = (newsData) => {
    try {
      localStorage.setItem('cityNews', JSON.stringify(newsData))
      setNews(newsData)
    } catch (error) {
      console.error('Erro ao salvar notícias:', error)
    }
  }

  // Função para converter arquivo para Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  // Função para fazer upload de arquivos
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files)
    const newFiles = []

    for (let file of files) {
      // Verificar tamanho (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`❌ Arquivo "${file.name}" é muito grande. Máximo 10MB.`)
        continue
      }

      try {
        const base64 = await convertToBase64(file)
        const fileObj = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64,
          uploadDate: new Date().toLocaleString('pt-BR')
        }
        newFiles.push(fileObj)
      } catch (error) {
        console.error('Erro ao processar arquivo:', file.name, error)
        alert(`❌ Erro ao processar arquivo: ${file.name}`)
      }
    }

    setUploadedFiles([...uploadedFiles, ...newFiles])
    setFormData({
      ...formData,
      files: [...formData.files, ...newFiles]
    })

    // Limpar input
    e.target.value = ''
  }

  // Função para remover arquivo
  const removeFile = (fileId) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId)
    const updatedFormFiles = formData.files.filter(file => file.id !== fileId)
    
    setUploadedFiles(updatedFiles)
    setFormData({
      ...formData,
      files: updatedFormFiles
    })
  }

  // Função para obter ícone do arquivo
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️'
    if (type.startsWith('video/')) return '🎬'
    if (type.startsWith('audio/')) return '🎵'
    if (type === 'application/pdf') return '📄'
    if (type.includes('document') || type.includes('word')) return '📝'
    if (type.includes('spreadsheet') || type.includes('excel')) return '📊'
    if (type.includes('presentation') || type.includes('powerpoint')) return '📽️'
    return '📎'
  }

  // Função para formatar tamanho do arquivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category || !formData.author) {
      alert('⚠️ Por favor, preencha todos os campos obrigatórios.')
      return
    }
    
    // Verificar se tem pelo menos uma imagem (anexada OU URL)
    const hasImage = formData.image || uploadedFiles.some(f => f.type.startsWith('image/'))
    
    if (!hasImage) {
      alert('⚠️ Por favor, adicione pelo menos uma imagem (anexe um arquivo ou insira uma URL).')
      return
    }
    
    try {
      if (editingNews) {
        // Editar notícia existente
        const updatedNews = news.map(item => 
          item.id === editingNews.id 
            ? { 
                ...item, 
                ...formData,
                files: uploadedFiles // Atualizar arquivos
              }
            : item
        )
        saveToStorage(updatedNews)
      } else {
        // Criar nova notícia
        const newArticle = {
          id: Date.now(),
          ...formData,
          files: uploadedFiles, // Salvar arquivos anexados
          date: new Date().toLocaleDateString('pt-BR')
        }
        const updatedNews = [newArticle, ...news]
        saveToStorage(updatedNews)
      }

      // Reset form e mostrar sucesso
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        author: '',
        image: '',
        files: []
      })
      setUploadedFiles([])
      setEditingNews(null)
      setShowSuccess(true)
      
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Erro ao salvar notícia:', error)
      alert('❌ Erro ao salvar notícia. Tente novamente.')
    }
  }

  const handleEdit = (article) => {
    setEditingNews(article)
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      image: article.image || '',
      files: article.files || []
    })
    setUploadedFiles(article.files || [])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (confirm('⚠️ Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.')) {
      try {
        const updatedNews = news.filter(item => item.id !== id)
        saveToStorage(updatedNews)
      } catch (error) {
        console.error('Erro ao excluir notícia:', error)
        alert('❌ Erro ao excluir notícia. Tente novamente.')
      }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const cancelEdit = () => {
    setEditingNews(null)
    setUploadedFiles([])
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      author: '',
      image: '',
      files: []
    })
  }

  return (
    <>
      <Head>
        <title>📝 Admin - Portal de Notícias</title>
        <meta name="robots" content="noindex, nofollow" />
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
    <li><Link href="/admin">Gerenciar</Link></li>
    <li><Link href="/admin/vagas">Vagas</Link></li>
    <li><Link href="/admin/estatisticas">Estatísticas</Link></li>
  </ul>
</nav>
    </div>
  </div>
</header>

      <main className="container">
        <div className="admin-panel">
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <h1 style={{color: '#1e3a5f', marginBottom: '0.5rem', fontSize: '2.2rem'}}>
              {editingNews ? '✏️ Editar Notícia' : '➕ Adicionar Nova Notícia'}
            </h1>
            <p style={{color: '#666', fontSize: '1.1rem'}}>
              {editingNews ? 'Modifique os campos desejados e salve as alterações' : 'Preencha as informações abaixo para publicar uma nova notícia'}
            </p>
          </div>

          {showSuccess && (
            <div className="success-message">
              ✅ Notícia {editingNews ? 'atualizada' : 'publicada'} com sucesso!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
              <div className="form-group">
                <label htmlFor="title">📰 Título da Notícia *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Nova escola será construída no bairro Centro"
                  maxLength="100"
                />
                <div style={{color: '#666', fontSize: '0.8rem', marginTop: '0.3rem'}}>
                  Máximo 100 caracteres
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">🏷️ Categoria *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Saúde">🏥 Saúde</option>
                  <option value="Educação">🎓 Educação</option>
                  <option value="Infraestrutura">🏗️ Infraestrutura</option>
                  <option value="Cultura">🎭 Cultura</option>
                  <option value="Esporte">⚽ Esporte</option>
                  <option value="Política">🏛️ Política</option>
                  <option value="Economia">💰 Economia</option>
                  <option value="Segurança">👮 Segurança</option>
                  <option value="Meio Ambiente">🌱 Meio Ambiente</option>
                  <option value="Turismo">✈️ Turismo</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="excerpt">📝 Resumo da Notícia *</label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                value={formData.excerpt}
                onChange={handleChange}
                required
                placeholder="Escreva um resumo atrativo de 1-2 frases que desperte o interesse do leitor..."
                maxLength="300"
              />
              <div style={{color: '#666', fontSize: '0.8rem', marginTop: '0.3rem'}}>
                Máximo 300 caracteres. Este texto aparecerá na lista de notícias.
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="content">📄 Conteúdo Completo *</label>
              <textarea
                id="content"
                name="content"
                rows="12"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Escreva o conteúdo completo da notícia aqui. Use parágrafos separados por linhas em branco para melhor formatação..."
              />
              <div style={{color: '#666', fontSize: '0.8rem', marginTop: '0.3rem'}}>
                Separe parágrafos com uma linha em branco para melhor formatação.
              </div>
            </div>

            {/* SEÇÃO DE UPLOAD DE ARQUIVOS */}
            <div className="form-group">
              <label htmlFor="files">📎 Anexar Arquivos (Fotos, Vídeos, PDFs, etc.)</label>
              <div style={{
                border: '2px dashed #4CAF50',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                background: '#f9f9f9',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="file"
                  id="files"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  onChange={handleFileUpload}
                  style={{display: 'none'}}
                />
                <label htmlFor="files" style={{cursor: 'pointer', display: 'block'}}>
                  <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📁</div>
                  <h3 style={{color: '#4CAF50', marginBottom: '0.5rem'}}>Clique aqui para adicionar arquivos</h3>
                  <p style={{color: '#666', marginBottom: '0.5rem'}}>
                    Ou arraste e solte arquivos aqui
                  </p>
                  <small style={{color: '#999'}}>
                    Formatos suportados: Imagens (JPG, PNG, GIF), Vídeos (MP4, AVI, MOV), 
                    Áudios (MP3, WAV), PDFs, Documentos (DOC, XLS, PPT)
                    <br />Tamanho máximo por arquivo: 10MB
                  </small>
                </label>
              </div>
            </div>

            {/* LISTA DE ARQUIVOS ANEXADOS */}
            {uploadedFiles.length > 0 && (
              <div className="form-group">
                <label>📋 Arquivos Anexados ({uploadedFiles.length})</label>
                <div style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '1rem',
                  background: 'white',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {uploadedFiles.map(file => (
                    <div key={file.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.8rem',
                      margin: '0.5rem 0',
                      background: '#f8f9fa',
                      borderRadius: '6px',
                      border: '1px solid #e9ecef'
                    }}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', flex: 1}}>
                        <div style={{fontSize: '2rem'}}>{getFileIcon(file.type)}</div>
                        <div style={{flex: 1}}>
                          <div style={{fontWeight: 'bold', color: '#1e3a5f', marginBottom: '0.2rem'}}>
                            {file.name}
                          </div>
                          <div style={{fontSize: '0.8rem', color: '#666'}}>
                            {formatFileSize(file.size)} • {file.uploadDate}
                          </div>
                        </div>
                        {file.type.startsWith('image/') && (
                          <img 
                            src={file.data} 
                            alt={file.name}
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              border: '1px solid #ddd'
                            }}
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        style={{
                          background: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        🗑️ Remover
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
              <div className="form-group">
                <label htmlFor="author">👤 Autor/Repórter *</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  placeholder="Ex: João Silva, Redação Portal, Maria Santos"
                  maxLength="50"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">🖼️ URL da Imagem de Capa (Opcional)</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                <div style={{color: '#666', fontSize: '0.8rem', marginTop: '0.3rem'}}>
                  Deixe em branco para usar imagem automática
                </div>
              </div>
            </div>

            <div style={{borderTop: '1px solid #eee', paddingTop: '2rem', marginTop: '2rem'}}>
              <button type="submit" className="btn btn-primary">
                {editingNews ? '💾 Atualizar Notícia' : '🚀 Publicar Notícia'}
              </button>
              {editingNews && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={cancelEdit}
                >
                  ❌ Cancelar Edição
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-panel">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
            <h2 style={{color: '#1e3a5f', margin: 0}}>
              📚 Notícias Publicadas ({news.length})
            </h2>
            <Link href="/">
              <button className="btn" style={{background: '#4CAF50', color: 'white', padding: '0.6rem 1.2rem', fontSize: '0.9rem'}}>
                👀 Ver Site Público
              </button>
            </Link>
          </div>
          
          {news.length === 0 ? (
            <div className="empty-state">
              <h3>📰 Nenhuma notícia publicada ainda</h3>
              <p>Comece criando sua primeira notícia usando o formulário acima!</p>
            </div>
          ) : (
            <div style={{overflowX: 'auto'}}>
              <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                <thead>
                  <tr style={{background: 'linear-gradient(45deg, #1e3a5f, #2c5aa0)', color: 'white'}}>
                    <th style={{padding: '1.2rem', textAlign: 'left', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.85rem'}}>📰 Título</th>
                    <th style={{padding: '1.2rem', textAlign: 'left', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.85rem'}}>🏷️ Categoria</th>
                    <th style={{padding: '1.2rem', textAlign: 'left', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.85rem'}}>📎 Arquivos</th>
                    <th style={{padding: '1.2rem', textAlign: 'left', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.85rem'}}>👤 Autor</th>
                    <th style={{padding: '1.2rem', textAlign: 'left', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.85rem'}}>📅 Data</th>
                    <th style={{padding: '1.2rem', textAlign: 'center', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.85rem'}}>⚙️ Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map(article => (
                    <tr key={article.id} style={{borderBottom: '1px solid #f0f0f0', transition: 'background 0.3s'}}>
                      <td style={{padding: '1.2rem', verticalAlign: 'middle'}}>
                        <div style={{maxWidth: '250px'}}>
                          <strong style={{color: '#1e3a5f'}}>{article.title}</strong>
                          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
                            {article.excerpt.substring(0, 60)}...
                          </div>
                        </div>
                      </td>
                      <td style={{padding: '1.2rem', verticalAlign: 'middle'}}>
                        <span className="news-category" style={{fontSize: '0.75rem'}}>
                          {article.category}
                        </span>
                      </td>
                      <td style={{padding: '1.2rem', verticalAlign: 'middle'}}>
                        {article.files && article.files.length > 0 ? (
                          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <span style={{background: '#4CAF50', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem'}}>
                              {article.files.length} arquivo{article.files.length > 1 ? 's' : ''}
                            </span>
                            <div style={{fontSize: '0.8rem'}}>
                              {article.files.slice(0, 3).map(file => getFileIcon(file.type)).join('')}
                              {article.files.length > 3 && '...'}
                            </div>
                          </div>
                        ) : (
                          <span style={{color: '#999', fontSize: '0.8rem'}}>Sem arquivos</span>
                        )}
                      </td>
                      <td style={{padding: '1.2rem', verticalAlign: 'middle'}}>{article.author}</td>
                      <td style={{padding: '1.2rem', verticalAlign: 'middle'}}>{article.date}</td>
                      <td style={{padding: '1.2rem', verticalAlign: 'middle'}}>
                        <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center'}}>
                          <Link href={`/noticia/${article.id}`} target="_blank">
                            <button className="btn" style={{background: '#4CAF50', color: 'white', margin: '0', padding: '0.5rem 1rem', fontSize: '0.85rem'}}>
                              👀 Ver
                            </button>
                          </Link>
                          <button 
                            className="btn btn-secondary"
                            onClick={() => handleEdit(article)}
                            style={{margin: '0', padding: '0.5rem 1rem', fontSize: '0.85rem'}}
                          >
                            ✏️ Editar
                          </button>
                          <button 
                            className="btn btn-danger"
                            onClick={() => handleDelete(article.id)}
                            style={{margin: '0', padding: '0.5rem 1rem', fontSize: '0.85rem'}}
                          >
                            🗑️ Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>🔒 Área Administrativa - Portal da Cidade</p>
        </div>
      </footer>
    </>
  )
}