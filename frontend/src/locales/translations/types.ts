// made with http://json2ts.com/

export interface Localization {
  title: string
  description: string
}

export interface Terms {
  email: string
  emailPlural: string
  post: string
  postPlural: string
  tag: string
  tagPlural: string
  warning: string
  error: string
  information: string
  success: string
}
export interface Buttons {
  new: string
  show: string
  hide: string
  save: string
  confirm: string
  cancel: string
  goBack: string
  continue: string
  edit: string
  delete: string
  add: string
  create: string
  copy: string
  moreInfo: string
}

export interface Messages {
  emailRequiredField: string
  emailIsEmail: string
  emailSent: string
}

export interface Pages {
  notFoundTitle: string
  notFoundDescription: string
  blogTaggedWith: string
  blogViewAllTags: string
}

export interface Translations {
  localization: Localization
  terms: Terms
  buttons: Buttons
  messages: Messages
  pages: Pages
}
