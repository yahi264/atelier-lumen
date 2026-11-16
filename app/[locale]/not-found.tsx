import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="eyebrow text-champagne">404</p>
      <h1 className="mt-6 font-display text-5xl font-light sm:text-7xl">This page drifted out of frame.</h1>
      <Link href="/" className="btn mt-10 border border-fg/25 hover:border-fg">Home</Link>
    </section>
  );
}
