import Link from "next/link";

export default function NotFound() {
  return <main className="shell empty-page"><p>That measuring tool is not here.</p><h1>Choose another tool</h1><Link className="primary-button" href="/">View all calculators</Link></main>;
}
