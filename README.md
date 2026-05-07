# PIERCING - Landing Page de Body Piercing

Uma landing page profissional, moderna e responsiva para estúdio de body piercing feminino, desenvolvida com HTML, CSS e JavaScript puro.

## 📋 Características

✨ **Design Moderno**
- Layout elegante e profissional
- Paleta de cores sofisticada (tons de rosa e roxo)
- Totalmente responsivo (mobile, tablet, desktop)
- Dark mode ready

🎨 **Animações Suaves**
- Animações ao scroll
- Efeitos hover em elementos
- Transições suaves
- Parallax effect na hero section
- Contadores animados

📱 **Funcionalidades**
- Menu de navegação responsivo com hamburger
- Navegação smooth scroll
- Formulário de agendamento dinâmico
- Galeria de trabalhos interativa
- Sistema de notificações
- Contador de estatísticas com animação

⚡ **Performance**
- Código otimizado
- Lazy loading de imagens (estrutura pronta)
- Minimal dependencies
- Sem frameworks pesados

## 🗂️ Estrutura de Arquivos

```
piercing-landing/
├── index.html      # Estrutura HTML
├── styles.css      # Estilos e animações
├── script.js       # Interações dinâmicas
└── README.md       # Este arquivo
```

## 🚀 Como Usar

### Opção 1: Abrir Diretamente no Navegador
1. Salve todos os arquivos na mesma pasta
2. Abra o arquivo `index.html` no seu navegador preferido

### Opção 2: Usar com Live Server (Recomendado)
1. Se usar VS Code, instale a extensão "Live Server"
2. Clique com botão direito em `index.html` → "Open with Live Server"
3. A página se abrirá automaticamente em `http://localhost:5500`

## 👨‍💻 Seções da Página

### 1. **Navigation Bar**
- Logo e Menu de navegação
- Hamburger menu responsivo
- Links smooth scroll

### 2. **Hero Section**
- Fullscreen com background animado
- Chamada para ação (CTA)
- Scroll indicator animado

### 3. **Gallery Section**
- Grade de trabalhos
- Efeitos hover com overlay
- Cards com categorias de piercings

### 4. **Services Section**
- 6 cards de serviços
- Ícones Font Awesome
- Descrições detalhadas

### 5. **About Section**
- Informações sobre o estúdio
- Lista de diferenciais
- Imagem com efeito flutuante

### 6. **Stats Section**
- Contadores animados
- Estatísticas de clientes e trabalhos
- Background gradiente

### 7. **Testimonials Section**
- Cards com depoimentos de clientes
- Avaliação em estrelas
- Nomes dos clientes

### 8. **Booking Section**
- Formulário de agendamento completo
- Validação de campos
- Sistema de notificação de sucesso

### 9. **Contact Info**
- Informações de localização, telefone, email
- Endereço e horários
- Cards informativos

### 10. **Footer**
- Links de redes sociais
- Copyright
- Branding do estúdio

## 🎯 Personalizações

### Mudar Cores

Abra `styles.css` e edite as variáveis (primeiras linhas):

```css
:root {
    --primary: #8b2e5f;        /* Rosa escuro - mude aqui */
    --secondary: #d4a5d4;      /* Rosa claro */
    --accent: #f5e6f0;         /* Rosa muito claro */
    --dark: #1a1a1a;           /* Preto */
    --light: #ffffff;          /* Branco */
}
```

### Adicionar Seus Dados de Contato

Em `index.html`, procure pela seção "Contact Info" e atualize:

```html
<p>Rua das Flores, 123<br>São Paulo - SP</p>
<p>(11) 98765-4321</p>
<p>contato@PIERCING.com.br</p>
<p>Seg-Sex: 10h-20h<br>Sáb: 10h-18h</p>
```

### Conectar Redes Sociais

No `script.js`, procure por "SOCIAL LINKS" e atualize os URLs:

```javascript
const platforms = {
    instagram: 'https://instagram.com/seu-usuario',
    facebook: 'https://facebook.com/sua-pagina',
    whatsapp: 'https://wa.me/seu-numero',
    youtube: 'https://youtube.com/seu-canal'
};
```

### Adicionar Imagens Reais

Substitua os backgrounds gradiente pelos seus trabalhos:

```html
<!-- Antes (com gradiente) -->
<div class="gallery-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>

<!-- Depois (com imagem) -->
<div class="gallery-image" style="background: url('caminho/para/sua/imagem.jpg'); background-size: cover;"></div>
```

## 📞 Integração com Backend

### Enviar Agendamentos para E-mail

Abra `script.js` e procure por "FORM HANDLING". Substitua:

```javascript
// Simulação → Chamada real para seu backend
fetch('/api/agendamentos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    // Sucesso
    showNotification('Agendamento enviado com sucesso!', 'success');
    bookingForm.reset();
});
```

## 🎨 Animações Disponíveis

- `slideDown` - Navbar aparecendo
- `fadeInUp` - Elementos aparecendo de baixo
- `scaleIn` - Título principal
- `bounce` - Seta do scroll
- `moveBackground` - Background animado
- `floatImage` - Imagem flutuando
- `pulse` - Efeito pulsante

## 📱 Responsividade

A página é responsiva em:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (até 480px)

## ♿ Acessibilidade

- Navegação por teclado
- Contraste de cores adequado
- ARIA labels (pronto para adicionar)
- Semântica HTML5

## 🔒 SEO Básico

Para melhorar o SEO, atualize em `index.html`:

```html
<title>PIERCING - Body KARIB PIERCING Studio Profissional</title>
<meta name="description" content="Studio de body piercing feminino com profissionais certificados">
<meta name="keywords" content="body piercing, piercing feminino, estúdio piercing">
```

## 🧹 Otimizações

✅ Código limpo e bem comentado
✅ Sem dependências externas (exceto Font Awesome)
✅ Performance otimizada
✅ Métodos vanilla JavaScript
✅ CSS organizado em seções

## 📦 Dependências

Apenas ícones do **Font Awesome 6** (via CDN):
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

## 🚨 Navegação por Teclado

- **Ctrl + 1**: Ir para Home
- **Ctrl + 2**: Ir para Gallery
- **Ctrl + 3**: Ir para Services
- **Ctrl + 4**: Ir para About
- **Ctrl + 5**: Ir para Contact
- **Esc**: Fechar menu mobile

## 📊 Estatísticas da Página

- Paleta: 6 cores principais
- Fonts: 1 (system font - performance)
- Ícones: Font Awesome (52 usados)
- Animações: 15+ diferentes
- Seções: 10 principais
- Components: 30+

## 🐛 Troubleshooting

**Menu não abre no mobile?**
- Verifique se o hamburger está visível (viewport < 768px)
- Abra o console (F12) para verificar erros

**Animações lentas?**
- Desative outras abas do navegador
- Atualize a página
- Tente em outro navegador

**Formulário não funciona?**
- Verifique se o JavaScript está carregando
- Abra o console para ver mensagens

## 🎓 Sugestões de Melhorias

1. Adicionar mapa integrado (Google Maps)
2. Integração com WhatsApp API
3. Agendamento com terceiros
4. Blog/News section
5. Página de portfolio expandida
6. Sistema de avaliações
7. Chat de atendimento
8. Carousel de fotos

## 📄 Licença

Livre para uso comercial e pessoal.

## 👥 Suporte

Para dúvidas ou sugestões, documente suas mudanças e teste no navegador.

---

**Desenvolvido com ❤️ para estúdios de piercing profissionais**

Última atualização: Maio de 2026
