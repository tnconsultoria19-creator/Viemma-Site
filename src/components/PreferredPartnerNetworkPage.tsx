import React, { useEffect, useState } from "react";

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
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (showDetails) {
      document.getElementById("opportunity-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showDetails]);

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
      "Nome do responsável": values.name || "Não indicado",
      "Nome da empresa": values.business || "Não indicado",
      "Tipos de actividade": values.category.join(", ") || "Não indicado",
      "Província em Angola": values.location || "Não indicada",
      "Email": values.email || "Não indicado",
      "Telefone / WhatsApp": values.phone || "Não indicado",
      "Website / redes sociais": values.website || "Não indicado",
      "Serviços que presta": values.services.join(", ") || "Não indicado",
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

  const scrollToRegistrationForm = () => {
    // Scroll within the partner page without changing the URL hash, which would close the overlay.
    document.getElementById("registration-form-heading")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
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

      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-[#20372d] md:min-h-[360px]">
        <img src="https://images.pexels.com/photos/13584138/pexels-photo-13584138.jpeg" alt="Paisagem natural africana" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#172c23]/95 via-[#172c23]/75 to-[#172c23]/30" />
        <div className="mx-auto w-full max-w-5xl px-6 py-14 text-center md:px-12 md:py-20">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.28em] text-[#e1cba3]">Viemma Tours · Rede de Parceiros</p>
          <h1 className="font-serif text-4xl font-light leading-tight text-white md:text-6xl">Bem-vindo!</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/90 md:text-base">
            Agradecemos o seu interesse em estabelecer uma parceria com a Viemma Tours. Pode preencher o formulário abaixo para nos apresentar a sua actividade.
          </p>
          <button type="button" onClick={() => setShowDetails(current => !current)} className="mt-6 inline-flex items-center gap-3 border border-[#e1cba3] bg-[#e1cba3] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.15em] text-[#20372d] transition hover:border-white hover:bg-white">
            {showDetails ? "Ocultar informação" : "Conhecer a oportunidade"} <i className={"fas " + (showDetails ? "fa-arrow-up" : "fa-arrow-down")} aria-hidden="true" />
          </button>
        </div>
      </section>
      {showDetails && <section id="opportunity-details" className="scroll-mt-16 mx-auto max-w-7xl px-4 py-10 md:px-12 md:py-14">
        <div className="mx-auto mb-7 max-w-3xl text-center">
          <div className="mb-5 flex justify-center"><button type="button" onClick={() => setShowDetails(false)} className="inline-flex items-center gap-2 border border-[#20372d] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.15em] text-[#20372d] transition hover:bg-[#20372d] hover:text-white">Ocultar informação <i className="fas fa-chevron-up" aria-hidden="true" /></button></div>
          <h2 className="font-serif text-3xl font-light leading-tight md:text-4xl">Sobre a Viemma Tours</h2>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            A Viemma Tours actua no sector do turismo há 10 anos, com sede na África do Sul e presença nos Estados Unidos. Queremos estabelecer parceria com empresas e profissionais do setor de turismo em Angola. O nosso CEO, Sebastião Barros, estará na BITUR, em Luanda, para contactar potenciais parceiros.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          <article className="overflow-hidden bg-white shadow-sm">
            <img loading="lazy" src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=700&q=80" alt="Viagens e destinos internacionais" className="h-32 w-full object-cover sm:h-44" />
            <p className="px-3 py-3 font-serif text-base sm:text-lg">Viagens internacionais</p>
          </article>
          <article className="overflow-hidden bg-white shadow-sm">
            <img loading="lazy" src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=700&q=80" alt="Planeamento de viagens" className="h-32 w-full object-cover sm:h-44" />
            <p className="px-3 py-3 font-serif text-base sm:text-lg">Novas oportunidades</p>
          </article>
          <article className="overflow-hidden bg-white shadow-sm">
            <img loading="lazy" src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=700&q=80" alt="Experiências turísticas" className="h-32 w-full object-cover sm:h-44" />
            <p className="px-3 py-3 font-serif text-base sm:text-lg">Experiências locais</p>
          </article>
          <article className="overflow-hidden bg-white shadow-sm">
            <img loading="lazy" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80" alt="Profissionais a trabalhar em conjunto" className="h-32 w-full object-cover sm:h-44" />
            <p className="px-3 py-3 font-serif text-base sm:text-lg">Novas parcerias</p>
          </article>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <h3 className="font-serif text-2xl font-light md:text-3xl">O que propomos</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
            <li className="flex gap-3"><span className="shrink-0 text-[#8c7a5b]">✓</span><span>Acesso a uma solução de reservas, conforme as condições acordadas.</span></li>
            <li className="flex gap-3"><span className="shrink-0 text-[#8c7a5b]">✓</span><span>Divulgação dos seus serviços junto de clientes e parceiros internacionais.</span></li>
            <li className="flex gap-3"><span className="shrink-0 text-[#8c7a5b]">✓</span><span>Possibilidade de receber contactos e referências da nossa rede. Não garantimos reservas.</span></li>
            <li className="flex gap-3"><span className="shrink-0 text-[#8c7a5b]">✓</span><span>Possibilidade de criar pacotes turísticos em conjunto com outros parceiros.</span></li>
          </ul>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-8">
          <div className="mb-5 text-center">
            <h3 className="font-serif text-2xl font-light md:text-3xl">Viemma Tours</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-600">
              Há 10 anos no sector do turismo, a Viemma Tours é membro da SATSA e da Cape Town Tourism. A SATIB é uma empresa especializada em seguros para o sector do turismo.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <a href="https://www.satsa.co.za/membership-directory/corporate/2346161" target="_blank" rel="noreferrer" aria-label="Viemma Tours na lista de membros da SATSA" className="flex h-14 min-w-0 items-center justify-center rounded-full border border-stone-200 bg-white px-5 text-center transition hover:border-[#c9b58e] sm:h-16 sm:px-7">
              <span className="text-sm font-black tracking-[.12em] text-[#20372d] sm:text-base">SATSA</span>
            </a>
            <a href="https://www.capetown.travel/listing/viemma-tours-cape-town/" target="_blank" rel="noreferrer" aria-label="Viemma Tours na Cape Town Tourism" className="flex h-14 min-w-0 items-center justify-center rounded-full border border-stone-200 bg-white px-4 text-center transition hover:border-[#c9b58e] sm:h-16 sm:px-6">
              <span className="text-xs font-bold leading-tight text-[#243d83] sm:text-sm">CAPE TOWN<br/>TOURISM</span>
            </a>
            <a href="https://satib.co.za/" target="_blank" rel="noreferrer" aria-label="SATIB Insurance Brokers" className="flex h-14 min-w-0 items-center justify-center rounded-full border border-stone-200 bg-white px-5 text-center transition hover:border-[#c9b58e] sm:h-16 sm:px-7">
              <span className="text-sm font-black tracking-[.08em] text-[#ad2028] sm:text-base">SATIB</span>
            </a>
          </div>
        </div>
      </section>}

      <section id="partner-registration" className="scroll-mt-16 bg-[#f0ede6] px-4 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-4xl">
                    <form onSubmit={submit} className="mx-auto w-full max-w-4xl min-w-0 bg-white p-4 shadow-sm sm:p-6 md:p-8">
            {submitted ? <div className="py-10 text-center"><h3 className="font-serif text-2xl">Interesse registado</h3><p className="mt-3 text-sm text-stone-600">Obrigado. A equipa da Viemma Tours recebeu a sua submissão.</p><button type="button" onClick={onClose} className="mt-6 bg-[#20372d] px-6 py-3 text-xs text-white">Voltar ao site</button></div> : <>
              <h2 id="registration-form-heading" className="mb-1 scroll-mt-20 font-serif text-2xl font-light">Manifestação de interesse</h2><p className="mb-5 text-xs text-stone-500">Indique os seus contactos e os serviços que disponibiliza. O preenchimento dos campos é opcional.</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Nome de contacto</span><input className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.name} onChange={e=>set("name",e.target.value)} placeholder="Nome completo"/></label>
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Nome da empresa ou negócio</span><input className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.business} onChange={e=>set("business",e.target.value)} placeholder="Nome da empresa"/></label>
                <fieldset className="col-span-2"><legend className="mb-2 text-[10px] uppercase tracking-wider text-stone-600">Qual é a sua área de actividade?</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{["Operador turístico","Agência de viagens","Guia turístico","Hotel / alojamento","Restaurante","Transporte / transfers","Experiências turísticas","Aluguer de viaturas","Outro"].map(v=><button key={v} type="button" aria-pressed={values.category.includes(v)} onClick={()=>set("category",values.category.includes(v)?values.category.filter(x=>x!==v):[...values.category,v])} className={"min-h-11 border px-3 py-2 text-left text-xs "+(values.category.includes(v)?"border-[#20372d] bg-[#20372d] text-white":"border-stone-200 bg-[#fcfaf7] text-stone-700")}>{values.category.includes(v)?"✓ ":"＋ "}{v}</button>)}</div></fieldset>
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Província de Angola</span><select className="w-full border border-stone-300 bg-white px-3 py-3 text-sm" value={values.location} onChange={e=>set("location",e.target.value)}><option value="">Seleccione uma província</option>{["Bengo","Benguela","Bié","Cabinda","Cuando","Cubango","Cuanza Norte","Cuanza Sul","Cunene","Huambo","Huíla","Icolo e Bengo","Luanda","Lunda Norte","Lunda Sul","Malanje","Moxico","Moxico Leste","Namibe","Uíge","Zaire"].map(v=><option key={v}>{v}</option>)}</select></label>
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Município</span><input className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.registration} onChange={e=>set("registration",e.target.value)} placeholder="Cidade ou município"/></label>
                <fieldset className="col-span-2"><legend className="mb-2 text-[10px] uppercase tracking-wider text-stone-600">Serviços disponibilizados</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{Array.from(new Set(values.category.flatMap(cat=>({"Operador turístico":["Circuitos e excursões","Pacotes turísticos","Experiências culturais"],"Agência de viagens":["Voos e bilhetes","Reservas e itinerários"],"Guia turístico":["Visitas guiadas","Natureza e aventura"],"Hotel / alojamento":["Quartos e alojamento","Refeições e catering"],"Restaurante":["Refeições e catering","Experiências gastronómicas"],"Transporte / transfers":["Transfers aeroporto","Transporte privado","Autocarros e grupos"],"Experiências turísticas":["Natureza e aventura","Experiências culturais","Actividades marítimas"],"Aluguer de viaturas":["Aluguer de viaturas","Transporte privado"],"Outro":["Outros serviços turísticos"]}[cat]||[])))).map(v=><button key={v} type="button" aria-pressed={values.services.includes(v)} onClick={()=>set("services",values.services.includes(v)?values.services.filter(x=>x!==v):[...values.services,v])} className={"min-h-11 border px-3 py-2 text-left text-xs "+(values.services.includes(v)?"border-[#8c7a5b] bg-[#eee7d9]":"border-stone-200 bg-white")}>{values.services.includes(v)?"✓ ":"＋ "}{v}</button>)}</div>{values.category.length===0&&<p className="mt-2 text-xs text-stone-400">Seleccione primeiro o tipo de entidade para ver serviços relevantes.</p>}</fieldset>
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Email</span><input type="email" className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.email} onChange={e=>set("email",e.target.value)} placeholder="nome@empresa.ao"/></label>
                <label className="col-span-2 sm:col-span-1"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Telefone / WhatsApp</span><input type="tel" className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.phone} onChange={e=>set("phone",e.target.value)} placeholder="+244 ..."/></label>
                <label className="col-span-2"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Website ou redes sociais</span><input className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.website} onChange={e=>set("website",e.target.value)} placeholder="Link do site ou perfil"/></label>
                <label className="col-span-2"><span className="mb-1 block text-[10px] uppercase tracking-wider text-stone-600">Informações adicionais</span><textarea rows={2} className="w-full border border-stone-300 px-3 py-3 text-sm" value={values.notes} onChange={e=>set("notes",e.target.value)} placeholder="Opcional"/></label>
              </div><label className="mt-4 flex items-start gap-2 text-xs text-stone-500"><input type="checkbox" checked={values.consent} onChange={e=>set("consent",e.target.checked)}/><span>Autorizo a Viemma Tours a contactar-me a respeito desta possibilidade de parceria.</span></label>{error&&<p role="alert" className="mt-4 bg-red-50 p-3 text-sm text-red-800">{error}</p>}<button type="submit" disabled={sending} className="mt-5 min-h-12 w-full bg-[#20372d] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white disabled:opacity-60">{sending?"A enviar...":"Enviar manifestação de interesse"} →</button><p className="mt-3 text-center text-[10px] text-stone-400">O envio deste formulário não garante a integração na rede. As propostas serão analisadas pela Viemma Tours.</p>
            </>}</form>
          <div className="mt-7 border-t border-stone-300 pt-5 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#8c7a5b]">Contactos</p>
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
              <a href="tel:+27210137143" className="text-sm font-semibold tracking-normal text-[#20372d] hover:text-[#8c7a5b]">+27 21 013 7143</a>
              <a href="https://wa.me/27681712985" target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#20372d] hover:text-[#8c7a5b]">WhatsApp: +27 68 171 2985</a>
              <a href="mailto:info@viemmatours.africa" className="text-sm text-[#20372d] hover:underline">info@viemmatours.africa</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#20372d] px-6 py-7 text-center text-[10px] uppercase tracking-[.15em] text-white/65">© {new Date().getFullYear()} Viemma Tours · {pt ? "Rede de Parceiros Preferenciais" : "Preferred Partner Network"}</footer>
    </main>
  );
}
