import { community, email, pass, textToAdd } from '../fixtures/constants'

describe('Interview assignment', () => {
  it('signs in user, creates post and then deletes it', () => {
    cy.login(email, pass)
      .createPost(community, textToAdd)
      .then(id => {
        cy.deletePost(id)
      })
  })
})
