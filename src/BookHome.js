<div className="bookslot-first-section">
  {isAuthenticated && (
    <h3 className="username">
      Hi <span className="username-span">{user.name}.</span>
      <br />
      <span className="book-span">Book your slot</span>
    </h3>
  )}
</div>;
