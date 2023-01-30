import styled from "styled-components";
import { Attributes } from "./Attributes";
import { Header } from "./Header";
import { Dish } from "./Dish";
import {
  AttributeDetailDTO,
  dishAttributesItems,
  MenuDTO,
  MenuGroupDTO,
} from "../../api";
import { useEffect, useState } from "react";
import { menuItems } from "../../api";
import { AttributeFilter } from "./Attributes";
import { devices } from "../../globalStyles";

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

  @media ${devices.laptop} {
    grid-template-columns: 1fr;
  }
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

export interface OrderedDish {
  dishId: string;
  quantity: number;
}

export function Menu() {
  const [menuData, setMenuData] = useState<MenuDTO>();
  const [attributesData, setAttributesData] = useState<AttributeDetailDTO[]>(
    []
  );
  const [isOrderReady, setIsOrderReady] = useState(false);
  const [orderedDishes, setOrderedDishes] = useState<OrderedDish[]>([]);

  const orderedDishesTotal = orderedDishes
    .map((dishTotal) => dishTotal.quantity)
    .reduce((qt1, qt2) => qt1 + qt2, 0);

  useEffect(() => {
    const orderedDishesLS = localStorage.getItem("orderedDishes");
    console.log(orderedDishesLS);

    if (orderedDishesLS !== null) {
      orderedDishesLS !== "undefined"
        ? setOrderedDishes(JSON.parse(orderedDishesLS))
        : setOrderedDishes([]);
    }
  }, []);

  useEffect(() => {
    const fetchMenuData = async () => {
      const menuData = await menuItems.readByQuery({
        limit: -1,
        fields: [
          "*",
          "groups.*",
          "groups.dishes.*",
          "groups.dishes.attributes.*",
        ],
      });

      const attributesData = await dishAttributesItems.readByQuery({
        limit: -1,
        fields: [
          "*",
          "groups.*",
          "groups.dishes.*",
          "groups.dishes.attributes.*",
        ],
      });

      if (menuData.data && menuData.data[0]) {
        setMenuData(menuData.data[0] as MenuDTO);
      }

      if (attributesData.data) {
        setAttributesData(attributesData.data as AttributeDetailDTO[]);
      }
    };

    fetchMenuData();
  }, []);

  const addOrderedDish = (dishId: string) => {
    const newOrderedDishes = [...orderedDishes];
    const existingDishIdx = newOrderedDishes
      .map((item) => item.dishId)
      .indexOf(dishId);

    if (existingDishIdx >= 0) {
      const dishIdx = existingDishIdx;
      newOrderedDishes[dishIdx].quantity += 1;
    } else {
      newOrderedDishes.push({ dishId: dishId, quantity: 1 });
    }

    setOrderedDishes(newOrderedDishes);
    localStorage.setItem("orderedDishes", JSON.stringify(orderedDishes));
  };

  const removeOrderedDishes = (dishId: string) => {
    const newOrderedDishes = [...orderedDishes];
    const dishToRemoveIdx = orderedDishes
      .map((orderedDish) => orderedDish.dishId)
      .findIndex((element) => element === dishId);

    if (dishToRemoveIdx >= 0) {
      if (newOrderedDishes[dishToRemoveIdx].quantity > 1) {
        newOrderedDishes[dishToRemoveIdx].quantity -= 1;
      } else {
        newOrderedDishes.splice(dishToRemoveIdx, 1);
      }
    }

    setOrderedDishes(newOrderedDishes);
    localStorage.setItem("orderedDishes", JSON.stringify(orderedDishes));
  };

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
      <Header
        isOrderReady={isOrderReady}
        orderedDishesTotal={orderedDishesTotal}
        orderedDishes={orderedDishes}
      />
      <Attributes filter={attributeFilter} setFilter={handleFilterChange} />

      <MenuWrapper>
        {menuData &&
          menuData.groups.map((group: MenuGroupDTO) => (
            <GroupWrapper>
              <h2>{group.name}</h2>
              <DishesWrapper>
                {group.dishes.map((dish) => {
                  const dishQuantity = orderedDishes.find(
                    (orderedDish) => orderedDish.dishId === dish.id
                  )?.quantity;

                  console.log(dishQuantity);
                  return (
                    <Dish
                      filter={attributeFilter}
                      dish={dish}
                      attributesData={attributesData}
                      addOrderedDish={addOrderedDish}
                      removeOrderedDish={removeOrderedDishes}
                      orderedQuantity={dishQuantity}
                    />
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
