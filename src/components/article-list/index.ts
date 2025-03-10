import articlesServices from "../../services/articles-services";
import { articlesType } from "../../types";
import { setLoading } from "../../utils/setLoading";

import ToastComponent from "../toast";

class ArticleList extends HTMLElement {
  articles: articlesType[];
  params: {
    search: string;
    order: string;
    p: number;
    limit: number;
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // state
    this.articles = [];

    // params to service
    this.params = {
      search: "",
      order: "asc",
      p: 1,
      limit: 10,
    };
  }

  async getArticles() {
    setLoading(true);
    try {
      const response = await articlesServices.getArticles(this.params);

      this.articles = response;

      setLoading(false);

      return true;
    } catch (error) {
      this.toggleErrorMessage("Articles not found");
      setLoading(false);

      return false;
    }
  }

  toggleErrorMessage(message: string) {
    const errorMessageElement = document?.querySelector(
      "toast-component"
    ) as ToastComponent;

    if (errorMessageElement?.show) {
      errorMessageElement.show(message);
    }
  }
  async connectedCallback() {
    const success = await this.getArticles();

    if (success) this.render();
  }

  sortArticles(e: string) {
    this.params.order = e;

    const sortAscElement = this.shadowRoot?.querySelector("#sort-asc");
    const sortDescElement = this.shadowRoot?.querySelector("#sort-desc");

    if (!sortAscElement || !sortDescElement) return;

    if (e === "asc") {
      sortAscElement.classList.add("active");
      sortDescElement.classList.remove("active");
    } else {
      sortDescElement.classList.add("active");
      sortAscElement.classList.remove("active");
    }
  }

  async changePage(newPage: number) {
    if (newPage >= 1 && newPage) {
      this.params.p = newPage;
      const success = await this.getArticles();

      if (success) {
        this.render();

        document.querySelector("html, body")?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        .articles-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          margin: 1rem 2rem
        }

        .articles-list >   article-component {
            padding: 1rem;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #2c3e50;
        }

        .filters {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 1rem
        }

        .search-filter {
          position: relative;
          margin-right: 10px;
        }

        #search-input {
          width: 100%;
          padding: 10px 30px 10px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          max-width: 350px;
        }

        .search-filter i {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #777;
        }

        #search-btn {
         background-color:#2ecc71;
         border: none;
         padding: 12px;
         border-radius: 20px;
         color: white;
         cursor: pointer;
         transition: background-color 0.3s;
        }

        #search-btn:hover {
          background-color: #27ae60;
        }

        .sort-filter {
          display: flex;
        }

        .sort-btn {
          padding: 10px 15px;
          background-color: #3498db;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .sort-btn:first-child {
          border-radius: 4px 0 0 4px;
        }

        .sort-btn:last-child {
          border-radius: 0 4px 4px 0;
        }

        .sort-btn.active {
          background-color: #2980b9;
        }

        #product-list {
          list-style-type: none;
        }

        #product-list li {
          background-color: white;
          margin-bottom: 10px;
          padding: 15px;
          border-radius: 4px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-name {
          font-weight: bold;
        }

        .product-price {
          color: #e74c3c;
        }

        #title {
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
            align-items: stretch;
          }

          .search-filter {
            margin-right: 0;
          }

          .sort-filter {
            justify-content: center;
          }

          #top-bar {
          flex-direction: column;
          gap: 1rem;
          }

          #search-btn {
            max-width: 50%;
            margin: auto;
          }
        }

        #top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
        }

        h1{
          margin: 0;
        }

        .hidden {
          display: none;
        }

        .show {
            display: block;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .pagination button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 15px;
          margin: 0 5px;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        .pagination button:disabled {
          background-color: #bdc3c7;
          cursor: not-allowed;
        }

        .pagination button:hover:not(:disabled) {
          background-color: #2980b9;
        }

        .pagination span {
          margin: 0 10px;
        }
      </style>
   
      <div id="top-bar">  
          <h1 id="title">Videsk Articles</h1>
          <div class="filters">
            <div class="search-filter">
                <input type="text" id="search-input" placeholder="Buscar productos..." value="${
                  this.params.search
                }">
                <i class="fas fa-search"></i>
            </div>
            <div class="sort-filter">
                <button id="sort-asc" sort="asc" class="sort-btn"><i class="fas fa-sort-amount-down-alt"></i> Asc</button>
                <button id="sort-desc" sort="desc" class="sort-btn"><i class="fas fa-sort-amount-down"></i> Desc</button>
            </div>
            <button id="search-btn">
              Search
            </button>
          </div>
      </div>
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
       <div class="pagination">
              <button id="prev-page" ${
                this.params.p === 1 ? "disabled" : ""
              }><</button>
              <span>Page ${this.params.p}</span>
              <button id="next-page">></button>
            </div>
  
    `;

    this.sortArticles(this.params.order ?? "");

    this.shadowRoot
      .querySelector("#title")
      ?.addEventListener(
        "click",
        () => (window.location.href = window.location.origin)
      );

    this.shadowRoot
      .querySelector("#sort-asc")
      ?.addEventListener("click", () => this.sortArticles("asc"));

    this.shadowRoot
      .querySelector("#sort-desc")
      ?.addEventListener("click", () => this.sortArticles("desc"));

    this.shadowRoot
      .querySelector("#search-btn")
      ?.addEventListener("click", async () => {
        this.params.p = 1;

        const success = await this.getArticles();

        if (success) this.render();
      });

    this.shadowRoot
      .querySelector("#search-input")
      ?.addEventListener("input", async () => {
        this.params.search =
          (this.shadowRoot?.querySelector("#search-input") as HTMLInputElement)
            ?.value ?? "";
      });

    this.shadowRoot
      .querySelector("#prev-page")
      ?.addEventListener("click", () => this.changePage(this.params.p - 1));

    this.shadowRoot
      .querySelector("#next-page")
      ?.addEventListener("click", () => this.changePage(this.params.p + 1));
  }
}

export default ArticleList;
