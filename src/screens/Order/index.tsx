import React, { useState } from "react";
import { Platform } from "react-native";

import { Container, Header, Photo, Sizes } from "./styles";
import { PIZZA_TYPES } from "@utils/pizzaTypes";
import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";

export function Order() {
  const [size, setSize] = useState("");
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </Header>
      <Photo source={{ uri: "https://github.com/skyxcripto.png" }} />

      <Sizes>
        {PIZZA_TYPES.map((item) => (
          <RadioButton
            key={item.id}
            title={item.name}
            onPress={() => setSize(item.id)}
            selected={size === item.id}
          />
        ))}
      </Sizes>
    </Container>
  );
}
