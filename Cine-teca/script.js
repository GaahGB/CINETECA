/* =========================================
   script.js: SISTEMA COMPLETO + PDF
   ========================================= */

let state = { step: 1, items: {}, tickets: { full: 0, half: 0 }, total: 0, movie: null, dateStr: '', timeStr: '' };
let purchasedTickets = [];
let currentSlide = 0;
let sliderInterval;
let isRegisterMode = false;

/* === 1. LOGIN/CADASTRO === */
function toggleLoginMode() {
    isRegisterMode = !isRegisterMode;
    const btn = document.getElementById('btn-login-action');
    const toggleText = document.getElementById('toggle-text');
    const nameField = document.getElementById('field-name');
    const passConfirmField = document.getElementById('field-pass-confirm');
    if (isRegisterMode) {
        btn.innerText = "CADASTRAR";
        toggleText.innerHTML = 'Já tem conta? <span style="color: var(--primary); text-decoration: underline;">Fazer Login</span>';
        nameField.classList.remove('hidden'); passConfirmField.classList.remove('hidden');
    } else {
        btn.innerText = "ENTRAR";
        toggleText.innerHTML = 'Não tem conta? <span style="color: var(--primary); text-decoration: underline;">Crie agora</span>';
        nameField.classList.add('hidden'); passConfirmField.classList.add('hidden');
    }
}
function executarAuth() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    if (!email || !pass) return alert("Por favor, preencha email e senha.");
    if (isRegisterMode) {
        const name = document.getElementById('reg-name').value;
        const confirmPass = document.getElementById('reg-pass-confirm').value;
        if (!name) return alert("Digite seu nome.");
        if (pass !== confirmPass) return alert("As senhas não coincidem!");
        alert(`Bem-vindo(a), ${name}! Cadastro realizado.`);
        finalizarLogin(name);
    } else { finalizarLogin(email.split('@')[0]); }
}
function finalizarLogin(userName) {
    const overlay = document.getElementById('login-overlay');
    overlay.style.opacity = '0';
    document.getElementById('user-display').innerText = userName;
    setTimeout(() => {
        overlay.classList.add('hidden'); overlay.style.display = 'none';
        const app = document.getElementById('main-app');
        app.classList.remove('hidden'); app.style.display = 'block';
        initHeroSlider();
    }, 500);
}
function fazerLogout() { location.reload(); }

/* === 2. SLIDER MISTO === */
function initHeroSlider() {
    const wrapper = document.getElementById('hero-slider');
    if(!wrapper) return;
    const destaque = movies[0];
    const futuro = movies.find(m => m.comingSoon);
    const promo = { title: "Terça em Dobro", synopsis: "Na compra de 1 ingresso inteiro, o segundo sai de graça! Válido para terças.", bg: "img/promocao bg.jpg", badge: "PROMOÇÃO", isPromo: true };
    const slidesData = [destaque, futuro, promo].filter(item => item !== undefined);

    wrapper.innerHTML = slidesData.map(s => {
        let btnHtml = s.isPromo ? `<button class="btn btn-primary" onclick="alert('Promoção aplicada nas terças!')">VER REGRAS</button>` :
                      s.comingSoon ? `<button class="btn btn-outline" onclick="alert('Trailer indisponível.')">ASSISTIR TRAILER</button>` :
                      `<button class="btn btn-primary" onclick="abrirModal(${s.id})"><i class="fa-solid fa-ticket" style="margin-right:8px;"></i> COMPRAR</button>`;
        return `<div class="hero-slide"><img src="${s.bg}" class="hero-bg" style="${s.isPromo ? 'filter: brightness(0.6);' : ''}"><div class="hero-gradient"></div><div class="hero-content"><span class="badge-highlight" style="${s.isPromo ? 'background:#ff0055; color:white;' : ''}">${s.badge || (s.comingSoon ? 'EM BREVE' : 'EM DESTAQUE')}</span><h1>${s.title}</h1><p>${s.synopsis}</p>${btnHtml}</div></div>`;
    }).join('');
    startSliderTimer();
}
function updateSliderPosition() { const wrapper = document.getElementById('hero-slider'); if(wrapper) wrapper.style.transform = `translateX(-${currentSlide * 100}%)`; }
function nextSlide() { currentSlide = (currentSlide + 1) % 3; updateSliderPosition(); resetSliderTimer(); }
function prevSlide() { currentSlide = (currentSlide - 1 + 3) % 3; updateSliderPosition(); resetSliderTimer(); }
function startSliderTimer() { sliderInterval = setInterval(nextSlide, 5000); }
function resetSliderTimer() { clearInterval(sliderInterval); startSliderTimer(); }

