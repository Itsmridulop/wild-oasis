import Header from "@/app/_components/Header";
import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Wild Oasis",
    template: "Wild Oasis - %s",
  },
  description: "A place to relax and unwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-100 min-h-screen antialiased ${josefin.className} flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
