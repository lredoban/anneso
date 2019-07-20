import { createClient } from 'contentful'
import marked from 'marked'

const client = createClient({
  space: process.env.space,
  accessToken: process.env.accessToken
})

const pages = {
  about: '3KQnSp6UI0eEKi0wkgC0m0',
  contact: '2ZHHaG0AP6owwW6mYcC6Am'
}
const categoriesId = '5KMiN6YPvi42icqAUQMCQe'
const options = { gfm: true, tables: true, sanitize: false }

export async function getPages() {
  const pageNames = Object.keys(pages)
  const ret = {}
  for (const page of pageNames) {
    const raw = await client.getEntries({ 'sys.id': pages[page] })

    ret[page] = {
      title: raw.items[0].fields.title,
      content: marked(raw.items[0].fields.content, options),
      message: raw.items[0].fields.message
        ? marked(raw.items[0].fields.message, options)
        : '',
      button: raw.items[0].fields.button,
      backgroundImage: raw.items[0].fields.backgroundImage.fields
        ? raw.items[0].fields.backgroundImage.fields.file.url
        : ''
    }
  }
  return ret
}

export async function getCategories() {
  const categories = await client.getEntries({
    'sys.contentType.sys.id': categoriesId,
    order: 'fields.order',
    content_type: categoriesId
  })
  return categories.items.map(i => i.fields.title)
}

export async function getProjects() {
  const projects = await client.getEntries({
    'sys.contentType.sys.id': 'projects',
    order: 'fields.order',
    content_type: 'projects'
  })
  return projects.items.map(i => {
    return {
      content: marked(i.fields.content, options),
      title: i.fields.title,
      featuredImage: i.fields.featuredImage.fields
        ? i.fields.featuredImage.fields.file.url
        : 'https://source.unsplash.com/random',
      categories: i.fields.categories
        .map(c => (c.fields ? c.fields.title : false))
        .filter(c => c)
    }
  })
}
