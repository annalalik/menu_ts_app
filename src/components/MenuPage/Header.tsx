import styled from "styled-components";
import basketImg from "../../assets/basket-yellow.png";
import { Link } from "react-router-dom";

export interface HeaderProps {
  isOrderReady: boolean;
  orderedDishesTotal: number;
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderName = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  align-items: flex-start;
  width: 122px;

  h1 {
    margin: 0;
    text-transform: uppercase;
    font-weight: 800;
    text-align: center;

    &::first-letter {
      color: #ffd770;
      font-size: 40px;
    }
  }

  p {
    margin: 0 auto;
    text-transform: lowercase;
    line-height: 30px;
    font-variant-caps: petite-caps;
  }

  hr {
    width: 122px;
    border: solid;
    margin: 0;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90px;
  height: 90px;
  color: white;
  background-color: black;

  p {
    margin: 0 3px;
    font-size: 25px;
    font-weight: 800;
    line-height: 28px;
  }
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: center;

  p {
    &:nth-child(odd) {
      color: #ffd700;
    }
  }
`;

const SecondLine = styled.div`
  display: flex;
  justify-content: center;

  p {
    &:nth-child(even) {
      color: #ffd700;
    }
  }
`;

const LogosWrapper = styled.div`
  display: flex;
`;

const BasketWrapper = styled(Link)`
  position: relative;
  display: flex;
  align-self: flex-end;
`;

const BasketLogo = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  align-self: end;
  margin: -10px -18px;
  z-index: 10000;
`;

const BasketNumber = styled.div`
  position: absolute;
  z-index: 10000;
  font-weight: 800;
  text-shadow: 1px 1px ghostwhite;
  color: black;
  width: 20px;
  font-size: 12px;
  margin: -16px auto;
`;

export function Header(props: HeaderProps) {
  return (
    <HeaderWrapper>
      <HeaderName>
        <h1>Dobra</h1>
        <hr />
        <p>Cafe & Bistro</p>
      </HeaderName>
      <LogosWrapper>
        <BasketWrapper to={`/order`}>
          <BasketLogo src={basketImg} />
          <BasketNumber>{props.orderedDishesTotal}</BasketNumber>
        </BasketWrapper>
        <HeaderLogo>
          <FirstLine>
            <p>M</p>
            <p>E</p>
          </FirstLine>
          <SecondLine>
            <p>N</p>
            <p>U</p>
          </SecondLine>
        </HeaderLogo>
      </LogosWrapper>
    </HeaderWrapper>
  );
}
