import styled from "styled-components";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
const Footer = () => {
  //simple footer that has social  media
  return (
    <Bar>
      <Web href="https://www.facebook.com/Kijiji.ca/">
        <FaFacebook />
      </Web>
      <Web href="https://twitter.com/kijiji?lang=en">
        <FaTwitter />
      </Web>
      <Web href="https://www.instagram.com/kijijicanada/?hl=en">
        <FaInstagram />
      </Web>
    </Bar>
  );
};

const Bar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(139, 129, 149);
  height: 7.2vh;
  font-size: 40px;
  color: white;
`;
const Web = styled.a`
  color: white;
`;
export default Footer;
