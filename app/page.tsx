import Image from "next/image";
import HeroVideo from "@/app/components/HeroVideo";
import ProjectCard from "@/app/components/ProjectCard";
import { projects } from "@/src/data/projects";

const skills = ["Captação profissional", "Direção", "Iluminação", "Captação de áudio", "Edição de áudio", "Adobe Premiere Pro", "CapCut", "Vídeos horizontais", "Reels", "Conteúdo comercial", "Storytelling", "Operação de gimbal", "Piloto de drone", "Fotografia"];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Denner Lopes, início">DENNER LOPES</a>
        <nav className="desktop-nav" aria-label="Navegação principal"><a href="#trabalhos">Trabalhos</a><a href="#sobre">Sobre</a><a href="#competencias">Competências</a><a href="#contato">Contato</a><a className="nav-resume" href="/documents/curriculo.pdf" download>Baixar currículo <span aria-hidden="true">↗</span></a></nav>
        <details className="mobile-menu"><summary aria-label="Abrir menu">Menu <span aria-hidden="true">+</span></summary><nav aria-label="Navegação mobile"><a href="#trabalhos">Trabalhos</a><a href="#sobre">Sobre</a><a href="#competencias">Competências</a><a href="#contato">Contato</a><a href="/documents/curriculo.pdf" download>Baixar currículo</a></nav></details>
      </header>

      <section className="hero section-shell" id="inicio" aria-labelledby="hero-title"><HeroVideo /><div className="hero-overlay" aria-hidden="true" /><div className="hero-copy"><p className="eyebrow reveal">Audiovisual</p><h1 id="hero-title" className="hero-title reveal reveal-delay-1">DENNER<br /><em>LOPES</em></h1><p className="hero-role reveal reveal-delay-2">Videomaker <span>•</span> Content Producer</p><p className="hero-intro reveal reveal-delay-2">Produção audiovisual para marcas, empresas, eventos e conteúdo digital.</p><div className="hero-actions reveal reveal-delay-3"><a className="button button-light" href="#trabalhos">Ver trabalhos <span aria-hidden="true">↓</span></a><a className="button button-line" href="#contato">Entrar em contato <span aria-hidden="true">↗</span></a></div></div><div className="scroll-note" aria-hidden="true"><span /> Role para explorar</div></section>

      <section className="work-section section-shell" id="trabalhos" aria-labelledby="work-title"><div className="section-heading"><div className="work-title-wrap"><p className="eyebrow">01 / Seleção</p><h2 id="work-title"><span className="work-title-line">TRABALHOS</span><span className="work-title-line"><em>SELECIONADOS</em></span></h2></div></div><div className="project-list">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></section>

      <section className="about-section section-shell" id="sobre" aria-labelledby="about-title"><div className="about-portrait"><Image className="about-photo" src="/images/foto2nova.png" alt="Denner Lopes" fill sizes="(max-width: 760px) 88vw, 40vw" /></div><div className="about-copy"><p className="eyebrow">02 / O profissional</p><h2 id="about-title">SOBRE<br /><em>MIM</em></h2><p className="about-text">Sou videomaker e produtor de conteúdo audiovisual, com experiência em produções para empresas, marcas, eventos e redes sociais.</p><p className="about-text">Atuo em todo o processo de produção, desde o planejamento e construção da ideia até a captação, direção, iluminação, áudio e pós-produção. Ao longo da minha trajetória, já trabalhei com diferentes segmentos e formatos, incluindo conteúdos comerciais, vídeos institucionais, produções para redes sociais e cobertura de eventos.</p><p className="about-text">Gosto de criar imagens que tenham propósito. Mais do que produzir um vídeo visualmente bonito, busco entender o que precisa ser comunicado e transformar essa ideia em um conteúdo que prenda atenção, transmita profissionalismo e gere valor para quem está do outro lado da câmera.</p><p className="about-text">Hoje sigo aprimorando meu trabalho e explorando novas formas de produção audiovisual, sempre buscando evoluir técnica e criativamente.</p></div></section>

      <section className="skills-section section-shell" id="competencias" aria-labelledby="skills-title"><div className="section-heading compact-heading"><p className="eyebrow">03 / Ferramentas de trabalho</p><h2 id="skills-title">COMPETÊNCIAS</h2></div><div className="skills-layout"><ul className="skills-list">{skills.map((skill, index) => <li key={skill}><span>{String(index + 1).padStart(2, "0")}</span>{skill}</li>)}</ul></div></section>

      <section className="contact-section section-shell" id="contato" aria-labelledby="contact-title"><p className="eyebrow">04 / Vamos conversar</p><h2 id="contact-title">VAMOS<br /><em>CRIAR ALGO?</em></h2><p className="contact-intro">Disponível para oportunidades profissionais, projetos e produções audiovisuais.</p><div className="contact-meta"><span>Boituva / SP</span><span>Sorocaba, região e viagens</span></div></section>

      <footer className="site-footer"><span className="wordmark">DENNER LOPES</span><span>Videomaker • Filmmaker • Content Producer</span><span>© 2026</span></footer>
    </main>
  );
}
