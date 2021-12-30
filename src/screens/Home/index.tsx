import React, { useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import happyEmoji from "@assets/happy.png";
import { useTheme } from "styled-components/native";
import { TouchableOpacity, Alert, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Search } from "@components/Search";
import { ProductCard, ProductProps } from "@components/ProductCard";
import { useAuth } from "@hooks/Auth";

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title,
  NewProductButton,
} from "./styles";

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { COLORS } = useTheme();
  const { user, signOut } = useAuth();

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

  function handleSearch() {
    fecthPizzas(search);
  }

  function handleSearchClear() {
    setSearch("");
    fecthPizzas("");
  }

  function handleOpen(id: string) {
    const route = user?.isAdmin ? "product" : "order";
    navigation.navigate(route, { id });
  }

  function handleAdd() {
    navigation.navigate("product", {});
  }

  useFocusEffect(
    useCallback(() => {
      fecthPizzas("");
    }, [])
  );

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji}></GreetingEmoji>
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>
        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />
      <MenuHeader>
        <Title>Menu</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: 24,
          paddingBottom: 125,
          paddingTop: 24,
        }}
      />
      {user?.isAdmin && (
        <NewProductButton
          title="Cadastrar Pizza"
          type="secondary"
          onPress={handleAdd}
          isLoading={false}
        />
      )}
    </Container>
  );
}
