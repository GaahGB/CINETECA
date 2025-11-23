# 🎬 Cineteca Neon Experience - Proposta de Redesign (Front-End)

![Status](https://img.shields.io/badge/Status-Protótipo_Funcional-success)
![Design](https://img.shields.io/badge/Design-Glassmorphism-blueviolet)
![Contexto](https://img.shields.io/badge/Local-Teófilo_Otoni-yellow)

## ✨ Visão Geral & Motivação

Este repositório apresenta um protótipo **Front-End** completo, criado para modernizar a plataforma digital do cinema **Cineteca / Tia Teca** na cidade de Teófilo Otoni - MG.

O projeto nasceu como um **mini projeto acadêmico**, mas foi desenvolvido com a paixão de um cliente assíduo que percebeu a necessidade de uma interface que realmente acompanhe a excelência da sala de cinema física.

> **Objetivo:** Entregar um design e experiência de usuário de nível premium, focado em resolver os desafios de usabilidade e navegação que o público local enfrenta atualmente.

---

## 💡 Proposta de Valor e Destaques

O código Front-End é 100% funcional e pronto para ser integrado a qualquer Back-End moderno.

### 🎨 Design e Usabilidade (UX)
* **Imersão "Neon":** Tema escuro (Dark Mode) com contrastes vibrantes em amarelo ouro e roxo, evocando a atmosfera da sala de cinema.
* **Responsividade Total:** Arquitetura **Mobile-First**, garantindo uma experiência fluida em qualquer smartphone, tablet ou desktop.
* **Interface Limpa:** Utilização sutil de efeitos *Glassmorphism* (vidro fosco) e fontes modernas (`Montserrat` e `Inter`) para um visual premium.

### 🛒 Fluxo de Compra e Resultado
* **Jornada Otimizada:** Fluxo de compra claro e intuitivo em apenas 3 passos (Sessão > Lanches > Pagamento).
* **Ingresso Gerado na Hora:** Utiliza a biblioteca `html2pdf.js` para gerar um ingresso digital robusto, contendo todos os detalhes da compra, QR Code gerado via API e instruções claras, pronto para download.
* **Gerenciamento de Estado:** Lógica em JavaScript puro para calcular o preço dos ingressos (inteira/meia), lanches e atualizar o total em tempo real sem recarregar a página.

---

## 🛠 Tecnologias e Dependências

| Tecnologia | Função | Nota |
| :--- | :--- | :--- |
| **HTML5** | Estrutura | Semântica moderna e acessível. |
| **CSS3** | Estilização | Estilos puros, variáveis CSS (:root) e Media Queries. |
| **JavaScript (ES6)** | Lógica de Negócio | Gerenciamento de estado e fluxo de compra. |
| **html2pdf.js** | Geração de PDF | Biblioteca externa para download do ingresso. |
| **Font Awesome** | Ícones | Conjunto de ícones essencial para UI. |
| **QR Server API** | Integração | API pública para geração dinâmica dos QR Codes. |

---

## 📂 Estrutura do Projeto

```bash
/
├── index.html          # Markup principal (SPA simulada)
├── style.css           # Design System, Animações e Responsividade
├── script.js           # Lógica do Modal, Slider e PDF
└── data/               # Simulação de Banco de Dados (JSON objects)
    ├── movies.js       # Catálogo de filmes
    └── snacks.js       # Itens da bomboniére
