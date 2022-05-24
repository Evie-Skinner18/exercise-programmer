import sanitizeHtml from "sanitize-html";

// singleton pattern would probs be good here?
export default class Sanitiser {
    // TypeScript would help so much here
    // want this to be private
    sanitiseHtmlOptions = {
        allowedTags: [],
        allowedAttributes: {},
        allowedIframeHostnames: []
      };

    sanitiseUserInput(userInput) {
        const sanitisedUserInput = sanitizeHtml(userInput, this.sanitiseHtmlOptions);
        return sanitisedUserInput;
    }
}