import cheerio, { CheerioAPI } from 'cheerio'

type TCheerSettings = {
  html: string
}

class CheerManager {
  public $: CheerioAPI

  constructor(s: TCheerSettings) {
    this.$ = cheerio.load(s.html)
  }

  getHtml() {
    return this.$.html()
  }

  rmComments() {
    this.$.root()
      .contents()
      .filter(function () {
        return this.type === 'comment'
      })
      .remove()
  }

  rmBySelector(selector: string, count: number = Number.MAX_SAFE_INTEGER) {
    if (!selector) {
      return
    }
    this.$(selector)
      .slice(0, count)
      .map((i: number, el: any) => this.$(el).remove())
  }

  rmByInnerText(selector: string, innerText?: string, innerCount = Number.MAX_SAFE_INTEGER) {
    if (!innerText || !selector) {
      return
    }

    try {
      this.$(selector)
        .filter((i: number, el: any) => this.$(el.children[0]).text().includes(innerText!))
        .slice(0, innerCount)
        .map((i: number, el: any) => this.$(el).remove())
    } catch (error: any) {
      return { error }
    }
  }
}

export { CheerManager }
