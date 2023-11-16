function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  function signUp() {
    setIsLoggedIn((prevState) => !prevState);
  }

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div>
        <img className="login-image" src="./images/login-image.png" />
      </div>
      <div className="login-section">
        {isLoggedIn ? (
          <div className="login">
            <div>
              <h1 className="login-title">Sign in</h1>
            </div>

            <div className="credential">
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
            </div>
            <div className="login-button-div">
              <button
                onClick={() => navigate("/bookslot")}
                className="login-button"
              >
                Login
              </button>
            </div>
            <div className="sign-up">
              <p>You don't have an account?</p>
              <h3 onClick={signUp}>Sign up</h3>
            </div>
          </div>
        ) : (
          <div className="login">
            <div>
              <h1 className="login-title">Sign up</h1>
            </div>

            <div className="credential">
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
            </div>
            <div className="login-button-div">
              <button className="login-button">Sign up</button>
            </div>
            <div className="sign-up">
              <p>Already have an account?</p>
              <h3 onClick={signUp}>Sign in</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
