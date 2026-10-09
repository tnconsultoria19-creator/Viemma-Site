import React, { useState } from "react";

type Props = { language: "en" | "pt"; onClose: () => void };

type FormValues = {
  name: string; business: string; category: string; location: string;
  email: string; phone: string; website: string; services: string;
  registration: string; notes: string; consent: boolean;
};

const initialValues: FormValues = {
  name: "", business: "", category: "", location: "", email: "",
  phone: "", website: "", services: "", registration: "", notes: "", consent: false
};

export default function PreferredPartnerNetworkPage({ language, onClose }: Props) {
  const pt = language === "pt";
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
      _subject: `Viemma Tours Preferred Partner Network — ${values.business}`,
      _template: "table",
      _captcha: "false",
      "Contact name": values.name,
      "Business name": values.business,
      "Business category": values.category,
      "City / province in Angola": values.location,
      "Email": values.email,
      "Phone / WhatsApp": values.phone,
      "Website / social media": values.website || "Not supplied",
      "Services and operating capacity": values.services,
      "Registration / licences": values.registration || "Not supplied",
      "Additional notes": values.notes || "Not supplied",
      "Consent to be contacted": values.consent ? "Yes" : "No",
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
        <a href="mailto:info@viemmatours.africa" className="text-[10px] uppercase tracking-wider text-white/80 hover:text-white">Contact</a>
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

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-[1.1fr_.9fr] md:px-12 md:py-20">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#8c7a5b]">{pt ? "Sobre nós" : "About us"}</p>
          <h2 className="max-w-xl font-serif text-3xl font-light leading-tight text-[#20372d] md:text-4xl">
            {pt ? "Presença internacional. Conhecimento local. Crescimento conjunto." : "International reach. Local insight. Shared growth."}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600">
            {pt
              ? "A Viemma Tours é uma empresa internacional de turismo com base na África do Sul e presença nos Estados Unidos. A nossa rede de parceiros cria oportunidades para encaminhar visitantes e negócios para Angola. O nosso CEO, Sebastião Barros, de origem angolana, estará na BITUR Angola 2026, em Luanda, para reunir-se com potenciais parceiros."
              : "Viemma Tours is an international tourism company based in South Africa, with a presence in the United States. Our partner network creates opportunities to refer travellers and business into Angola. Our Angolan CEO, Sebastião Barros, will be at BITUR Angola 2026 in Luanda to meet prospective partners."}
          </p>
          <p className="mt-5 text-xs leading-6 text-stone-500">
            {pt
              ? "A Viemma Tours integra redes e organizações do sector, incluindo South African Tourism, Cape Town Tourism, Southern African Tourism Institute e SATIB."
              : "Viemma Tours is affiliated with tourism and industry organisations including South African Tourism, Cape Town Tourism, the Southern African Tourism Institute and SATIB."}
          </p>
          <div className="mt-8 border-l-2 border-[#d8c5a0] pl-5">
            <p className="font-serif text-xl italic text-[#20372d]">BITUR Angola 2026</p>
            <p className="mt-1 text-xs uppercase tracking-[.16em] text-stone-500">{pt ? "Luanda, Angola · 20–22 de Novembro de 2026" : "Luanda, Angola · 20–22 November 2026"}</p>
          </div>
        </div>
        <div className="grid content-start gap-8">
          <div className="border-t border-stone-300 pt-5">
            <h3 className="font-serif text-2xl font-light text-[#20372d]">{pt ? "Oportunidade de parceria" : "The partnership opportunity"}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">{pt
              ? "O mercado turístico angolano está a desenvolver-se e a abrir novas oportunidades. Procuramos parceiros capazes de acolher os nossos clientes, prestar serviços de confiança e ajudar a transformar referências internacionais em experiências locais de qualidade."
              : "Angola's tourism market is developing and opening new opportunities. We seek partners who can look after our clients, deliver reliable services and turn international referrals into high-quality local experiences."}</p>
            {bullets(pt
              ? ["Potenciais referências e clientes internacionais.", "Maior visibilidade junto da rede de contactos da Viemma Tours.", "Relação directa com uma empresa internacional que procura prestadores locais de confiança."]
              : ["Potential referrals and international clients.", "Visibility within Viemma Tours' network of contacts.", "A direct relationship with an international company seeking reliable local providers."])}
          </div>
          <div className="border-t border-stone-300 pt-5">
            <h3 className="font-serif text-2xl font-light text-[#20372d]">{pt ? "Quem procuramos" : "Who we welcome"}</h3>
            {bullets(pt
              ? ["Operadores turísticos e agências de viagens.", "Guias, hotéis, alojamentos e restaurantes.", "Empresas de transporte, transfers e experiências turísticas."]
              : ["Tour operators and travel agencies.", "Guides, hotels, accommodation providers and restaurants.", "Transport, transfer and tourism-experience providers."])}
          </div>
          <div className="border-t border-stone-300 pt-5">
            <h3 className="font-serif text-2xl font-light text-[#20372d]">{pt ? "Critérios de selecção" : "Selection criteria"}</h3>
            {bullets(pt
              ? ["Actividade legítima e licenças aplicáveis em dia.", "Serviço seguro, fiável e de qualidade consistente.", "Preços transparentes e comunicação profissional.", "Disponibilidade para verificação de referências e avaliação."]
              : ["Legitimate operation and applicable licences in place.", "Safe, reliable and consistently high-quality service.", "Transparent pricing and professional communication.", "Willingness to undergo reference checks and verification."])}
          </div>
        </div>
      </section>

      <section id="partner-registration" className="scroll-mt-16 bg-[#f0ede6] px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.75fr_1.25fr] md:gap-16">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#8c7a5b]">{pt ? "Próximo passo" : "Next step"}</p>
            <h2 className="font-serif text-3xl font-light leading-tight text-[#20372d] md:text-4xl">{pt ? "Vamos conversar na BITUR?" : "Let's meet at BITUR."}</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">{pt
              ? "Preencha o formulário para manifestar o seu interesse. A nossa equipa irá analisar os dados e poderá combinar um encontro com a Viemma Tours durante a feira."
              : "Complete the form to express your interest. Our team will review your details and can arrange a meeting with Viemma Tours during the exhibition."}</p>
            <p className="mt-5 text-xs leading-6 text-stone-500">info@viemmatours.africa<br />+27 21 013 7143<br />+27 68 171 2985</p>
          </div>
          <form onSubmit={submit} className="bg-white p-5 shadow-sm md:p-8">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e7eee8] text-[#20372d]"><i className="fas fa-check" aria-hidden="true" /></div>
                <h3 className="mt-5 font-serif text-2xl text-[#20372d]">{pt ? "Registo recebido" : "Registration received"}</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-600">{pt ? "Obrigado pelo seu interesse. A equipa da Viemma Tours irá analisar os dados e entrar em contacto caso seja necessário." : "Thank you for your interest. The Viemma Tours team will review your details and follow up as appropriate."}</p>
                <button type="button" onClick={onClose} className="mt-6 bg-[#20372d] px-6 py-3 text-[10px] font-bold uppercase tracking-[.16em] text-white hover:bg-[#8c7a5b]">{pt ? "Voltar ao site" : "Return to website"}</button>
              </div>
            ) : (
              <>
                <div className="mb-6 border-b border-stone-200 pb-4">
                  <h3 className="font-serif text-2xl font-light text-[#20372d]">{pt ? "Registo de parceiro preferencial" : "Preferred partner registration"}</h3>
                  <p className="mt-1 text-xs text-stone-500">{pt ? "Os campos com * são obrigatórios." : "Fields marked * are required."}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label><span className={labelClass}>{pt ? "Nome completo *" : "Full name *"}</span><input required autoComplete="name" className={inputClass} value={values.name} onChange={e => set("name", e.target.value)} /></label>
                  <label><span className={labelClass}>{pt ? "Empresa / negócio *" : "Company / business *"}</span><input required autoComplete="organization" className={inputClass} value={values.business} onChange={e => set("business", e.target.value)} /></label>
                  <label><span className={labelClass}>{pt ? "Tipo de actividade *" : "Business type *"}</span><select required className={inputClass} value={values.category} onChange={e => set("category", e.target.value)}><option value="">{pt ? "Seleccione uma opção" : "Select an option"}</option>{(pt ? ["Operador turístico", "Guia turístico", "Agência de viagens", "Hotel / alojamento", "Restaurante", "Transporte / transfers", "Experiências turísticas", "Outro"] : ["Tour operator", "Tour guide", "Travel agency", "Hotel / accommodation", "Restaurant", "Transport / transfers", "Tourism experiences", "Other"]).map(v => <option key={v} value={v}>{v}</option>)}</select></label>
                  <label><span className={labelClass}>{pt ? "Província / cidade *" : "Province / city *"}</span><input required className={inputClass} value={values.location} onChange={e => set("location", e.target.value)} placeholder={pt ? "Ex.: Luanda, Benguela" : "e.g. Luanda, Benguela"} /></label>
                  <label><span className={labelClass}>Email *</span><input required type="email" autoComplete="email" className={inputClass} value={values.email} onChange={e => set("email", e.target.value)} /></label>
                  <label><span className={labelClass}>{pt ? "Telefone / WhatsApp *" : "Phone / WhatsApp *"}</span><input required type="tel" autoComplete="tel" className={inputClass} value={values.phone} onChange={e => set("phone", e.target.value)} /></label>
                  <label className="sm:col-span-2"><span className={labelClass}>{pt ? "Website ou redes sociais" : "Website or social profile"}</span><input type="url" className={inputClass} value={values.website} onChange={e => set("website", e.target.value)} placeholder="https://" /></label>
                  <label className="sm:col-span-2"><span className={labelClass}>{pt ? "Serviços disponibilizados *" : "Services provided *"}</span><textarea required rows={3} className={inputClass} value={values.services} onChange={e => set("services", e.target.value)} placeholder={pt ? "Descreva brevemente os serviços e zonas de operação." : "Briefly describe your services and operating areas."} /></label>
                  <label className="sm:col-span-2"><span className={labelClass}>{pt ? "Registo comercial / licenças aplicáveis" : "Business registration / relevant licences"}</span><input className={inputClass} value={values.registration} onChange={e => set("registration", e.target.value)} /></label>
                  <label className="sm:col-span-2"><span className={labelClass}>{pt ? "Informações adicionais" : "Additional information"}</span><textarea rows={3} className={inputClass} value={values.notes} onChange={e => set("notes", e.target.value)} /></label>
                </div>
                <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-stone-600"><input required type="checkbox" checked={values.consent} onChange={e => set("consent", e.target.checked)} className="mt-1 accent-[#20372d]" /><span>{pt ? "Autorizo a Viemma Tours a utilizar estes dados para avaliar o meu interesse e contactar-me sobre esta parceria." : "I consent to Viemma Tours using these details to assess my interest and contact me about this partnership."}</span></label>
                {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
                <button type="submit" disabled={sending} className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#20372d] px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] text-white transition hover:bg-[#8c7a5b] disabled:cursor-wait disabled:opacity-60">
                  {sending ? (pt ? "A enviar..." : "Submitting...") : (pt ? "Enviar registo de interesse" : "Submit partner registration")} <i className="fas fa-arrow-right" aria-hidden="true" />
                </button>
                <p className="mt-3 text-center text-[10px] leading-5 text-stone-400">{pt ? "O registo não garante aceitação como parceiro. Todos os candidatos estão sujeitos a verificação." : "Registration does not guarantee acceptance. All applicants are subject to verification."}</p>
              </>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-[#20372d] px-6 py-7 text-center text-[10px] uppercase tracking-[.15em] text-white/65">© {new Date().getFullYear()} Viemma Tours · {pt ? "Rede de Parceiros Preferenciais" : "Preferred Partner Network"}</footer>
    </main>
  );
}
