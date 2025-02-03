export function addDragAndDrop(sprite, input) {
    sprite.on('pointerdown', function() {
        this.setAlpha(0.5); // Уменьшаем непрозрачность
        this.setData('dragging', true); // Устанавливаем флаг перетаскивания
    });

    // Добавляем обработчик события при перемещении указателя
    input.on('pointermove', function(pointer) {        
        if (sprite.getData('dragging')) {
            // Перемещение спрайта к текущей позиции указателя
            sprite.x = pointer.x;
            sprite.y = pointer.y;
        }
    });

    // Добавляем обработчик события завершения перетаскивания
    sprite.on('pointerup', function() {
        this.setAlpha(1); // Восстанавливаем непрозрачность
        this.setData('dragging', false); // Сбрасываем флаг перетаскивания
    });

    // Добавляем событие, если указатель выходит за пределы спрайта
    sprite.on('pointerout', function() {
        this.setAlpha(1); // Восстанавливаем непрозрачность, если указатель вышел
        this.setData('dragging', false); // Сбрасываем флаг перетаскивания
    });
}