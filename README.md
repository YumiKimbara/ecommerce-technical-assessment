# READ ME

## How to run the project

In the project directory, please run `yarn install` to install `node_modules` and then `yarn start`
Please open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Any additional features I implemented

I implemented Home(Product) page, Product Detail page, Checkout page. I used `react-router-dom` to manipulate smooth routing. Also, I used mui and mui icons for styling.

## My approach to the product, including any design decisions or tradeoﬀs I made

I tried to keep design simple to focus on the functionality, but implemented some styles for better UX. for example, I made a button disabled when selected item is zero, so user will understand they need to add products to click button. Also, I created short text "No Items in the cart" when user didn't add any product to the cart.

## How I could improve the performance of the app (e.g. loading state, caching, pagination)

I would like to add loading, infinite scrolling, image expanding when I focus on the image from product detail page. I also would like to use stripe to implement fake payment system.
