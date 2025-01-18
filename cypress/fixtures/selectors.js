export const signIn = {
  emailInput: '#email',
  passwordInput: '#password',
  submitButton: 'button[type="submit"]',
}

export const postCreation = {
  startConversationPanel: '[data-test-id="panel_start-conversation"]',
  postEditorHeaderInput: '[data-test-id="post-editor_header"] input',
  communityTitle: community => `[title="${community}"]`,
  postEditorContent: '[data-test-id="post-editor_content"] [contenteditable]',
  postEditorControlPanel: '[data-test-id="post-editor_control-panel"]',
}

export const postManagement = {
  deleteMenuItem: '[data-menu-id*="-delete"]',
  postId: id => `#post_${id}`,
}
