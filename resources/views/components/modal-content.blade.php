<div>
    Добавление товара
    <input id="add_item_name" @change="this.classList.remove('invalid')" type="text" name="product_name" placeholder="Название товара">
    <input id="add_item_price" @change="this.classList.remove('invalid')" type="text" name="price" placeholder="Цена">
    <button id="add_item_btn" @click.prevent="core.addItemPrice && $dispatch('close-modal', 'add-item')" type="button">Добавить</button>
</div>
