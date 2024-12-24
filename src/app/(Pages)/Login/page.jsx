"use client";

import React from "react";
import { Container, ContainerIntern, Form, FormGroup, Label, Input, ErrorBox, VideoBg, VideoBgColor, Title, Wrapper, Text, TextLink, TextLink2, Wrapper2, RememberPass, Text2 } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/app/Components/Button";


import { api } from "@/app/Services/api";
import { useRouter } from "next/navigation";
import { Divisor } from "@/app/Components/Divisor";
import Link from "next/link";



// ------------------------------------------------------Esquema de validação
const loginSchema = yup.object({
  user: yup.string().required("Usuário é obrigatório"),
  passwordHash: yup.string().required("Senha é obrigatória"),
}).required();



export default function Login() {
  const router = useRouter()


  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // ------------------------------------------------------Fazendo o request com as informações do formulário

  const onSubmit = async (data) => {
    
    const response = await req(data)
    localStorage.setItem("token", response)
    
    alert(response)
    reset();
    router.push("/")

  };



// Função para realizar a requisição ao backend
const req = async (body) => {
  try {
    const response = await api.post(`/login/autentication` , body);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro na requisição:", error.message);
    return [];
  }
  };
  
  return (
    <Container>
      <VideoBg autoPlay loop muted playsInline>
          <source src="/assets/quarto.mp4"></source>
      </VideoBg>
      <VideoBgColor></VideoBgColor>
      <ContainerIntern>
        <Title>Login</Title>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Text>Utilize o usuário e senha para logar</Text>
        <Divisor></Divisor>
          <FormGroup>
            <Wrapper>
            <Label htmlFor="user">Usuário:</Label>
            <Controller
name="user"
control={control}
defaultValue=""
render={({ field }) => (
  <Input
  type="text"
  id="user"
  {...field}
  placeholder="Digite seu usuário"
  />
)}
/>
            </Wrapper>
            {errors.user && <ErrorBox>{errors.user.message}</ErrorBox>}
          </FormGroup>
          <FormGroup>
            <Wrapper>

            <Label htmlFor="passwordHash">Senha:</Label>
            <Controller
              name="passwordHash"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                type="password"
                id="passwordHash"
                {...field}
                placeholder="Digite sua senha"
                />
              )}
              />
              </Wrapper>
            {errors.passwordHash && <ErrorBox>{errors.passwordHash.message}</ErrorBox>}
          </FormGroup>
          <Wrapper2>
            <RememberPass>

              <input type="checkbox" name="remember" id="ok" />
              <Text>Lembrar a senha?</Text>
            </RememberPass>
              <Text2>|</Text2>

          <Link href={`/ForgotPassword`}>
              <TextLink>Esqueceu a senha?</TextLink>
          </Link>
          </Wrapper2>
          <Button title="Login" variant="secondary" type="submit" disabled={!isValid} />
          <Link href={`/CreateAccount`}>
              <TextLink>Criar nova conta</TextLink>
          </Link>
        </Form>
      </ContainerIntern>
    </Container>
  );
}
