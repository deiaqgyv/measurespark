import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <strong>MeasureSpark</strong>
          <p>Practical measurements for everyday projects.</p>
        </div>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/about">About</Link>
        </div>
        <p className="disclaimer">Estimates are for planning. Confirm structural, safety, and code requirements with a qualified professional.</p>
      </div>
    </footer>
  );
}
