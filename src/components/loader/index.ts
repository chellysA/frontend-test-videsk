class Loader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          .loader {
            display: none;
            justify-content: center;
            align-items: center;
            height: 100vh; 
            background-color: rgba(255, 255, 255, 0.8);
            position: fixed; 
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
          }
  
          .spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 60px; 
            height: 60px;
            animation: spin 1s linear infinite;
          }

          .show {
          display: flex;
          flex-direction: column;
          }
  
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
  
          .message {
            margin-top: 20px;
            font-size: 18px;
            color: #3498db;
          }
        </style>
  
        <div class="loader">
          <div class="spinner"></div>
          <div class="message">Please wait...</div>
        </div>
      `;
    }
  }

  show() {
    this.setAttribute("open", "true");
    const loader = this.shadowRoot?.querySelector(".loader");
    if (loader) loader.classList.add("show");
  }

  hide() {
    this.removeAttribute("open");
    const loader = this.shadowRoot?.querySelector(".loader");
    console.log("entro aqui");
    if (loader) loader.classList.remove("show");
  }

  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "open") {
      if (newValue === "true") {
        this.show();
      } else {
        this.hide();
      }
    }
  }
}

export default Loader;