/* === 3. UTILITÁRIOS === */
function formatCurrency(value) { return `R$ ${value.toFixed(2).replace('.', ',')}`; }
document.addEventListener('DOMContentLoaded', () => { nav('home', document.querySelector('.nav-menu button:nth-child(1)')); renderMovieList(); renderSnacksPage(); });
function nav(id, btn) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.add('hidden'));
    document.getElementById(`view-${id}`).classList.remove('hidden');
    document.querySelectorAll('.nav-menu button').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active'); window.scrollTo(0,0);
}
function showTickets() { renderMyTickets(); nav('my-tickets'); }
function showHistory() { alert("Histórico de filmes."); }
function shareApp() { alert("Link copiado!"); }

/* === 4. RENDERIZAÇÃO === */
function renderMovieList() {
    const list = document.getElementById('movie-list');
    if(list) list.innerHTML = movies.map(m => `<div class="movie-card" onclick="abrirModal(${m.id})"><img src="${m.poster}" alt="${m.title}"><div class="movie-overlay"><h3>${m.title}</h3><div class="movie-meta"><span class="age-badge age-${m.rating}">${m.rating}</span><span class="movie-genre">${m.genre}</span>${m.comingSoon ? '<span style="color:#fff; background:#d63031; padding:2px 6px; font-size:0.6rem; border-radius:4px;">EM BREVE</span>' : ''}</div></div></div>`).join('');
}
function renderSnacksPage() {
    const list = document.getElementById('page-snacks');
    if(list) list.innerHTML = snacks.map(s => `<div class="snack-card"><div class="snack-icon-circle"><i class="fa-solid ${s.icon}"></i></div><h3>${s.name}</h3><div class="snack-price-tag">${formatCurrency(s.price)}</div></div>`).join('');
}

/* === 5. MEUS INGRESSOS + PDF === */
function renderMyTickets() {
    const container = document.getElementById('tickets-container');
    if (purchasedTickets.length === 0) {
        container.innerHTML = `<div style="text-align:center; color:#777; margin-top:50px;"><i class="fa-solid fa-ticket" style="font-size:3rem; margin-bottom:15px; opacity:0.5;"></i><p>Você ainda não tem ingressos.</p></div>`;
        return;
    }
    
    // Note que adicionei 'crossorigin="anonymous"' na imagem para ajudar no PDF
    container.innerHTML = purchasedTickets.map(ticket => `
        <div class="ticket-wrapper" style="width:100%; max-width:600px; position:relative;">
            <div class="ticket-item" id="ticket-view-${ticket.id}">
                <div class="ticket-left">
                    <div class="ticket-movie-title">${ticket.movie}</div>
                    <div class="ticket-info"><i class="fa-regular fa-calendar"></i> ${ticket.date}</div>
                    <div class="ticket-info"><i class="fa-regular fa-clock"></i> ${ticket.time}</div>
                    <div class="ticket-info"><i class="fa-solid fa-location-dot"></i> Sala 4 - Assento Livre</div>
                    <div class="ticket-badges">
                        ${ticket.full > 0 ? `<span class="t-badge">${ticket.full} INTEIRA</span>` : ''}
                        ${ticket.half > 0 ? `<span class="t-badge">${ticket.half} MEIA</span>` : ''}
                    </div>
                </div>
                <div class="ticket-right">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ticket.id)}" class="qr-img" alt="QR Code" crossorigin="anonymous">
                </div>
            </div>
            <button onclick="downloadTicket('${ticket.id}')" class="btn-download-pdf">
                <i class="fa-solid fa-download"></i> BAIXAR PDF COM REGRAS
            </button>
        </div>
    `).join('');
}

