
'use strict';


class Utils {

    constructor(){}
    // utils to find item. Used for repeting instances
    find(list,findKeyName,compairingValue){
        for(let i = 0; i < list.length ; i++){
            let item = list[i];
            
            if(item[findKeyName] === compairingValue){
                return item;   
            }
            
        }
    }
}

class Products {

    constructor(){
        this.products = [
            {
                productCode : 'ult_small',
                productName : 'Unlimited 1GB',
                price : 24.90
            },
            {
                productCode : 'ult_medium',
                productName : 'Unlimited 2GB',
                price : 29.90
            },
            {
                productCode : 'ult_large',
                productName : 'Unlimited 5GB',
                price : 44.90
            },
            {
                productCode : '1gb',
                productName : '1 GB Data-pack',
                price : 9.90
            }
        ];
    }

    // return products
    priceRules(){
        return this.products;
    }

}

class ShoppingCart {

    constructor(products){
        this.products = products;
        this.cart = [];
        this.countUtlSmall = 0;
        this.countUtlLarge = 0;
    }

    // Add item with promo code in the cart
    add(itemCode,promoCode){
        let items = this.products,
            cart = this.cart;

        for(let i = 0; i < items.length ; i++){
            let item = items[i];
            
            if(item.productCode === itemCode){
                cart.push({
                    productCode : item.productCode,
                    productName :  item.productName,
                    price : item.price,
                    promoCode : typeof promoCode === 'undefined' ? '' : promoCode
                });

                // add free 1gb for every Unlimited 2GB 
                if(itemCode === 'ult_medium'){
                    cart.push(this.free());
                }

                if(itemCode === 'ult_small'){
                    this.countUtlSmall++; // count how many utl_small on the cart
                }

                if(itemCode === 'ult_large'){
                    this.countUtlLarge++; // count how many utl_medium on the cart
                }

                this.cart = cart;
                return 'Success'
            }
            
        }        
    }

    items(){
        console.log(this.cart);
    }

    clear(){
        this.cart = [];
        this.cart = [];
        this.countUtlSmall = 0;
        this.countUtlLarge = 0;
    }

    free(){
        // free 1GB

        let utils = new Utils(),
            findFree = utils.find(this.products,'productCode','1gb'),
            newObject = Object.assign({},findFree); // create new instance of an object to prevent override

        newObject.price = 'FREE';

        return newObject;
    }

    total() {
        let subTotal = 0,
            total = 0,
            hasPromoCode = false;
        
        for(let i = 0; i < this.cart.length ; i++){
            let item = this.cart[i];
            
            if(item.price !== 'FREE'){
                subTotal += item.price;
            }

            // has promo code
            if(item.promoCode === 'I<3AMAYSIM'){ 
                hasPromoCode = true;
            }

        }

        total = (subTotal - this.computeThreeforTwo()) - this.computeBulkDiscount();

        total = hasPromoCode ? (total * 0.90) : total;
        
        console.log(`$${total.toFixed(2)}`);

    }

    computeThreeforTwo(){
        let utils = new Utils(),
            findSmall = utils.find(this.products,'productCode','ult_small'),
            count = Math.floor(this.countUtlSmall / 3);  
        
        if(count > 0){
            return findSmall.price * count;
        }
        return 0;
    }
    
    computeBulkDiscount(){
        let utils = new Utils(),
            findLarge = utils.find(this.products,'productCode','ult_large'),
            discount = (findLarge.price - 39.90) * this.countUtlLarge;
        if(this.countUtlLarge > 3){
            return discount;
        }
        return 0;
    }

}



const main = () => {
        
    let products = new Products();

    let priceRules = products.priceRules();

    let cart = new ShoppingCart(priceRules);

    // scenario 1
    cart.add('ult_small');
    cart.add('ult_small');
    cart.add('ult_small');
    cart.add('ult_large');
    cart.total();
    cart.items();
    cart.clear();

    // scenario 2
    cart.add('ult_small');
    cart.add('ult_small');
    cart.add('ult_large');
    cart.add('ult_large');
    cart.add('ult_large');
    cart.add('ult_large');
    cart.total();
    cart.items();
    cart.clear();

    // scenario 3
    cart.add('ult_small');
    cart.add('ult_medium');
    cart.add('ult_medium');
    cart.total();
    cart.items();
    cart.clear();

    // scenario 4
    cart.add('ult_small');
    cart.add('1gb','I<3AMAYSIM');
    cart.total();
    cart.items();
}

main();


module.exports = {
    main : main,
    Utils : Utils,
    Products : Products,
    ShoppingCart : ShoppingCart
}
















