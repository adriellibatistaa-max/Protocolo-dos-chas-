
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Zap, 
  Heart,
  AlertCircle,
  Star,
  ShieldCheck,
  ShoppingBag,
  Timer,
  Flame,
  TrendingUp,
  CheckCheck
} from 'lucide-react';

// --- Assets ---
const IMAGES = {
  MAIN_EBOOK: "https://i.postimg.cc/PpfVCxf6/Ebook-capa-minimalista-elegante-tons-branco-e-verde-saude-20260116-110245-0000.png",
  BONUS_PLAN: "https://i.postimg.cc/62HjnXyx/Elimine-o-inchaco-em-7-dias-Acelere-a-queima-de-gordura-Tenha-mais-di-20260120-232624-0000.png",
};

// --- Components ---

const Highlight = ({ children, color = "yellow" }: { children?: React.ReactNode, color?: "yellow" | "red" }) => (
  <span className={`px-1 rounded-sm ${color === 'yellow' ? 'bg-yellow-300 text-emerald-950' : 'bg-red-600 text-white'}`}>
    {children}
  </span>
);

const SectionTitle = ({ children, subtitle, light = false, red = false }: { children?: React.ReactNode, subtitle?: string, light?: boolean, red?: boolean }) => (
  <div className="text-center mb-12 space-y-4 px-4">
    {subtitle && (
      <p className={`uppercase tracking-[0.2em] font-bold text-xs md:text-sm ${red ? 'text-red-500' : light ? 'text-emerald-300' : 'text-emerald-600'}`}>
        {subtitle}
      </p>
    )}
    <h2 className={`text-3xl md:text-5xl font-black leading-tight tracking-tight ${light ? 'text-white' : 'text-emerald-950'} font-serif italic`}>
      {children}
    </h2>
  </div>
);

const CTAButton = ({ text, subtext, color = "yellow" }: { text: string, subtext?: string, color?: "yellow" | "red" }) => (
  <a 
    href="#checkout" 
    className={`inline-flex flex-col items-center justify-center ${color === 'yellow' ? 'bg-yellow-400 hover:bg-yellow-500 text-emerald-950 shadow-[0_10px_30px_rgba(250,204,21,0.4)]' : 'bg-red-600 hover:bg-red-700 text-white shadow-[0_10px_30px_rgba(220,38,38,0.4)]'} py-5 px-8 md:px-14 rounded-2xl transition-all transform hover:scale-105 active:scale-95 group text-center w-full max-w-lg mx-auto`}
  >
    <span className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2">
      {text} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </span>
    {subtext && <span className="text-[10px] md:text-xs font-bold opacity-80 mt-1 uppercase">{subtext}</span>}
  </a>
);

