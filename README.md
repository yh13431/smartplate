<p align="center">
  <img src="https://github.com/yh13431/smartplate/assets/106964833/df979b94-c0b7-4872-9580-d90ae26d3525" width="300" height="300"/>
  <h3 align="center">SmartPlate</h3>
  <p align="center">
    Full stack TypeScript and Python web application for nutrition tracking
    <br/>
    <br/>
    <a href="https://github.com/yh13431/smartplate"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</p>



## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [License](#license)


## About The Project

This application was created to help myself with my macronutrient tracking, and also try out new recipes that are within my caloric budget.


https://github.com/yh13431/smartplate/assets/106964833/b7008d55-f5b9-4a0b-ba3e-1c844e486f39


Users must first log in with a Google Account, then they can interact with the web application.


https://github.com/yh13431/smartplate/assets/106964833/2346c627-0929-4e71-b645-6a5e0d4dfc99


The calculator page leverages the Nutritionix API to gather the macronutrient breakdown of the food item that the user inputs. The user can input both ingredients and actual meals, and if multiple foods are entered, the calculator will return their total breakdown.


https://github.com/yh13431/smartplate/assets/106964833/51fcc4d0-a5f8-4129-9a35-ba9991a4db5d


The recommendation page recommends users 5 recipes from a list of over 20,000 recipes based on the users' desired calories, proteins, and fats intake. This was done using content-based filtering, where recipes are vectorised and compared using cosine similarity.


https://github.com/yh13431/smartplate/assets/106964833/823f88bf-c6e0-4173-88ef-b4e1f27359db


Users can then save these recipes for future use.

## Built With

Written in: TypeScript, Python

Authentication: NextAuth

Backend: Flask, MongoDB

Frontend: Next.js, TailwindCSS

## License

Distributed under the MIT License. See [LICENSE](https://github.com/yh13431/smartplate/blob/main/LICENSE.md) for more information.

## Acknowledgements

* [Nutritionix](https://developer.nutritionix.com/)

* [Epicurious](https://www.kaggle.com/datasets/hugodarwood/epirecipes?rvi=1&select=epi_r.csv/)
