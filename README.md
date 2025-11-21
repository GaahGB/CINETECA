# 🎬 Cineteca Neon Experience - Proposta de Redesign (Front-End)

## 🌟 Visão Geral do Projeto

Este repositório contém um protótipo **Front-End** completo e funcional para modernizar a experiência digital do cinema **Cineteca / Tia Teca** na cidade de Teófilo Otoni.

O projeto foi desenvolvido com foco em performance, design imersivo e, principalmente, na **Experiência do Usuário (UX)**, visando solucionar as frustrações recorrentes dos clientes com a plataforma digital atual.

**Status:** Protótipo Front-End 100% Funcional.

---

## ✨ Recursos e Funcionalidades Implementadas

O design e a lógica foram construídos para refletir um sistema de compra de ingressos moderno e eficiente, como os grandes cinemas nacionais.

### 🎨 Design e Estética
* **"Neon Experience" Visual:** Tema escuro (Dark Mode) com contrastes em amarelo ouro (neon) e roxo, remetendo à sensação imersiva de uma sala de cinema.
* **Glassmorphism:** Uso do efeito de "vidro fosco" na tela de login e cartões internos, dando um visual premium e moderno.
* **Responsividade Total:** Layout adaptável para desktop, tablets e, principalmente, smartphones (Mobile-First).

### 🛒 Fluxo de Compra e Ingressos
* **Seleção em 3 Passos:** Fluxo de compra claro e objetivo (Sessão > Lanches > Pagamento).
* **Geração de PDF Offline:** O sistema gera um ingresso com o filme, horário, e um QR Code dinâmico, juntamente com as regras de acesso, pronto para download imediato (usando `html2pdf.js`).
* **Lanches Opcionais:** Etapa de lanches com opção clara de "Pular" a compra, tornando a jornada do usuário mais rápida.

### ⚠️ Limitações (Foco no Back-End)

**Este projeto é estritamente Front-End.**

Os dados dos filmes, preços e lanches estão armazenados localmente nos arquivos `data/movies.js` e `data/snacks.js` (como um "banco de dados estático").

Para uma implementação comercial definitiva, a empresa Cineteca precisará integrar este Front-End a um **Back-End profissional** (servidor, banco de dados real) que permita:

1.  **Painel de Administração:** Um sistema de login para que a equipe possa adicionar/remover filmes, alterar preços e horários sem mexer no código.
2.  **Gestão de Vagas:** Controle real de assentos e ingressos vendidos.
3.  **Processamento de Pagamentos:** Integração real com PIX/Cartão.

A beleza e complexidade da interface já estão prontas; o próximo passo é conectar a "parte bonitinha" à infraestrutura de gestão da empresa.

---

## 🛠️ Como Iniciar e Hospedar (GitHub Pages)

Este projeto não requer servidor nem bibliotecas complexas para rodar.

1.  **Clone o Repositório:** `git clone [link do seu repo]`
2.  **Hospedagem Instantânea:** Basta enviar os arquivos para o GitHub e ativar o **GitHub Pages** na aba "Settings".
3.  **Pronto:** O site estará no ar em minutos com um link como `[seu-usuario].github.io/cineteca-neon-experience/`.

---
## 💻 Tecnologias
* HTML5 (Estrutura)
* CSS3 (Estilização pura e responsividade)
* JavaScript ES6 (Lógica e gerenciamento de estado)
* `html2pdf.js` (Biblioteca para geração do ingresso em PDF)

Desenvolvido por **[Gabriel Silva Matos]** como uma proposta de melhoria e demonstração de paixão pela comunidade cinematográfica de Teófilo Otoni.
