import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Mail, MessageCircle, Send, X } from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { FaWhatsapp } from 'react-icons/fa';
import { demos, formatPrice, type FoodDemo } from '@/data/demos';
import { buildDirectEmailUrl, buildEmailUrl, buildWhatsAppUrl, siteConfig } from '@/data/siteConfig';
import { FoodIllustration } from '@/components/FoodIllustration';

const summaries = [
  'A familiar cup, a slower evening.',
  'Coffee, daylight, room to linger.',
  'A considered table for the evening.',
  'Charcoal, shared plates, bold type.',
  'All-day comfort with a bright edge.',
];

function useScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute('content', description);
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', title);
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', description);
  }, [title, description]);
  return null;
}

function Brand({ demo = false }: { demo?: boolean }) {
  return (
    <span className={demo ? 'demo-brand' : 'wordmark'}>
      {!demo && <span className="brand-mark" aria-hidden="true">K</span>}
      Karachi Food Pages
    </span>
  );
}

function Footer({ demo = false }: { demo?: boolean }) {
  return demo ? (
    <footer className="demo-footer">
      <div className="demo-footer-inner">
        <span>Concept page by Karachi Food Pages</span>
        <span>Fictional sample · all prices, hours and areas are illustrative · <Link href="/#privacy">Privacy</Link></span>
      </div>
    </footer>
  ) : (
    <footer className="footer">
      <div className="footer-inner">
        <span><strong>Karachi Food Pages</strong> · Independent web concepts for food businesses</span>
        <span className="footer-note">Concepts shown are fictional. No live listings or orders. · <a href="#privacy">Privacy</a></span>
      </div>
    </footer>
  );
}

const assistantFaqs = [
  {
    question: 'How does the process work?',
    answer: 'We start with your business, guests and goals. Then we agree on the page structure, content and scope before shaping a custom design for your place.',
    handoff: 'I would like to understand the website process.',
  },
  {
    question: 'What is included in the MVP website?',
    answer: 'A typical MVP is one custom-designed, mobile-friendly page with your menu, about information, hours, location and contact links. It includes basic content structuring, licensed imagery if needed, and revisions. We agree the exact revision allowance and written scope before starting.',
    handoff: 'I would like to discuss the MVP website scope.',
  },
  {
    question: 'How much does it cost?',
    answer: 'There is no fixed price published here. We will need to understand the pages, content and features you need before preparing a quote.',
    handoff: 'I would like a quote for a website. Please help me understand what details you need.',
  },
  {
    question: 'How long will it take?',
    answer: 'The delivery schedule depends on your project scope, how quickly content is ready and our availability. We will confirm a realistic timeline before work starts.',
    handoff: 'I would like to discuss a project timeline.',
  },
  {
    question: 'What should I prepare?',
    answer: 'A business name and area, your menu or services, opening hours, contact details, and any logo, brand colours or photos you already have are a useful start. We can work out what is still needed together.',
    handoff: 'I am preparing details for a food-business website. What should I send first?',
  },
  {
    question: 'What about domain, hosting or online ordering?',
    answer: 'Domain and hosting, ongoing maintenance, and live booking or ordering integrations are not part of the standard MVP by default. We can scope and quote those separately.',
    handoff: 'I would like to discuss domain, hosting, maintenance or live ordering options.',
  },
  {
    question: 'When will you reply?',
    answer: 'Response times vary. We will reply as soon as we can during our working hours.',
    handoff: 'I would like to talk with the Karachi Food Pages team.',
  },
];

const landingFaqs = [
  assistantFaqs[1],
  assistantFaqs[2],
  assistantFaqs[3],
  assistantFaqs[4],
  assistantFaqs[5],
];

function WhatsAppAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<(typeof assistantFaqs)[number] | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');
  const assistantRef = useRef<HTMLElement>(null);
  const [location] = useLocation();
  const activeDemo = demos.find((demo) => location.startsWith(`/demo/${demo.slug}`));
  const message = customQuestion.trim()
    ? `Hi Karachi Food Pages, I have a question: ${customQuestion.trim()}`
    : selectedFaq?.handoff ?? 'Hi Karachi Food Pages, I would like to discuss a website for my food business.';

  useEffect(() => {
    if (!isOpen || location === '/') return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !assistantRef.current?.contains(event.target)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, location]);

  if (location === '/') return null;

  return (
    <aside ref={assistantRef} className={`whatsapp-assistant${activeDemo ? ` assistant-theme-${activeDemo.themeKey}` : ''}`}>
      <section id="whatsapp-assistant-panel" className={`assistant-panel${isOpen ? ' is-open' : ''}`} role="dialog" aria-label="Karachi Food Pages WhatsApp assistant" aria-hidden={!isOpen} inert={!isOpen}>
        <header className="assistant-header">
          <span className="assistant-avatar" aria-hidden="true"><FaWhatsapp size={20} /></span>
          <span className="assistant-heading"><strong>Karachi Food Pages</strong><small>Quick answers · studio enquiries</small></span>
          <button className="assistant-close" type="button" aria-label="Close WhatsApp assistant" onClick={() => setIsOpen(false)}><X size={18} /></button>
        </header>
        <div className="assistant-body">
          <p className="assistant-welcome">Assalamu alaikum! Pick a common question or write a message. You can review it before anything is sent.</p>
          {selectedFaq && (
            <div className="assistant-answer" aria-live="polite">
              <span className="assistant-answer-question">{selectedFaq.question}</span>
              <p>{selectedFaq.answer}</p>
            </div>
          )}
          <h2 className="assistant-section-title">Common questions</h2>
          <div className="assistant-faqs" aria-label="Frequently asked questions">
            {assistantFaqs.map((faq) => (
              <button
                type="button"
                key={faq.question}
                className={`assistant-faq${selectedFaq?.question === faq.question ? ' is-selected' : ''}`}
                aria-pressed={selectedFaq?.question === faq.question}
                onClick={() => {
                  setSelectedFaq(faq);
                  setCustomQuestion('');
                }}
              >
                {faq.question}<ArrowRight size={13} aria-hidden="true" />
              </button>
            ))}
          </div>
          <label className="assistant-custom-label" htmlFor="assistant-question">Or type a question for us</label>
          <textarea
            id="assistant-question"
            className="assistant-custom-input"
            value={customQuestion}
            onChange={(event) => setCustomQuestion(event.target.value)}
            maxLength={500}
            placeholder="Tell us what you have in mind…"
            rows={2}
          />
          <a className="assistant-whatsapp-link" href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">
            Continue in WhatsApp <Send size={14} aria-hidden="true" />
          </a>
          <p className="assistant-note">Nothing is sent until you choose to send it in WhatsApp. <Link href="/#privacy">How messages are handled</Link></p>
        </div>
      </section>
      <button
        className={`whatsapp-launcher${isOpen ? ' is-open' : ''}`}
        type="button"
        aria-label={isOpen ? 'Close WhatsApp assistant' : 'Open WhatsApp assistant'}
        aria-controls="whatsapp-assistant-panel"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="whatsapp-launcher-icon" aria-hidden="true">
          {isOpen ? <X size={21} /> : <FaWhatsapp size={26} />}
        </span>
        <span className="whatsapp-launcher-label">{isOpen ? 'Close chat' : 'Chat with us'}</span>
      </button>
    </aside>
  );
}

