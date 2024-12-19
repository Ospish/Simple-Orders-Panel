<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
        <button id="products">Products</button>
        <button id="orders">Orders</button>
    </x-slot>
    @include('components.modal', ['name' => 'add-item' ])
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg relative">
                <div id="control_panel" class="pl-6 pt-6">
                    <div id="control_panel__orders" class="control_panel hidden"><button id="new_order">@include('sprites.plus')</button></div>
                    <div x-data id="control_panel__products" class="control_panel hidden"><button type="button" @click.prevent="$dispatch('open-modal', 'add-item')" id="new_product">@include('sprites.plus')</button></div>
                </div>
                <div id="content" class="p-6 text-gray-900 dark:text-gray-100">
                    <div id="content__header" class="font-bold text-2xl mb-3"></div>
                    <div id="content__body" class="grid gap-6 grid-cols-3">
                        {{ __("You're logged in!") }}
                    </div>
                </div>

            </div>
        </div>
    </div>
</x-app-layout>
