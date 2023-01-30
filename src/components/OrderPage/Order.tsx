import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  AttributeDetailDTO,
  MenuDTO,
  menuItems,
  dishAttributesItems,
  DishDTO,
} from "../../api";
import { OrderedDish } from "../MenuPage/Menu";
import removeImg from "../../assets/remove.png";
import { Link } from "react-router-dom";

export function Order() {
  const orderedDishes = localStorage.getItem("orderedDishes");
  const orderedDishesParsed =
    orderedDishes !== null ? JSON.parse(orderedDishes) : [];
  const [orderedDishesArray, setOrderedDishesArray] =
    useState<OrderedDish[]>(orderedDishesParsed);
  const [menuData, setMenuData] = useState<MenuDTO>({ id: "", groups: [] });
  const [attributesData, setAttributesData] = useState<AttributeDetailDTO[]>(
    []
  );

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

  interface DishWithPriceAndQuantity {
    id: string;
    name: string;
    price: string;
    quantity?: number;
  }

  let allOrderedDishesWithPriceArray: Array<DishWithPriceAndQuantity> = [];
  let orderedDishesWithPriceAndQuantity: Array<DishWithPriceAndQuantity> = [];

  for (let i = 0; i <= menuData.groups.length - 1; i++) {
    menuData?.groups[i].dishes?.forEach((dish) => {
      allOrderedDishesWithPriceArray.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
      });
    });
  }

  for (let j = 0; j <= allOrderedDishesWithPriceArray?.length - 1; j++) {
    orderedDishesArray?.forEach((dish) => {
      if (allOrderedDishesWithPriceArray[j].id === dish.dishId) {
        orderedDishesWithPriceAndQuantity.push({
          id: dish.dishId,
          name: allOrderedDishesWithPriceArray[j].name,
          price: allOrderedDishesWithPriceArray[j].price,
          quantity: dish.quantity,
        });
      }
    });
  }

  let arrayWithTotalPrices = orderedDishesWithPriceAndQuantity.map((item) => {
    if (item.quantity) {
      return { sumForDish: item.quantity * Number(item.price) };
    } else {
      return { sumForDish: 0 };
    }
  });

  const totalPrice = arrayWithTotalPrices
    .map((item) => {
      return item.sumForDish;
    })
    .reduce((a, b) => a + b, 0);

  const OrderPage = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const Title = styled.h2`
    margin: 20px auto;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;

    &::first-letter {
      color: #ffd770;
      font-size: 30px;
      font-weight: 800;
    }
  `;

  const OrderedDish = styled.div`
    display: flex;
    min-width: 350px;
  `;
  const TotalPrice = styled.div`
    font-weight: 800;
  `;
  const DishName = styled.p`
    margin: 0;
  `;
  const DishQt = styled.p`
    margin: 0 20px;
  `;
  const DishPrice = styled.p`
    margin: 0 20px;
  `;

  const Logo = styled.div`
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

  const OrderedDishWrapper = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
  `;

  const RemoveItem = styled.img`
    width: 24px;
    height: 24px;
    margin: 10px 10px 10px 0;
  `;

  const StyledLink = styled(Link)`
    font-size: 20px;
    text-decoration: none;
    background-color: #ffd700;
    color: black;
    width: 70%;
    padding: 5px;
    margin: 0;
    text-align: center;
    border-radius: 2px;

    &:hover {
      text-decoration: none;
      color: black;
    }
  `;

  const removeDish = (dish: DishWithPriceAndQuantity) => {
    const newOrderedDishesArray = orderedDishesArray
      .map((item) => {
        let newItem = { ...item };
        if (item.dishId === dish.id) {
          if (newItem.quantity > 0) {
            newItem.quantity = newItem.quantity - 1;
          } else {
            newItem.quantity = newItem.quantity;
          }
        }
        return newItem;
      })
      .filter((item) => item.quantity > 0);

    localStorage.setItem(
      "orderedDishes",
      JSON.stringify(newOrderedDishesArray)
    );
    setOrderedDishesArray(newOrderedDishesArray);
  };

  return (
    <OrderPage>
      <Logo>
        <h1>Dobra</h1>
        <hr />
        <p>Cafe & Bistro</p>
      </Logo>
      <Title>Podsumowanie zamówienia</Title>
      <OrderedDishWrapper>
        {orderedDishesWithPriceAndQuantity.map((dish) => {
          return (
            <>
              {dish.quantity && dish.quantity > 0 && (
                <OrderedDish>
                  <RemoveItem
                    src={removeImg}
                    onClick={() => removeDish(dish)}
                  />
                  <DishName>{dish.name}</DishName>
                  <DishQt>{dish.quantity} szt</DishQt>
                  <DishPrice>
                    {dish.price} x {dish.quantity} ={" "}
                    {Number(dish.price) * dish.quantity} PLN
                  </DishPrice>
                </OrderedDish>
              )}
            </>
          );
        })}
      </OrderedDishWrapper>
      {totalPrice <= 0 && <StyledLink to={`/menu`}>Wróć do menu</StyledLink>}
      {totalPrice > 0 && <TotalPrice>Do zapłaty: {totalPrice} PLN</TotalPrice>}
    </OrderPage>
  );
}