function Inquiry({ demo }: { demo?: FoodDemo }) {
  const [emailCopyStatus, setEmailCopyStatus] = useState('');
  const inquiryMessage = demo
    ? `Hi Karachi Food Pages, I am interested in a website inspired by the ${demo.businessName} ${demo.sectorLabel} sample. My business is: `
    : 'Hi Karachi Food Pages, I would like to discuss a website for my food business. My business is: ';
  const emailSubject = demo ? `Website enquiry inspired by ${demo.businessName}` : 'Website enquiry for my food business';
  const emailBody = [
    'Hello DotnDev Solutions,',
    '',
    'I would like to discuss a website for my food business.',
    '',
    'Business name:',
    'Food business type:',
    'Area / city:',
    'Current website or social link (if any):',
    'What would you like the website to help with?',
    'Preferred language(s): English / Urdu / both',
    'What content or photos do you already have?',
    '',
    demo ? `I was inspired by the ${demo.businessName} ${demo.sectorLabel} sample.` : '',
  ].filter(Boolean).join('\n');
  const copyEmailAddress = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteConfig.emailAddress);
      } else {
        const input = document.createElement('textarea');
        input.value = siteConfig.emailAddress;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand('copy');
        input.remove();
        if (!copied) throw new Error('Clipboard copy was not available.');
      }
      setEmailCopyStatus('Copied.');
    } catch {
      setEmailCopyStatus(`Copy unavailable. Email us at ${siteConfig.emailAddress}.`);
    }
  };
  return demo ? (
    <section className="demo-cta demo-inner" id="service-inquiry" aria-labelledby="demo-inquiry-title">
      <span className="demo-kicker">Make it yours</span>
      <h2 id="demo-inquiry-title">A website shaped around your place.</h2>
      <p>This is a fictional sample, not a live business. Contact the studio to discuss a real website inspired by this direction.</p>
      <div className="demo-contact-actions">
        <a className="demo-primary" href={buildWhatsAppUrl(inquiryMessage)} target="_blank" rel="noopener noreferrer" data-testid="demo-inquiry-link">
          Ask about a page like this <MessageCircle size={14} aria-hidden="true" />
        </a>
        <a className="demo-subtle" href={buildEmailUrl(emailSubject, emailBody)} target="_blank" rel="noopener noreferrer" data-testid="demo-email-inquiry-link">
          Email a project brief <Mail size={14} aria-hidden="true" />
        </a>
      </div>
      <p className="contact-note">Opens a prefilled Gmail draft; nothing is sent by this page. Prefer another email app? <a href={buildDirectEmailUrl(emailSubject, emailBody)}>Email us directly</a>.</p>
    </section>
  ) : (
    <section className="inquiry" id="inquiry" aria-labelledby="inquiry-title">
      <div>
        <h2 id="inquiry-title">Have a place in mind?</h2>
        <p>Tell us what you serve, and we can shape a page around it. A short project brief is a good place to start.</p>
      </div>
      <div className="inquiry-actions">
        <a className="inquiry-link" href={buildWhatsAppUrl(inquiryMessage)} target="_blank" rel="noopener noreferrer" data-testid="home-inquiry-link">
          Start a WhatsApp enquiry <MessageCircle size={14} aria-hidden="true" />
        </a>
        <a className="inquiry-email" href={buildEmailUrl(emailSubject, emailBody)} target="_blank" rel="noopener noreferrer" data-testid="home-email-inquiry-link">
          Email a project brief <Mail size={14} aria-hidden="true" />
        </a>
      </div>
      <p className="inquiry-note">Opens a prefilled Gmail draft. <button className="copy-email-button" type="button" onClick={copyEmailAddress}>Copy email address</button><span className="email-copy-status" aria-live="polite">{emailCopyStatus}</span></p>
    </section>
  );
}

