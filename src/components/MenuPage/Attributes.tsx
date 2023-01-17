import * as React from "react";
import styled from "styled-components";
import glutenFree from "../../assets/no-gluten.png";
import lactoseFree from "../../assets/no-dairy.png";
import vegan from "../../assets/vegan.png";
import vagetarian from "../../assets/vegetarian-mark.png";

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
  filter: AttributeFilter;
  setFilter: (value: boolean, filter: keyof AttributeFilter) => void;
}

export interface AttributeFilter {
  isGlutenFree: boolean;
  isLactoseFree: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
}

export function Attributes(props: AttributesProps) {
  return (
    <AttributesWrapper>
      <AttributeWrapper isChecked={props.filter.isGlutenFree}>
        <Attribute
          onClick={() =>
            props.setFilter(!props.filter.isGlutenFree, "isGlutenFree")
          }
          src={glutenFree}
        />
        <Text>Gluten Free</Text>
      </AttributeWrapper>
      <AttributeWrapper isChecked={props.filter.isLactoseFree}>
        <Attribute
          onClick={() =>
            props.setFilter(!props.filter.isLactoseFree, "isLactoseFree")
          }
          src={lactoseFree}
        />
        <Text>Bez laktozy</Text>
      </AttributeWrapper>
      <AttributeWrapper isChecked={props.filter.isVegetarian}>
        <Attribute
          onClick={() =>
            props.setFilter(!props.filter.isVegetarian, "isVegetarian")
          }
          src={vagetarian}
        />
        <Text>Wegetariańskie</Text>
      </AttributeWrapper>
      <AttributeWrapper isChecked={props.filter.isVegan}>
        <Attribute
          onClick={() => props.setFilter(!props.filter.isVegan, "isVegan")}
          src={vegan}
        />
        <Text>Wegańskie</Text>
      </AttributeWrapper>
    </AttributesWrapper>
  );
}
