'use client';

import content from '../content/site.json';

export default function Page() {
  return (
    <main className="app-shell">
      <style>{`
        *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:#f5f6fa;color:#172033;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.app-shell{min-height:100vh}.topbar{position:sticky;top:0;z-index:20;height:72px;background:rgba(255,255,255,.92);backdrop-filter:blur(16px);border-bottom:1px solid #e7e9f1;display:flex;align-items:center;justify-content:space-between;padding:0 5vw}.brand{display:flex;align-items:center;gap:12px;font-weight:850;letter-spacing:-.02em}.logo{width:38px;height:38px;border-radius:12px;background:#191c2b;color:white;display:grid;place-items:center;font-size:17px}.status{display:flex;gap:8px;align-items:center;color:#667085;font-size:13px}.dot{width:8px;height:8px;background:#2a9d72;border-radius:50%}.hero{padding:72px 5vw 38px;max-width:1400px;margin:auto}.kicker{text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:800;color:#6d5ef6}.hero h1{font-size:clamp(42px,6vw,78px);line-height:.98;letter-spacing:-.055em;margin:16px 0 22px;max-width:850px}.hero p{font-size:19px;line-height:1.7;color:#667085;max-width:760px;margin:0}.quick-grid{max-width:1400px;margin:0 auto;padding:0 5vw 58px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.quick{background:white;border:1px solid #e6e8ef;border-radius:18px;padding:20px;text-decoration:none;color:#172033;box-shadow:0 8px 30px rgba(25,28,43,.04);transition:.2s}.quick:hover{transform:translateY(-3px);box-shadow:0 14px 34px rgba(25,28,43,.08)}.quick small{display:block;color:#8b92a5;margin-bottom:7px}.quick strong{font-size:16px}.section{max-width:1400px;margin:auto;padding:20px 5vw 74px}.section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:30px;margin-bottom:22px}.section-head h2{font-size:clamp(30px,4vw,48px);letter-spacing:-.04em;margin:7px 0 0}.summary{max-width:610px;color:#667085;line-height:1.65}.module-grid{display:grid;grid-template-columns:1.55fr .85fr;gap:18px}.theory-stack{display:grid;gap:14px}.card{background:white;border:1px solid #e5e7ee;border-radius:22px;padding:25px;box-shadow:0 8px 30px rgba(25,28,43,.035)}.card h3{font-size:18px;margin:0 0 11px;letter-spacing:-.015em}.card p{color:#667085;line-height:1.62;margin:0}.use{margin-top:15px!important;padding-top:15px;border-top:1px solid #eef0f4;color:#343b4d!important}.use b{color:#172033}.checklist{border-radius:22px;padding:26px;color:white;position:sticky;top:92px;align-self:start}.checklist h3{margin:0 0 18px;font-size:20px}.checklist ol{margin:0;padding-left:22px}.checklist li{padding:9px 0;line-height:1.5;color:rgba(255,255,255,.9)}.principles{background:#191c2b;color:white;padding:72px 5vw}.principles-inner{max-width:1400px;margin:auto}.principles h2{font-size:40px;letter-spacing:-.04em;margin:0 0 28px}.principle-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.principle{border:1px solid #35394b;border-radius:18px;padding:22px}.principle h3{margin:0 0 10px}.principle p{color:#b9becc;line-height:1.6;margin:0;font-size:14px}.footer{padding:30px 5vw;text-align:center;color:#858b9c;font-size:13px;background:#191c2b;border-top:1px solid #303447}@media(max-width:850px){.quick-grid,.principle-grid{grid-template-columns:1fr}.module-grid{grid-template-columns:1fr}.section-head{display:block}.checklist{position:static}.hero{padding-top:48px}.topbar{padding:0 20px}.hero,.quick-grid,.section{padding-left:20px;padding-right:20px}.status span:last-child{display:none}}
      `}</style>

      <header className="topbar">
        <div className="brand"><span className="logo">RR</span> Rumour Response Hub</div>
        <div className="status"><span className="dot"/><span>Learning mode</span></div>
      </header>

      <section className="hero">
        <div className="kicker">Incident communication & human behaviour</div>
        <h1>{content.title}</h1>
        <p>{content.tagline}</p>
      </section>

      <nav className="quick-grid" aria-label="Quick actions">
        {content.quickActions.map((item, i) => (
          <a className="quick" href={`#${item.target}`} key={item.target}>
            <small>0{i + 1} · Open module</small><strong>{item.label} →</strong>
          </a>
        ))}
      </nav>

      {content.modules.map(module => (
        <section className="section" id={module.id} key={module.id}>
          <div className="section-head">
            <div><div className="kicker" style={{color:module.accent}}>{module.eyebrow}</div><h2>{module.heading}</h2></div>
            <p className="summary">{module.summary}</p>
          </div>
          <div className="module-grid">
            <div className="theory-stack">
              {module.theories.map(theory => (
                <article className="card" key={theory.name}>
                  <h3>{theory.name}</h3>
                  <p>{theory.idea}</p>
                  <p className="use"><b>Operational takeaway:</b> {theory.use}</p>
                </article>
              ))}
            </div>
            <aside className="checklist" style={{background:module.accent}}>
              <h3>Response checklist</h3>
              <ol>{module.checklist.map(item => <li key={item}>{item}</li>)}</ol>
            </aside>
          </div>
        </section>
      ))}

      <section className="principles">
        <div className="principles-inner">
          <div className="kicker">Across every module</div><h2>Four operating principles</h2>
          <div className="principle-grid">
            {content.principles.map(item => <article className="principle" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>
      <footer className="footer">{content.footer}</footer>
    </main>
  );
}