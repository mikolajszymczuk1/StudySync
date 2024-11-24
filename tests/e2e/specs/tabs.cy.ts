describe('Tabs', (): void => {
  describe('General logic', (): void => {
    it('Visit all tabs in the app', (): void => {
      cy.login('cypress', 'password123');

      cy.get('[data-cy="tabButtonProfile"]').click();
      cy.get('[data-cy="tabHeadingProfile"]').contains('Welcome, cypress');
      cy.wait(200);

      cy.get('[data-cy="tabButtonEvents"]').click();
      cy.get('[data-cy="tabHeadingEvents"]').contains('Setup your events');
      cy.wait(200);

      cy.get('[data-cy="tabButtonHome"]').click();
      cy.get('[data-cy="tabHeadingHome"]').contains(
        'Become a time management master',
      );
      cy.wait(200);

      cy.get('[data-cy="tabButtonSubjects"]').click();
      cy.get('[data-cy="tabHeadingSubjects"]').contains('Setup your subjects');
      cy.wait(200);

      cy.get('[data-cy="tabButtonGrades"]').click();
      cy.get('[data-cy="tabHeadingGrades"]').contains('Manage your grades');
      cy.wait(200);

      cy.get('[data-cy="tabButtonHome"]').click();
    });
  });

  describe('Tab Home', (): void => {
    it('Go to manage events page from home tab', (): void => {
      cy.login('cypress', 'password123');
      cy.wait(200);
      cy.get('[data-cy="goToManageEventsTabButton"]').click();
      cy.get('[data-cy="tabHeadingEvents"]').contains('Setup your events');
    });

    it('Create two todos', (): void => {
      cy.login('cypress', 'password123');
      cy.wait(200);
      cy.removeAllTodos();
      cy.createTodo('first todo');
    });

    it('Remove one todo', (): void => {
      cy.login('cypress', 'password123');
      cy.wait(200);
      cy.removeAllTodos();
      cy.createTodo('Todo 1');
      cy.createTodo('Todo 2');
      cy.get('[data-cy="singleTodo"]')
        .first()
        .find('[data-cy="todoTrashButton"]')
        .click();

      cy.get('[data-cy="singleTodo"]').contains('Todo 2');
    });

    it('Create some todos and reorder them', (): void => {
      cy.login('cypress', 'password123');
      cy.wait(200);
      cy.removeAllTodos();

      for (let i = 0; i < 4; i++) {
        cy.createTodo(`Todo ${i + 1}`);
      }

      cy.get('[data-cy="singleTodo"]').eq(3).drag('[data-cy="singleTodo"]');
      cy.get('[data-cy="singleTodo"]').eq(2).drag('[data-cy="singleTodo"]');
      cy.get('[data-cy="singleTodo"]').eq(0).contains('Todo 2');
      cy.get('[data-cy="singleTodo"]').eq(1).contains('Todo 4');
      cy.get('[data-cy="singleTodo"]').eq(2).contains('Todo 1');
      cy.get('[data-cy="singleTodo"]').eq(3).contains('Todo 3');
    });

    it('Edit todo', (): void => {
      cy.login('cypress', 'password123');
      cy.wait(200);
      cy.get('[data-cy="singleTodo"]')
        .eq(0)
        .find('[data-cy="todoEditName"]')
        .click();
      cy.get('[data-cy="todoNameInput"]').clear();
      cy.get('[data-cy="todoNameInput"]').type('Updated todo');
      cy.get('[data-cy="modalUpdateSaveButton"]').click();
      cy.wait(200);
      cy.get('[data-cy="singleTodo"]').eq(0).contains('Updated todo');
    });
  });

  describe('Tab Profile', (): void => {
    it('Change user base info', (): void => {
      cy.login('cypress', 'password123');
      cy.get('[data-cy="tabButtonProfile"]').click();
      cy.get('[data-cy="profileChangeFirstNameButton"]').click();
      cy.get('[data-cy="profileInput"]').clear();
      cy.get('[data-cy="profileInput"]').type('New firstname');
      cy.get('[data-cy="modalUpdateSaveButton"]').click();

      cy.get('[data-cy="profileChangeLastNameButton"]').click();
      cy.get('[data-cy="profileInput"]').clear();
      cy.get('[data-cy="profileInput"]').type('New lastname');
      cy.get('[data-cy="modalUpdateSaveButton"]').click();

      cy.wait(400);

      cy.get('[data-cy="profileFirstname"]').contains('New firstname');
      cy.get('[data-cy="profileLastname"]').contains('New lastname');
    });
  });

  describe('Tab Subjects', (): void => {
    it('Create three subjects, drag one to some other day, edit and remove, finally create another subject', (): void => {
      cy.login('cypress', 'password123');
      cy.get('[data-cy="tabButtonSubjects"]').click();
      cy.removeAllSubjects();
      cy.addSubject('Subject 1', 'room', 'Monday');
      cy.addSubject('Subject 2', 'room', 'Tuesday');
      cy.addSubject('Subject 3', 'room', 'Friday');

      cy.get('[data-cy="subjectsDayGroup_Monday"]')
        .find('[data-cy="subjectCard"]')
        .contains('Subject 1');

      cy.get('[data-cy="subjectsDayGroup_Tuesday"]')
        .find('[data-cy="subjectCard"]')
        .contains('Subject 2');

      cy.get('[data-cy="subjectsDayGroup_Friday"]')
        .find('[data-cy="subjectCard"]')
        .contains('Subject 3');

      cy.wait(400);

      cy.get('[data-cy="subjectsDayGroup_Friday"]')
        .find('[data-cy="subjectCard"]')
        .drag('[data-cy="subjectsDayGroup_Thursday"]', { force: true });

      cy.wait(400);

      cy.get('[data-cy="subjectsDayGroup_Monday"]')
        .find('[data-cy="subjectCard"]')
        .drag('[data-cy="subjectsDayGroup_Friday"]', { force: true });

      cy.get('[data-cy="subjectsDayGroup_Tuesday"]')
        .find('[data-cy="subjectCard"]')
        .contains('Subject 2');

      cy.get('[data-cy="subjectsDayGroup_Thursday"]')
        .find('[data-cy="subjectCard"]')
        .contains('Subject 3');

      cy.get('[data-cy="subjectsDayGroup_Friday"]')
        .find('[data-cy="subjectCard"]')
        .contains('Subject 1');

      cy.get('[data-cy="subjectsDayGroup_Friday"]')
        .find('[data-cy="subjectCard"]')
        .click({ force: true });

      cy.get('[data-cy="subjectNameInput"] input')
        .as('subjectNameInput')
        .clear({ force: true });
      cy.get('@subjectNameInput').type('Updated Subject 1', { force: true });

      cy.get('[data-cy="modalUpdateSaveButton"]').click();

      cy.get('[data-cy="subjectsDayGroup_Friday"]')
        .find('[data-cy="subjectCard"]')
        .contains('Updated Subject 1');

      cy.get('[data-cy="subjectsDayGroup_Friday"]')
        .find('[data-cy="subjectCard"]')
        .click({ force: true });

      cy.get('[data-cy="modalDeleteButton"]').click();
    });

    it('Find one specific subject by searchbar', (): void => {
      cy.login('cypress', 'password123');
      cy.get('[data-cy="tabButtonSubjects"]').click();
      cy.get('[data-cy="subjectSearchBar"] input').clear({ force: true });
      cy.get('[data-cy="subjectSearchBar"] input').type('Subject 3', {
        force: true,
      });
      cy.get('[data-cy="subjectCard"]').contains('Subject 3');
    });
  });

  describe('Tab Grades', (): void => {
    it('Change some grades', (): void => {
      cy.login('cypress', 'password123');
      cy.get('[data-cy="tabButtonGrades"]').click();
      cy.get('[data-cy="subjectGradeCard"]').eq(0).click();
      cy.get('[data-cy="gradeInput"]').click();
      cy.get('ion-item').contains('2').click();
      cy.get('[data-cy="modalUpdateSaveButton"]').click({ force: true });
      cy.get('[data-cy="subjectGradeValue"]').eq(0).contains('2');
    });
  });

  describe('Tab Events', (): void => {
    const createEvent = (name: string): void => {
      cy.get('[data-cy="addEvent"]').click();
      cy.get('[data-cy="eventNameInput"] input').as('eventNameInput').clear();
      cy.get('@eventNameInput').type(name);
      cy.get('[data-cy="modalUpdateSaveButton"]').click();
    };

    const deleteAllEvents = (): void => {
      cy.get('[data-cy="eventCard"]').each((eventCard) => {
        cy.wrap(eventCard).click({ force: true });
        cy.get('[data-cy="modalDeleteButton"]').click();
        cy.wait(200);
      });
    };

    it('Create, edit, remove event', (): void => {
      cy.login('cypress', 'password123');
      cy.get('[data-cy="tabButtonEvents"]').click();

      createEvent('test');
      deleteAllEvents();

      createEvent('New Event 1');
      cy.get('[data-cy="eventCard"]').contains('New Event 1');

      cy.wait(400);

      cy.get('[data-cy="eventCard"]').eq(0).click({ force: true });
      cy.get('[data-cy="eventNameInput"] input').clear();
      cy.get('[data-cy="eventNameInput"] input').type('Updated Event 1', {
        force: true,
      });
      cy.get('[data-cy="modalUpdateSaveButton"]').click();
    });

    it('Find some event by searchbar', (): void => {
      cy.login('cypress', 'password123');
      cy.get('[data-cy="tabButtonEvents"]').click();

      createEvent('test');
      deleteAllEvents();

      createEvent('Event 1');
      createEvent('Event 2');

      cy.get('[data-cy="eventSearchBar"] input').clear({ force: true });
      cy.get('[data-cy="eventSearchBar"] input').type('Event 2', {
        force: true,
      });
      cy.get('[data-cy="eventCard"]').contains('Event 2');
    });
  });
});
