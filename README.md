# CafeHub

CafeHub is a full-stack web application written in Next.js and Django. 

## About project

Catalog of cafes: Find your perfect place to relax

Welcome to our Café Directory, your one-stop resource for finding great places to relax. Whether you're looking for a cozy coffee shop, a trendy coffee bar, or a charming restaurant, we'll help you find exactly what you're looking for. Check out our selection of places where you can relax, taste delicious food, and enjoy quality time with friends and family.

## What we offer:

A variety of cafes: In our catalog, you will find cafes of various styles - from cozy coffee shops on the street corner to chic city bistros. Whether you're a coffee drinker, a tea lover, or just looking for a relaxing atmosphere, you'll find a place to suit your taste.
Menu highlights: Discover a mouth-watering menu filled with artisanal pastries, flavorful drinks and savory snacks. Our cafes pride themselves on serving dishes made with local ingredients and unique flavor combinations.
Atmosphere: Each cafe has its own personality. Whether you prefer rustic charm, modern minimalism or a bohemian vibe, you'll find detailed descriptions of the ambiance, seating and overall atmosphere in our catalog.
Location: Find cafes that are conveniently located near parks, museums, or scenic spots. Whether you're exploring a new city or staying close to home, our directory will help you find the perfect cafe for your leisure time.

## Technologies that was used:
1. Django Rest Framework (For managing api views)
2. Next.js (As frontend)
3. AWS EC2 (As deploy service)
4. Celery (For managing sending letters)
5. Redis (As celery broker)
6. Docker-compose (For managing the microservices)
7. Swagger documentation

## Deploy

CafeHub is hosted on EC2 AWS instance  [web-site](http://13.48.146.199) on "http"

## Installation

To run this application, install [docker](https://www.docker.com/products/docker-desktop/) locally.
Use the docker-compose.yml file to start up an application.

### How to run:
- Copy .env.sample -> .env and populate with all required data
- `docker-compose up --build`
- Create admin user (Optional)
- `docker-compose exec -ti backend python manage.py createsuperuser`

Test admin user:
username: `yaros@gmail.com`
password: `111`

## Demo of site

<a href="https://ibb.co/kmQLL1k"><img src="https://i.ibb.co/1z8CC6h/1.jpg" alt="1" border="0" /></a>
<a href="https://ibb.co/fdBGBQ6"><img src="https://i.ibb.co/DfsgsLc/2.jpg" alt="2" border="0" /></a>
<a href="https://ibb.co/1X0mX85"><img src="https://i.ibb.co/5j1RjBy/3.jpg" alt="3" border="0" /></a>
<a href="https://ibb.co/DgY5nQn"><img src="https://i.ibb.co/1JM8xTx/4.jpg" alt="4" border="0" /></a>
<a href="https://ibb.co/k9B832F"><img src="https://i.ibb.co/txKsZp5/5.jpg" alt="5" border="0" /></a>

## License

MIT License

Copyright (c) 2024 [Yaroslav Biziuk](https://github.com/eLQeR), [Yevhen Vakhotskyi](https://github.com/ptbit)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
