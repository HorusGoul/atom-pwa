it("verify that application wont explode", () => {
  cy.visit("/");
  cy.reload();
});
