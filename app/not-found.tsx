import Link from "next/link";
import css from "./Not-Found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "Page you are looking for doesn`t exist.",
  openGraph: {
    title: "Page not found",
    description: "Page you are looking for doesn`t exist.",
    url: "https://07-routing-nextjs-rust.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub application",
      },
    ],
  },
};

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404</h1>
      <p className={css.description}>Page is not found</p>
      <Link href="/" className={css.link}>
        Return to main page
      </Link>
    </div>
  );
}
