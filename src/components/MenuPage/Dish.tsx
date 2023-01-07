import * as React from "react";
import styled from "styled-components";
import { Directus } from "@directus/sdk";
import glutenFree from "../../assets/no-gluten.png";
import lactoseFree from "../../assets/no-dairy.png";
import vegan from "../../assets/vegan.png";
import vegetarian from "../../assets/vegetarian-mark.png";
import { AttributeDTO, DishDTO } from "../../Api";
import { useState } from "react";

const directus = new Directus("https://directus.colorify.run/");

const attributesData = await directus.items("dish_attributes").readByQuery({
  limit: -1,
  fields: ["*", "groups.*", "groups.dishes.*", "groups.dishes.attributes.*"],
});

const DishWrapper = styled.div<{ greyedOut: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 16px;
  }

  div {
    p {
      margin: 0;
      font-size: 12px;
      text-transform: lowercase;
      letter-spacing: 1px;
      font-weight: 400;
    }
  }
  opacity: ${(props) => (props.greyedOut ? "0.1" : "1")};
`;

const DishDescriptionwrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 10px;
  width: 100%;
`;

const DishAttributes = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  margin-right: 10px;
`;

const PriceItem = styled.p`
  font-size: 16px;
  font-weight: 800;
  background-color: #ffd770;
  padding: 10px;
`;

const AttributeItem = styled.img`
  width: 20px;
  height: 20px;
  margin: 5px;
`;

interface DishProps {
  dish: DishDTO;
  isGlutenFreeClicked: boolean;
  isLactoseFreeClicked: boolean;
  isVeganClicked: boolean;
  isVegetarianClicked: boolean;
}

export function Dish(props: DishProps) {
  const dishPrice = props.dish.price.split(".").slice(0, 1);
  const attributesArray = props.dish.attributes.map(
    (attribute: AttributeDTO) => {
      const matchedAttr = attributesData.data?.find(
        (atr) => atr.id === attribute.dish_attributes_id
      );
      return matchedAttr;
    }
  );

  let isTransparent;

  if (props.isGlutenFreeClicked) {
    isTransparent = !(
      typeof attributesArray.find(
        (attrItem) => attrItem.name === "Gluten-Free"
      ) === "object"
    );
  }

  if (props.isLactoseFreeClicked) {
    isTransparent = !(
      typeof attributesArray.find(
        (attrItem) => attrItem.name === "Lactose-Free"
      ) === "object"
    );
  }

  if (props.isVegetarianClicked) {
    isTransparent = !(
      typeof attributesArray.find(
        (attrItem) => attrItem.name === "Vegetarian"
      ) === "object"
    );
  }

  if (props.isVeganClicked) {
    isTransparent = !(
      typeof attributesArray.find((attrItem) => attrItem.name === "Vegan") ===
      "object"
    );
  }

  return (
    <DishWrapper greyedOut={isTransparent}>
      <DishDescriptionwrapper>
        <div>
          <h3>{props.dish.name}</h3>
          <p>{props.dish.description}</p>
        </div>
        <DishAttributes>
          {attributesArray.map((attributeItem: AttributeDTO) => {
            return (
              <AttributeItem
                src={
                  attributeItem.name === "Gluten-Free"
                    ? glutenFree
                    : attributeItem.name === "Lactose-Free"
                    ? lactoseFree
                    : attributeItem.name === "Vegetarian"
                    ? vegetarian
                    : attributeItem.name === "Vegan"
                    ? vegan
                    : ""
                }
              />
            );
          })}
        </DishAttributes>
      </DishDescriptionwrapper>
      <PriceItem>{dishPrice}</PriceItem>
    </DishWrapper>
  );
}
