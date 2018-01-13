import {createClient} from 'contentful'
import marked from 'marked'

const client = createClient({
  space: 'wz0vjkm4y9pe',
  accessToken: 'd7dadf45b2eb090c3279d4f74f3f098295f385c15582b7caa97906d7b69f8d37'
})

const pages = {
  about: '3KQnSp6UI0eEKi0wkgC0m0',
  contact: '2ZHHaG0AP6owwW6mYcC6Am'
}
const categoriesId = '5KMiN6YPvi42icqAUQMCQe'
const options = { gfm: true, tables: true, sanitize: true }

export async function getPages () {
  const pageNames = Object.keys(pages)
  const ret = {}

  for (let page of pageNames) {
    let raw = await client.getEntries({'sys.id': pages[page]})

    ret[page] = { title: raw.items[0].fields.title,
      content: marked(raw.items[0].fields.content, options),
      button: raw.items[0].fields.button,
      backgroundImage: raw.items[0].fields.backgroundImage.fields.file.url
    }
  }
  return ret
}

export async function getCategories () {
  let categories = await client.getEntries(
    { 'sys.contentType.sys.id': categoriesId }
  )
  return categories.items.map(i => i.fields.title)
}

export async function getProjects () {
  let projects = await client.getEntries(
    { 'sys.contentType.sys.id': 'projects' }
  )
  return projects.items.map(i => {
    return {
      content: marked(i.fields.content, options),
      title: i.fields.title,
      featuredImage: i.fields.featuredImage.fields.file.url,
      categories: i.fields.categories.map(c => c.fields.title)
    }
  })
}
