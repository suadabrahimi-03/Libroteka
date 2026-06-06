import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useMerrLibratQuery,
  useShtoLiberMutation,
  useNdryshoLiberMutation,
  useFshiLiberMutation,
} from "../store/apis/liberApi";

const Paneli = () => {
  const navigate = useNavigate();
  const perdorues = useSelector((state) => state.perdorues);

  const [shfaqFormen, setShfaqFormen] = useState(false);
  const [titulli, setTitulli] = useState("");
  const [autori, setAutori] = useState("");
  const [kategoria, setKategoria] = useState("");
  const [statusi, setStatusi] = useState("Dua ta lexoj");
  const [kopertina, setKopertina] = useState("");
  const [mesazhGabimi, setMesazhGabimi] = useState("");

  const { data: librat = [], isLoading, isError } = useMerrLibratQuery();
  const [shtoLiber, { isLoading: dukeShtuar }] = useShtoLiberMutation();
  const [ndryshoLiber] = useNdryshoLiberMutation();
  const [fshiLiber] = useFshiLiberMutation();

  useEffect(() => {
    if (!perdorues) {
      navigate("/hyr");
    }
  }, [perdorues, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulli || !autori || !kategoria) {
      setMesazhGabimi("Ju lutem plotesoni titullin, autorin dhe kategorine");
      return;
    }

    try {
      await shtoLiber({
        titulli,
        autori,
        kategoria,
        statusi,
        kopertina,
      }).unwrap();

      setTitulli("");
      setAutori("");
      setKategoria("");
      setStatusi("Dua ta lexoj");
      setKopertina("");
      setMesazhGabimi("");
      setShfaqFormen(false);
    } catch (error) {
      setMesazhGabimi(
        error?.data?.message || "Ndodhi nje gabim gjate shtimit te librit"
      );
    }
  };

  const handleNdryshoStatusin = async (libri, statusiIRi) => {
    try {
      await ndryshoLiber({
        id: libri._id,
        titulli: libri.titulli,
        autori: libri.autori,
        kategoria: libri.kategoria,
        kopertina: libri.kopertina,
        statusi: statusiIRi,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFshiLiber = async (id) => {
    const konfirmo = window.confirm("A je e sigurt qe do ta fshish kete liber?");

    if (!konfirmo) return;

    try {
      await fshiLiber(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const duaTaLexoj = librat.filter(
    (libri) => libri.statusi === "Dua ta lexoj"
  ).length;

  const poELexoj = librat.filter(
    (libri) => libri.statusi === "Po e lexoj"
  ).length;

  const ePerfundova = librat.filter(
    (libri) => libri.statusi === "E perfundova"
  ).length;

  return (
    <main className="dashboard">
      <section className="dashboard-hero">
        <div>
          <p className="small-title">Paneli im</p>
          <h1>Librat e mi</h1>
          <p>Menaxho listen tende personale te librave.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShfaqFormen(!shfaqFormen)}
        >
          {shfaqFormen ? "Mbyll formen" : "+ Shto liber"}
        </button>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>📌</span>
          <h3>{duaTaLexoj}</h3>
          <p>Dua t’i lexoj</p>
        </div>

        <div className="stat-card">
          <span>📖</span>
          <h3>{poELexoj}</h3>
          <p>Po i lexoj</p>
        </div>

        <div className="stat-card">
          <span>✅</span>
          <h3>{ePerfundova}</h3>
          <p>Te perfunduar</p>
        </div>
      </section>

      {shfaqFormen && (
        <section className="book-form-card">
          <h3>Shto nje liber te ri</h3>

          {mesazhGabimi && <p className="error-message">{mesazhGabimi}</p>}

          <form className="book-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Titulli i librit"
              value={titulli}
              onChange={(e) => setTitulli(e.target.value)}
            />

            <input
              type="text"
              placeholder="Autori"
              value={autori}
              onChange={(e) => setAutori(e.target.value)}
            />

            <input
              type="text"
              placeholder="Kategoria"
              value={kategoria}
              onChange={(e) => setKategoria(e.target.value)}
            />

            <input
              type="text"
              placeholder="Link kopertine (opsionale)"
              value={kopertina}
              onChange={(e) => setKopertina(e.target.value)}
            />

            <select
              value={statusi}
              onChange={(e) => setStatusi(e.target.value)}
            >
              <option value="Dua ta lexoj">Dua ta lexoj</option>
              <option value="Po e lexoj">Po e lexoj</option>
              <option value="E perfundova">E perfundova</option>
            </select>

            <button type="submit" className="primary-btn" disabled={dukeShtuar}>
              {dukeShtuar ? "Duke shtuar..." : "Ruaj librin"}
            </button>
          </form>
        </section>
      )}

      {isLoading && (
        <section className="empty-state">
          <h3>Duke ngarkuar librat...</h3>
        </section>
      )}

      {isError && (
        <section className="empty-state">
          <h3>Ndodhi nje gabim gjate marrjes se librave</h3>
        </section>
      )}

      {!isLoading && librat.length === 0 && (
        <section className="empty-state">
          <h3>Nuk ke shtuar ende libra</h3>
          <p>Kliko “Shto liber” per te krijuar librin tend te pare.</p>
        </section>
      )}

      {librat.length > 0 && (
        <section className="books-grid">
          {librat.map((libri) => (
            <article className="book-card" key={libri._id}>
              {libri.kopertina ? (
                <img src={libri.kopertina} alt={libri.titulli} />
              ) : (
                <div className="book-placeholder">📚</div>
              )}

              <div className="book-info">
                <h3>{libri.titulli}</h3>
                <p>{libri.autori}</p>
                <span>{libri.kategoria}</span>

                <select
                  value={libri.statusi}
                  onChange={(e) => handleNdryshoStatusin(libri, e.target.value)}
                >
                  <option value="Dua ta lexoj">Dua ta lexoj</option>
                  <option value="Po e lexoj">Po e lexoj</option>
                  <option value="E perfundova">E perfundova</option>
                </select>

                <button
                  className="delete-btn"
                  onClick={() => handleFshiLiber(libri._id)}
                >
                  Fshi
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Paneli;