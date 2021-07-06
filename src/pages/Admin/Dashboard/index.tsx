import React from "react";
import InfoCard from "../../../components/InfoCard";
import image from "../../../assets/pexels-johannes-rapprich-1051397.jpg";

const Dashboard: React.FC = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <InfoCard
        image={image}
        title="Título do Card"
        text="Texto do Card, texto texto texto texto texto texto texto texto texto texto texto texto"
        imageTitle="Título da imagem"
        cardAction={() => alert("da pra definir uma ação quando clica no card")} //-| ações opcionais, se não definir não acontece nada ao clicar.
        firstButtonAction={() => alert("botão de compartilhar")} //-----------------| se for o caso, da pra criar uma prop pra mudar o texto dos botões.
        secondButtonAction={() => alert("botão de saiba mais")} //------------------| ou então podemos remover os botões também, deixando só imagem e texto.
      />
    </>
  );
};

export default Dashboard;
