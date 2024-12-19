<div class="text-center p-12">
    <div class="mb-4 text-2xl">Добавление товара</div>
    <input id="add_item_name" @change="event.target.classList.remove('invalid')" type="text" name="product_name" placeholder="Название товара">
    <input id="add_item_price" @change="event.target.classList.remove('invalid')" type="number" name="price" placeholder="Цена">
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" id="add_item_btn" @click="window.validateInputs([document.getElementById('add_item_name'), document.getElementById('add_item_price')]) && $dispatch('close-modal', 'add-item')" type="button">Добавить</button>
{{--    <div>Проверьте значения</div>--}}
</div>
