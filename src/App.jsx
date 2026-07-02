import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  ArrowUpRight,
  Award,
  BookOpenText,
  CalendarDays,
  Dna,
  FlaskConical,
  GraduationCap,
  Mail,
  MapPin,
  Microscope,
  ScanLine,
  Users,
} from "lucide-react";
import {
  awards,
  education,
  metrics,
  profile,
  projects,
  publications,
  researchInterests,
  statusItems,
  team,
} from "./data.js";

const cellDots = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  x: (index * 17 + 9) % 100,
  y: (index * 29 + 11) % 100,
  size: 10 + ((index * 7) % 30),
  delay: (index % 8) * -0.7,
  color: ["#38bdf8", "#2dd4bf", "#a3e635", "#f59e0b", "#818cf8"][index % 5],
}));

function AnimatedCells() {
  return (
    <div className="cell-field" aria-hidden="true">
      {cellDots.map((cell) => (
        <span
          key={cell.id}
          style={{
            "--x": `${cell.x}%`,
            "--y": `${cell.y}%`,
            "--s": `${cell.size}px`,
            "--d": `${cell.delay}s`,
            "--c": cell.color,
          }}
        />
      ))}
      <i />
      <i />
      <i />
    </div>
  );
}

function QRPanel() {
  const [qrSrc, setQrSrc] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    const url = window.location.href;
    setPageUrl(url);
    QRCode.toDataURL(url, {
      width: 168,
      margin: 1,
      color: { dark: "#12324a", light: "#ffffff" },
    }).then(setQrSrc);
  }, []);

  return (
    <div className="qr-panel">
      <div className="qr-title">
        <ScanLine size={17} />
        <span>主页二维码</span>
      </div>
      <div className="qr-content">
        <div className="qr-frame">
          {qrSrc ? <img src={qrSrc} alt="个人主页二维码" /> : <span />}
        </div>
        <p>{pageUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</p>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, intro }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

function HeroProfileCard() {
  return (
    <aside className="profile-card">
      <img className="portrait" src={profile.portrait} alt="刘雪飞头像" />
      <div className="profile-name">
        <h2>{profile.chineseName}</h2>
        <span>{profile.name}</span>
      </div>
      <p className="profile-title">{profile.title}</p>
      <div className="profile-meta">
        <a href={`mailto:${profile.emails[0]}`}>
          <Mail size={17} />
          {profile.emails[0]}
        </a>
        <a href={`mailto:${profile.emails[1]}`}>
          <Mail size={17} />
          {profile.emails[1]}
        </a>
        <span>
          <MapPin size={17} />
          {profile.location}
        </span>
      </div>
      <QRPanel />
    </aside>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <HeroProfileCard />
      <div className="hero-main">
        <div className="hero-badge">
          <Dna size={18} />
          <span>单细胞空间组学 / 计算生物学</span>
        </div>
        <h1>
          刘雪飞
          <span>Xuefei Liu</span>
        </h1>
        <p className="hero-lede">{profile.focus}</p>
        <p className="hero-summary">
          目前关注单细胞转录组、空间组学与肿瘤微环境互作，尝试从细胞状态、
          空间位置和分子通讯三个层面理解肿瘤转移过程。
        </p>
        <div className="hero-actions">
          <a className="primary-action" href={`mailto:${profile.emails[0]}`}>
            <Mail size={18} />
            联系我
          </a>
          <a href="#publications">
            <BookOpenText size={18} />
            查看论文
          </a>
        </div>
        <div className="metric-grid">
          {metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <section className="overview">
      <article className="overview-panel research-panel">
        <SectionHeading eyebrow="Research" title="研究方向" />
        <p>
          聚焦肿瘤转移、单细胞与空间组学、肿瘤-内皮-免疫互作，以及循环肿瘤细胞相关机制。
        </p>
        <div className="chip-list">
          {researchInterests.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
      </article>

      <article className="overview-panel">
        <SectionHeading eyebrow="Education" title="教育经历" />
        <div className="timeline">
          {education.map((item) => (
            <div className="timeline-row" key={item.school}>
              <span />
              <div>
                <h3>{item.school}</h3>
                <p>{item.detail}</p>
                <small>{item.years}</small>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="overview-panel status-panel">
        <SectionHeading eyebrow="Status" title="当前状态" />
        <div className="status-list">
          {statusItems.map((item) => {
            const Icon = item.icon;
            return (
              <div className="status-item" key={item.label}>
                <Icon size={18} />
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
}

function Publications() {
  return (
    <section className="page-section" id="publications">
      <SectionHeading
        eyebrow="Publications"
        title="代表性论文"
        intro="保留英文题名和期刊名，方便学术检索；作者贡献和状态用中文说明。"
      />
      <div className="publication-grid">
        {publications.map((paper) => {
          const content = (
            <>
              <div className="paper-tags">
                <span>{paper.journal}</span>
                <span>{paper.year}</span>
                <span>{paper.role}</span>
              </div>
              <h3>{paper.title}</h3>
              <p>{paper.authors}</p>
            </>
          );

          if (paper.href) {
            return (
              <a className="paper-card" href={paper.href} target="_blank" rel="noreferrer" key={paper.title}>
                {content}
                <ArrowUpRight size={18} />
              </a>
            );
          }

          return (
            <article className="paper-card" key={paper.title}>
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProjectsAwards() {
  return (
    <section className="page-section" id="projects">
      <SectionHeading eyebrow="Projects & Awards" title="项目与荣誉" />
      <div className="split-section">
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-topline">
                <span>{project.years}</span>
                <strong>{project.tag}</strong>
              </div>
              <h3>{project.title}</h3>
              <p>{project.body}</p>
            </article>
          ))}
        </div>

        <div className="award-panel">
          <div className="award-title">
            <Award size={20} />
            <h3>荣誉奖励</h3>
          </div>
          <div className="award-list">
            {awards.map((award) => (
              <div className="award-item" key={award}>
                <span />
                <p>{award}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="page-section" id="team">
      <SectionHeading
        eyebrow="DX Team"
        title="地下小分队"
        intro="围绕基础实验、生信分析和课题设计协作推进，持续输出更扎实的研究结果。"
      />
      <div className="team-grid">
        {team.map((member) => (
          <article className="team-card" key={member.name}>
            <img src={member.image} alt={`${member.cn}头像`} />
            <div>
              <h3>{member.cn}</h3>
              <span>{member.name}</span>
              <p>{member.org}</p>
              <strong>{member.role}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="site-shell">
      <AnimatedCells />
      <header className="topbar">
        <a className="brand" href="#home">
          <span>XL</span>
          <strong>刘雪飞</strong>
        </a>
        <nav aria-label="主导航">
          <a href="#home">
            <GraduationCap size={17} />
            主页
          </a>
          <a href="#publications">
            <BookOpenText size={17} />
            论文
          </a>
          <a href="#projects">
            <FlaskConical size={17} />
            项目
          </a>
          <a href="#team">
            <Users size={17} />
            团队
          </a>
        </nav>
      </header>

      <main>
        <Hero />
        <Overview />
        <Publications />
        <ProjectsAwards />
        <Team />
      </main>

      <footer className="footer">
        <span>© 2026 Xuefei Liu</span>
        <span>
          <CalendarDays size={16} />
          Built as a fast static academic homepage
        </span>
        <span>
          <Microscope size={16} />
          Single-cell and spatial omics
        </span>
      </footer>
    </div>
  );
}
