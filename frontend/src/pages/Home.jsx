import { Link } from "react-router-dom";
import { FaBook, FaHeart, FaChartLine } from "react-icons/fa";

const Home = () => {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-text">
          <p className="small-title">Aplikacion personal për libra</p>
          <h1>Mirë se erdhe në Libroteka</h1>
          <p className="hero-description">
            Organizo librat qe deshiron te lexosh, librat qe po lexon dhe ata
            qe ke perfunduar. Nje menyre e thjeshte dhe elegante per te ndjekur
            udhetimin tend ne lexim.
          </p>

          <div className="hero-actions">
            <Link to="/regjistrohu" className="primary-btn">
              Fillo tani
            </Link>
            <Link to="/hyr" className="secondary-btn">
              Kam llogari
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="book-card-preview">
            <span className="book-icon">📚</span>
            <h3>Kronikë në gur</h3>
            <p>Ismail Kadare</p>
            <span className="status-badge">Po e lexoj</span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <FaBook />
          <h3>Menaxho libra</h3>
          <p>Shto, ndrysho dhe fshi librat e tu personal.</p>
        </div>

        <div className="feature-card">
          <FaHeart />
          <h3>Status leximi</h3>
          <p>Ndaji librat sipas statusit: dua ta lexoj, po e lexoj, e perfundova.</p>
        </div>

        <div className="feature-card">
          <FaChartLine />
          <h3>Panel i thjesht</h3>
          <p>Shiko librat e tu ne nje nderfaqe te paster dhe te kuptueshme.</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
