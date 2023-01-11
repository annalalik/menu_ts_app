import * as React from "react";
import styled from "styled-components";
import glutenFree from "../../assets/no-gluten.png";
import lactoseFree from "../../assets/no-dairy.png";
import vegan from "../../assets/vegan.png";
import vagetarian from "../../assets/vegetarian-mark.png";
import { useState } from "react";
import { menuItems } from "../../api";

const menuData = await menuItems.readByQuery({
  limit: -1,
  fields: ["*", "groups.*", "groups.dishes.*", "groups.dishes.attributes.*"],
});

const AttributesWrapper = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: center;
`;

const Attribute = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px auto;
`;

const AttributeWrapper = styled.div<{ isChecked: boolean }>`
  display: flex;
  flex-direction: column;
  width: 130px;
  padding: 10px;
  background-color: ${(props) => (props.isChecked ? "#ffd770" : "")};
`;

const Text = styled.p`
  font-size: 12px;
  text-transform: lowercase;
  margin: 0 auto;
  letter-spacing: 1px;
`;

interface AttributesProps {
  isGlutenFreeClicked: boolean;
  setIsGlutenFreeClicked: (value: boolean) => void;
  isLactoseFreeClicked: boolean;
  setIsLactoseFreeClicked: (value: boolean) => void;
  isVegetarianClicked: boolean;
  setIsVegetarianClicked: (value: boolean) => void;
  isVeganClicked: boolean;
  setIsVeganClicked: (value: boolean) => void;
}

export function Attributes(props: AttributesProps) {
  return (
    <AttributesWrapper>
      <AttributeWrapper isChecked={props.isGlutenFreeClicked}>
        <Attribute
          onClick={() =>
            props.setIsGlutenFreeClicked(!props.isGlutenFreeClicked)
          }
          src={glutenFree}
        />
        <Text>Gluten Free</Text>
      </AttributeWrapper>
      <AttributeWrapper isChecked={props.isLactoseFreeClicked}>
        <Attribute
          onClick={() =>
            props.setIsLactoseFreeClicked(!props.isLactoseFreeClicked)
          }
          src={lactoseFree}
        />
        <Text>Bez laktozy</Text>
      </AttributeWrapper>
      <AttributeWrapper isChecked={props.isVegetarianClicked}>
        <Attribute
          onClick={() =>
            props.setIsVegetarianClicked(!props.isVegetarianClicked)
          }
          src={vagetarian}
        />
        <Text>Wegetariańskie</Text>
      </AttributeWrapper>
      <AttributeWrapper isChecked={props.isVeganClicked}>
        <Attribute
          onClick={() => props.setIsVeganClicked(!props.isVeganClicked)}
          src={vegan}
        />
        <Text>Wegańskie</Text>
      </AttributeWrapper>
    </AttributesWrapper>
  );
}
