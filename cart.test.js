const cart = require('./cart.js');
const cars = require('./data/cars.js');

describe('Cart Properties', () => {
    test('cart type', () => expect(cart.cart).toEqual([]));
    test('cart length', () => expect(cart.cart.length).toBe(0));
    test('total type', () => expect(typeof cart.total).toBe('number'));
    test('total value', () => expect(cart.total).toBe(0));
});

describe('Cart Methods', () => {
    afterEach(function () {
        // reset total property
        cart.cart = [];
        // reset cart to empty array
        cart.total = 0;
    });
    test('addToCart', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        expect(cart.cart.length).toBe(2);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[1]);
        expect(cart.total).toBe(cars[0].price + cars[1].price);
    });
    test('removeFromCart', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[2]);
        expect(cart.cart.length).toBe(3);
        expect(cart.total).toBe(cars[0].price + cars[1].price + cars[2].price);
        cart.removeFromCart(1, cars[1].price);
        expect(cart.cart.length).toBe(2);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[2]);
        expect(cart.total).toBe(cars[0].price + cars[2].price);
    });
    test('checkout', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        expect(cart.cart.length).toBe(2);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[1]);
        expect(cart.total).toBe(cars[0].price + cars[1].price);
        cart.checkout();
        expect(cart.cart.length).toBe(0);
        expect(cart.total).toBe(0);
    });
});
