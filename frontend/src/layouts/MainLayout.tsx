import Header from "../components/Header";
import Footer from "../components/Footer";

import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="content flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
