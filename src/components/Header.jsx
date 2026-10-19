export default function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <a className="logo" href="#top" aria-label="Junto home">
          <img src="/images/logo.svg" alt="Junto" width="149" height="46" />
        </a>
        <a className="btn btn-sm" href="#early-access">
          <span>Get early access</span>
        </a>
      </div>
    </header>
  );
}
