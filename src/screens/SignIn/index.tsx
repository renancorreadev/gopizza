import React, { useState } from "react";
import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel,
} from "./styles";

import { KeyboardAvoidingView, Platform } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import brandIMG from "@assets/brand.png";
import { useAuth } from "@hooks/Auth";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLogging } = useAuth();

  function handleSignIn() {
    signIn(email, password);
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Brand source={brandIMG} />
          <Title>Login</Title>
          <Input
            type="secondary"
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Input
            type="secondary"
            placeholder="Senha"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            type="secondary"
            title="Entrar"
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
