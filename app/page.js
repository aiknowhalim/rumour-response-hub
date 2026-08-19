import siteData from '../content/site.json';

// The entire page is driven by content/site.json — no code edits needed to add
// sections, paragraphs, or lists. Missing fields degrade gracefully. See the
// schema in README.md ("Editing your content").

function Paragraphs({ text }) {
  if (!text) return null;
  // Blank lines separate paragraphs.
  const parts = String(text).split(/\n\s*\n/).filter((p) => p.trim() !== '');
  return parts.map((p, i) => (
    <p key={i} style={{ margin: '0 0 1rem', lineHeight: 1.7, fontSize: '1.05rem' }}>
      {p.trim()}
    </p>
  ));
}

function Section({ section }) {
  const items = Array.isArray(section.items) ? section.items : [];
  return (
    <section
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '2rem clamp(1.25rem, 4vw, 2.5rem)',
        boxShadow: '0 10px 40px -20px rgba(10, 47, 255, 0.35)',
        border: '1px solid #eef1ff',
      }}
    >
      {section.heading && (
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', margin: '0 0 1rem', color: '#0A2FFF' }}>
          {section.heading}
        </h2>
      )}
      <div style={{ color: '#2a2f45' }}>
        <Paragraphs text={section.body} />
      </div>
      {items.length > 0 && (
        <ul style={{ margin: '0.5rem 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: '0.6rem' }}>
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '0.6rem',
                alignItems: 'flex-start',
                color: '#2a2f45',
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: '#00B8A0', fontWeight: 700, flex: '0 0 auto' }}>—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Home() {
  const sections = Array.isArray(siteData.sections) ? siteData.sections : [];

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8ff', color: '#2a2f45' }}>
      <header
        style={{
          background: 'linear-gradient(160deg, #0A2FFF 0%, #00F0D4 100%)',
          color: '#fff',
          padding: 'clamp(3rem, 10vw, 6rem) 1.5rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', margin: 0, lineHeight: 1.1 }}>
          {siteData.title}
        </h1>
        {siteData.tagline && (
          <p style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)', opacity: 0.95, maxWidth: 640, margin: '1.25rem auto 0', lineHeight: 1.5 }}>
            {siteData.tagline}
          </p>
        )}
      </header>

      <main
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: 'clamp(2rem, 6vw, 4rem) 1.5rem',
          display: 'grid',
          gap: 'clamp(1.25rem, 4vw, 2rem)',
        }}
      >
        {sections.map((section, i) => (
          <Section key={i} section={section} />
        ))}
      </main>

      {siteData.footer && (
        <footer
          style={{
            textAlign: 'center',
            padding: '2rem 1.5rem',
            color: '#6b7280',
            fontSize: '0.9rem',
            borderTop: '1px solid #e6eaf5',
          }}
        >
          {siteData.footer}
        </footer>
      )}
    </div>
  );
}