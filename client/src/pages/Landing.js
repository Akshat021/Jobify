import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span>
          </h1>
          <p>
            Welcome to Jobify. Here you can keep track of jobs you have applied
            to.
          </p>
          <Link to={"/register"} className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job junt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
