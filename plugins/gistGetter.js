import frontMatter from 'front-matter'
import marked from 'marked'

const options = { gfm: true, tables: true, sanitize: true }

export function getSection (files, title) {
  return marked(files[`${title}.md`].content, options)
}

export function getProjects (files) {
  const fileNames = Object.keys(files)
  return fileNames.map(name => name.indexOf('project') !== -1 ? files[name] : null)
    .filter(item => item)
    .map(project => {
      const fm = frontMatter(project.content)
      return {
        title: project.filename.replace(/.project.md/, '').split('-').join(' '),
        meta: fm.attributes,
        content: marked(fm.body, options)
      }
    })
}
