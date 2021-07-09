# Tecnologias e Programação Web, Projeto 02
- The aim of this second project was to addapt the one developed previously, which only used Django.
- Thus, the all-new version of **Mercadinho dos Cliques** is an Angular-App, using a Django-Rest API as the backbone for the majority of interactions. Similarly to before, it emulates an online grocery-store, providing all the functionalities needed to manage an online store, and buying items.
- All the functionalities you expect to find are covered and implemented.



### Features
There are two types of users in our system: an *administrator* and a *regular user*. A *regular user* cannot do everything an *administrator* can, and vice-versa. However, there are a couple of key-features that are available to both user-groups.

A brief breakdown of each can  be found in the following table

| TYPE    | CAN DO | CAN'T DO |
| ------- | -------- | -------- |
| *ADMIN* | View all products in store; View a specific product details; Search for a product/brand; View the stores' stock; Edit a product; Add a new product | Purchase a(several) products; Place an order; Review its past orders; Manage its personal account |
| *CLIENT* | View all products in store; View a specific product details; Search for a product/brand; Purchase a(several) products; Place an order; Review its past orders; Manage its personal account | View the stores' stock; Edit a product; Add a new product |
| *NOT LOGGED IN* | Create an Account; View all products in store; View a specific product details; Search for a product/brand | Purchase a(several) products; Place an order; Review its past orders; Manage its personal account; View the stores' stock; Edit a product; Add a new product



#### Accessing the App
The app has been deployed in Heroku, and may be accessed via the following link [Mercadinho dos Cliques](https://tpw-angular-frontend.herokuapp.com/).<br>
The backend of the app was deployed on a Raspbery Pi, and is accessible on the DNS - 94.60.22.100. The following link [Products endpoint](http://94.60.22.100/ws/products) is an example of an endpoint.

You can register yourself in order to gain access to some functionalities (as a client), but we also have two accounts listed bellow, created and used in development :) 

| TYPE | USERNAME | PASSWORD |
| ---- | -------- | -------- |
| *ADMIN* | gestor | gestor |
| *CLIENT* | cliente | cliente |



----------
## Authors
##### [Lucas Sousa](https://github.com/l-sousa/) (nmec 93019)
##### [Francisca Barros](https://github.com/itskikat/) (nmec 93102)

UA, 2020/2021
