# Vibe & Veste

# PDR — PRODUCT REQUIREMENTS DOCUMENT
## Produto: Meu Estilo — Jogo de Vestir

### 1. Visão geral do produto

Desenvolver um jogo web interativo de vestir personagens, inspirado em jogos digitais de moda, personalização de avatares e criação de looks.

O jogo deve permitir que a pessoa selecione uma personagem, experimente diferentes roupas e acessórios, combine peças e crie composições visuais próprias.

A experiência deve transmitir a sensação de estar utilizando um pequeno estúdio de moda digital. A interface precisa ser visualmente atraente, intuitiva e adequada tanto para pessoas sem experiência com jogos de personalização quanto para usuários familiarizados com esse tipo de aplicação.

O produto deve funcionar diretamente no navegador, sem necessidade de cadastro, autenticação ou conexão com serviços externos.

### 2. Objetivo principal

Permitir que o usuário crie e personalize um visual para uma personagem virtual por meio de seleções e combinações de elementos visuais.

O jogo deve demonstrar que uma aplicação pode apresentar diferentes estados e comportamentos a partir das escolhas realizadas pelo usuário.

### 3. Público-alvo

Pessoas interessadas em jogos de moda, personalização de personagens, criatividade e experiências interativas.

A interface deve ser simples de compreender, sem exigir conhecimentos prévios de programação ou design.

### 4. Escopo funcional

#### 4.1. Tela inicial

A tela inicial deve apresentar:
- Nome do jogo: Vibe & Veste.
- Uma identidade visual relacionada à moda e à personalização traga elementos de jogos dos anos 2000 misturado a um aesthetic barbie.
- Uma breve descrição da proposta.
- Um botão "Começar a jogar".
- Um botão ou opção para consultar as instruções.

Ao clicar em "Começar a jogar", o usuário deve ser direcionado à tela principal de personalização.

#### 4.2. Seleção de personagem

O jogo deve disponibilizar pelo menos duas personagens ou avatares com aparências distintas. Deve ter a opção de selecionar vários tons de pele.

O usuário deve conseguir selecionar uma personagem antes de iniciar a personalização.

A personagem selecionada deve aparecer em destaque na área central da interface.

#### 4.3. Área de personalização

A interface deve apresentar uma área principal contendo a personagem e um painel de opções organizado por categorias.

Categorias iniciais:
- Cabelos (importante ter vários tipos de cabelo como: chacheados, crespos, lisos, ondulados e afins)
- Partes superiores.
- Partes inferiores.
- Vestidos ou peças únicas.
- Calçados.
- Acessórios.

Cada categoria deve disponibilizar pelo menos seis opções visuais.

A seleção de uma opção deve atualizar imediatamente a aparência da personagem.

O usuário deve conseguir combinar itens de categorias diferentes.

Quando selecionar um novo item de uma categoria, o item anteriormente selecionado naquela mesma categoria deverá ser substituído.

A seleção de uma peça única, como um vestido, deverá respeitar a lógica de composição definida para evitar combinações visualmente incompatíveis com outras peças da mesma categoria.

#### 4.4. Interações

Implementar as seguintes funcionalidades:
- Selecionar e trocar peças.
- Remover uma peça selecionada.
- Desfazer a última alteração.
- Reiniciar a composição.
- Alternar entre categorias.
- Visualizar o resultado final.

O botão de desfazer deve recuperar o estado imediatamente anterior da personalização.

O botão de reiniciar deve remover as escolhas realizadas e restaurar a aparência inicial da personagem, sem retornar o usuário obrigatoriamente à tela inicial.

#### 4.5. Finalização do look

Criar uma opção "Finalizar look".

Ao acioná-la, o jogo deve apresentar uma tela ou modal com:
- A personagem com a composição final.
- O nome do look.
- Uma mensagem de conclusão.
- A opção de voltar à edição.
- A opção de criar um novo look.
- Também seria interessante se o personagem pudesse mostrar a roupa completa em uma espécie de desfile ou sessão de fotografia.

O nome do look deve poder ser definido pelo usuário.

### 5. Requisitos de interface e experiência

A interface deve:
- Utilizar uma identidade visual própria, inspirada em estúdios de moda e jogos de vestir.
- Apresentar a personagem em destaque.
- Organizar as opções em categorias identificáveis.
- Indicar visualmente qual item está selecionado.
- Oferecer feedback imediato após cada interação.
- Manter os controles acessíveis e fáceis de compreender.
- Adaptar-se a diferentes tamanhos de tela, especialmente computadores e notebooks.

Não utilizar uma interface com aparência de painel administrativo.

As ilustrações devem manter consistência visual. Caso não existam imagens próprias para todas as peças, utilizar recursos gráficos locais, ilustrações simples ou elementos visuais coerentes. Não utilizar imagens externas que dependam de links instáveis.

### 6. Regras de negócio

1. Apenas um item pode estar selecionado por categoria, salvo quando uma categoria for explicitamente definida como cumulativa.
2. Itens de categorias diferentes podem ser combinados.
3. A troca de um item deve atualizar a personagem imediatamente.
4. Remover um item não deve afetar as demais categorias.
5. Desfazer deve restaurar a última alteração realizada.
6. Reiniciar deve restaurar o estado inicial da personagem.
7. A finalização deve apresentar a composição atual, e não uma versão anterior.

### 7. Modelo de dados

A aplicação deve organizar os dados de forma estruturada.

Entidades principais:
- Personagem: identificador, nome e aparência inicial.
- Categoria: identificador e nome.
- Item: identificador, categoria, nome e representação visual.
- Composição: personagem selecionada, itens escolhidos e nome do look.

O estado da composição deve ser gerenciado no frontend.

Caso seja necessário persistir temporariamente o trabalho, utilizar o armazenamento local do navegador.

### 8. Requisitos técnicos

- Aplicação web responsiva.
- Interface e lógica executadas no navegador.
- Gerenciamento de estado para personagem, itens e categorias.
- Componentes reutilizáveis para categorias e opções de personalização.
- Separação entre dados dos itens e componentes visuais.
- Código organizado para facilitar a inclusão de novos itens e categorias.
- Não utilizar autenticação.
- Não configurar banco de dados.
- Não conectar Supabase ou Firebase.
- Não depender de APIs externas.

### 9. Critérios de aceitação

O produto será considerado funcional quando:
1. O usuário conseguir iniciar o jogo.
2. Conseguir selecionar uma personagem.
3. Conseguir visualizar as categorias de personalização.
4. Conseguir selecionar diferentes itens.
5. A personagem for atualizada após cada seleção.
6. A troca de itens funcionar sem acumular elementos incompatíveis.
7. Os botões de remover, desfazer e reiniciar funcionarem corretamente.
8. A composição final for exibida corretamente.
9. O jogo funcionar sem conexão com serviços externos após carregar os recursos necessários.
10. A interface se adaptar a diferentes resoluções.

### 10. Fora do escopo da primeira versão

Não implementar:
- Cadastro de usuários.
- Login.
- Galeria pública.
- Compartilhamento entre usuários.
- Ranking.
- Compra de roupas ou acessórios.
- Banco de dados remoto.
- Sincronização entre dispositivos.

### 11. Diretriz de desenvolvimento

Construa a aplicação completa, incluindo interface, componentes, estados e interações.

Não entregue apenas um protótipo visual ou uma tela estática.

Antes de concluir, verifique o funcionamento de todas as interações descritas nos requisitos e corrija eventuais problemas encontrados.

Priorize a funcionalidade e a consistência do comportamento do jogo.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://vibe-e-veste.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/89442551-9285-4a87-b74d-94dbdfe0e3c8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
