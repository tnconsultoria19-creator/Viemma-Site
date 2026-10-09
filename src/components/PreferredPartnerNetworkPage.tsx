import React, { useState } from "react";

type Props = { language: "en" | "pt"; onClose: () => void };

type FormValues = {
  name: string; business: string; category: string[]; location: string;
  email: string; phone: string; website: string; services: string[];
  registration: string; notes: string; consent: boolean;
};

const initialValues: FormValues = {
  name: "", business: "", category: [], location: "", email: "",
  phone: "", website: "", services: [], registration: "", notes: "", consent: false
};

export default function PreferredPartnerNetworkPage({ language, onClose }: Props) {
  const pt = true;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FormValues, value: string | boolean) =>
    setValues(current => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");
    const payload = {
      _subject: `Viemma Tours — Pré-registo de Parceiros Preferenciais — ${values.business || "Novo contacto"}`,
      _template: "table",
      _captcha: "false",
      "Nome de contacto": values.name || "Não indicado",
      "Nome da empresa": values.business || "Não indicado",
      "Tipos de actividade": values.category.join(", ") || "Não indicado",
      "Província em Angola": values.location || "Não indicada",
      "Email": values.email || "Não indicado",
      "Telefone / WhatsApp": values.phone || "Não indicado",
      "Website / redes sociais": values.website || "Não indicado",
      "Serviços disponibilizados": values.services.join(", ") || "Não indicado",
      "Cidade / município": values.registration || "Não indicado",
      "Informações adicionais": values.notes || "Não indicado",
      "Consentimento para contacto": values.consent ? "Sim" : "Não",
      "Submitted at": new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })
    };
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@viemmatours.africa", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result && (result.success === true || result.success === "true")) {
        setSubmitted(true);
      } else {
        setError(pt
          ? "Não foi possível confirmar o envio. Tente novamente ou escreva para info@viemmatours.africa."
          : "We couldn't confirm delivery. Please try again or email info@viemmatours.africa.");
      }
    } catch {
      setError(pt
        ? "O envio falhou. Verifique a ligação e tente novamente, ou escreva para info@viemmatours.africa."
        : "Submission failed. Check your connection and try again, or email info@viemmatours.africa.");
    } finally {
      setSending(false);
    }
  };

  const labelClass = "mb-1.5 block text-[10px] font-semibold uppercase tracking-[.15em] text-stone-600";
  const inputClass = "w-full rounded-sm border border-stone-300 bg-white px-3.5 py-3 text-sm text-stone-800 outline-none focus:border-[#8c7a5b] focus:ring-1 focus:ring-[#8c7a5b]";

  const bullets = (items: string[]) => (
    <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
      {items.map(item => <li key={item} className="flex gap-3"><span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#9c855d]" />{item}</li>)}
    </ul>
  );

  return (
    <main id="preferred-partner-network" className="fixed inset-0 z-[120] overflow-y-auto bg-[#fcfaf7] text-[#20372d]">
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-[#20372d] px-4 text-white shadow-sm md:px-8">
        <button type="button" onClick={onClose} className="flex items-center gap-2 px-2 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white/90 hover:text-[#e1cba3]">
          <i className="fas fa-arrow-left" aria-hidden="true" /> {pt ? "Voltar ao site" : "Back to website"}
        </button>
        <span className="hidden font-serif text-sm italic text-[#eee6d8] sm:block">Viemma Tours · {pt ? "Rede de Parceiros" : "Partner Network"}</span>
        <a href="mailto:info@viemmatours.africa" className="text-[10px] uppercase tracking-wider text-white/80 hover:text-white">Contacto</a>
      </div>

      <section className="relative isolate flex min-h-[430px] items-center overflow-hidden bg-[#20372d]">
        <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=85" alt={pt ? "Paisagem natural africana" : "African landscape"} className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#172c23]/95 via-[#172c23]/75 to-[#172c23]/25" />
        <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.28em] text-[#e1cba3]">BITUR Angola 2026 · Luanda · 20–22 {pt ? "Novembro" : "November"}</p>
          <h1 className="max-w-3xl font-serif text-4xl font-light leading-[1.08] tracking-tight text-white md:text-6xl">
            {pt ? "Vamos abrir novos caminhos para o turismo em Angola." : "Let's open new pathways for tourism in Angola."}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
            {pt
              ? "A Viemma Tours está a seleccionar parceiros locais de confiança para ligar Angola à nossa rede internacional de viajantes, operadores e oportunidades."
              : "Viemma Tours is selecting trusted local partners to connect Angola with our international network of travellers, operators and opportunities."}
          </p>
          <a href="#partner-registration" className="mt-8 inline-flex items-center gap-3 border border-[#e1cba3] bg-[#e1cba3] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.17em] text-[#20372d] transition hover:border-white hover:bg-white">
            {pt ? "Registar interesse" : "Register your interest"} <i className="fas fa-arrow-down" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#8c7a5b]">Uma oportunidade para negócios locais</p>
          <h2 className="font-serif text-3xl font-light leading-tight md:text-5xl">
            Parceria. Presença internacional. Crescimento local. Crescimento conjunto.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-stone-600 md:text-base">
            A Viemma Tours quer conhecer empresas e profissionais de turismo em Angola. A ideia é simples: ajudar mais pessoas de fora a descobrir o que Angola tem para oferecer e criar novas oportunidades para os negócios locais.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-xs leading-6 text-stone-500">
            Somos uma empresa de turismo com base na África do Sul e presença nos Estados Unidos. O CEO, Sebastião Barros, de origem angolana, estará na BITUR em Luanda para conhecer potenciais parceiros.
          </p>
        </div>

        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#8c7a5b]">O que a sua empresa pode ganhar</p>
            <h3 className="max-w-2xl font-serif text-3xl font-light leading-tight md:text-4xl">Benefícios práticos para o seu negócio</h3>
          </div>
          <p className="max-w-md text-sm leading-6 text-stone-600">Veja como uma parceria pode ajudar a divulgar os seus serviços, organizar reservas e chegar a novos clientes.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5">
          <article className="border border-[#e5ded2] bg-white p-5 shadow-sm md:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#eee7d9] text-[#20372d]"><i className="fas fa-calendar-check text-lg" aria-hidden="true" /></div>
            <h4 className="font-serif text-xl md:text-2xl">Sistema de reservas adaptado a si</h4>
            <p className="mt-2 text-sm leading-6 text-stone-600">Acesso a software de reservas personalizado para as necessidades do seu negócio, para ajudar a organizar pedidos, disponibilidade e serviços — conforme as condições acordadas.</p>
          </article>
          <article className="border border-[#e5ded2] bg-white p-5 shadow-sm md:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#eee7d9] text-[#20372d]"><i className="fas fa-globe-africa text-lg" aria-hidden="true" /></div>
            <h4 className="font-serif text-xl md:text-2xl">Mais presença internacional</h4>
            <p className="mt-2 text-sm leading-6 text-stone-600">Apresente os seus passeios, alojamento, transporte ou experiências a uma rede que trabalha com viajantes e profissionais de turismo de outros países.</p>
          </article>
          <article className="border border-[#e5ded2] bg-white p-5 shadow-sm md:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#eee7d9] text-[#20372d]"><i className="fas fa-people-arrows text-lg" aria-hidden="true" /></div>
            <h4 className="font-serif text-xl md:text-2xl">Possibilidade de receber referências</h4>
            <p className="mt-2 text-sm leading-6 text-stone-600">Agências, operadores e outros fornecedores internacionais da nossa rede poderão recomendar os seus serviços quando forem adequados ao que os seus clientes procuram. As referências dependem da procura e não são garantidas.</p>
          </article>
          <article className="border border-[#e5ded2] bg-white p-5 shadow-sm md:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#eee7d9] text-[#20372d]"><i className="fas fa-chart-line text-lg" aria-hidden="true" /></div>
            <h4 className="font-serif text-xl md:text-2xl">Novas oportunidades de negócio</h4>
            <p className="mt-2 text-sm leading-6 text-stone-600">Explore a criação de pacotes em conjunto, colaborações com outras empresas e novas formas de chegar a pessoas que talvez ainda não conheçam o seu negócio.</p>
          </article>
        </div>

        <div className="mt-8 grid gap-5 border-l-2 border-[#d8c5a0] bg-[#f1eee8] px-5 py-6 md:grid-cols-[1fr_auto] md:items-center md:px-7">
          <div>
            <p className="font-serif text-2xl italic md:text-3xl">Também queremos conhecer o que torna o seu negócio especial.</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">Procuramos operadores turísticos, agências de viagens, guias, alojamentos, restaurantes, transportes, experiências locais e outros serviços relevantes para os visitantes.</p>
          </div>
          <a href="#partner-registration" className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#20372d] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#314d40]">Registar interesse <i className="fas fa-arrow-down" aria-hidden="true" /></a>
        </div>

        <div className="mt-10">
          <div className="mb-5 text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#8c7a5b]">Sector do turismo</p>
            <h3 className="font-serif text-2xl font-light md:text-3xl">Organizações e marcas de referência</h3>
            <p className="mx-auto mt-2 max-w-2xl text-xs leading-6 text-stone-500">Conheça algumas organizações ligadas à promoção e ao apoio do turismo. Os nomes abaixo identificam as organizações e não significam, por si só, que estas patrocinam ou recomendam esta rede de parceiros.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a href="https://www.southafrica.net/" target="_blank" rel="noreferrer" className="flex min-h-24 items-center justify-center border border-stone-200 bg-white px-5 py-5 text-center transition hover:border-[#c9b58e]">
              <span className="block">
                <span className="block font-serif text-2xl italic tracking-tight text-[#20372d]">South Africa</span>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.22em] text-stone-600">South African Tourism</span>
              </span>
            </a>
            <a href="https://www.capetown.travel/" target="_blank" rel="noreferrer" className="flex min-h-24 items-center justify-center border border-stone-200 bg-white px-5 py-5 text-center transition hover:border-[#c9b58e]">
              <img src="https://pbs.twimg.com/profile_images/2032047193222164480/1dUnkVgZ.jpg" alt="Cape Town Tourism" loading="lazy" className="h-16 w-16 rounded-sm object-contain" />
              <span className="ml-3 font-semibold leading-tight text-[#243d83]">Cape Town<br/>Tourism</span>
            </a>
            <a href="https://satib.co.za/" target="_blank" rel="noreferrer" className="flex min-h-24 items-center justify-center border border-stone-200 bg-white px-5 py-5 text-center transition hover:border-[#c9b58e]">
              <span className="block">
                <span className="block text-3xl font-black tracking-[.08em] text-[#ad2028]">SATIB</span>
                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[.14em] text-stone-600">Insurance Brokers</span>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-5">
          <div><p className="font-serif text-xl italic">BITUR Angola 2026</p><p className="mt-1 text-[10px] uppercase tracking-[.14em] text-stone-500">Luanda · 20–22 de Novembro de 2026</p></div>
          <p className="text-xs text-stone-600">Registe o seu interesse e combine uma conversa na feira.</p>
        </div>
      </section>
      <section id="partner-registration" className="scroll-mt-16 bg-[#f0ede6] px-4 py-10 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-12"><div className="lg:sticky lg:top-24 lg:self-start"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#8c7a5b]">Pré-registo de parceiros</p><h2 className="font-serif text-3xl font-light leading-tight md:text-4xl">Vamos conversar na BITUR?</h2><p className="mt-3 text-sm leading-6 text-stone-600">Escolha as opções que se aplicam a si e deixe os seus contactos. Todos os campos são opcionais.</p><div className="mt-6 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8c7a5b]">Telefone / WhatsApp</p>
              <a href="tel:+27210137143" className="block font-serif text-2xl tracking-tight text-[#20372d] hover:text-[#8c7a5b]">+27 21 013 7143</a>
              <a href="https://wa.me/27681712985" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#20372d] hover:text-[#8c7a5b]"><i className="fab fa-whatsapp text-lg" aria-hidden="true" /> +27 68 171 2985 · WhatsApp</a>
              <div className="border-t border-stone-300 pt-3 text-xs leading-6 text-stone-600">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#8c7a5b]">Contacto</p>
                <a href="mailto:info@viemmatours.africa" className="hover:underline">info@viemmatours.africa</a>
              </div>
            </div></div>
          <form onSubmit={submit} className="min-w-0 bg-white p-4 shadow-sm sm:p-6 md:p-8">
            {submitted ? <div className="py-10 text-center"><h3 className="font-serif text-2xl">Interesse registado</h3><p className="mt-3 text-sm text-stone-600">Obrigado. A equipa da Viemma Tours recebeu a sua submissão.</p><button type="button" onClick={onClose} className="mt-6 bg-[#20372d] px-6 py-3 text-xs text-white">Voltar ao site</button></div> : <>
              <h3 className="mb-1 font-serif text-2xl font-light">Conte-nos sobre a sua actividade</h3><p className="mb-5 text-xs text-stone-500">Preencha apenas o que desejar. Nenhum campo é obrigatório.</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Nome de contacto</span><input className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.name} onChange={e=>set("name",e.target.value)} placeholder="Nome completo"/></label>
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Empresa / negócio</span><input className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.business} onChange={e=>set("business",e.target.value)} placeholder="Nome da empresa"/></label>
                <fieldset className="col-span-2"><legend className="mb-2 text-[10px] uppercase tracking-wider text-stone-600">Que tipo de entidade é?</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{["Operador turístico","Agência de viagens","Guia turístico","Hotel / alojamento","Restaurante","Transporte / transfers","Experiências turísticas","Aluguer de viaturas","Outro"].map(v=><button key={v} type="button" aria-pressed={values.category.includes(v)} onClick={()=>set("category",values.category.includes(v)?values.category.filter(x=>x!==v):[...values.category,v])} className={"min-h-11 border px-3 py-2 text-left text-xs "+(values.category.includes(v)?"border-[#20372d] bg-[#20372d] text-white":"border-stone-200 bg-[#fcfaf7] text-stone-700")}>{values.category.includes(v)?"✓ ":"＋ "}{v}</button>)}</div></fieldset>
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Província de Angola</span><select className="w-full border border-stone-300 bg-white px-3 py-3 text-sm" value={values.location} onChange={e=>set("location",e.target.value)}><option value="">Seleccione se desejar</option>{["Bengo","Benguela","Bié","Cabinda","Cuando","Cubango","Cuanza Norte","Cuanza Sul","Cunene","Huambo","Huíla","Icolo e Bengo","Luanda","Lunda Norte","Lunda Sul","Malanje","Moxico","Moxico Leste","Namibe","Uíge","Zaire"].map(v=><option key={v}>{v}</option>)}</select></label>
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Cidade / município (se aplicável)</span><input className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.registration} onChange={e=>set("registration",e.target.value)} placeholder="Cidade ou município"/></label>
                <fieldset className="col-span-2"><legend className="mb-2 text-[10px] uppercase tracking-wider text-stone-600">Serviços disponibilizados</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{Array.from(new Set(values.category.flatMap(cat=>({"Operador turístico":["Circuitos e excursões","Pacotes turísticos","Experiências culturais"],"Agência de viagens":["Voos e bilhetes","Reservas e itinerários"],"Guia turístico":["Visitas guiadas","Natureza e aventura"],"Hotel / alojamento":["Quartos e alojamento","Refeições e catering"],"Restaurante":["Refeições e catering","Experiências gastronómicas"],"Transporte / transfers":["Transfers aeroporto","Transporte privado","Autocarros e grupos"],"Experiências turísticas":["Natureza e aventura","Experiências culturais","Actividades marítimas"],"Aluguer de viaturas":["Aluguer de viaturas","Transporte privado"],"Outro":["Outros serviços turísticos"]}[cat]||[])))).map(v=><button key={v} type="button" aria-pressed={values.services.includes(v)} onClick={()=>set("services",values.services.includes(v)?values.services.filter(x=>x!==v):[...values.services,v])} className={"min-h-11 border px-3 py-2 text-left text-xs "+(values.services.includes(v)?"border-[#8c7a5b] bg-[#eee7d9]":"border-stone-200 bg-white")}>{values.services.includes(v)?"✓ ":"＋ "}{v}</button>)}</div>{values.category.length===0&&<p className="mt-2 text-xs text-stone-400">Seleccione primeiro o tipo de entidade para ver serviços relevantes.</p>}</fieldset>
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Email</span><input type="email" className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.email} onChange={e=>set("email",e.target.value)} placeholder="nome@empresa.ao"/></label>
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Telefone / WhatsApp</span><input type="tel" className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.phone} onChange={e=>set("phone",e.target.value)} placeholder="+244 ..."/></label>
                <label className="col-span-2"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Website ou redes sociais</span><input className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.website} onChange={e=>set("website",e.target.value)} placeholder="Link do site ou perfil"/></label>
                <label className="col-span-2"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Informações adicionais (se houver)</span><textarea rows={2} className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.notes} onChange={e=>set("notes",e.target.value)} placeholder="Opcional"/></label>
              </div><label className="mt-4 flex items-start gap-2 text-xs text-stone-500"><input type="checkbox" checked={values.consent} onChange={e=>set("consent",e.target.checked)}/><span>Autorizo o contacto sobre esta parceria (opcional).</span></label>{error&&<p role="alert" className="mt-4 bg-red-50 p-3 text-sm text-red-800">{error}</p>}<button type="submit" disabled={sending} className="mt-5 min-h-12 w-full bg-[#20372d] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white disabled:opacity-60">{sending?"A enviar...":"Enviar pré-registo"} →</button><p className="mt-3 text-center text-[10px] text-stone-400">O pré-registo não garante aceitação. Todos os candidatos estão sujeitos a verificação.</p>
            </>}</form></div></section>
      <footer className="bg-[#20372d] px-6 py-7 text-center text-[10px] uppercase tracking-[.15em] text-white/65">© {new Date().getFullYear()} Viemma Tours · {pt ? "Rede de Parceiros Preferenciais" : "Preferred Partner Network"}</footer>
    </main>
  );
}
