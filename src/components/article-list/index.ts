import articlesServices from "../../services/articles-services";

class ArticleList extends HTMLElement {
  articles: any[];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // state
    this.articles = [];
  }

  async getArticles() {
    try {
      const response = await articlesServices.getArticles();

      this.articles = response;
    } catch (error) {
      console.error(error);
    }
  }
  async connectedCallback() {
    await this.getArticles();

    this.render();
  }
  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        .articles-list {
          display: flex;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .articles-list >   article-component {
            margin: 1rem auto ;
        }
      </style>

      <div class="articles-list">
        ${this.articles
          .map(
            (article) => `
            <article-component
                class="article-component"
                article-title="${article.title}"
                description="${article.description}"
                image="${article.image}"
                company="${article.company}"
                author-id="${article.author}"
                content="${article.content}"
                publishedAt="${article.publishedAt}"
            ></article-component>
            `
          )
          .join("")}

      </div>
  
    `;
  }
}

export default ArticleList;
