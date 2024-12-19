import './bootstrap';

import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.start()

export default class core {
    static contentHeader = document.querySelector('#content__header')
    static contentBody = document.querySelector('#content__body')

    static init() {
        const productsBtn = document.querySelector('#products')
        const ordersBtn = document.querySelector('#orders')

        // Init buttons
        productsBtn.addEventListener('click', function () { core.refreshProducts() })
        ordersBtn.addEventListener('click', function () { core.refreshOrders() })

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

        addItemBtn.addEventListener('click', function () {
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

        document.querySelector('#new_order').addEventListener('click', function () {
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
                output += '<div data-id="'+elem.id+'" class="order_card">' +
                    '<div class="font-bold">Заказ №'+elem.id+'</div>' +
                    '<div>Пользователь: '+elem.user_name+'</div>' +
                    '<div>Статус: '+elem.status_text+'</div>' +
                    '<svg class="btn_remove" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m12.75 5c0-.41421-.3358-.75-.75-.75s-.75.33579-.75.75v6.25h-6.25c-.41421 0-.75.3358-.75.75s.33579.75.75.75h6.25v6.25c0 .4142.3358.75.75.75s.75-.3358.75-.75v-6.25h6.25c.4142 0 .75-.3358.75-.75s-.3358-.75-.75-.75h-6.25z" fill="#000000" fill-rule="evenodd"/></svg>' +
                    '</div>'
            })
            core.refreshPanel('orders')
            core.contentBody.dataset.page = 'orders'
            core.contentBody.innerHTML = output;
            core.initRemoveBtns()
        })
    }

    static refreshProducts() {
        core.sendGet('/products').then(response => {
            core.contentHeader.innerHTML = 'Продукты:'
            let output = ''
            response.forEach(function (elem) {
                output += '<div data-id="'+elem.id+'" class="product_card">' +
                    '<img alt="Image picture" src="https://placehold.co/240x240">' +
                    '<div class="product_card__info">' +
                        '<div>'+elem.name+'</div>' +
                        '<div>'+elem.price+' ₽</div>' +
                    '</div>' +
                    '<svg class="btn_remove" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m12.75 5c0-.41421-.3358-.75-.75-.75s-.75.33579-.75.75v6.25h-6.25c-.41421 0-.75.3358-.75.75s.33579.75.75.75h6.25v6.25c0 .4142.3358.75.75.75s.75-.3358.75-.75v-6.25h6.25c.4142 0 .75-.3358.75-.75s-.3358-.75-.75-.75h-6.25z" fill="#000000" fill-rule="evenodd"/></svg>' +
                    '</div>'
            })
            core.refreshPanel('products')
            core.contentBody.dataset.page = 'products'
            core.contentBody.innerHTML = output;
            core.initRemoveBtns()
        })
    }

    static initRemoveBtns() {
        const removeBtns = document.querySelectorAll('.btn_remove')
        const curPage = core.contentBody.dataset.page
        removeBtns.forEach(function (elem) {
            elem.addEventListener('click', function () {
                //if (window.validateInputs([addItemName, addItemPrice])) {
                let body = {
                    id: elem.closest('.'+curPage.slice(0, -1)+'_card').dataset.id
                }
                console.log(body)
                core.sendPost('/'+core.contentBody.dataset.page+'/remove', body).then(response => {
                    if (curPage === 'orders') core.refreshOrders()
                    if (curPage === 'products') core.refreshProducts()
                    console.log(response)
                })
                //}
            })
        })
    }
}

core.init()
