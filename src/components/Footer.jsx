export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <a className="logo" href="#top" aria-label="Junto home">
          <img src="/images/logo.svg" alt="Junto" width="149" height="46" />
        </a>
        {/* TODO: point these at the real policy pages once they exist. */}
        <nav className="footer-links" aria-label="Legal">
          <a href="#">Privacy policy</a>
          <a href="#">Terms of service</a>
        </nav>
      </div>
    </footer>
  );
}
