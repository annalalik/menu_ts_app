import * as React from "react";
import styled from "styled-components";
import { Directus } from "@directus/sdk";
import glutenFree from "../../assets/no-gluten.png";
import lactoseFree from "../../assets/no-dairy.png";
import vegan from "../../assets/vegan.png";
import vagetarian from "../../assets/vegetarian-mark.png";

const directus = new Directus("https://directus.colorify.run/");

const menuData = await directus.items("menus").readByQuery({
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

const AttributeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 130px;
`;

const Text = styled.p`
  font-size: 12px;
  text-transform: lowercase;
  margin: 0 auto;
  letter-spacing: 1px;
`;

export function Attributes() {
  return (
    <AttributesWrapper>
      <AttributeWrapper>
        <Attribute src={glutenFree} />
        <Text>Gluten Free</Text>
      </AttributeWrapper>
      <AttributeWrapper>
        <Attribute src={lactoseFree} />
        <Text>Bez laktozy</Text>
      </AttributeWrapper>
      <AttributeWrapper>
        <Attribute src={vagetarian} />
        <Text>Wegetariańskie</Text>
      </AttributeWrapper>
      <AttributeWrapper>
        <Attribute src={vegan} />
        <Text>Wegańskie</Text>
      </AttributeWrapper>
    </AttributesWrapper>
  );
}
