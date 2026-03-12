import LogoWhiteText from "@/public/icons/LogoWhiteText";
import { Link } from "react-scroll";
const NavbarMobile = () => {
  return (
    <div className="flex items-center justify-between">
      <LogoWhiteText />
      <div className="dropdown dropdown-end z-[1000]">
        <div
          tabIndex={0}
          role="button"
          className="btn bg-transparent border-none"
        >
          <svg
            width="31"
            height="19"
            viewBox="0 0 31 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="31" height="3" rx="1.5" fill="white" />
            <rect x="9" y="8" width="22" height="3" rx="1.5" fill="white" />
            <rect x="18" y="16" width="13" height="3" rx="1.5" fill="white" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content space-y-4  menu p-4 font-broad shadow bg-base-100 rounded-box w-52"
        >
          <Link
            className="hover:font-bold hover:cursor-pointer"
            to="Invest"
            spy={true}
            smooth={true}
            offset={-10}
            duration={500}
          >
            INVeST
          </Link>
          {/* <a href="#tokenomics" className="hover:font-bold">TOKENoMICS</a> */}
          <Link
            className="hover:font-bold hover:cursor-pointer"
            to="Tokenomics"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            TOKENoMICS
          </Link>

          {/* <a href="#about" className="hover:font-bold">ABoUT</a> */}
          <Link
            className="hover:font-bold hover:cursor-pointer"
            to="About"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            ABoUT
          </Link>

          {/* <a href="#roadmap" className="hover:font-bold">RoADMAP</a> */}
          <Link
            className="hover:font-bold hover:cursor-pointer"
            to="Roadmap"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            RoADMAP
          </Link>

          {/* <a href="#contact" className="font-bold">
            CoNTACT US
          </a> */}
        </ul>
      </div>
    </div>
  );
};
export default NavbarMobile;
