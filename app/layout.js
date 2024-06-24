import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import dynamic from "next/dynamic";

import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio Aurélie AMBAL - Front-End Developer",
  description:
    "This is the portfolio of Aurélie AMBAL. I am a lead front-end developer with 10+ years experience.",
};

const ParticlesBG = dynamic(() => import("./components/ParticlesBackground"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          toastStyle={{
            backgroundColor: "rgb(16, 23, 45)",
            color: "white",
          }}
        />
        <ParticlesBG className="particle"></ParticlesBG>
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
