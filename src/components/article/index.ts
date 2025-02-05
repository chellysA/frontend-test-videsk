class Article extends HTMLElement {
  expanded: boolean;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.expanded = false;
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const title = this.getAttribute("article-title");
    const image = this.getAttribute("image");
    const company = this.getAttribute("company");
    const description = this.getAttribute("description");
    const author = this.getAttribute("author-id");

    if (this?.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
            :host {
                --primary-color: #3498db;
                --secondary-color: #2ecc71;
                --text-color: #34495e;
                --background-color: #ecf0f1;
                --card-background: #ffffff;
                --shadow-color: rgba(0, 0, 0, 0.1);
            }

            .card {
                background-color: var(--card-background);
                border-radius: 12px;
                box-shadow: 0 4px 6px var(--shadow-color);
                padding: 24px;
                max-width: 350px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                transition: all 0.3s ease;
            }

            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 12px var(--shadow-color);
            }

            h2 {
                color: var(--primary-color);
                margin-top: 0;
                font-size: 1.5em;
            }

            img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
            }

            p {
                color: var(--text-color);
                line-height: 1.6;
                margin: 8px 0;
            }

            .hidden {
                display: none;
            }

            button {
                background-color: var(--secondary-color);
                border: none;
                color: white;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 16px 0 8px;
                cursor: pointer;
                border-radius: 25px;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: #27ae60;
            }

            #expandedContent {
            }

            .divider {
              border-top: 1px solid var(--background-color);
              margin: 16px 0px;
            }

            img{
              width: 100%;
            }

            .container-button-see-more {
              display: flex;
              justify-content: flex-end;
            }
              
            #author-name {
              cursor: pointer;
            }

            .author-details {
                background-color: var(--background-color);
                border-radius: 8px;
                padding: 16px;
                margin-top: 16px;
            }

            .author-details h3 {
                color: var(--primary-color);
                margin-top: 0;
            }
        </style>

        <div class="card">
            <h2>${title}</h2>
            <img src="${image}" alt="${title}">
            <div class="divider"></div>
            <p><strong>Compañía:</strong> ${company}</p>

            <div id="expandedContent" class="hidden">
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Author:</strong> <span id="author-name"></span></p>
                <div class="author-details hidden">
                  <h3>Author Details</h3>
                  <p><strong>Birthdate:</strong> <span id="authorBirthdate"></span></p>
                  <p><strong>Bio:</strong> <span id="authorBio"></span></p>
              </div>
            </div>
            <div class="container-button-see-more">
              <button class="toggleBtn">Ver más</button>
            </div>
        </div>
    `;
    }
  }
}

export default Article;
