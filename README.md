# Programa Desenvolve - FrontEnd | Grupo Boticário

Bem-vindo ao projeto Solamigo, uma loja online de cosméticos especializada em produtos de proteção solar e cuidados para pets e seus donos. Este projeto foi desenvolvido como parte do curso Desenvolve, administrado pela escola de Tecnologia Alura, onde aprendi conceitos fundamentais de desenvolvimento web e a construção de APIs com Node.js e MongoDB. 🐾

📋 Índice
- Descrição
- Funcionalidades
- Tecnologias Utilizadas
- Fotos Geradas por IA
- Integração com Backend
- Instalação
- Uso
- Contribuição
- Autor
  
Descrição

A Solamigo é uma loja online que oferece uma variedade de cosméticos, como protetores solares e hidratantes, desenvolvidos para pets e seus donos. O projeto inclui páginas para visualização de produtos, kits, login, cadastro de usuários, e um carrinho de compras funcional.

🚀 Funcionalidades
- Carrossel interativo 🎠
- Design responsivo 📱
- Login e gerenciamento de conta de usuário 🔐
  
🛠️ Tecnologias Utilizadas
- HTML5 🏷️
- CSS3 🎨
- JavaScript 💻
  
📷 Fotos Geradas por IA
As fotos utilizadas no site foram geradas com Inteligência Artificial a partir de descrições detalhadas que incluíam cores, estilos e o nome da marca. As imagens incluem produtos e modelos simulando tutores e seus pets.

🔗 Integração com Backend
A exibição dos produtos e kits na página web da Solamigo é realizada através da integração entre o frontend e o backend, que utiliza o banco de dados MongoDB.

Como Funciona:
- Backend: O backend foi desenvolvido usando Node.js e Express.js, com MongoDB como banco de dados para armazenar as informações dos produtos e kits.
- API REST: Uma API REST foi criada para gerenciar a comunicação entre o frontend e o banco de dados. As rotas da API permitem obter, criar, atualizar e deletar produtos e kits no banco de dados MongoDB.
- Frontend: Quando a página web é carregada, o frontend envia uma requisição para a API REST. A API, por sua vez, consulta o MongoDB e retorna os dados necessários, como nome, descrição e preço dos produtos e kits.
- Exibição Dinâmica: Os dados recebidos do backend são inseridos dinamicamente na página web, garantindo que as informações exibidas estejam sempre atualizadas.
  
Benefícios dessa Integração:
- Atualização em Tempo Real: Qualquer modificação nos produtos ou kits (como alteração de preço ou descrição) no banco de dados é refletida automaticamente na página web.
- Eficiência: O uso do MongoDB permite um acesso rápido e eficiente aos dados, tornando o carregamento dos produtos ágil.
- Escalabilidade: O MongoDB permite a escalabilidade do banco de dados, essencial para a expansão da loja e o aumento do número de produtos e kits disponíveis.

# Instalação
Clone os repositórios e instale as dependências:

// Crie um diretório para o projeto e clone os repositórios:
- mkdir ~/boticario-desenvolve
- cd ~/boticario-desenvolve
- git clone https://github.com/kaErnest/boticario-desenvolve-backend backend
- git clone https://github.com/kaErnest/boticario-desenvolve-FrontEnd frontend

// Instale as dependências:
- cd backend
  npm install
- cd ../frontend
  npm install

// Uso
Inicie o servidor backend e a aplicação frontend:
- No diretório backend: npm start
- No diretório frontend: open ~/boticario-desenvolve/frontend/index.html

🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou sugerir melhorias.

✍️ Autor
Karoline Ernest
Desenvolvedora Full Stack
