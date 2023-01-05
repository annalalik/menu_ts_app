import * as React from "react";
import styled from "styled-components";
import { Directus } from "@directus/sdk";
import glutenFree from "../../assets/no-gluten.png";
import lactoseFree from "../../assets/no-dairy.png";
import vegan from "../../assets/vegan.png";
import vegetarian from "../../assets/vegetarian-mark.png";
import { AttributeDTO, DishDTO } from "../../Api";

const directus = new Directus("https://directus.colorify.run/");

const attributesData = await directus.items("dish_attributes").readByQuery({
  limit: -1,
  fields: ["*", "groups.*", "groups.dishes.*", "groups.dishes.attributes.*"],
});

const DishWrapper = styled.div`
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
`;

const DishDescriptionwrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 10px;
`;

const DishAttributes = styled.div`
  display: flex;
  align-items: center;
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
}

export function Dish(props: DishProps) {
  const dishPrice = props.dish.price.split(".").slice(0, 1);
  return (
    <DishWrapper>
      <DishDescriptionwrapper>
        <div>
          <h3>{props.dish.name}</h3>
          <p>{props.dish.description}</p>
        </div>
        <DishAttributes>
          {props.dish.attributes.map((attribute: AttributeDTO) => {
            const matchedAttr = attributesData.data.find(
              (atr) => atr.id === attribute.dish_attributes_id
            );
            return (
              <>
                <AttributeItem
                  src={
                    matchedAttr.name === "Gluten-Free"
                      ? glutenFree
                      : matchedAttr.name === "Lactose-Free"
                      ? lactoseFree
                      : matchedAttr.name === "Vegetarian"
                      ? vegetarian
                      : matchedAttr.name === "Vegan"
                      ? vegan
                      : ""
                  }
                />
              </>
            );
          })}
        </DishAttributes>
      </DishDescriptionwrapper>
      <PriceItem>{dishPrice}</PriceItem>
    </DishWrapper>
  );
}
