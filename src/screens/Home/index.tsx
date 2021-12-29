import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import happyEmoji from "@assets/happy.png";
import { useTheme } from "styled-components/native";
import { TouchableOpacity, Alert, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Search } from "@components/Search";
import { ProductCard, ProductProps } from "@components/ProductCard";

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title,
} from "./styles";

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const { COLORS } = useTheme();

  function fecthPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch(() => Alert.alert("Consulta", "Erro ao consultar"));
  }

  useEffect(() => {
    fecthPizzas("");
  }, []);

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji}></GreetingEmoji>
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>
        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <Title>Menu</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
      />

      <ProductCard
        data={{
          id: "1",
          name: "Pizza",
          description: "Pizza de calabresa",
          photo_url: "https://github.com/skyxcripto.png",
        }}
      />
    </Container>
  );
}