const ChatBubble = ({ name, message, time }: { name: string, message: string, time: string }) => (
  <div className="flex flex-col gap-1 w-full max-w-[320px] mx-auto animate-fadeIn group">
    <span className="text-[10px] font-bold text-emerald-800 ml-4 uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
      {name}
    </span>
    <div className="bg-[#dcf8c6] p-4 rounded-2xl rounded-tl-none shadow-md border border-emerald-100 relative">
      <p className="text-slate-800 text-sm leading-relaxed font-medium">
        {message}
      </p>
      <div className="flex items-center justify-end gap-1 mt-2">
        <span className="text-[9px] text-slate-500">{time}</span>
        <CheckCheck className="w-3 h-3 text-blue-500" />
      </div>
      {/* Triangle tip */}
      <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-[#dcf8c6] border-l-[10px] border-l-transparent"></div>
    </div>
  </div>
);

const FAQ = ({ items }: { items: { question: string, answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-4 max-w-3xl mx-auto px-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm border border-emerald-50 overflow-hidden">
          <button 
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full p-5 md:p-6 text-left flex justify-between items-center transition-colors hover:bg-emerald-50"
          >
            <span className="font-bold text-emerald-900 pr-8 text-sm md:text-base">{item.question}</span>
            {openIndex === index ? <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
          </button>
          {openIndex === index && (
            <div className="p-6 pt-0 text-slate-600 leading-relaxed text-sm md:text-base animate-fadeIn">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="selection:bg-yellow-200 overflow-x-hidden bg-white font-sans">
      {/* Urgency Sticky Banner */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-3 px-4 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest sticky top-0 z-50 shadow-lg flex items-center justify-center gap-3 border-b border-red-800">
        <div className="animate-pulse flex items-center gap-2">
          <Flame className="w-4 h-4 text-yellow-400" />
          OFERTA POR TEMPO LIMITADO:
        </div>
        <span className="bg-white text-red-600 px-3 py-0.5 rounded-full font-black min-w-[60px]">{formatTime(timeLeft)}</span>
      </div>

      {/* Hero Section */}
      <header className="relative bg-white pt-12 md:pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 -skew-x-12 transform translate-x-1/2 -z-0"></div>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left space-y-6 animate-fadeIn">
            <div className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-2 mx-auto lg:mx-0 w-fit">
              <TrendingUp className="w-3 h-3" /> Protocolo Validado para 2025
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-emerald-950 leading-[1.1] font-serif italic">
              PROTOCOLO DOS <span className="text-emerald-600 relative">
                CHÁS
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-10"></span>
              </span> EMAGRECEDORES
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              O método estratégico que ajuda mulheres <Highlight>30+</Highlight> a desinchar, acelerar o metabolismo e emagrecer mesmo com <Highlight color="yellow">TPM ou menopausa</Highlight>.
            </p>
            <div className="flex flex-col gap-3 py-4 text-sm font-bold text-emerald-900/60 items-center lg:items-start">
               <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Ingredientes 100% Naturais</div>
               <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Resultados rápidos em 15 dias</div>
            </div>
            <div className="pt-4">
              <CTAButton text="👉 QUERO DESINCHAR AGORA" subtext="Acesso imediato com desconto" />
            </div>
          </div>

          <div className="relative mx-auto max-w-sm lg:max-w-md">
            <div className="absolute -inset-10 bg-emerald-200/30 blur-[100px] rounded-full"></div>
            <div className="absolute -top-10 -right-10 bg-red-600 text-white w-24 h-24 rounded-full flex flex-col items-center justify-center font-black rotate-12 z-20 shadow-xl text-center p-2 leading-none border-4 border-white">
              <span className="text-[10px]">APENAS</span>
              <span className="text-2xl">R$19</span>
              <span className="text-[10px]">HOJE</span>
            </div>
            <img 
              src={IMAGES.MAIN_EBOOK} 
              alt="Ebook Protocolo dos Chás" 
              className="relative z-10 w-full drop-shadow-[0_35px_60px_rgba(6,78,59,0.3)] transform rotate-2 hover:rotate-0 transition-all duration-700"
            />
          </div>
        </div>
      </header>

      {/* Pain Points Section */}
      <section className="py-24 px-4 bg-emerald-950 text-white relative">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Você se identifica?" light red>O seu corpo já deu sinais de exaustão?</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {t: "Aumento de peso repentino", c: "red"},
              {t: "Sensação de inchaço constante", c: "red"},
              {t: "Barriga estufada o dia todo", c: "red"},
              {t: "Metabolismo 'dormindo' (30+)", c: "red"},
              {t: "Cansaço extremo e indisposição", c: "red"},
              {t: "Roupas que não servem mais", c: "red"}
            ].map((item, i) => (
              <div key={i} className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800 flex gap-4 items-start backdrop-blur-sm">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                <span className="font-medium text-emerald-50 leading-tight">{item.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW Social Proof Section - CHAT STYLE */}
      <section className="py-24 px-4 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Feedback das Alunas">O que elas estão comentando...</SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-12 mb-16 items-start">
            <ChatBubble 
              name="Regina M." 
              message="Meninas, vim compartilhar! Perdi 6kg em um mês seguindo direitinho o protocolo! Tô muito feliz, minhas calças estão caindo kkkk e olha que eu já tinha tentado de tudo." 
              time="10:42" 
            />
            
            <ChatBubble 
              name="Ana Paula" 
              message="O plano 'Desincha Rápido' é maravilhoso. Tinha um casamento no sábado e consegui entrar no vestido sem passar sufoco. Em 4 dias a diferença na barriga foi absurda!" 
              time="14:15" 
            />

            <ChatBubble 
              name="Cecília S." 
              message="Gente, o chá para o metabolismo é vida. Acordei hoje com a barriga lisinha pela primeira vez em anos. Tenho 48 anos e achei que era impossível desinchar nessa fase." 
              time="08:20" 
            />
          </div>

          <div className="text-center">
             <CTAButton color="red" text="QUERO MEUS RESULTADOS TAMBÉM" subtext="Toque aqui para garantir seu acesso" />
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="O que você vai receber">Tudo que você precisa para desinchar</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "50 Receitas Exclusivas", d: "Chás termogênicos, diuréticos e calmantes para cada momento do seu dia.", icon: <Zap className="w-10 h-10 text-emerald-600" /> },
              { t: "Cronograma de 15 Dias", d: "O passo a passo de qual chá tomar em cada horário para maximizar os resultados.", icon: <Timer className="w-10 h-10 text-emerald-600" /> },
              { t: "Guia de Ingredientes", d: "Saiba exatamente o que comprar sem gastar muito em lojas de produtos naturais.", icon: <ShoppingBag className="w-10 h-10 text-emerald-600" /> }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
                {item.icon}
                <h4 className="font-black text-emerald-950 text-xl mt-6 mb-4 italic font-serif">{item.t}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="checkout" className="py-24 px-4 bg-white relative">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Aproveite o Valor Promocional">INVISTA NA SUA AUTOESTIMA</SectionTitle>
          
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-[0_40px_100px_rgba(220,38,38,0.15)] border-4 border-red-600 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-600 text-white px-10 py-2 font-black text-xs uppercase rotate-45 translate-x-10 translate-y-6">
              90% OFF
            </div>
            
            <div className="space-y-2 mb-10">
               <p className="text-red-600 line-through text-2xl font-bold opacity-50 italic">De R$ 197,00</p>
               <div className="flex flex-col items-center">
                 <span className="text-emerald-800 font-bold text-xl uppercase tracking-widest">Por Apenas</span>
                 <div className="flex items-start justify-center gap-1">
                    <span className="text-4xl font-bold text-emerald-900 mt-4 font-serif italic">R$</span>
                    <span className="text-8xl md:text-9xl font-black text-emerald-950 leading-none tracking-tighter font-serif italic relative">
                      19,90
                      <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-400/30 -z-10"></span>
                    </span>
                 </div>
                 <p className="text-red-600 font-black text-lg mt-4 animate-bounce">🔥 ÚLTIMAS VAGAS COM DESCONTO!</p>
               </div>
            </div>

            <div className="space-y-6">
               <CTAButton text="👉 SIM! QUERO O PROTOCOLO POR R$19,90" subtext="Acesso imediato via e-mail" />
               <div className="flex flex-wrap justify-center items-center gap-6 text-slate-400 text-[10px] font-bold uppercase mt-8">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Pagamento 100% Seguro</span>
                  <span className="flex items-center gap-1"><ShoppingBag className="w-4 h-4 text-emerald-600" /> Entrega Instantânea</span>
               </div>
            </div>
          </div>
          
          <div className="mt-12 bg-red-600 text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-black shadow-xl">
             <AlertCircle className="w-6 h-6 shrink-0 animate-pulse text-yellow-300" />
             AVISO: O VALOR SUBIRÁ PARA R$ 197,00 ASSIM QUE O TEMPO ESGOTAR.
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section className="py-24 px-4 bg-emerald-950 text-white">
        <div className="max-w-5xl mx-auto">
          <SectionTitle subtitle="Presentes Exclusivos" light>VOCÊ TAMBÉM LEVA <span className="text-yellow-400">GRÁTIS</span></SectionTitle>
          
          <div className="grid gap-8">
            <div className="bg-white rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-10 text-slate-900 group border-4 border-emerald-400">
              <div className="w-64 shrink-0 overflow-hidden rounded-2xl shadow-xl">
                 <img src={IMAGES.BONUS_PLAN} alt="Bônus 1" className="w-full transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="space-y-4">
                <div className="bg-red-600 text-white px-4 py-1 rounded-full text-[12px] font-black uppercase inline-block">BÔNUS LIBERADO</div>
                <h4 className="text-2xl font-black font-serif italic text-emerald-950">Plano Desincha Rápido (48h)</h4>
                <p className="text-slate-500 leading-relaxed">O guia secreto das famosas para desinchar o máximo possível em apenas <span className="font-bold text-red-600">2 dias</span> antes de eventos importantes.</p>
                <p className="text-emerald-700 font-bold">Valor: <span className="line-through opacity-50">R$ 67,00</span> <span className="text-red-600 ml-2">Grátis para você</span></p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
             <CTAButton text="RESGATAR MEU ACESSO E BÔNUS" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-white">
        <SectionTitle subtitle="FAQ">Dúvidas Frequentes</SectionTitle>
        <FAQ items={[
          { question: "Como recebo o protocolo?", answer: "Após a aprovação do pagamento, você recebe os dados de acesso instantaneamente no seu e-mail cadastrado." },
          { question: "Posso fazer mesmo na menopausa?", answer: "Com certeza! O protocolo foi desenhado focando justamente nas alterações metabólicas de mulheres 30+, incluindo menopausa e TPM." },
          { question: "Os ingredientes são caros?", answer: "Não. Todos os ingredientes são naturais e podem ser encontrados em qualquer supermercado ou feira com preços acessíveis." },
          { question: "E se eu não gostar?", answer: "Você tem 7 dias de garantia incondicional. Se não gostar, devolvemos seu dinheiro na hora, sem perguntas." }
        ]} />
      </section>

      {/* Footer */}
      <footer className="py-16 bg-emerald-950 border-t border-emerald-800 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
           <div className="flex justify-center gap-4 mb-8">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <div className="text-left">
                 <p className="text-white font-black text-xs uppercase">Satisfação Garantida</p>
                 <p className="text-emerald-600 text-[10px]">7 DIAS DE GARANTIA TOTAL</p>
              </div>
           </div>
           <p className="text-emerald-800 text-[10px] leading-relaxed max-w-2xl mx-auto uppercase tracking-tighter">
             © 2025 Protocolo dos Chás Emagrecedores. Todos os direitos reservados. 
             Este produto não substitui o aconselhamento médico profissional. 
           </p>
        </div>
      </footer>
    </div>
  );
}
