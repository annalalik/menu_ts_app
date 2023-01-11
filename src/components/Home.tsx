import styled from "styled-components";
import { Link } from "react-router-dom";
import mainBgImage from "../assets/tea-gold-sweet.jpg";

const HomeWrapper = styled.div`
  background-image: url(${mainBgImage});
  width: 100vw;
  height: 100vh;
`;

// check if position absolute is necessary
const TitleWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 30px;
  left: 30px;
`;

const Title = styled.h1`
  color: white;
  font-size: 56px;
  display: block;
`;

const Subtitle = styled.span`
  color: white;
  font-size: 46px;
  line-height: 70px;
  display: block;
  text-align: left;
`;

const StyledLink = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  background-color: #ffd700;
  color: black;
  width: 70%;
  padding: 5px;
  margin: 0;
  text-align: center;
  border-radius: 2px;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

interface MainProps {
  name: string;
  subname: string;
}

export function Home(props: MainProps) {
  return (
    <HomeWrapper>
      <TitleWrapper>
        <Title>
          {props.name}
          <Subtitle>- {props.subname}</Subtitle>
        </Title>
        <StyledLink to={`menu`}>
          Wejdź i zobacz co dla Ciebie przygotowaliśmy
        </StyledLink>
      </TitleWrapper>
    </HomeWrapper>
  );
}
