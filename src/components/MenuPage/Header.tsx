import styled from "styled-components";
import basketImg from "../../assets/basket-yellow.png";

export interface Header {
  isOrderReady: boolean;
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

const BasketLogo = styled.img`
  width: 40px;
  height: 40px;
  align-self: end;
  margin: -10px -25px;
  z-index: 10000;
`;

export function Header() {
  return (
    <HeaderWrapper>
      <HeaderName>
        <h1>Dobra</h1>
        <hr />
        <p>Cafe & Bistro</p>
      </HeaderName>
      <LogosWrapper>
        <BasketLogo src={basketImg} />
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
