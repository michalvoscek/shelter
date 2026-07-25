import styled from "styled-components";

export const Main = styled.main.attrs({ id: "main-content" })`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 110px 40px;
  min-height: 100dvh;

  @media (max-width: 960px) {
    padding: 20px 24px;
  }
`;
