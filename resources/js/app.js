import './bootstrap';

import Alpine from 'alpinejs'
import {dispatch} from "alpinejs/src/utils/dispatch.js";

window.Alpine = Alpine

Alpine.start()

export default class core {
    static contentHeader = document.querySelector('#content__header')
    static contentBody = document.querySelector('#content__body')

    static init() {
        const productsBtn = document.querySelector('#products')
        const ordersBtn = document.querySelector('#orders')

        // Init buttons
        productsBtn.addEventListener('click', function (e) { core.refreshProducts() })
        ordersBtn.addEventListener('click', function (e) { core.refreshOrders() })

        const addItemName = document.querySelector('#add_item_name')
        const addItemPrice = document.querySelector('#add_item_price')
        const addItemBtn = document.querySelector('#add_item_btn')

        // Simple frontend validation function
        window.validateInputs = (elem) => {
            if (!Array.isArray(elem)) elem = [elem]
            let isValid = true

            elem.forEach((e) => {
                if (e.type === 'text' && e.value === '' || e.type === 'number' && e.value < 0.01) {
                    isValid = false
                    e.classList.add('invalid')
                }
            })

            return isValid
        }

        addItemBtn.addEventListener('click', function (e) {
            if (window.validateInputs([addItemName, addItemPrice])) {
                let body = {
                    'name': addItemName.value,
                    'price': addItemPrice.value
                }
                core.sendPost('/products/add', body).then(response => {
                    core.refreshProducts()
                    console.log(response)
                })
            }
        })


        document.querySelector('#new_order').addEventListener('click', function (e) {
            //if (window.validateInputs([addItemName, addItemPrice])) {
                let body = {
                }
                core.sendPost('/orders/add', body).then(response => {
                    core.refreshOrders()
                    console.log(response)
                })
            //}
        })
    }

    // Article view function (sends the AJAX request)
    static async sendGet(url) {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });
            if (!response.ok) {
                console.error(response.body);
            }

            return await response.json()
        } catch (error) {
            throw new Error(error);
        }
    }

    // Article like function (sends the AJAX request)
    static async sendPost(url, body) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                console.error(response.body);
            }

            return await response.json()
        } catch (error) {
            throw new Error(error);
        }
    }

    static refreshPanel(slug) {
        document.querySelectorAll('.control_panel').forEach(function (elem) {
            elem.classList.add('hidden')
        })
        document.querySelector('#control_panel__'+slug).classList.remove('hidden')
    }

    static refreshOrders() {
        core.sendGet('/orders').then(response => {
            core.contentHeader.innerHTML = 'Заказы:'
            let output = ''
            response.forEach(function (elem) {
                output += '<div class="order_card">' +
                    '<div class="font-bold">Заказ №'+elem.id+'</div>' +
                    '<div>Пользователь: '+elem.user_name+'</div>' +
                    '<div>Статус: '+elem.status_text+'</div></div>'
            })
            core.refreshPanel('orders')
            core.contentBody.innerHTML = output;
        })
    }

    static refreshProducts() {

        core.sendGet('/products').then(response => {
            core.contentHeader.innerHTML = 'Продукты:'
            let output = ''
            response.forEach(function (elem) {
                output += '<div class="product_card">' +
                    '<img src="https://placehold.co/240x240">' +
                    '<div class="product_card__info">' +
                        '<div>'+elem.name+'</div>' +
                        '<div>'+elem.price+' ₽</div>' +
                    '</div></div>'
            })
            core.refreshPanel('products')

            core.contentBody.innerHTML = output;
        })
    }
}

core.init()
