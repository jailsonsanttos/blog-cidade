import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function AdminVagas() {
  const [vagas, setVagas] = useState([])
  const [editando, setEditando] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    titulo: '',
    empresa: '',
    localizacao: '',
    tipo: 'CLT',
    categoria: '',
    salario: '',
    descricao: '',
    requisitos: '',
    beneficios: '',
    email: '',
    telefone: '',
    dataExpiracao: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('vagasEmprego')
    if (saved) {
      try {
        setVagas(JSON.parse(saved))
      } catch (error) {
        setVagas([])
      }
    }
  }, [])

  const saveToStorage = (data) => {
    localStorage.setItem('vagasEmprego', JSON.stringify(data))
    setVagas(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const vaga = {
      id: editando ? editando.id : Date.now(),
      ...formData,
      requisitos: formData.requisitos.split('\n').filter(r => r.trim()),
      beneficios: formData.beneficios.split('\n').filter(b => b.trim()),
      dataPublicacao: editando ? editando.dataPublicacao : new Date().toISOString().split('T')[0],
      status: 'ativa'
    }

    let updated
    if (editando) {
      updated = vagas.map(v => v.id === editando.id ? vaga : v)
    } else {
      updated = [vaga, ...vagas]
    }

    saveToStorage(updated)
    resetForm()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEdit = (vaga) => {
    setEditando(vaga)
    setFormData({
      titulo: vaga.titulo,
      empresa: vaga.empresa,
      localizacao: vaga.localizacao,
      tipo: vaga.tipo,
      categoria: vaga.categoria,
      salario: vaga.salario,
      descricao: vaga.descricao,
      requisitos: vaga.requisitos.join('\n'),
      beneficios: vaga.beneficios.join('\n'),
      email: vaga.email,
      telefone: vaga.telefone,
      dataExpiracao: vaga.dataExpiracao
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      saveToStorage(vagas.filter(v => v.id !== id))
    }
  }

  const toggleStatus = (id) => {
    const updated = vagas.map(v => 
      v.id === id ? {...v, status: v.status === 'ativa' ? 'inativa' : 'ativa'} : v
    )
    saveToStorage(updated)
  }

  const resetForm = () => {
    setFormData({
      titulo: '',
      empresa: '',
      localizacao: '',
      tipo: 'CLT',
      categoria: '',
      salario: '',
      descricao: '',
      requisitos: '',
      beneficios: '',
      email: '',
      telefone: '',
      dataExpiracao: ''
    })
    setEditando(null)
  }

  return (
    <>
      <Head>
        <title>Admin - Gerenciar Vagas</title>
      </Head>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">Portal da Cidade</Link>
            <nav>
              <ul className="nav-menu">
                <li><Link href="/">Início</Link></li>
                <li><Link href="/admin">Admin</Link></li>
                <li><Link href="/admin/vagas">Vagas</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="admin-panel">
          <h1 style={{color: '#1e3a5f', marginBottom: '2rem'}}>
            {editando ? 'Editar Vaga' : 'Cadastrar Nova Vaga'}
          </h1>

          {showSuccess && (
            <div className="success-message">
              Vaga {editando ? 'atualizada' : 'cadastrada'} com sucesso!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
              <div className="form-group">
                <label>Título da Vaga *</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  required
                  placeholder="Ex: Desenvolvedor Web"
                />
              </div>

              <div className="form-group">
                <label>Empresa *</label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  required
                  placeholder="Nome da empresa"
                />
              </div>

              <div className="form-group">
                <label>Localização *</label>
                <input
                  type="text"
                  value={formData.localizacao}
                  onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
                  required
                  placeholder="Ex: Centro - Salitre"
                />
              </div>

              <div className="form-group">
                <label>Tipo de Contrato *</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  required
                >
                  <option value="CLT">CLT</option>
                  <option value="PJ">PJ</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Temporário">Temporário</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Concurso">Concurso</option>
                </select>
              </div>

              <div className="form-group">
                <label>Categoria *</label>
                <input
                  type="text"
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  required
                  placeholder="Ex: Tecnologia, Comércio, Saúde"
                />
              </div>

              <div className="form-group">
                <label>Salário *</label>
                <input
                  type="text"
                  value={formData.salario}
                  onChange={(e) => setFormData({...formData, salario: e.target.value})}
                  required
                  placeholder="Ex: R$ 2.000 - R$ 3.000"
                />
              </div>

              <div className="form-group">
                <label>E-mail para Contato *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="rh@empresa.com.br"
                />
              </div>

              <div className="form-group">
                <label>Telefone *</label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  required
                  placeholder="(85) 99999-9999"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Descrição da Vaga *</label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                required
                rows="4"
                placeholder="Descreva as principais responsabilidades e informações sobre a vaga..."
              />
            </div>

            <div className="form-group">
              <label>Requisitos (um por linha) *</label>
              <textarea
                value={formData.requisitos}
                onChange={(e) => setFormData({...formData, requisitos: e.target.value})}
                required
                rows="6"
                placeholder="Ensino médio completo&#10;Experiência em vendas&#10;Boa comunicação"
              />
            </div>

            <div className="form-group">
              <label>Benefícios (um por linha) *</label>
              <textarea
                value={formData.beneficios}
                onChange={(e) => setFormData({...formData, beneficios: e.target.value})}
                required
                rows="4"
                placeholder="Vale transporte&#10;Vale alimentação&#10;Plano de saúde"
              />
            </div>

            <div className="form-group">
              <label>Data de Expiração *</label>
              <input
                type="date"
                value={formData.dataExpiracao}
                onChange={(e) => setFormData({...formData, dataExpiracao: e.target.value})}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div style={{display: 'flex', gap: '1rem'}}>
              <button type="submit" className="btn btn-primary">
                {editando ? 'Atualizar Vaga' : 'Cadastrar Vaga'}
              </button>
              {editando && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-panel">
          <h2 style={{color: '#1e3a5f', marginBottom: '1.5rem'}}>
            Vagas Cadastradas ({vagas.length})
          </h2>

          {vagas.length === 0 ? (
            <p>Nenhuma vaga cadastrada ainda.</p>
          ) : (
            <div style={{overflowX: 'auto'}}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Empresa</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Expira em</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {vagas.map(vaga => (
                    <tr key={vaga.id}>
                      <td><strong>{vaga.titulo}</strong></td>
                      <td>{vaga.empresa}</td>
                      <td><span className="news-category">{vaga.tipo}</span></td>
                      <td>
                        <button
                          onClick={() => toggleStatus(vaga.id)}
                          style={{
                            background: vaga.status === 'ativa' ? '#4CAF50' : '#999',
                            color: 'white',
                            border: 'none',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          {vaga.status === 'ativa' ? 'Ativa' : 'Inativa'}
                        </button>
                      </td>
                      <td>{new Date(vaga.dataExpiracao).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <div style={{display: 'flex', gap: '0.5rem'}}>
                          <button className="btn btn-secondary" onClick={() => handleEdit(vaga)} style={{margin: 0, padding: '0.5rem 1rem', fontSize: '0.85rem'}}>
                            Editar
                          </button>
                          <button className="btn btn-danger" onClick={() => handleDelete(vaga.id)} style={{margin: 0, padding: '0.5rem 1rem', fontSize: '0.85rem'}}>
                            Excluir
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
    </>
  )
}