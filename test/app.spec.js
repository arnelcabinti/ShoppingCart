'use strict';


const app = require('../app');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sandbox = sinon.createSandbox();

describe("Utils", () => {

    let prices,
        shopAddSpy,
        shopTotalSpy;

    beforeEach(function () {
        prices = sandbox.stub(app.Products.prototype,'priceRules').returns([]);
        shopAddSpy = sandbox.spy(app.ShoppingCart.prototype,'add');
        shopTotalSpy = sandbox.spy(app.ShoppingCart.prototype,'total');
    });

    afterEach(function () {
        sandbox.restore();
    });


    it("should return find value", (done) => {
        var utils = new app.Utils(),
            findingValue = utils.find([{ 'code' : '1234'}],'code','1234');
        expect(findingValue).to.deep.equal({ 'code' : '1234'});
        done();
    });

    it("should return array ojects", (done) => {
        assert.isFunction(prices, 'This is a function')
        assert.isArray(prices());
        done();
    });


    it("should add shopping cart", (done) => {
        var spy = shopAddSpy;
        var shopClass = new app.ShoppingCart([
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
                    productCode : 'ult_small',
                    productName : 'Unlimited 1GB',
                    price : 24.90
                },
                {
                    productCode : 'ult_large',
                    productName : 'Unlimited 5GB',
                    price : 44.90
                },
            ]);
            
        shopClass.add('ult_small');
        shopClass.add('ult_large');
        shopClass.add('ult_medium','I<3AMAYSIM');
        
        assert(spy.withArgs('ult_small').calledOnce);
        assert(spy.withArgs('ult_large').calledOnce);
        assert(spy.withArgs('ult_medium','I<3AMAYSIM').calledOnce);

        done();
        
    });
    
    it("should total shopping cart", (done) => {
        var spy = shopTotalSpy;

        var shopClass = new app.ShoppingCart([
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
                    productCode : 'ult_small',
                    productName : 'Unlimited 1GB',
                    price : 24.90
                },
                {
                    productCode : 'ult_large',
                    productName : 'Unlimited 5GB',
                    price : 44.90
                },
            ]);
        
        shopClass.add('ult_small');
        shopClass.add('ult_large');
        shopClass.add('ult_large');
        shopClass.add('ult_large');
        shopClass.add('ult_large');
        shopClass.add('ult_medium','I<3AMAYSIM');
        shopClass.total();
        assert(spy.calledOnce);
        done();
    });
});
  