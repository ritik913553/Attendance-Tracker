import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container text-white p-10">
      <h1>Welcome to Our Platform</h1>
      <p>Join us to explore amazing features!</p>

      <div className="flex gap-6 mt-10 ">
        {" "}
        <button
          onClick={() => navigate("/login")}
          className="btn py-1 border-1 px-3 cursor-pointer"
        >
          Login
        </button>
        <button onClick={() => navigate("/signup")} className="btn border-1 px-3 py-1 cursor-pointer">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
