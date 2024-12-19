<?php
return [
    'status' => [
        0 => 'Не оплачен',
        1 => 'Доставка',
        2 => 'Возврат',
        3 => 'Завершён'
    ],
    define('ORDER_NOT_PAID', 0),
    define('ORDER_PROCESSING', 1),
    define('ORDER_RETURNED', 2),
    define('ORDER_FINISHED', 2),
];
