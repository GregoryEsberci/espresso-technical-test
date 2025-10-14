# Teste técnico Espresso

Teste técnico para a vaga de Desenvolvedor front-end React Pleno/Sênior para a empresa Espresso

## Requisitos

- Node 24
- yarn

[Instruções de instalação](https://nodejs.org/en/download/current)

## Configuração

Instale os pacotes:

```sh
yarn install
```

## Iniciar o server local

Após instalar os pacotes, execute:

```sh
yarn start
```

Acesse a aplicação pela URL [http://localhost:3000](http://localhost:3000)

## Observações

### Timezone

Ao filtrar os dados do gráfico (nos formatos YYYY-MM-DD ou ISO), alguns registros podem aparecer no mês anterior ao converter para o timezone local, por isso optei por exibir as datas em UTC para manter consistência

Se fossem exibidas no timezone local o gráfico poderia mostrar registros do ultimo dia do mês anterior

### Cor primaria

A cor primaria declarada nos `Assets` é ![](https://placehold.co/10x10/3D0079/3D0079.png) #3D0079 porem ela deixa um baixo contraste em alguns textos que a usam como background, por isso optei pela ![](https://placehold.co/10x10/2196F3/2196F3.png) #2196F3 que está como primary/main na aba `Teste` no figma
