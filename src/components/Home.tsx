import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import mainBgImage from "../assets/tea-gold-sweet.jpg";

const HomeWrapper = styled.div`
  background-image: url(${mainBgImage});
  width: 100vw;
  height: 100vh;
`;

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

const Button = styled.button`
  font-size: 20px;
  text-shadow: 2px;
  background-color: #ffd700;
  width: 70%;
  margin: auto;
`;

interface MainProps {
  // Declare any props that the component should expect here
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
        <Link to={`menu`}>
          <Button>Wejdź i zobacz co dla Ciebie przygotowaliśmy</Button>
        </Link>
      </TitleWrapper>
    </HomeWrapper>
  );
}
