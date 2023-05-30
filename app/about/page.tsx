import "server-only";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "A Page that contains information about us. Whoever us is.",
  creator: "Mirco Steyer",
};
const AboutPage = () => {
  return <div>About Us</div>;
};

export default AboutPage;
