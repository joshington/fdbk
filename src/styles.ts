

// styles.ts

export const widgetStyles = `
    /* Close button positioned at the top right of the card */
    .feedback-widget-close {
        position: absolute;
        top: 12px;
        right: 12px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #999999;
        padding: 0;
        line-height: 1;
        font-weight: bold;
        transition: color 0.2s ease;
    }

    .feedback-widget-close:hover {
        color: #333333;
    }
  /* Floating trigger button positioned at the bottom right */
  .feedback-widget-trigger {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #0070f3;
    color: #ffffff;
    border: none;
    border-radius: 50px;
    padding: 12px 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease, background-color 0.2s ease;
    z-index: 999999;
  }

  .feedback-widget-trigger:hover {
    background-color: #0051cb;
    transform: scale(1.05);
  }

  /* The main feedback modal container */
  .feedback-widget-card {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 320px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 20px;
    box-sizing: border-box;
    display: none; /* Controlled dynamically by ui.ts */
    flex-direction: column;
    gap: 12px;
    z-index: 999999;
    border: 1px solid #eaeaea;
  }

  .feedback-widget-card.open {
    display: flex;
  }

  .feedback-widget-header {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: #111111;
  }

  /* Textarea form field */
  .feedback-widget-textarea {
    width: 100%;
    height: 80px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    resize: none;
    font-family: inherit;
    font-size: 14px;
    box-sizing: border-box;
  }

  .feedback-widget-textarea:focus {
    outline: none;
    border-color: #0070f3;
  }

  /* Star rating selector container */
  .feedback-widget-rating-container {
    display: flex;
    gap: 6px;
    margin: 4px 0;
  }

  .feedback-widget-star {
    font-size: 20px;
    cursor: pointer;
    color: #ccc;
    background: none;
    border: none;
    padding: 0;
  }

  .feedback-widget-star.selected {
    color: #ffca28;
  }

  /* Action buttons */
  .feedback-widget-submit {
    background-color: #0070f3;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
  }

  .feedback-widget-submit:disabled {
    background-color: #accfff;
    cursor: not-allowed;
  }

  /* Status message styles (Success / Error states) */
  .feedback-widget-status-msg {
    font-size: 14px;
    text-align: center;
    padding: 10px 0;
  }
  
  .feedback-widget-status-msg.error {
    color: #ff3333;
  }
`;

/**
 * Injects the raw CSS styles cleanly into the document head
 */
export function injectStyles(): void {
  if (document.getElementById("feedback-widget-styles")) return;
  
  const styleTag = document.createElement("style");
  styleTag.id = "feedback-widget-styles";
  styleTag.textContent = widgetStyles;
  document.head.appendChild(styleTag);
}
