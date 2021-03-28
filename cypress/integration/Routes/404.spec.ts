it("verifies bad route will 404, properly directing user back Home", () => {
  cy.visit("/tardis");

  cy.findByRole("button", {
    name: /home/i,
  }).click();

  cy.findByRole("button", { name: /about/i });
});
