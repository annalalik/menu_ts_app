import styled from "styled-components";
import glutenFreeImg from "../../assets/no-gluten.png";
import lactoseFreeImg from "../../assets/no-dairy.png";
import veganImg from "../../assets/vegan.png";
import vegetarianImg from "../../assets/vegetarian-mark.png";
import { AttributeDetailDTO, AttributeDTO, DishDTO } from "../../api";
import { AttributeFilter } from "./Attributes";
import addImg from "../../assets/add-new.png";
import { useEffect, useState } from "react";
import removeImg from "../../assets/remove.png";
import { OrderedDish } from "./Menu";

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

const AddItem = styled.img<{ isDishOrdered: boolean }>`
  width: 24px;
  height: 24px;
  margin: 10px;
  background-color: ${(props) => (props.isDishOrdered ? "#ffd770" : "")};
`;

const RemoveItem = styled.img`
  width: 24px;
  height: 24px;
  margin: 10px 10px 10px 0;
`;

interface DishProps {
  dish: DishDTO;
  filter: AttributeFilter;
  attributesData: AttributeDetailDTO[];
  addOrderedDish: (value: string) => void;
  removeOrderedDish: (value: string) => void;
  orderedQuantity: number | undefined;
}

const imageAttributeMap: Record<string, string> = {
  "Gluten-Free": glutenFreeImg,
  "Lactose-Free": lactoseFreeImg,
  Vegetarian: vegetarianImg,
  Vegan: veganImg,
};

export function Dish(props: DishProps) {
  const dishPrice = parseFloat(props.dish.price).toLocaleString();
  const attributesArray = props.dish.attributes
    .map((attribute: AttributeDTO) => {
      const matchedAttr = props.attributesData?.find(
        (atr) => atr.id === attribute.dish_attributes_id
      );
      return matchedAttr;
    })
    .filter((attribute): attribute is AttributeDetailDTO => !!attribute);

  const attributeNames = attributesArray.map((attribute) => attribute.name);
  const { isGlutenFree, isLactoseFree, isVegetarian, isVegan } = props.filter;
  let isTransparent: boolean = false;

  if (isGlutenFree) {
    isTransparent = attributeNames.includes("Gluten-Free");
  }

  if (isLactoseFree) {
    isTransparent = attributeNames.includes("Lactose-Free");
  }

  if (isVegetarian) {
    isTransparent = attributeNames.includes("Vegetarian");
  }

  if (isVegan) {
    isTransparent = attributeNames.includes("Vegan");
  }

  const isDishOrdered =
    props.orderedQuantity && props.orderedQuantity > 0 ? true : false;

  return (
    <DishWrapper greyedOut={isTransparent}>
      <AddItem
        src={addImg}
        onClick={() => props.addOrderedDish(props.dish.id)}
        isDishOrdered={isDishOrdered}
      />
      <RemoveItem
        src={removeImg}
        onClick={() => props.removeOrderedDish(props.dish.id)}
      />
      <DishDescriptionwrapper>
        <div>
          <h3>
            {props.dish.name}{" "}
            {props.orderedQuantity && props.orderedQuantity > 0 && (
              <span>({props.orderedQuantity})</span>
            )}
          </h3>
          <p>{props.dish.description}</p>
        </div>
        <DishAttributes>
          {attributesArray.map((attributeItem) => {
            return (
              <AttributeItem src={imageAttributeMap[attributeItem.name]} />
            );
          })}
        </DishAttributes>
      </DishDescriptionwrapper>
      <PriceItem>{dishPrice}</PriceItem>
    </DishWrapper>
  );
}
