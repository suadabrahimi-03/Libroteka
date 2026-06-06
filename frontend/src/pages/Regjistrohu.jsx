import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useRegjistrohuMutation } from "../store/apis/perdoruesApi";
import { vendosPerdorues } from "../store/slices/perdoruesSlice";

const Regjistrohu = () => {
  const [emri, setEmri] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mesazhGabimi, setMesazhGabimi] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [regjistrohu, { isLoading }] = useRegjistrohuMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const perdoruesi = await regjistrohu({
        emri,
        email,
        password,
      }).unwrap();

      dispatch(vendosPerdorues(perdoruesi));
      navigate("/paneli");
    } catch (error) {
      setMesazhGabimi(
        error?.data?.message || "Ndodhi nje gabim gjate regjistrimit"
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2>Krijo llogari</h2>
        <p>Regjistrohu per te krijuar biblioteken tende personale.</p>

        {mesazhGabimi && <p className="error-message">{mesazhGabimi}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Emri</label>
          <input
            type="text"
            placeholder="emri yt"
            value={emri}
            onChange={(e) => setEmri(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="email-i yt"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="primary-btn full" disabled={isLoading}>
            {isLoading ? "Duke u regjistruar..." : "Regjistrohu"}
          </button>
        </form>

        <p className="auth-footer">
          Ke llogari? <Link to="/hyr">Hyr ketu</Link>
        </p>
      </div>
    </main>
  );
};

export default Regjistrohu;
