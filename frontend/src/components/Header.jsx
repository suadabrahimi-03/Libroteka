import { Link, useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { dilPerdorues } from "../store/slices/perdoruesSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const perdorues = useSelector((state) => state.perdorues);

  const handleDil = () => {
    dispatch(dilPerdorues());
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <FaBookOpen />
        <span>Libroteka</span>
      </Link>

      <nav className="nav">
        {perdorues ? (
          <>
            <Link to="/paneli">Paneli</Link>
            <button className="nav-button" onClick={handleDil}>
              Dil
            </button>
          </>
        ) : (
          <>
            <Link to="/hyr">Hyr</Link>
            <Link to="/regjistrohu" className="nav-button">
              Regjistrohu
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
