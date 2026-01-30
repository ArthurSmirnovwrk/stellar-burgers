beforeEach(() => {
  cy.mockIngredients();
  cy.visit('/');
  cy.wait('@getIngredients');
});

afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

describe('Добавление ингредиентов в конструктор', () => {
  it('добавляет мясо (Говяжий метеорит) в конструктор', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa0940"]').find('button').click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('[data-testid="constructor-643d69a5c3f7b9001cfa0940"]').should('exist');
    });
  });

  it('добавляет булку в конструктор', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093d"]').find('button').click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.contains('Флюоресцентная булка R2-D3 (верх)').should('exist');
      cy.contains('Флюоресцентная булка R2-D3 (низ)').should('exist');
    });
  });
});

describe('Работа модального окна ингредиента', () => {
  it('открывает модальное окно для мяса (Говяжий метеорит) и проверяет отображаемые данные', () => {
  cy.get('[data-testid="643d69a5c3f7b9001cfa0940"]').find('a').click();

  cy.get('[data-testid="modal"]').should('be.visible');

  cy.get('[data-testid="ingredient-name"]').should('contain.text', 'Говяжий метеорит (отбивная)');
  cy.get('[data-testid="calories"]').should('contain.text', '2674');
  cy.get('[data-testid="proteins"]').should('contain.text', '800');
  cy.get('[data-testid="fats"]').should('contain.text', '800');
  cy.get('[data-testid="carbs"]').should('contain.text', '300');
});

  it('закрывает модальное окно по крестику', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa0940"]').find('a').click();
    cy.get('[data-testid="modal"]')
      .first()
      .within(() => {
        cy.get('[data-testid="modal-close"]').click();
      });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('закрытие модального окна при клике на оверлей', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093d"]').click();
    cy.get('[data-testid="modal-overlay"]').click({ force: true });

    cy.get('[data-testid="modal"]').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.mockUser();
    cy.setToken();
    cy.mockOrder();
    cy.reload();
    cy.wait('@getUser');
  });

  it('создает заказ и показывает номер', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093d"]').find('button').click();
    cy.get('[data-testid="643d69a5c3f7b9001cfa0940"]').find('button').click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('[data-testid="constructor-orderButton"]').click();
    });

    cy.wait('@orderBurger');
    cy.get('[data-testid="modal"]').should('be.visible').contains('12345');
  });

  it('закрывает модальное окно заказа и очищает конструктор', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093d"]').find('button').click();
    cy.get('[data-testid="643d69a5c3f7b9001cfa0940"]').find('button').click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('[data-testid="constructor-orderButton"]').click();
    });

    cy.wait('@orderBurger');

    cy.get('[data-testid="modal"]')
      .first()
      .within(() => {
        cy.get('[data-testid="modal-close"]').click();
      });

    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});