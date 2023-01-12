import styled from "styled-components";
import { Attributes } from "./Attributes";
import { Header } from "./Header";
import { Dish } from "./Dish";
import { DishDTO, MenuGroupDTO } from "../../api";
import { useState } from "react";
import { menuItems } from "../../api";
import { AttributeFilter } from "./Attributes";

const menuData = await menuItems.readByQuery({
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

export function Menu() {
  const [attributeFilter, setAttributeFilter] = useState<AttributeFilter>({
    isGlutenFree: false,
    isLactoseFree: false,
    isVegan: false,
    isVegetarian: false,
  });

  const handleFilterChange = (
    value: boolean,
    filter: keyof AttributeFilter
  ) => {
    let newSelectedAttributes = { ...attributeFilter };
    newSelectedAttributes[filter] = value;
    setAttributeFilter(newSelectedAttributes);
  };

  return (
    <MenuPage>
      <Header />
      <Attributes filter={attributeFilter} setFilter={handleFilterChange} />

      <MenuWrapper>
        {menuData.data &&
          menuData.data[0]?.groups.map((group: MenuGroupDTO) => (
            <GroupWrapper>
              <h2>{group.name}</h2>
              <DishesWrapper>
                {group.dishes.map((dish) => {
                  return <Dish filter={attributeFilter} dish={dish} />;
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
