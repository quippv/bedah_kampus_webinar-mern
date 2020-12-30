import styled from "styled-components";
import { Layout } from "../hoc";
import { Illustrator } from "../assets";
import { text, primary } from "../utils";

const Image = styled.img`
  display: block;
  margin: 100px auto;
  width: 50%;

  @media (max-width: 700px) {
    width: 90%;
    margin: 50px auto;
  }
`;

const Tagline = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 4rem;
  line-height: 56px;
  letter-spacing: 0.02em;
  color: ${text.text};
  display: block;
  margin: 40px auto;
  width: 40%;

  span {
    color: ${primary[100]};
  }

  @media (max-width: 700px) {
    width: 90%;
    font-size: 2.8rem;
  }
`;

const TestimonialWrapper = styled.div`
  width: 100%;
  height: 1003px;
  background-image: url(${Illustrator.BackgroundTestimonial});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Landing = () => {
  return (
    <Layout>
      <Image src={Illustrator.CampusLogo} alt="Campus Logo" />
      <Tagline>
        See everything <br />
        about your dream <br />
        at <span>one place</span>
      </Tagline>
      <Image
        src={Illustrator.BedahKampusPage}
        style={{ width: "80%" }}
        alt="Bedah Kampus Page"
      />
      <TestimonialWrapper></TestimonialWrapper>
    </Layout>
  );
};

export default Landing;
