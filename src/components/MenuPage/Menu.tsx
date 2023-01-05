import * as React from "react";
import styled from "styled-components";
import { Directus } from "@directus/sdk";
import { Attributes } from "./Attributes";
import { Header } from "./Header";
import { Dish } from "./Dish";
import { DishDTO } from "../../Api";

const directus = new Directus("https://directus.colorify.run/");

const menuData = await directus.items("menus").readByQuery({
  limit: -1,
  fields: ["*", "groups.*", "groups.dishes.*", "groups.dishes.attributes.*"],
});

const MenuPage = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
`;

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
  row-gap: 10px;
`;

const GroupWrapper = styled.div`
  margin: 10px 0;
  padding: 10px;

  h2 {
    margin: 0;
    font-weight: 800;
    text-transform: uppercase;
    font-variant-caps: petite-caps;
    letter-spacing: 2px;
    font-size: 18px;

    &::first-letter {
      color: #ffd770;
      font-size: 24px;
    }
  }
`;

const DishesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const AdditionalInfoWrapper = styled.div`
  margin: 0;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 400;
`;

interface Menu {
  // Declare any props that the component should expect here
}

interface MenuGroup {
  id: string;
  name: string;
  type: string;
  dishes: DishDTO[];
}

export function Menu() {
  return (
    <MenuPage>
      <Header />
      <Attributes />

      <MenuWrapper>
        {menuData.data &&
          menuData.data[0]?.groups.map((group: MenuGroup) => (
            <GroupWrapper>
              <h2>{group.name}</h2>
              <DishesWrapper>
                {group.dishes.map((dish) => {
                  //   const dishPrice = dish.price.split(".").slice(0, 1);
                  return (
                    <Dish dish={dish} />
                    // <DishWrapper>
                    //   <div>
                    //     <h3>{dish.name}</h3>
                    //     <p>{dish.description}</p>
                    //   </div>
                    //   <PriceItem>{dishPrice}</PriceItem>
                    // </DishWrapper>
                  );
                })}
              </DishesWrapper>
            </GroupWrapper>
          ))}
        <AdditionalInfoWrapper>
          Wszystkie ceny podawane są w PLN i nie uwzględniają napiwków.
        </AdditionalInfoWrapper>
      </MenuWrapper>
    </MenuPage>
  );
}
