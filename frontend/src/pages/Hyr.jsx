import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useHyrMutation } from "../store/apis/perdoruesApi";
import { vendosPerdorues } from "../store/slices/perdoruesSlice";

const Hyr = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mesazhGabimi, setMesazhGabimi] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hyr, { isLoading }] = useHyrMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const perdoruesi = await hyr({
        email,
        password,
      }).unwrap();

      dispatch(vendosPerdorues(perdoruesi));
      navigate("/paneli");
    } catch (error) {
      setMesazhGabimi(
        error?.data?.message || "Email ose password i pasakte"
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2>Hyr ne Libroteka</h2>
        <p>Vendos te dhenat per te vazhduar te librat e tu.</p>

        {mesazhGabimi && <p className="error-message">{mesazhGabimi}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="shkruaj email-in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="shkruaj password-in"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="primary-btn full" disabled={isLoading}>
            {isLoading ? "Duke hyre..." : "Hyr"}
          </button>
        </form>

        <p className="auth-footer">
          Nuk ke llogari? <Link to="/regjistrohu">Regjistrohu</Link>
        </p>
      </div>
    </main>
  );
};

export default Hyr;
