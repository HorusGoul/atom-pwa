it("verifies that application wont explode", () => {
  cy.visit("/");
  cy.reload();
});

it("verifies clicking around application works", () => {
  cy.visit("/");

  cy.findByRole("button", { name: /tests/i }).click();
  cy.reload();
  cy.findByText(/valences test/i).should("be.visible");
  cy.findAllByRole("button").eq(0).click();

  cy.findByRole("button", { name: /periodic table/i }).click();
  cy.reload();
  cy.findByRole("button", { name: /1 h hydrogen/i }).should("be.visible");
  cy.findAllByRole("button").eq(0).click();

  cy.findByRole("button", { name: /mass calculator/i }).click();
  cy.reload();
  cy.findByRole("button", {
    name: /add element/i,
  }).should("be.visible");
  cy.findAllByRole("button").eq(0).click();

  cy.findByRole("button", { name: /about/i }).click();
  cy.reload();
  cy.findByRole("button", { name: /change language/i }).should("be.visible");
  cy.findAllByRole("button").eq(0).click();
});