function downloadTicket(ticketId) {
    // 1. Encontrar o ingresso nos dados
    const ticket = purchasedTickets.find(t => t.id == ticketId);
    if (!ticket) return alert("Erro ao gerar ingresso.");

    // 2. Criar um elemento temporário para o layout do PDF
    // Isso nos permite criar um design exclusivo para impressão sem bagunçar a tela
    const element = document.createElement('div');
    element.style.width = '600px';
    element.style.padding = '20px';
    element.style.background = 'white';
    element.style.color = 'black';
    
    // 3. Montar o HTML do PDF (Cabeçalho + Ticket + Regras)
    element.innerHTML = `
        <div style="text-align:center; margin-bottom:20px; border-bottom:2px solid #000; padding-bottom:10px;">
            <h1 style="font-family:sans-serif; margin:0;">TIA TECA</h1>
            <p style="margin:0; font-size:0.8rem; color:#555;">COMPROVANTE DE COMPRA</p>
        </div>

        <div class="ticket-item" style="box-shadow:none; border:1px solid #ccc; margin-bottom:0;">
            <div class="ticket-left" style="border-right:1px dashed #000;">
                <div class="ticket-movie-title" style="color:#000;">${ticket.movie}</div>
                <div class="ticket-info"><span style="font-weight:bold;">DATA:</span> ${ticket.date}</div>
                <div class="ticket-info"><span style="font-weight:bold;">HORA:</span> ${ticket.time}</div>
                <div class="ticket-info">Sala 4 - Assento Marcado na Chegada</div>
                <div class="ticket-badges" style="margin-top:10px;">
                    ${ticket.full > 0 ? `<span style="background:#000; color:#fff; padding:2px 5px; font-size:0.7rem; border-radius:3px; margin-right:5px;">${ticket.full} INTEIRA</span>` : ''}
                    ${ticket.half > 0 ? `<span style="background:#000; color:#fff; padding:2px 5px; font-size:0.7rem; border-radius:3px;">${ticket.half} MEIA</span>` : ''}
                </div>
            </div>
            <div class="ticket-right" style="background:#fff;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ticket.id)}" style="width:100px; height:100px;">
            </div>
        </div>
        <div style="text-align:center; font-size:0.7rem; margin-top:5px; margin-bottom:30px; color:#555;">ID: ${ticket.id}</div>

        <div class="pdf-rules-container">
            <h3>Instruções de Acesso</h3>
            <ul class="pdf-step-list">
                <li>
                    <span class="step-number">1</span>
                    <span><strong>Chegue cedo:</strong> Recomendamos chegar 15 minutos antes do início da sessão para garantir bons lugares e comprar seus lanches.</span>
                </li>
                <li>
                    <span class="step-number">2</span>
                    <span><strong>Validação:</strong> Apresente este PDF (impresso ou no celular) na entrada da sala. O brilho da tela deve estar no máximo para leitura do QR Code.</span>
                </li>
                <li>
                    <span class="step-number">3</span>
                    <span><strong>Meia-Entrada:</strong> Caso tenha comprado ingresso "Meia", é obrigatória a apresentação de documento comprovatório com foto na entrada.</span>
                </li>
                <li>
                    <span class="step-number">4</span>
                    <span><strong>Durante o filme:</strong> É proibido o uso de celulares, câmeras ou aparelhos que emitam luz/som durante a exibição.</span>
                </li>
            </ul>
            <div style="margin-top:20px; font-size:0.7rem; text-align:center; color:#888;">
                <p>Tia Teca Cinemas Ltda. | CNPJ: 00.000.000/0001-00</p>
                <p>Obrigado pela preferência e bom filme!</p>
            </div>
        </div>
    `;

    // 4. Configuração Robusta do HTML2PDF
    const opt = {
        margin:       10,
        filename:     `ingresso-${ticket.movie.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true, // ESSENCIAL PARA O QR CODE APARECER
            logging: true  // Ajuda a debugar se der erro
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Gera o PDF
    html2pdf().set(opt).from(element).save().then(() => {
        // Callback opcional após salvar
        console.log("PDF Gerado com sucesso!");
    });
}

/* === 6. MODAL DE COMPRA === */
function abrirModal(id) {
    const m = movies.find(x => x.id == id);
    if(!m || m.comingSoon) return alert("Em breve!");
    state = { step: 1, items: {}, tickets: { full: 0, half: 0 }, total: 0, movie: m, dateStr: '', timeStr: '' };
    
    document.getElementById('m-poster').src = m.poster;
    document.getElementById('m-title').innerText = m.title;
    document.getElementById('m-meta').innerText = `${m.genre} • ${m.dur}`;
    document.getElementById('m-synopsis').innerText = m.synopsis;
    document.getElementById('label-price-full').innerText = formatCurrency(BASE_TICKET_PRICE);
    document.getElementById('label-price-half').innerText = formatCurrency(BASE_TICKET_PRICE / 2);
    
    const dc = document.getElementById('date-container'); dc.innerHTML='';
    for(let i=0; i<5; i++) {
        let d = new Date(); d.setDate(d.getDate()+i);
        let dateString = `${d.getDate()}/${d.getMonth()+1}`;
        let el = document.createElement('div');
        el.className = 'date-card'; 
        if(i===0) { el.classList.add('active'); state.dateStr = dateString; }
        el.innerHTML = `<div>${d.getDate()}</div><div style="font-size:0.7rem;">${d.toLocaleDateString('pt-br',{weekday:'short'})}</div>`;
        el.onclick = function() { 
            document.querySelectorAll('.date-card').forEach(c=>c.classList.remove('active')); 
            this.classList.add('active'); state.dateStr = dateString;
        };
        dc.appendChild(el);
    }
    
    document.getElementById('time-container').innerHTML = m.times.map(t => `<div class="time-card" onclick="selTime(this, '${t}')">${t}</div>`).join('');
    updateTicketCounters(); renderModalSnacks(); calcularTotal(); updateModalView();
    document.getElementById('modal-overlay').classList.add('active');
}
function updateTicketCounters() { document.getElementById('qty-full').innerText = state.tickets.full; document.getElementById('qty-half').innerText = state.tickets.half; }
function changeTicket(type, delta) {
    const newValue = state.tickets[type] + delta;
    if(newValue < 0) return;
    if(delta > 0 && (state.tickets.full + state.tickets.half) >= 8) return alert("Máximo de 8 ingressos.");
    state.tickets[type] = newValue; updateTicketCounters(); calcularTotal();
}
function renderModalSnacks() {
    document.getElementById('snack-container').innerHTML = snacks.map((s, idx) => `
        <div style="background:#151515; padding:15px; border-radius:12px; display:flex; justify-content:space-between; align-items:center; border:1px solid #333;">
            <div><strong style="color:white; font-size:0.9rem;">${s.name}</strong><br><span style="color:#777; font-size:0.8rem;">${formatCurrency(s.price)}</span></div>
            <div style="display:flex; gap:8px; align-items:center;"><button class="btn-outline" style="width:25px; height:25px; display:flex; align-items:center; justify-content:center; border-radius:5px;" onclick="addSnack(${idx}, -1)">-</button><span id="q-${idx}" style="color:white; font-weight:bold; width:20px; text-align:center;">0</span><button class="btn-outline" style="width:25px; height:25px; display:flex; align-items:center; justify-content:center; border-radius:5px;" onclick="addSnack(${idx}, 1)">+</button></div>
        </div>
    `).join('');
}
function calcularTotal() {
    let total = (state.tickets.full * BASE_TICKET_PRICE) + (state.tickets.half * (BASE_TICKET_PRICE / 2));
    Object.keys(state.items).forEach(k => { if (state.items[k] > 0) total += snacks[k].price * state.items[k]; });
    state.total = total;
    document.getElementById('m-total').innerText = formatCurrency(total);
}
function selTime(el, timeVal) { document.querySelectorAll('.time-card').forEach(c=>c.classList.remove('active')); el.classList.add('active'); state.timeStr = timeVal; }
function addSnack(idx, q) { let cur = state.items[idx] || 0; cur += q; if(cur < 0) cur = 0; state.items[idx] = cur; document.getElementById(`q-${idx}`).innerText = cur; calcularTotal(); }
function selectPay(el) { document.querySelectorAll('.pay-option').forEach(b => b.classList.remove('active')); el.classList.add('active'); }

function mudarPasso(d) {
    if(d === 1) {
        if(state.step === 1) {
            if((state.tickets.full + state.tickets.half) === 0) return alert("Selecione pelo menos 1 ingresso.");
            if(!state.timeStr) return alert("Selecione um horário!");
            state.step++;
        }
        else if (state.step === 2) { state.step++; }
        else { 
            if(!document.querySelector('.pay-option.active')) return alert("Selecione o pagamento!"); 
            const newTicket = { id: Date.now(), movie: state.movie.title, date: state.dateStr, time: state.timeStr, full: state.tickets.full, half: state.tickets.half, total: state.total };
            purchasedTickets.push(newTicket);
            alert("Compra Confirmada!"); fecharModal(); showTickets(); return; 
        }
    } else {
        if(state.step === 1) { fecharModal(); return; }
        state.step--;
    }
    updateModalView();
}
function updateModalView() {
    document.querySelectorAll('.step-box').forEach(s => s.classList.add('hidden'));
    document.getElementById(`step-${state.step}`).classList.remove('hidden');
    document.getElementById('btn-next').innerText = state.step === 3 ? 'FINALIZAR' : 'CONTINUAR';
    document.getElementById('btn-back').innerText = state.step === 1 ? 'FECHAR' : 'VOLTAR';
    if(state.step === 2) document.querySelectorAll('.pay-option').forEach(b => b.classList.remove('active'));
}
function fecharModal() { document.getElementById('modal-overlay').classList.remove('active'); }