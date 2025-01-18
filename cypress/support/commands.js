import { endpoints, usePassword } from '../fixtures/constants'
import { postCreation, postManagement, signIn } from '../fixtures/selectors'

const { emailInput, passwordInput, submitButton } = signIn
const { startConversationPanel, postEditorHeaderInput, communityTitle, postEditorContent, postEditorControlPanel } = postCreation
const { deleteMenuItem, postId } = postManagement

const { createPost, deletePost, login, postFeed } = endpoints

Cypress.Commands.add('deletePost', id => {
  Cypress.log({
    message: 'deletePost',
  })
  cy.intercept('DELETE', deletePost(id)).as('deletePost')
  cy.get(postId(id)).within(() => {
    // interview note: prone to flakines, would add data-testid to each button
    cy.get('button').eq(1).click()
  })
  cy.get(deleteMenuItem).click().wait('@deletePost').its('response.statusCode').should('eq', 204)
})

Cypress.Commands.add('createPost', (community, textToAdd) => {
  Cypress.log({
    message: 'createPost',
  })
  cy.intercept('POST', createPost).as('createPost')

  cy.get(startConversationPanel).click()
  cy.get(postEditorHeaderInput).type(community)
  cy.get(communityTitle(community)).click()
  cy.get(postEditorContent).then(el => {
    const editor = el[0].ckeditorInstance
    editor.setData(textToAdd)
  })

  cy.get(postEditorControlPanel)
    .find(submitButton)
    .click()
    .wait('@createPost', { timeout: 10000 })
    .as('createdPostResp')
    .its('response.statusCode')
    .should('eq', 201)
    .then(() => {
      // verify post present
      cy.get('@createdPostResp')
        .its('response.body')
        .then(({ post }) => {
          const { id } = post
          cy.get(postId(id))
            .should('be.visible', { timeout: 10000 })
            .and('contain.text', textToAdd)
            .then(() => {
              return id
            })
        })
    })
})

Cypress.Commands.add('login', (email, pass) => {
  Cypress.log({
    message: email,
  })
  cy.intercept('GET', postFeed).as('getListOfPosts')
  cy.visit(login)
  // interview note: prone to flakines, would add data-testid to each button
  cy.get('button').contains(usePassword).click()
  cy.get(emailInput).type(email)
  cy.get(passwordInput).type(pass, { log: false })
  cy.get(submitButton).click().wait('@getListOfPosts', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
})
