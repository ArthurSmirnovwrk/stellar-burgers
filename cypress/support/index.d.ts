declare namespace Cypress {
  interface Chainable {
    // Моковые данные для ингредиентов
    mockIngredients(): Chainable<any>;

    // Моковые данные для пользователя
    mockUser(): Chainable<any>;

    // Моковые данные для заказа
    mockOrder(): Chainable<any>;

    // Устанавливаем фейковые токены для авторизации
    setToken(): Chainable<any>;

    // Перезаписываем стандартную команду для очистки localStorage
    clearLocalStorage(): Chainable<any>;

    // Дополнительная команда для очистки куки
    clearAuthCookies(): Chainable<any>;
  }
}