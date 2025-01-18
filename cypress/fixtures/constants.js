export const email = Cypress.env('EMAIL')
export const pass = Cypress.env('PASS')

export const community = 'BigHeart Philanthropy'
export const textToAdd = `Hello touch4it ${Math.random().toString(36).substring(7)}!`
export const usePassword = 'Use password'

export const endpoints = {
  login: '/login',
  createPost: '/v3/posts',
  deletePost: id => `/v3/posts/${id}`,
  postFeed: '/v3/content_objects/feed*',
}
