import React from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Container, Input, Button, InputArea, ButtonClear } from "./styles";

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

export function Search({ onSearch, onClear, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <InputArea>
        <Input placeholder="pesquisar..." {...rest} />

        <ButtonClear onPress={onClear}>
          <Feather name="x" size={16} />
        </ButtonClear>
      </InputArea>
      <GestureHandlerRootView>
        <Button onPress={onSearch} {...rest}>
          <Feather name="search" size={16} color={COLORS.TITLE} />
        </Button>
      </GestureHandlerRootView>
    </Container>
  );
}
