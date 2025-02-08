class ToastComponent extends HTMLElement {
  message: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.message = "";
  }
  connectedCallback() {
    this.render();
  }

  show(message: string) {
    this.message = message;
    this.render();

    const notification = this.shadowRoot?.querySelector(".toast-container");

    if (notification) {
      notification.classList.remove("hidden");
      setTimeout(() => {
        notification.classList.add("hidden");
      }, 3000);
    }
  }
  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `   

    <style>
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
          }

          .toast-container {
            position: absolute;
            top: 30px;
            right: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }

          .toast {
            width: 400px;
            height: 80px;
            background: #ffffff;
            font-weight: 500;
            margin: 15px 0;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            position: relative;
            transform: translateX(100%);
            animation: slide_show 0.3s ease forwards;
            pointer-events: auto;
          }

          @keyframes slide_show {
            0% {
              transform: translateX(100%);
            }
            40% {
              transform: translateX(-10%);
            }
            80% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-10px);
            }
          }

          .toast.hide {
            animation: slide_hide 0.3s ease forwards;
          }

          @keyframes slide_hide {
            0% {
              transform: translateX(-10px);
            }
            40% {
              transform: translateX(0%);
            }
            80% {
              transform: translateX(-10%);
            }
            100% {
              transform: translateX(120%);
            }
          }

          .toast-content {
            display: flex;
            align-items: center;
            padding: 0px 1rem;
          }

          .icon {
            font-size: 25px;
            color: #3498DB;
            margin: 0 20px;
          }

          .message {
            display: flex;
            flex-direction: column;
          }

          .text {
            font-size: 16px;
            font-weight: 400;
            color: #34495E;
          }

          .text.text-1 {
            font-weight: 600;
            color: #E24D4C
          }

          .close {
            position: absolute;
            top: 10px;
            right: 15px;
            padding: 5px;
            cursor: pointer;
            opacity: 0.7;
          }

          .close:hover {
            opacity: 1;
          }

          .progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            width: 100%;
            background: #ddd;
          }

          .progress:before {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            height: 100%;
            width: 100%;
            background-color: #3498DB;
          }

          .toast.error .progress:before {
            background-color: #E24D4C;
          }

  
          .progress.active:before {
            animation: progress 5s linear forwards;
          }

          @keyframes progress {
            100% {
              right: 100%;
            }
          }
        .hidden {
        display: none;
        }

    </style>
    <div class="toast-container hidden">
        <div class="toast error active">
            <div class="toast-content">
            <i class="fas fa-info-circle"></i>
            <div class="message">
                <span class="text text-1">Error</span>
                <span class="text text-2">${this.message}</span>
            </div>
            </div>
            <i class="fa-solid fa-xmark close"></i>
            <div class="progress"></div>
        </div>
    </div>`;
  }
}

export default ToastComponent;