function Home() {
  useScrollReveal();
  const [selected, setSelected] = useState(Math.floor(demos.length / 2));
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const galleryRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const draggedCard = useRef(false);
  const selectedDemo = demos[selected];

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  function moveSelection(direction: -1 | 1) {
    const next = (selected + direction + demos.length) % demos.length;
    setSelected(next);
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      const gallery = galleryRef.current;
      const controls = gallery?.parentElement?.parentElement?.querySelector('.gallery-controls');
      if (
        !gallery ||
        gallery.matches(':hover, :focus-within') ||
        controls?.matches(':hover, :focus-within') ||
        document.visibilityState !== 'visible' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) return;

      const next = (selected + 1) % demos.length;
      setSelected(next);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [selected]);

  return (
    <main className="site-shell home-page">
      <Meta title="Karachi Food Pages — Web concepts for food businesses" description="Explore five fictional food-business website concepts made for Karachi's independent food places." />
      <header className="topbar">
        <Link href="/" className="brand-home" aria-label="Karachi Food Pages home" data-testid="home-brand-link"><Brand /></Link>
        <nav className="topnav" aria-label="Main navigation">
          <a className="nav-optional" href="#how-it-works" data-testid="how-it-works-nav">How it works</a>
          <a className="nav-optional" href="#what-we-do" data-testid="what-we-do-nav">What we do</a>
          <a className="nav-cta" href="#inquiry" data-testid="header-inquiry-link">Request a website <ArrowUpRight size={14} aria-hidden="true" /></a>
        </nav>
      </header>

      <section className="intro landing-hero" data-reveal aria-labelledby="home-title">
        <div className="hero-seal" aria-hidden="true">
          <span className="seal-orbit" />
          <span className="seal-center">K</span>
        </div>
        <div className="floating-food floating-food--chai" aria-hidden="true"><img src="/images/chai-hotel/chai-paratha-plate.jpg" alt="" /></div>
        <div className="floating-food floating-food--biryani" aria-hidden="true"><img src="/images/restaurant/pakistani-biryani.jpg" alt="" /></div>
        <div className="floating-food floating-food--bbq" aria-hidden="true"><img src="/images/bbq/seekh-kebab-grill.jpg" alt="" /></div>
        <div className="floating-food floating-food--paratha" aria-hidden="true"><img src="/images/chai-hotel/pakistani-parathas.jpg" alt="" /></div>
        <span className="eyebrow">A small studio for Karachi’s food places</span>
        <h1 id="home-title">
          <span>Local flavour.</span>
          <span><em>Thoughtful design.</em></span>
          <span>Made for your place.</span>
        </h1>
        <p className="intro-copy">Custom websites for Karachi’s independent restaurants, cafés and food businesses.</p>
        <a className="text-link" href="#showcase" data-testid="explore-examples-link">Explore the examples <ArrowDown size={14} aria-hidden="true" /></a>
        <span className="hero-note hero-note--left" aria-hidden="true">FIVE ORIGINAL<br />FOOD DIRECTIONS</span>
        <span className="hero-note hero-note--right" aria-hidden="true">MADE FOR<br />KARACHI</span>
      </section>

      <section className="showcase" data-reveal id="showcase" aria-labelledby="showcase-title">
        <h2 className="showcase-heading" id="showcase-title">Choose your table</h2>
        <p className="gallery-hint">Five directions, around one table. Swipe, watch each concept take its place, or use the arrows.</p>
        <div className="gallery-wrap">
          <div className="table-halo" aria-hidden="true" />
          <div className="gallery" ref={galleryRef} role="group" aria-label="Food business website concepts">
            {demos.map((demo, index) => {
              const offset = carouselOffset(index, selected);
              const step = viewportWidth <= 760 ? 253 : viewportWidth <= 960 ? 190 : 210;
              return (
                <Link
                  key={demo.slug}
                  href={`/demo/${demo.slug}`}
                  aria-current={selected === index ? 'true' : undefined}
                  aria-label={`${demo.sectorLabel} sample, ${index + 1} of 5. Open concept`}
                  className={`sector-card${selected === index ? ' is-selected' : ''}`}
                  data-index={index}
                  data-testid={`sector-card-${demo.slug}`}
                  style={{
                    '--tile': cardTone(index),
                    '--accent-color': cardAccent(index),
                    '--slot-x': `${offset * step}px`,
                    '--arc-y': `${arcOffsetY(offset)}px`,
                    '--arc-scale': arcScale(offset),
                  } as CSSProperties}
                  onFocus={() => setSelected(index)}
                  tabIndex={Math.abs(offset) <= (viewportWidth <= 760 ? 1 : 2) ? 0 : -1}
                  onPointerDown={(event) => { pointerStartX.current = event.clientX; }}
                  onPointerUp={(event) => {
                    if (pointerStartX.current === null) return;
                    const distance = event.clientX - pointerStartX.current;
                    pointerStartX.current = null;
                    if (Math.abs(distance) < 40) return;
                    draggedCard.current = true;
                    moveSelection(distance > 0 ? -1 : 1);
                  }}
                  onPointerCancel={() => { pointerStartX.current = null; }}
                  onClick={(event) => {
                    if (draggedCard.current) {
                      event.preventDefault();
                      draggedCard.current = false;
                      return;
                    }
                    setSelected(index);
                  }}
                >
                  <div className={`sector-visual sector-visual-${demo.slug}`} aria-hidden="true">
                    <img className="sector-preview-photo" src={demo.photos[0].src} alt="" loading="lazy" />
                    <span className="card-index">0{index + 1}</span>
                    <span className="visual-art">{cardSymbol(index)}</span>
                    <span className="visual-detail">{['after dark', 'daylight', 'the evening', 'over coals', 'all day'][index]}</span>
                  </div>
                  <h3>{demo.sectorLabel}</h3>
                  <p>{summaries[index]}</p>
                  <span className="card-open">View sample <ArrowUpRight size={12} aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="gallery-controls" aria-label="Gallery controls">
          <button className="arrow-btn" type="button" aria-label="Previous food concept" data-testid="gallery-previous" onClick={() => moveSelection(-1)}><ChevronLeft size={16} aria-hidden="true" /></button>
          <span className="position" aria-live="polite" aria-atomic="true">{selected + 1} of {demos.length}</span>
          <button className="arrow-btn" type="button" aria-label="Next food concept" data-testid="gallery-next" onClick={() => moveSelection(1)}><ChevronRight size={16} aria-hidden="true" /></button>
        </div>
        <div className="selected-summary" aria-live="polite" aria-atomic="true">
          <h3>{selectedDemo.sectorLabel}</h3>
          <p>{summaries[selected]}</p>
          <Link className="open-selected" href={`/demo/${selectedDemo.slug}`} data-testid={`selected-sample-${selectedDemo.slug}`}>
            Open this sample <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <p className="showcase-disclaimer">Every business, menu, price, location and hour shown is fictional. Photos are illustrative references, with sources credited on each sample page.</p>
      </section>

      <section className="below-home" data-reveal id="how-it-works" aria-labelledby="how-title">
        <div className="below-inner">
          <div>
            <span className="eyebrow">From first look to your own page</span>
            <h2 id="how-title">A good website starts by knowing your place.</h2>
            <p>We start with your business, customers and goals, then agree what the site should include before design or development begins.</p>
          </div>
          <div className="steps">
            <div className="step"><span className="step-number">01</span><span><strong>Tell us about your place</strong><span>Share your business, guests and what you want the website to do.</span></span></div>
            <div className="step"><span className="step-number">02</span><span><strong>Agree content, scope &amp; quote</strong><span>Confirm the pages, features, responsibilities, price and schedule before work starts.</span></span></div>
            <div className="step"><span className="step-number">03</span><span><strong>Design, build &amp; review</strong><span>Shape the site around your place and review it together before launch.</span></span></div>
            <div className="step"><span className="step-number">04</span><span><strong>Launch &amp; hand over</strong><span>Prepare the agreed site for launch and share the access and handover details in scope.</span></span></div>
          </div>
        </div>
      </section>
      <section className="service-offer" data-reveal id="what-we-do" aria-labelledby="service-offer-title">
        <div className="service-offer-inner">
          <div className="service-offer-heading">
            <span className="eyebrow">A considered start for your business</span>
            <h2 id="service-offer-title">A useful first website, built around the way your guests choose.</h2>
            <p>Start with a custom, mobile-first page for the essentials guests need: what you serve, where to find you, and how to get in touch.</p>
            <a className="service-offer-cta" href={buildWhatsAppUrl('Hi Karachi Food Pages, I would like to discuss a website for my food business.')} target="_blank" rel="noopener noreferrer">
              Talk through your project <MessageCircle size={15} aria-hidden="true" />
            </a>
            <p className="response-promise">WhatsApp enquiries: response times vary. We’ll reply as soon as we can during working hours.</p>
          </div>
          <div className="service-offer-details">
            <article className="service-detail">
              <span>01</span>
              <h3>One custom, responsive page</h3>
              <p>A distinctive mobile-friendly design shaped around your business—not a one-size-fits-all template.</p>
            </article>
            <article className="service-detail">
              <span>02</span>
              <h3>Your essential details</h3>
              <p>Menu, about information, hours, location and contact links, with basic structuring of the details you provide.</p>
            </article>
            <article className="service-detail">
              <span>03</span>
              <h3>Clear contact paths</h3>
              <p>Make it easy for guests to reach you with the contact links that fit your business, such as WhatsApp, phone, email or maps.</p>
            </article>
            <article className="service-detail">
              <span>04</span>
              <h3>Imagery &amp; revisions</h3>
              <p>Licensed imagery can be sourced if needed. Feedback and revisions are included; the agreed allowance is documented in your scope.</p>
            </article>
            <article className="service-detail">
              <span>05</span>
              <h3>Language for your guests</h3>
              <p>English, Urdu or bilingual layouts can be scoped where useful. Translation and copywriting responsibilities are agreed separately.</p>
            </article>
            <article className="service-detail service-detail-note">
              <span>AGREED BEFORE WORK</span>
              <h3>Scope, price &amp; timing</h3>
              <p>There is no fixed package price published here. We confirm a quote and realistic schedule after agreeing content and features. Domain, hosting, maintenance and live ordering are scoped separately.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="showcase-trust" data-reveal aria-labelledby="showcase-trust-title">
        <div className="showcase-trust-inner">
          <span className="eyebrow">About the studio</span>
          <h2 id="showcase-trust-title">A food-business web concept from DotnDev Solutions.</h2>
          <p>These five fictional pages demonstrate possible directions for food businesses—not client case studies or live listings. Each shows how a visual identity, menu, practical details, imagery and contact paths might work together. We’ll add commissioned work here as permissioned portfolio examples become available.</p>
        </div>
      </section>
      <section className="landing-faq" data-reveal aria-labelledby="landing-faq-title">
        <div className="landing-faq-inner">
          <div className="landing-faq-heading">
            <span className="eyebrow">A few useful answers</span>
            <h2 id="landing-faq-title">Questions before getting started?</h2>
            <p>Here are the details food businesses usually want to know first.</p>
          </div>
          <div className="landing-faq-list">
            {landingFaqs.map((faq) => (
              <details className="landing-faq-item" key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="privacy-info" data-reveal id="privacy" aria-labelledby="privacy-title">
        <div className="privacy-info-inner">
          <span className="eyebrow">Privacy &amp; messages</span>
          <h2 id="privacy-title">Your message stays in your hands.</h2>
          <p className="privacy-info-intro">Here’s what happens when you use the questions and contact options on this site.</p>
          <div className="privacy-message-grid">
            <article className="privacy-message-card">
              <span className="privacy-message-index">01</span>
              <h3>On this page</h3>
              <p>FAQ answers are built into the site. A question you type is held in the open page only; this MVP does not submit it to a Karachi Food Pages server or save it to an enquiry database.</p>
            </article>
            <article className="privacy-message-card">
              <span className="privacy-message-index">02</span>
              <h3>WhatsApp</h3>
              <p>Choosing “Continue in WhatsApp” opens a message with your text for you to review, edit or cancel. Nothing is sent by this site. If you send it, WhatsApp/Meta handles it under its <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>
            </article>
            <article className="privacy-message-card">
              <span className="privacy-message-index">03</span>
              <h3>Email</h3>
              <p>The project-brief button opens a prefilled Gmail draft. You can review or edit it before sending; <a href="#inquiry">the enquiry section</a> also offers a link for your preferred email app.</p>
            </article>
          </div>
          <p className="privacy-message-reminder">Please don’t include passwords, payment details or other sensitive personal information in a message.</p>
        </div>
      </section>
      <Inquiry />
      <Footer />
    </main>
  );
}

function cardTone(index: number) {
  return ['#f1e4d2', '#e4eadf', '#e5e7e3', '#e9ded6', '#f0dfd7'][index];
}
function cardAccent(index: number) {
  return ['#8c4e30', '#527456', '#45616c', '#a65b3a', '#b84d3b'][index];
}
function cardSymbol(index: number) {
  return ['چائے', 'f', 'S&S', 'C', 'SS'][index];
}

function carouselOffset(index: number, selected: number) {
  const midpoint = Math.floor(demos.length / 2);
  return ((index - selected + midpoint + demos.length) % demos.length) - midpoint;
}

function arcOffsetY(offset: number) {
  const distance = Math.abs(offset);
  if (distance === 0) return -7;
  if (distance === 1) return 13;
  if (distance === 2) return 42;
  return 42 + (distance - 2) * 14;
}

function arcScale(offset: number) {
  const distance = Math.abs(offset);
  if (distance === 0) return 1.04;
  if (distance === 1) return 0.95;
  if (distance === 2) return 0.89;
  return Math.max(0.82, 0.89 - (distance - 2) * 0.05);
}

function FoodDemoPage({ demo }: { demo: FoodDemo }) {
  useScrollReveal();
  return (
    <main className={`demo-page theme-${demo.themeKey} concept-${demo.slug}`}>
      <Meta title={`${demo.businessName} — Sample ${demo.sectorLabel} concept | Karachi Food Pages`} description={`${demo.tagline} A fictional ${demo.sectorLabel.toLowerCase()} website concept from Karachi Food Pages.`} />
      <div className="demo-demo-banner" role="note">
        <span aria-hidden="true">◌</span>
        Sample concept · not a live business · menu prices, hours and location are illustrative
      </div>
      <header className="demo-top">
        <Link href="/" className="demo-back" data-testid={`back-to-gallery-${demo.slug}`}><ArrowLeft size={14} aria-hidden="true" /> All concepts</Link>
        <span className="demo-brand">{demo.businessName}<span className="sample-wordmark"> · sample</span></span>
        <nav className="demo-nav" aria-label={`${demo.businessName} sample navigation`}>
          <a href="#menu" data-testid={`demo-menu-nav-${demo.slug}`}>{demo.slug === 'bbq' ? 'The menu' : demo.slug === 'diner' ? 'All-day menu' : demo.slug === 'restaurant' ? 'The menu' : 'Menu'}</a>
          <a href="#story" data-testid={`demo-story-nav-${demo.slug}`}>{demo.slug === 'bbq' ? 'The setting' : demo.slug === 'diner' ? 'Our kind of place' : demo.slug === 'restaurant' ? 'The evening' : 'Our approach'}</a>
          <a href="#details" data-testid={`demo-details-nav-${demo.slug}`}>{demo.slug === 'bbq' ? 'The idea' : demo.slug === 'diner' ? 'Find the diner' : demo.slug === 'restaurant' ? 'The details' : 'Details'}</a>
        </nav>
      </header>
      <div className="demo-inner">
        <section className="demo-hero" data-reveal aria-labelledby={`demo-title-${demo.slug}`}>
          {demo.slug === 'chai-hotel' && demo.photos?.[0] && (
            <img
              className="chai-hero-photo"
              src={demo.photos[0].src}
              alt={demo.photos[0].alt}
              fetchPriority="high"
            />
          )}
          {demo.slug === 'diner' && demo.photos?.[0] ? (
            <>
              <div className="diner-hero-copy">
                <span className="demo-kicker">Diner · fictional web direction</span>
                <h1 id={`demo-title-${demo.slug}`}>
                  <span>Good days</span>
                  <span>start with</span>
                  <em>breakfast.</em>
                </h1>
                <p>{demo.introduction}</p>
                <a className="diner-menu-link" href="#menu" data-testid={`browse-menu-${demo.slug}`}>Pull up a chair <ArrowDown size={13} aria-hidden="true" /></a>
                <span className="diner-hero-note" aria-hidden="true">ALL DAY · EVERY DAY</span>
              </div>
              <figure className="diner-hero-photo">
                <img src={demo.photos[0].src} alt={demo.photos[0].alt} fetchPriority="high" />
                <figcaption><span>{demo.photos[0].caption}</span><span>Sunday Service · sample</span></figcaption>
                <span className="diner-photo-badge" aria-hidden="true"><span>OPEN</span><strong>ALL<br />DAY</strong><span>GOOD MOOD</span></span>
              </figure>
              <span className="diner-hero-edition" aria-hidden="true">NO. 01 / ALL DAY</span>
            </>
          ) : demo.slug === 'restaurant' && demo.photos?.[0] ? (
            <>
              <div className="restaurant-hero-copy">
                <span className="demo-kicker">Restaurant · fictional web direction</span>
                <span className="restaurant-overline" aria-hidden="true">SAFFRON &amp; SLATE · KARACHI</span>
                <h1 id={`demo-title-${demo.slug}`}>
                  A table<br />for the <em>whole</em><br />evening.
                </h1>
                <p>{demo.introduction}</p>
                <a className="restaurant-menu-link" href="#menu" data-testid={`browse-menu-${demo.slug}`}>Explore the sample menu <ArrowDown size={13} aria-hidden="true" /></a>
              </div>
              <figure className="restaurant-hero-photo">
                <img src={demo.photos[0].src} alt={demo.photos[0].alt} fetchPriority="high" />
                <figcaption><span>{demo.photos[0].caption}</span><a href={demo.photos[0].sourceUrl} target="_blank" rel="noopener noreferrer">Photo · Pexels</a></figcaption>
              </figure>
              <span className="restaurant-hero-edition" aria-hidden="true">A NOTE ON THE EVENING&nbsp; / &nbsp;01</span>
            </>
          ) : demo.slug === 'bbq' && demo.photos?.[0] ? (
            <>
              <img className="bbq-hero-photo" src={demo.photos[0].src} alt={demo.photos[0].alt} fetchPriority="high" />
              <div className="bbq-hero-copy">
                <span className="demo-kicker">BBQ · fictional web direction</span>
                <h1 id={`demo-title-${demo.slug}`}>
                  <span>Supper</span>
                  <span>starts</span>
                  <span>at the <em>fire.</em></span>
                </h1>
                <p>{demo.introduction}</p>
                <a className="bbq-menu-link" href="#menu" data-testid={`browse-menu-${demo.slug}`}>Explore the sample menu <ArrowDown size={13} aria-hidden="true" /></a>
              </div>
              <span className="bbq-side-note" aria-hidden="true">Made for the<br />smoke.<br /><br />Field note<br />01</span>
              <span className="bbq-hero-edition" aria-hidden="true">01 / OPEN HEAT</span>
              <a className="bbq-hero-credit" href={demo.photos[0].sourceUrl} target="_blank" rel="noopener noreferrer">Hero photo · Pexels</a>
              <span className="bbq-concept-stamp" aria-hidden="true">C<br />&amp;<br />C</span>
              <span className="bbq-concept-caption" aria-hidden="true">An ember-lit table<br />imagined</span>
            </>
          ) : demo.slug === 'cafe' ? (
            <>
              <div className="hero-copy cafe-hero-copy">
                <span className="demo-kicker">Cafe · a fictional web direction</span>
                <h1 id={`demo-title-${demo.slug}`}>
                  <span>A slower kind</span>
                  <em>of morning.</em>
                </h1>
              </div>
              <div className="cafe-hero-aside">
                <p>{demo.introduction}</p>
                <a className="cafe-menu-link" href="#menu" data-testid={`browse-menu-${demo.slug}`}>Wander to the menu <ArrowDown size={13} aria-hidden="true" /></a>
              </div>
              {demo.photos?.[0] && (
                <figure className="cafe-feature-photo">
                  <img src={demo.photos[0].src} alt={demo.photos[0].alt} fetchPriority="high" />
                  <figcaption>
                    <span>{demo.photos[0].caption}</span>
                    <span>Little Fern · sample concept</span>
                  </figcaption>
                  <span className="cafe-stamp" aria-hidden="true"><span>STAY A LITTLE</span><span>LEAF</span><span>TAKE YOUR TIME</span></span>
                </figure>
              )}
              <span className="cafe-side-note" aria-hidden="true">Morning,<br />held open.</span>
              <span className="cafe-edition" aria-hidden="true">01 — 03</span>
            </>
          ) : (
            <div className="hero-copy">
              <span className="demo-kicker">{demo.sectorLabel} · fictional web direction</span>
              <h1 id={`demo-title-${demo.slug}`}>
                {demo.slug === 'chai-hotel' ? (
                  <>
                  <span className="chai-display-name">Baithak</span>
                  <span className="chai-house-label">CHAI HOUSE · SAMPLE CONCEPT</span>
                  <span className="chai-tagline">{demo.tagline}</span>
                  </>
                ) : demo.tagline}
              </h1>
              <p>{demo.introduction}</p>
              <div className="demo-actions">
                <a className="demo-primary" href="#menu" data-testid={`browse-menu-${demo.slug}`}>{demo.slug === 'chai-hotel' ? 'Read the sample menu' : 'Browse the sample menu'} <ArrowDown size={14} aria-hidden="true" /></a>
                <a className="demo-subtle" href="#service-inquiry" data-testid={`request-style-${demo.slug}`}>Get a website like this</a>
              </div>
            </div>
          )}
          {demo.slug !== 'chai-hotel' && demo.slug !== 'cafe' && demo.slug !== 'bbq' && demo.slug !== 'diner' && demo.slug !== 'restaurant' && (
            <div className="hero-art" role="img" aria-label={`${demo.sectorLabel} illustration: ${demo.artDescription}`} data-testid={`hero-art-${demo.slug}`}>
              <FoodIllustration slug={demo.slug} />
              <span className="art-caption">{demo.artCaption}</span>
            </div>
          )}
          <span className="hero-edition" aria-hidden="true">KFP / 0{demos.findIndex((item) => item.slug === demo.slug) + 1}</span>
        </section>
        {demo.slug === 'bbq' && (
          <div className={`demo-marquee demo-marquee-${demo.slug}`} aria-hidden="true">
            <div className="demo-marquee-track">
              {[0, 1].map((copy) => (
                <span key={copy}>{demo.tagline} <i>✳</i> Made for the table <i>✳</i> Karachi, imagined <i>✳</i> {demo.sectorLabel} concept <i>✳</i></span>
              ))}
            </div>
          </div>
        )}
        {demo.slug === 'cafe' && demo.photos && (
          <section className="cafe-photo-gallery" aria-labelledby="cafe-photo-title">
            <div className="cafe-photo-heading">
              <div>
                <span className="demo-kicker">A little local inspiration</span>
                <h2 id="cafe-photo-title">Coffee, daylight, room to linger.</h2>
              </div>
              <p>Reference photos show cafe interiors, counters, and coffee and tea. They illustrate this fictional concept, not Little Fern’s location or menu.</p>
            </div>
            <div className="cafe-photo-grid">
              {demo.photos.slice(1).map((photo) => (
                <figure className="cafe-photo-card" key={photo.src}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption>
                    <span>{photo.caption}</span>
                    <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${photo.caption} photo source on Pexels`}>Photo source</a>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="cafe-photo-credit">
              Hero photo: <a href={demo.photos[0].sourceUrl} target="_blank" rel="noopener noreferrer">Pexels</a>
              {' · '}Cafe and food photographs: <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">Pexels License</a>
            </p>
          </section>
        )}
        {demo.slug === 'diner' && demo.photos && (
          <section className="diner-photo-gallery" aria-labelledby="diner-photo-title">
            <div className="diner-photo-heading">
              <div>
                <span className="demo-kicker">A little something for everyone</span>
                <h2 id="diner-photo-title">Burgers, fries &amp; the usual order.</h2>
              </div>
              <p>Real burger photography as visual inspiration for this fictional all-day diner—not photos of Sunday Service or its menu.</p>
            </div>
            <div className="diner-photo-grid">
              {demo.photos.slice(1).map((photo) => (
                <figure className="diner-photo-card" key={photo.src}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption>
                    <span>{photo.caption}</span>
                    <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${photo.caption} photo source on Pexels`}>Photo source</a>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="diner-photo-credit">
              Hero photo: <a href={demo.photos[0].sourceUrl} target="_blank" rel="noopener noreferrer">Pexels</a>
              {' · '}Food photographs: <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">Pexels License</a>
            </p>
          </section>
        )}
        {demo.slug === 'restaurant' && demo.photos && (
          <section className="restaurant-photo-gallery" aria-labelledby="restaurant-photo-title">
            <div className="restaurant-photo-heading">
              <span className="demo-kicker">From Karachi, for the table</span>
              <h2 id="restaurant-photo-title">Come hungry.<br /><em>Stay a while.</em></h2>
              <p>Restaurant and food photographs, including a Karachi dinner spread, are references for this fictional concept—not Saffron &amp; Slate locations or dishes.</p>
            </div>
            <div className="restaurant-photo-grid">
              {demo.photos.slice(1).map((photo, index) => (
                <figure className={`restaurant-photo-card restaurant-photo-card-${index + 1}`} key={photo.src}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption>
                    <span>{photo.caption}</span>
                    <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${photo.caption} photo source on Pexels`}>Photo source</a>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="restaurant-photo-credit">
              Hero photo: <a href={demo.photos[0].sourceUrl} target="_blank" rel="noopener noreferrer">Pexels</a>
              {' · '}Food photographs: <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">Pexels License</a>
            </p>
          </section>
        )}
        {demo.slug === 'chai-hotel' && demo.photos && (
          <section className="chai-photo-gallery" aria-labelledby="chai-photo-title">
            <div className="chai-photo-heading">
              <div>
                <span className="demo-kicker">A familiar tea-stall spread</span>
                <h2 id="chai-photo-title">Chai, paratha &amp; good company.</h2>
              </div>
              <p>Stock photographs of tea-stall scenes and foods commonly enjoyed with chai. These are illustrative references, not photos of this fictional sample business.</p>
            </div>
            <div className="chai-photo-grid">
              {demo.photos.slice(1).map((photo) => (
                <figure className="chai-photo-card" key={photo.src}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption>
                    <span>{photo.caption}</span>
                    <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${photo.caption} photo source on Pexels`}>Photo source</a>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="chai-photo-credit">
              Hero photo: <a href={demo.photos[0].sourceUrl} target="_blank" rel="noopener noreferrer">Pexels</a>
              {' · '}Food and chai photos: <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">Pexels License</a>
            </p>
          </section>
        )}
        <section className="demo-facts" id="details" aria-label="Illustrative sample business details">
          {demo.slug === 'bbq' && <div className="fact bbq-place-fact"><span className="fact-label">A place, in outline</span><span className="fact-value">After dark.<br />Around the fire.</span></div>}
          <div className="fact"><span className="fact-label">Example area</span><span className="fact-value">{demo.exampleArea.replace('Example area: ', '')}</span><span className="fact-note">Illustrative neighborhood only · not a venue address</span></div>
          <div className="fact"><span className="fact-label">Example hours</span><span className="fact-value">{demo.exampleHours.replace('Example hours: ', '')}</span><span className="fact-note">Illustrative hours, not operating information</span></div>
          <div className="fact"><span className="fact-label">This page is</span><span className="fact-value">A design concept</span><span className="fact-note">No orders, bookings or live contact</span></div>
        </section>
        {demo.slug === 'bbq' && demo.photos && (
          <section className="bbq-photo-gallery" aria-labelledby="bbq-photo-title">
            <div className="bbq-photo-heading">
              <div>
                <span className="demo-kicker">Karachi, after dark</span>
                <h2 id="bbq-photo-title">Smoke, skewers &amp; street-side fire.</h2>
              </div>
              <p>Real Karachi grill and street-food reference photos, shown for inspiration only—not as Coal &amp; Copper locations, staff or menu items.</p>
            </div>
            <div className="bbq-photo-grid">
              {demo.photos.slice(1).map((photo) => (
                <figure className="bbq-photo-card" key={photo.src}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption>
                    <span>{photo.caption}</span>
                    <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${photo.caption} photo source on Pexels`}>Photo source</a>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="bbq-photo-credit">
              Hero photo: <a href={demo.photos[0].sourceUrl} target="_blank" rel="noopener noreferrer">Pexels</a>
              {' · '}Food and grill photographs: <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">Pexels License</a>
            </p>
          </section>
        )}
        <section className="menu-area" id="menu" data-reveal aria-labelledby={`menu-title-${demo.slug}`}>
          <div className="section-head">
            <div><span className="demo-kicker">{demo.slug === 'chai-hotel' ? 'For the table, not the clock' : demo.slug === 'cafe' ? 'A little morning ritual' : demo.slug === 'restaurant' ? 'A considered sequence' : demo.slug === 'bbq' ? 'Straight from the fire' : 'Good any time of day'}</span><h2 id={`menu-title-${demo.slug}`}>{demo.slug === 'restaurant' ? 'The supper menu' : demo.slug === 'bbq' ? 'Smoke & supper' : demo.slug === 'diner' ? 'All-day favourites' : 'On the menu'}</h2></div>
            <span className="price-note">Example prices · shown in Rs<br />Illustrative only, not current prices</span>
          </div>
          {demo.menu.map((category) => {
            return (
              <section className="menu-category" data-reveal id={`${demo.slug}-${category.id}`} key={category.id} aria-labelledby={`category-${demo.slug}-${category.id}`}>
                <div className="category-head"><h3 id={`category-${demo.slug}-${category.id}`}>{category.label}</h3><span>{category.note}</span></div>
                <div className="menu-list">
                  {category.items.map((item, index) => {
                    const photo = demo.photos[item.photoIndex];
                    return (
                      <article className="menu-item" data-reveal key={item.id} style={{ animationDelay: `${index * 70}ms` }}>
                        <figure className="menu-item-photo">
                          <img src={photo.src} alt={photo.alt} loading="lazy" />
                          <figcaption><span>{photo.caption}</span><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Photo source for ${item.name} on Pexels`}>Photo source</a></figcaption>
                        </figure>
                        <span className="menu-item-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                        <div className="menu-item-copy"><h4>{item.name}{item.featured && <span className="item-mark"> · featured idea</span>}</h4><p>{item.description}</p></div>
                        <span className="menu-price">{formatPrice(item.pricePkr)}</span>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </section>
      </div>
      <section className="about-band" id="story" aria-labelledby={`story-title-${demo.slug}`}>
        <div className="demo-inner about-grid">
          <div><span className="demo-kicker">The idea behind it</span><h2 id={`story-title-${demo.slug}`}>A distinct feel.<br />Clear details.</h2></div>
          <p>{demo.atmosphere}</p>
        </div>
      </section>
      <Inquiry demo={demo} />
      <Footer demo />
    </main>
  );
}

function NotFound() {
  return (
    <main className="site-shell notfound">
      <Meta title="Page not found — Karachi Food Pages" description="That page is not part of the Karachi Food Pages showcase." />
      <div className="notfound-box">
        <div className="notfound-mark" aria-hidden="true">K</div>
        <span className="eyebrow">Wrong table, perhaps</span>
        <h1>That page isn’t on the menu.</h1>
        <p>The address may have moved, or this concept may not exist. The five sample pages are all available from the gallery.</p>
        <Link href="/" className="open-selected" data-testid="not-found-home-link">Back to the gallery <ArrowRight size={14} aria-hidden="true" /></Link>
        <p className="notfound-privacy"><Link href="/#privacy">Privacy &amp; messages</Link></p>
      </div>
    </main>
  );
}

function Router() {
  const demoRoutes = demos.map((demo) => <Route key={demo.slug} path={`/demo/${demo.slug}`}><FoodDemoPage demo={demo} /></Route>);
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        {demoRoutes}
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
      <WhatsAppAssistant />
    </WouterRouter>
  );
}

export default App;
