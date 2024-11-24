declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Login user to account
     * @param {string} username username
     * @param {string} password password
     */
    login(username: string, password: string): Chainable<Subject>;

    /**
     * Create new account (mainly use to create cypress account)
     * @param {string} username username
     * @param {string} password password
     */
    createAccount(username: string, password: string): Chainable<Subject>;

    /**
     * Create new todo
     * @param {string} name name of todo
     */
    createTodo(name: string): Chainable<Subject>;

    /** Remove all todos from home tab */
    removeAllTodos(): Chainable<Subject>;

    /** Remove all created subjects */
    removeAllSubjects(): Chainable<Subject>;

    /**
     * Create new subject element
     * @param {string} name name of subject
     * @param {string} classRoom class room name / class room number
     * @param {string} day subject initial day
     */
    addSubject(
      name: string,
      classRoom: string,
      day: string,
    ): Chainable<Subject>;
  }
}
