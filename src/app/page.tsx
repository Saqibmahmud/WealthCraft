import Image from "next/image";
import NavbarComponent from "../../Components/Navbar/page";

import FooterComponent from "../../Components/Footer/page";
import Homepage from "../../Components/HomePage/page";



export default function Home() {
  const loading = false; // or set this based on your logic
  

  return (
    <>
      <NavbarComponent />
     
      {/* {loading ? <SpinnerComponent /> : null} */}
      <Homepage/>
      <FooterComponent/>
    </>
  );
}
